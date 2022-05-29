const mysql = require("mysql")
let { mysqlOptions, connectPool, conn } = require("../config/config.default")

function selectNewsIdList(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions)
            const sql = `select id from news`
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    conn.query(sql, (err,result,fields) => {
                        if(err){
                            reject(err)
                        }else{
                            const list = result.map(item => item.id)
                            resolve(list)
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function selectNews(params) {
    return new Promise((resolve,reject) => {
        try {
            const { start, pageSize } = params
            const conn = mysql.createConnection(mysqlOptions)
            const sql = `select id,title,keywords,content,summary from news limit ${start},${pageSize}`
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    conn.query(sql, (err,result,fields) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function selectWords(params) {
    return new Promise((resolve,reject) => {
        try {
            const { start, pageSize } = params
            const conn = mysql.createConnection(mysqlOptions)
            // const sql = `select id,news_id as newsId,keyword,freqs from keywords limit ${start},${pageSize}`
            const sql = `select id,news_id as newsId,keyword,freqs from keywords where id>${start} limit ${pageSize}`
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    conn.query(sql, (err,result,fields) => {
                        if(err){
                            throw new Error(err)
                        }else{
                            resolve(result)
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function selectVocabulary(params) {
    return new Promise((resolve,reject) => {
        try {
            const { start, pageSize } = params
            const sql = `select word from vocabulary limit ${start},${pageSize}`
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    conn.query(sql, (err,result,fields) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function selectKwdByNewsId(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `select news_id,keyword,tfidf from keywords where match(\`news_id\`,\`keyword\`) against (${params.newsId}) order by tfidf desc limit 0,10;`
            connectPool.getConnection((err,connection) => {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, result, fields) => {
                        if (err) {
                            reject(err)
                        } else {
                            const kwd = result.map(item => item.keyword)
                            resolve(kwd)
                        }
                    })
                }
                connection.release()
            })
        } catch (error) {
            reject(error)
        }
    })
}

function insertKeywords(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions)
            const sql = `insert into keywords(news_id,keyword,freqs) values ?`
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    conn.query(sql, [params], (err,result,fields) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve("success")
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}


function insertVocabulary(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `insert ignore into vocabulary(word,freqs,idf) values ?`
            const conn = mysql.createConnection(mysqlOptions)
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    conn.query(sql, [params], (err,result,fields) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve("success")
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getCount(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions)
            const sql = `select count(*) as count from ${params.table}`
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    conn.query(sql, (err,result,fields) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve(result[0].count)
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getCountFromKwd(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `select count(*) as count from keywords where match(\`keyword\`) against('${params.keyword}')`
            connectPool.getConnection((err,connection) => {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, result, fields) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result[0].count)
                        }
                    })
                }
                connection.release()
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getdCount(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `select count(*) as count from keywords where match(\`news_id\`,\`keyword\`) against (${params.newsId})`
            connectPool.getConnection((err,connection) => {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, result, fields) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result[0].count)
                        }
                    })
                }
                connection.release()
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getIdfByWord(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `select idf from vocabulary where word = '${params.keyword}'`
            connectPool.getConnection((err,connection) => {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, result, fields) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result[0]?.idf)
                        }
                    })
                }
                connection.release()
            })
        } catch (error) {
            reject(error)
        }
    })
}

function updateTFIDF(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `update keywords set tfidf=? where id=?`
            const conn = mysql.createConnection(mysqlOptions)
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    params.forEach((item,index) => {
                        conn.query(sql, item, (err,result,fields) => {
                            if(err){
                                reject(err)
                            } else {
                                if (index%10000 === 0) {
                                    console.log("进行到" + index + "了")
                                }
                                if(index === params.length-1) {
                                    resolve("success")
                                }
                            }
                        })
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function updateKwd(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `update news set keywords=? where id=?`
            const conn = mysql.createConnection(mysqlOptions)
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    params.forEach((item,index) => {
                        conn.query(sql, item, (err,result,fields) => {
                            if(err){
                                reject(err)
                            } else {
                                if (index%1000 === 0) {
                                    console.log("进行到" + index + "了")
                                }
                                if(index === params.length-1) {
                                    resolve("success")
                                }
                            }
                        })
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function updateParams(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = `update news set ${params.param}=? where id=?`
            const conn = mysql.createConnection(mysqlOptions)
            conn.connect((err) => {
                if(err){
                    reject(err)
                }else{
                    params.list.forEach((item,index) => {
                        conn.query(sql, item, (err,result,fields) => {
                            if(err){
                                reject(err)
                            } else {
                                if (index%2000 === 0) {
                                    console.log("进行到" + index + "了")
                                }
                                if(index === params.list.length-1) {
                                    resolve("success")
                                }
                            }
                        })
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    selectNews,
    selectWords,
    selectNewsIdList,
    selectVocabulary,
    selectKwdByNewsId,
    insertKeywords,
    insertVocabulary,
    getCount,
    getdCount,
    getCountFromKwd,
    getIdfByWord,
    updateTFIDF,
    updateParams
}