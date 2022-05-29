const newsDao = require('../dao/news');

// 获取获取新闻
async function getNews(req,res,next) {
    try {
        const { keyword,source_id:sourceId,page,pageSize } = req.query;
        let result = null, count = 0;
        if(!keyword && !sourceId){       
            result = await newsDao.getNews({page,pageSize});
            count = await newsDao.getTotalCount({type: "news"});
        }else if(keyword){              // 根据关键词搜索
            result = await newsDao.getNewsByKeyword({keyword,page});
            count = await newsDao.getTotalCount({type:'keyword',keyword});
        }else if(sourceId){
            result = await newsDao.getNewsBySourceId({sourceId,page,pageSize});
            count = await newsDao.getTotalCount({type:"sourceId",sourceId});
        }
        res.status(200).json({
            data:result,
            count
        });
    } catch (error) {
        next(error);
    }
}


// 根据id获取新闻
async function getANews(req,res,next) {
    try {
        const { id } = req.params;
        // console.log(id);
        const result = await newsDao.getNewsById({id});
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

async function searchNews(req,res,next) {
    try {
        const { sourceid:sourceId,keyword } = req.query;
        const result = await newsDao.getNewsByType({
            sourceId,
            keyword
        });
        // const count = await newsDao.getTotalCount({
        //     type: "all",
        //     keyword,
        //     sourceId
        // })
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


// 获取文本分析数据
async function analysisData(req,res,next) {
    try {
        const sentimentRes = await newsDao.getAnalysisData()
        const todayWord = getKwdCount(sentimentRes.todayWord)
        const totalWord = getKwdCount(sentimentRes.totalWord)
        // console.log(todayWord,totalWord);
        res.status(200).json({
            ...sentimentRes,
            todayWord,
            totalWord
        });
    } catch (error) {
        next(error);
    }
}

function getKwdCount(params) {
    const stopwords = ['%','~','...','.',',','…']
    const kwdObj = {}
    params.map(newsKwd => {
        const kwd = newsKwd.keywords.split(',')
        kwd.map(item => {
            if (stopwords.includes(item)) {
                return
            } else {
                if (kwdObj[item]) {
                    kwdObj[item] += 1
                } else {
                    kwdObj[item] = 1
                }
            }
        })
    })

    return Object.entries(kwdObj).sort((a,b) => b[1]-a[1]).slice(0,100)
}

module.exports = {
    getNews,
    getANews,
    searchNews,
    analysisData
}