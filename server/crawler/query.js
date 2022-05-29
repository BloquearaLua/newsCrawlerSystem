const mysql = require('mysql');

const { mysqlOptions } = require('../config/config.default');
const conn = mysql.createConnection(mysqlOptions);

function insertNews(params) {
    return new Promise((resolve,reject) => {
        try {
            const sql = 'insert ignore into news(title,author,publish_date,source,url,crawler_date,encoding,content,summary,news_source) values (?,?,?,?,?,?,?,?,?,?)';
            // console.log(params);
            const insert_params = [params.title, params.author, params.publish_date, params.source, params.url, params.crawler_date, params.encoding, params.content,params.summary,params.news_source];
            conn.query(sql, insert_params, function (err,vals,fields) {
                try {
                    console.log("成功:",params.url);
                    resolve(vals);
                } catch (error) {
                    reject(err);
                }
            })
        } catch (error) {
            console.log("出错了：",error);
            reject(error);
        }
    })
}

module.exports = {
    insertNews
}