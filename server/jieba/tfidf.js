const { b, k } = require('../constant')
const { getCount, getdCount, selectWords, getIdfByWord, updateTFIDF } = require('../dao/vocabulary')

async function getTFIDF() {
  try {
    const wordCount = await getCount({table: 'keywords'})   // 关键词长度
    const newsCount = await getCount({table: 'news'})       // 文档长度
    const avgd = (wordCount/newsCount).toFixed(2)           // 平均文档长度
    console.log(wordCount,newsCount,avgd)

    const pageSize = 50000
    const pages = wordCount%pageSize===0 ? wordCount/pageSize : Math.ceil(wordCountpageSize)
    console.log("总共"+pages+"页");
    let tdidf = -1
    for (let i = 0; i < pages; i++) {
      let insertList = []
      const wordList = await selectWords({start: i*pageSize,pageSize})
      let curNewsId = -1, curCount = -1, idf = -1
      const len = wordList.length
      for (let j = 0; j < len; j++) {
        const { id, newsId, keyword, freqs } = wordList[j]
        // 同篇文章不重新获取当前文档长度
        if (curNewsId !== newsId) {
            curNewsId = newsId
            curCount = await getdCount({newsId})
        }
        if (keyword === '\\' || !keyword.trim()) {
            continue
        }
        idf = await getIdfByWord({keyword})
        if (idf) {
          tdidf = ((((k+1)*freqs)/(freqs+k*(1+b*((curCount/avgd)-1))))*idf).toFixed(2)
            insertList.push([tdidf,id])  
          }
        }     
      await updateTFIDF(insertList)
    }
  } catch (error) {
    console.log('update.error', error.message);
  }
}

async function main() {
    getTFIDF()
}

main()

