const { getKwdByDate } = require("../dao/record");
const { selectNewsIdList, selectKwdByNewsId, updateKwd, selectNews } = require("../dao/vocabulary")

async function getKwdToday(date) {
    const newsList = await getKwdByDate({date})
    // console.log(newsList);
    const kwdObj = {}
    newsList.map(item => {
        const keywords = item.keywords.split(',')
        keywords.map(item => {
            if (kwdObj[item]) {
                kwdObj[item] += 1
            } else { 
                kwdObj[item] = 1
            }
        })
    })
    
    const list = Object.entries(kwdObj)
    list.sort((a,b) => b[1]-a[1])
    console.log(list);
}

async function getAllkwd(params) {
    const newsList = await selectNews({start:0, pageSize:20000})
    // console.log(newsList);
    const kwdObj = {}
    newsList.map(item => {
        const keywords = item.keywords.split(',')
        keywords.map(item => {
            if (kwdObj[item]) {
                kwdObj[item] += 1
            } else { 
                kwdObj[item] = 1
            }
        })
    })
    
    const list = Object.entries(kwdObj)
    list.sort((a,b) => b[1]-a[1])
    console.log(list);
}


async function getKeywords() {
    const newsIdList = await selectNewsIdList()
    // console.log(newsIdList)
    const len = newsIdList.length
    console.log(len);
    const kwdList = []
    for (let i = 0; i < len; i++) {
        const kwd = await selectKwdByNewsId({newsId: newsIdList[i]})
        kwdList.push([kwd.join(','),newsIdList[i]])
    }
    // console.log(kwdList);
    updateKwd(kwdList)
}

function main() {
    // getKeywords()    
    // const date = '20220501'
    // getKwdToday(date)
    getAllkwd()
}

main()