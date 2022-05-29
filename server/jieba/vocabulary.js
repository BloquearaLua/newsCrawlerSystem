const { 
    selectNews,
    selectWords,
    selectVocabulary,
    insertVocabulary, 
    getCount,
    getCountFromKwd
} = require('../dao/vocabulary')
const { getStopwords } = require('../util/jieba')
const jieba = require('nodejieba')

function getFreqs(news, stopwords) {
    const keywords = jieba.cutForSearch(news)
    const wordCount = {}
    keywords.forEach(word => {
        if (!stopwords.includes(word)) {
            if (wordCount[word]) {
                wordCount[word] += 1
            } else {
                wordCount[word] = 1
            }
        }
    })
    return wordCount
}

function handleKwdParams(freqs, newsId) {
    const list = []
    for (const word in freqs) {
        list.push([newsId, word, freqs[word]])
    }
    return list
}

async function handleVocbyParams(wordObj, totalCount) {
    const list = []
    try {
        let i = 0
        for (const word in wordObj) {
            const idf = await getIdf(totalCount, word)
            if(word.trim()) {
                list.push([word, wordObj[word], idf])
                if(i === 10000) {
                    console.log("已处理"+i+"条");
                }
                i++
            }
        }   
        
    } catch (error) {
        console.log("idf.error",error.message);
    }
    return list
}

async function getIdf(totalCount, word) {
    let idf = -1
    const count = await getCountFromKwd({keyword: word})
    idf = Math.log10(totalCount/(count+1))
    return idf.toFixed(2)
}

async function handleKeywords() {
    const stopwords = await getStopwords()
    const totalCount = await getCount({table: 'news'})
    let pageSize = 1000
    const pages = totalCount%pageSize === 0 ? totalCount/pageSize : Math.ceil(totalCount/pageSize)
    for (let i = 0; i < pages; i++) {
        const news = await selectNews({
            start: pageSize*i,
            pageSize
        })
        const insertList = []
        console.log("遍历开始：",i);
        news.map(item => {
            const freqsObj = getFreqs((item.title+item.content+item.summary).trim(), stopwords)
            const list = handleParams(freqsObj, item.id)
            insertList.push(...list)
        })
        const flag = await insertVocabulary(insertList)
        console.log(flag,"结束");
    }
}

async function handleVocabulary() {
        const totalCount = await getCount({table: 'keywords'})
        const newsCount = await getCount({table: 'news'})
        let pageSize = 200000
        const wordsList = {}
        const pages = totalCount%pageSize === 0 ? totalCount/pageSize : Math.ceil(totalCount/pageSize)
        for (let i = 0; i < pages; i++) {
            const keywordsList = await selectWords({
                start: pageSize*i,
                pageSize
            })
            console.log("遍历开始：",i);
            keywordsList.map(item => {
                if (wordsList[item.keyword]) {
                    wordsList[item.keyword] += item.freqs
                } else {
                    wordsList[item.keyword] = item.freqs
                }
            })
        }
        console.log("遍历结束");
        console.log("开始转换参数");
        const insertList = await handleVocbyParams(wordsList, newsCount)
        console.log("转换参数成功");
        // console.log(insertList);
    try {
        const flag = await insertVocabulary(insertList)
        console.log('end',flag); 
    } catch (error) {
        console.log('insert.error:',error.message);
    }
}

function main() {
    // handleKeywords()
    handleVocabulary()
}

main()