const mysql = require("mysql");
const jieba = require("nodejieba");
const { mysqlOptions } = require("../config/config.default");

async function getKwd() {
    const res = await getAllNews();
    // console.log(res);
    const kwdList = [];
    res.forEach((item) => {
        const str = item.title+item.content+item.summary;
        const keywords = getKeywords(str,10);
        kwdList.push([item.id,keywords]);
    })
    console.log(kwdList);
    return kwdList;
}

function getKeywords(string,topN) {
    const str = string.trim();
    let kywStr = "";
    keywordsList = jieba.extract(str,topN);
    const len = keywordsList.length;
    keywordsList.forEach((item,i) => {
        kywStr += item.word;
        if(i !== len-1){
            kywStr += ',';
        }
    })
    return kywStr;
}


async function getAllNews() {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select id,title,content,summary from news`;
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

function updateKwd(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `insert into news(id,keywords) values ? on duplicate key update keywords=values(keywords) `;
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

async function handleKwd() {
    const kwdList = await getKwd();
    updateKwd(kwdList);
}

handleKwd()