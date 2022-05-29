/* 
    默认配置
*/
const mysql = require("mysql")

const mysqlOptions = {
    host: 'localhost',
        user: 'root',
        password: '123456',
        // database: 'news_crawl',
        // database: 'test_crawler',
        database: 'news_crawler',
        port: '3306'
}

const connectPool = mysql.createPool(
    { 
        ...mysqlOptions,
        connectionLimit: 100,
        multipleStatements: true
    })

const conn = mysql.createConnection(mysqlOptions)
module.exports = {
    mysqlOptions,
    connectPool,
    conn,
    secret: "3fd94b15-b709-467a-b9bd-c11fca3e4ad5"
}