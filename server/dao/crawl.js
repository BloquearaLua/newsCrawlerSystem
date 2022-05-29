const mysql = require("mysql");
const moment = require("moment");
const { mysqlOptions } = require("../config/config.default");

// 获取今天的新闻的关键词
function getTodayKwd(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select keywords from news where DATE_FORMAT(crawler_date,'%Y%m%d')=${params.today}`;
            // const sql = `select keywords from news `;
            console.log(sql);
            conn.connect((err) => {
                if(err) {
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
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

// 插入今日前topN的关键词
function insertTodayKwd(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `insert into \`keywords\`(\`current_date\`,\`keyword\`,\`times\`) values ?`;
            conn.connect((err) => {
                if(err) {
                    reject(err);
                }else{
                    conn.query(sql,[params],(err,result,fields) => {
                        if(err){
                            reject(err);
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

// 统计条数
function getCount(params) {
    return new Promise((resolve,reject) => {
        try {
            let { date, sourceId } = params;
            if(!date){
                date = new Date();
            }
            date = moment(date).format("YYYYMMDD");
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select count(*) as count from news where news_source = ${sourceId} and Date(\`crawler_date\`) = ${date}`;
            conn.connect((err) => {
                if(err) {
                    reject(err);
                }else{
                    conn.query(sql,[params],(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result[0].count);
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

// 插入数据库
function insertCount(params) {
    return new Promise((resolve,reject) => {
        try {
            let { date, wallstreetCount, weiboCount } = params;
            if(!date){
                date = new Date();
            }
            date = moment(date).format("YYYYMMDD");
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `insert into \`crawl_details\`(\`current_date\`,\`wallstreet_count\`,\`weibo_count\`) values (${date},${wallstreetCount},${weiboCount})`;
            conn.connect((err) => {
                if(err) {
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
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

module.exports = {
    getTodayKwd,
    insertTodayKwd,
    getCount,
    insertCount
}