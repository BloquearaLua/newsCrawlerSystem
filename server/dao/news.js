const mysql = require('mysql');
const { get } = require('../util/dao')

const { mysqlOptions } = require('../config/config.default');

function getNews(params) {
    return new Promise((resolve,reject) => {
        try {
            const { page=1,pageSize=20} = params;
        // console.log("sql",page,pageSize);
        const start = (page-1)*pageSize;
        const conn = mysql.createConnection(mysqlOptions);
        const sql = `select * from news order by id desc limit ${start},${pageSize}`
        conn.connect((err) => {
            if(err){
                reject("连接失败",err);
            }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            console.log("getNewsByCurrentDate",err);
                            reject("查询失败",err);
                        }else{
                            resolve(result);
                            conn.end();
                        }
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

function getNewsByKeyword(params) {
    return new Promise((resolve,reject) => {
        try {
            const { keyword, page=1, pageSize=20 } = params;
            const start = (page-1)*pageSize;
            if(keyword){
                const conn = mysql.createConnection(mysqlOptions);
                const sql = `select * from news where match(title,keywords,content,summary) against('${keyword}') order by id desc limit ${start},${pageSize};`;
                // console.log(sql);
                conn.connect((err) => {
                    if(err){
                        reject("连接失败",err);
                    }else{
                        conn.query(sql,(err,result,fields) => {
                            if(err){
                                reject("查询出错",err);
                            }else{
                                resolve(result);
                                conn.end();
                            }
                        })
                    }
                })
            }else{
                reject('关键字为空');
            }
        } catch (error) {
            reject(error);
        }
    })
}

function getNewsById({id}) {
    return new Promise((resolve,reject) => {
        try {
            if(id){
                const conn = mysql.createConnection(mysqlOptions);
                const sql = `SELECT * FROM news WHERE id=${id}`;
                conn.connect((err) => {
                    if(err){
                        reject('连接错误',err);
                    }else{
                        conn.query(sql, (err,result,fields) => {
                            if(err){
                                reject('查询出错',err);
                            }else{
                                resolve(result);
                                conn.end();
                            }
                        })
                    }
                })
            }else{
                reject("id不存在")
            }
        } catch (error) {
            reject(error);
        }
    })
}

function getNewsBySourceId(params) {
    return new Promise((resolve,reject) => {
        try {
            const { sourceId, page=1, pageSize=20 } = params;
            const start =  (page-1)*pageSize;
            // console.log(start);
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select * from news where news_source=${sourceId} order by id desc limit ${start},${pageSize}`;
            conn.connect((err) => {
                if(err){
                    reject('连接失败',err);
                }else{
                    conn.query(sql,(err,result,fields)=>{
                        if(err){
                            reject('查询失败',err);
                        }else{
                            resolve(result);
                            conn.end();
                        }
                    })
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

function getTotalCount(params) {
    return new Promise((resolve,reject) => {
        const { type, keyword, sourceId } = params; 
        const conn = mysql.createConnection(mysqlOptions);
        const sqlObj = {
            'news': `select count(*) as count from news`,
            'keyword': `select count(*) as count from news where match(title,keywords,content,summary) against('${keyword}');`,
            'sourceId': `select count(*) as count from news where news_source=${sourceId}`,
            'all': `select count(*) from news where match(title,keywords,content,summary) against('${keyword}') and news_source=${sourceId}`
        }
        const sql = sqlObj[type];
        conn.connect((err) => {
            if(err){
                reject('连接失败',err);
            }else{
                conn.query(sql,(err,result,fields)=>{
                    if(err){
                        reject('查询失败',err);
                    }else{
                        // console.log("result",result);
                        resolve(result[0].count);
                        conn.end();
                    }
                })
            }
        })
    })
}

function getNewsByType(params) {
    return new Promise((resolve,reject) => {
        try {
            const { keyword, sourceId } = params;
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select * from news where match(title,keywords,content,summary) against('${keyword}') and news_source=${sourceId}`;
            conn.connect((err) => {
                if(err){
                    reject("连接失败",err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            // console.log("getNewsByCurrentDate",err);
                            reject("查询失败",err);
                        }else{
                            resolve(result);
                            conn.end();
                        }
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function getAnalysisData() {
    const categorySql = `select category,count(*) as count from news group by category`
    const sentimentSql = `select (
        case
            when sentiment<0 then '负面'
            when sentiment=0 then '中立'
            else '正面'
        end
    ) as sentiment,count(*) as count
    from news
    GROUP BY
    (
        case 
            when sentiment<0 then '负面'
            when sentiment=0 then '中立'
            else '正面'
        end
    )`
    const todaySentimentSql = `select (
        case
            when sentiment<0 then '负面'
            when sentiment=0 then '中立'
            else '正面'
        end
        ) as sentiment,count(*) as count
        from news where publish_date="20220501"
        GROUP BY
        (
            case 
                when sentiment<0 then '负面'
                when sentiment=0 then '中立'
                else '正面'
            end
        )`
    const totalWordSql = `select keywords from news`
    const todayWordSql = `select keywords from news where publish_date='20220501'`
    const categoryRes = await get({sql: categorySql})
    const sentimentRes = await get({sql: sentimentSql})
    const todaySentimentRes = await get({sql: todaySentimentSql})
    const totalWordRes = await get({sql: totalWordSql})
    const todayWordRes = await get({sql: todayWordSql})
    return {
        sentiment: sentimentRes,
        todaySentiment: todaySentimentRes,
        category: categoryRes,
        totalWord: totalWordRes,
        todayWord: todayWordRes
    }
}

module.exports = {
    getNews,
    getNewsByKeyword,
    getNewsById,
    getNewsBySourceId,
    getTotalCount,
    getNewsByType,
    getAnalysisData
}