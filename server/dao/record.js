const mysql = require('mysql');
const {mysqlOptions} = require('../config/config.default');

function getCount(params) {
    return new Promise((resolve,reject) => {
        try {
            const { table, userId } = params;
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select count(*) as count from ${table} where user_id=${userId}`;
            conn.connect(err => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result[0].count);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

function getIfRecord(params) {
    return new Promise((resolve,reject) => {
        try {
            const { table, userId, newsId } = params;
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select * from ${table} where news_id=${newsId} && user_id=${userId}`;
            conn.connect(err => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            console.log(result);
                            if(result.length){
                                resolve(true)
                            }else{
                                resolve(false);   
                            }
                        }
                    })
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

function getRecords(params) {
    return new Promise((resolve,reject) => {
        const { table, userId, pageSize=10, page=1 } = params;
        const start = (page-1)*pageSize;

        const conn = mysql.createConnection(mysqlOptions);
        let sql = ""
        // if(table === "likes"){
        //     sql = `select news.id,news.author,news.summary,news.title,news.url,news.publish_date,${table}.create_time as create_time from news,${table} where ${table}.user_id=${userId} and news.id=${table}.news_id order by create_time desc limit ${start},${pageSize};`;
        // }else if(table === "views"){
            
        // }
        sql = `select news.id,news.author,news.summary,news.title,news.url,news.publish_date,${table}.update_time as update_time from news,${table} where ${table}.user_id=${userId} and news.id=${table}.news_id order by update_time desc limit ${start},${pageSize};`;
        
        conn.connect((err) => {
            if(err){
                reject(err);
            }else{
                conn.query(sql,(err,result,fields) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            }
        })
    })
}

function insertRecord(params) {
    return new Promise((resolve,reject) => {
        try {
            const { table, userId, newsId } = params;
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `insert into ${table}(news_id,user_id) values(${newsId},${userId}) on duplicate key update update_time=NOW()`;
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            console.log(result);
                            resolve(result);
                        }
                    })
                }

            })
        } catch (error) {
            reject(error);
        }
    })
}

function deleteRecord(params) {
    return new Promise((resolve,reject) => {
        try {
            const { table,newsId,userId } = params;
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `delete from ${table} where user_id=${userId} && news_id=${newsId}`;
            console.log(sql);
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            console.log(result);
                            resolve(result);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

function getKwdByDate(params) {
    return new Promise((resolve,reject) => {
        const conn = mysql.createConnection(mysqlOptions);
        sql = `select * from \`news\` where DATE_FORMAT(\`publish_date\`,'%Y%m%d') = ${params.date};
        `;
        conn.connect((err) => {
            if(err){
                reject(err);
            }else{
                conn.query(sql,(err,result,fields) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            }
        })
    })
    
}
module.exports = {
    getCount,
    getIfRecord,
    getRecords,
    insertRecord,
    deleteRecord,
    getKwdByDate
}