const mysql = require("mysql");
const moment = require("moment");
const { mysqlOptions } = require("../config/config.default");

function getKeywords(params) {
    return new Promise((resolve,reject) => {
        try {
            let { date } = params;
            if(!date){
                date = new Date();
            }
            date = moment(date).format('YYYYMMDD');
            // console.log(date);
            const conn = mysql.createConnection(mysqlOptions);
            // const sql = `select * from \`keywords\` where TO_DAYS(DATE_FORMAT(\`current_date\`,'%Y%m%d')) = TO_DAYS(now())-1;`;
            const sql = `select * from \`keywords\` where TO_DAYS(DATE_FORMAT(\`current_date\`,'%Y%m%d')) = TO_DAYS(now())-6;`;
            console.log(sql);
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            console.log("dao",result);
                            resolve(result);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getCrawlDatails(params) {
    return new Promise((resolve,reject) => {
        try {
            let { date } = params;
            if(!date){
                date = new Date();
            }
            date = moment(date).format('YYYYMMDD');
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select current_date,wallstreet_count,weibo_count from crawl_details where Date(\`current_date\`) = ${date}`;
            // console.log(sql);
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            // console.log("dao",result);
                            resolve(result);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getDatails(params) {
    return new Promise((resolve,reject) => {
        try {
            let { date, detaDay } = params;
            if(!date){
                date = new Date();
            }
            date = moment(date).format('YYYYMMDD');
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select current_date,wallstreet_count,weibo_count from \`crawl_details\` where TO_DAYS(DATE_FORMAT(\`current_date\`,'%Y%m%d')) = TO_DAYS(now())-${detaDay}`;
            // console.log(sql);
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            // console.log("dao",result);
                            resolve(result);
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
            const { sourceId, table, roleId } = params;
            const conn = mysql.createConnection(mysqlOptions);
            let sql = "";
            if(sourceId){
                sql = `select count(*) as count from ${table} where news_source=${sourceId}`;
            }else if(roleId){
                sql = `select count(*) as count from ${table} where role_id=${roleId}`;
            }else{
                sql = `select count(*) as count from ${table}`;
            }
            // console.log(sql);
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            // console.log("dao",result);
                            resolve(result[0].count);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getUsersByRoleId(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select id,username,email,gender,role_id,create_time from users where role_id =${params.roleId}`;
            // console.log(sql);
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            // console.log("dao",result);
                            resolve(result);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}


// 获取一星期的爬虫数量
function getweekCount(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select * from crawl_details where YEARWEEK(DATE_FORMAT(\`current_date\`,'%Y%m%d')) = YEARWEEK(now())-1`;
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
    getKeywords,
    getCrawlDatails,
    getDatails,
    getCount,
    getUsersByRoleId,
    getweekCount
}