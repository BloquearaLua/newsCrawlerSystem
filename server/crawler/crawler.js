const axios = require('axios');
const jieba = require("nodejieba");
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const schedule = require('node-schedule');

const { insertNews } = require('./query');
const myAxios = require('../util/https');

// 获取网页内容
function getHtml(url,encode) {
    return new Promise((resolve,reject) => {
        // 请求
        myAxios.get(url).then(response => {
            // console.log(response);
            if(response.data){
                // 将获取的html转码为utf8
                const bufs = iconv.decode(Buffer.from(response.data),encode);
                const html = bufs.toString('utf8');
                resolve(html);
            }
        }).catch(error => {
            console.log("页面获取出错：",url,error.message);
        })
    })  
}

// 模拟点击新闻，type为链接区域
async function handleWeiboNews(url,reg) {
    const html = await getHtml(url,'utf8');
    const $ = cheerio.load(html); 
    
    $('a').each(async (i,item)=>{
        try {
            const href = $(item).attr('href');
            if(reg.test(href)){
                const details = await getWeiboDetails(href);
                if(details){
                    try {
                        insertNews(details);    
                    } catch (error) {
                        console.log("数据插入的过程中出错了",error);   
                    }
                }
                
            }
        } catch (error) {
            console.log("遍历出错",error);
        }
    })
}

// 获取新浪新闻的信息
async function getWeiboDetails(url) {
    const html = await getHtml(url,'utf8');
    const $ = cheerio.load(html);

    // 处理新闻内容
    let content = '';
    const articleLen = $('#article').length;
    const contSelector = articleLen ? '#article' : '#artibody';
    content = $(contSelector).text();
    if(!content){   // 页面不存在
        return '';
    }

    const title = $('head > title').text().trim();
    const summary = $('meta[name=description]').attr('content');
    // const keywords = getKeywords(title+summary+content,10);
    
    const details = {
        author: $('meta[property=article:author]').attr('content'),
        publish_date: $('meta[property=article:published_time]').attr('content'),
        source: $('meta[name=mediaid]').attr('content'),
        encoding: $('meta').attr('charset') ? $('meta').attr('charset')  : 'utf8',
        news_source: 1,
        crawler_date: new Date(),
        title,
        summary,
        // keywords,
        url,
        content,
    }
    return details;
}

// 获取华尔街新闻的信息
async function getWallStreetDetails(url,reg) {
    axios.get(url).then(res => {
        const { items } = res.data.data;
        items.map(async(item,i) => {
            try {
                const { source_name,uri:url } = item.resource;
            
                if(reg.test(url)){
                    // 内容处理
                    const html = await getHtml(url,"utf8");
                    const $ = cheerio.load(html);

                    const title = $('title').text();
                    const content = $('.rich-text').text();
                    const summary = $('meta[name=description]').attr('content');
                    const keywords = getKeywords(title+content+summary,10);

                    const details = {
                        author: $('meta[name=author]').attr('content'),
                        publish_date: $('meta[property=article:published_time]').attr('content'),
                        encoding: $('head > meta:nth-child(2)').attr('charset'),
                        source: source_name,
                        news_source: 2,
                        crawler_date: new Date(),
                        title,
                        summary,
                        content,
                        keywords,
                        url,
                    }
                    insertNews(details);
                }
            } catch (error) {
                console.log(error);
            }
        })
    })
}

// 分词
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

// 定时爬取
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0,6)];
rule.hour = [1,11];
// rule.hour = 14;
rule.minute = [0];
// rule.hour = [8,9];
// rule.minute = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
rule.second = [0];
rule.tz = 'Etc/UTC';
function scheduleCrawler(fn,url,reg) {
    // schedule.scheduleJob(rule,() => {
        fn(url,reg);
    // });
}

// 新浪新闻相关
const weibo_url = 'https://news.sina.com.cn/';
const weibo_reg = /\/(\d{4})-(\d{2})-(\d{2})\/doc-(\w{8})(\d{7}).shtml/i;
scheduleCrawler(handleWeiboNews,weibo_url,weibo_reg);

const wallstreet_url = 'https://api-one.wallstcn.com/apiv1/content/information-flow?accept=article%2Ctopic%2Clive%2Cad%2Cchart&limit=300&action=upglide';
const wallstreet_reg = /https:\/\/wallstreetcn.com\/articles\/(\d{7})/;
scheduleCrawler(getWallStreetDetails,wallstreet_url,wallstreet_reg);
