const mysql = require('mysql')
const { mysqlOptions } = require('../config/config.default')

function get(params) {
    return new Promise((resolve,reject) => {
        try {
        const conn = mysql.createConnection(mysqlOptions);
        conn.connect((err) => {
            if(err){
                reject("连接失败",err);
            }else{
                    conn.query(params.sql,(err,result,fields) => {
                        if(err){
                            reject("查询失败",err);
                        }else{
                            resolve(result);
                        }
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    get
}