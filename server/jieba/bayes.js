const bayes = require('bayes')
const fs = require('fs')
const Segment = require('segment')
const sentiment = require('sentiment-zh_cn_web')

const { getCount, selectNews, updateParams } = require('../dao/vocabulary')

const segment = new Segment()
segment.useDefault()

const classifier = bayes({
    tokenizer: function (text) {
        if(!text) return []
        const seg = segment.doSegment(text,{stripStopword:true})
        const list = seg.map(item => item.w)
        return list
    }
})

function getFile(url) {
    return new Promise((resolve,reject) => {
        fs.readFile(url,(err, res) => {
            if (err) reject(err)
            else {
                resolve(res.toString())
            }
        })
    })
}

async function handleFile() {
    // const file = await getFile('../data/toutiao_cat_data.txt')
    const file = await getFile('../data/simplifyweibo_4_moods.csv')
    const temp = file.split('\n')
    const len = temp.length
    let trainList = []
    for (let i = 0; i < len; i++) {
        // const list = temp[i].split('_!_')
        // trainList.push([list[3],list[2]])
        const list = temp[i].split(',')
        trainList.push([list[1],list[0]])
    }
    return trainList
}

async function handleSentiment(params) {
    const newsCount = await getCount({table: 'news'})
    const pageSize = 1000
    const pages = newsCount%pageSize===0 ? newsCount/pageSize : Math.ceil(newsCount/pageSize)
    let insertList = []
    for (let i = 0; i < pages; i++) {
        const list = await selectNews({pageSize,start: pageSize*i})
        const len = list.length
        for (let j = 0; j < len; j++) {
            // 分类
            // console.log(list[j]);
            // const sentiment = await classifier.categorize(list[j].summary ? list[j].summary : list[j].content)
            const com = await sentiment(list[j].title)
            insertList.push([com.comparative,list[j].id])
        }
    }
    console.log(insertList);
    const res = await updateParams({ param: 'sentiment',list: insertList})
    // console.log(res);
    // console.log(res);
    // console.log(insertList);
    // updateSentiment(insertList)
}

async function handleCategory() {
    // 整理训练集
    const trainList = await handleFile()
    const listLen = trainList.length

    // 训练
    for (let i = 0; i < listLen; i++) {
        if(i%10000 === 0)  console.log(i);
        await classifier.learn(trainList[i][0],trainList[i][1])
    }
    
    // 从数据库拿数据
    const totalCount = await getCount({table: 'news'})
    const pageSize = 5000
    const pages = totalCount%pageSize===0 ? totalCount/pageSize : Math.ceil(totalCount/pageSize)
    const categoryList = []
    for (let i = 0; i < pages; i++) {
        const list = await selectNews({pageSize,start: pageSize*i})
        const len = list.length
        for (let j = 0; j < len; j++) {
            // 分类
            const category = await classifier.categorize(list[j].title)
            categoryList.push([category,list[j].id])
        }
    }
    console.log(categoryList);
    await updateParams({ param: 'category',list: categoryList})
}


async function main() {
    handleSentiment()
    // handleCategory()
}

main()