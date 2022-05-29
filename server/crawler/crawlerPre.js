const iconv = require('iconv-lite')
const moment = require('moment')
const cheerio = require('cheerio')
// const throttledQueue = require('throttled-queue')
const Async = require('async')

const myAxios = require('../util/https')
const { insertNews } = require('./query')

// const throttled = throttledQueue(10,1000)

// 获取网页内容
function getHtml(url,encode) {
    return new Promise((resolve,reject) => {
        // 请求
        myAxios.get(url).then(response => {
            if(response.data){
                // 将获取的html转码为utf8
                const bufs = iconv.decode(Buffer.from(response.data),encode);
                const html = bufs.toString('utf8');
                resolve(html);
            }
        }).catch(error => {
            console.log("页面获取出错：", url, error.message);
        })
    })  
}

// 获取日期集合
function handleDate(startDate, limit) {
    const dateList = []
    let i = 0
    while (i < limit) {
        dateList.push(startDate)
        startDate = moment(startDate).subtract(1,'days').format('YYYYMMDD')
        i++
    }
    return dateList.reverse()
}

// 获取近90日的开始链接集合
function handleUrls(dataList) {
    const urlList = []
    dataList.forEach(item => {
        urlList.push(
            { 
                url: `https://news.sina.com.cn/head/news${item}am.shtml`, 
                date: moment(item).format('YYYY-MM-DD 09:00')
            })
        urlList.push(
            {
                url: `https://news.sina.com.cn/head/news${item}pm.shtml`,
                date: moment(item).format('YYYY-MM-DD 21:00')
            })
    })
    return urlList
}

async function handleWeiboNews(date, regex) {
    const url = `https://news.sina.com.cn/head/news${date}pm.shtml`
    const html = await getHtml(url, 'utf8')
    const $ = cheerio.load(html)
    
    $('a').each(async (i,item)=>{
        try {
            const href = $(item).attr('href')
            // 筛选出满足regex的url
            if(regex.test(href)){
                // 获取链接详情
                const details = await getWeiboDetails(href, date)
                if(details){
                    insertNews(details)  
                }
            }
        } catch (error) {
            console.log("遍历出错",error)
        }
    })
}

// 获取新浪新闻的信息
async function getWeiboDetails(url, date) {
    const html = await getHtml(url,'utf8')
    const $ = cheerio.load(html)

    // 处理新闻内容
    let content = ''
    const articleLen = $('#article').length
    const contSelector = articleLen ? '#article' : '#artibody'
    content = $(contSelector).text().replace(/\t|\n/g,'')
    if(!content){   // 页面不存在
        return '';
    }

    const title = $('head > title').text().trim()
    const summary = $('meta[name=description]').attr('content')
    // const keywords = getKeywords(title+summary+content,10);
    
    const details = {
        author: $('meta[property=article:author]').attr('content'),
        publish_date: $('meta[property=article:published_time]').attr('content'),
        source: $('meta[name=mediaid]').attr('content'),
        encoding: $('meta').attr('charset') ? $('meta').attr('charset')  : 'utf8',
        news_source: 1,
        crawler_date: date,
        title,
        summary,
        // keywords,
        url,
        content,
    }
    return details
}

async function main() {
    // 开始日期为昨天，往前递回90天
    // const startDate = moment(new Date()).subtract(1,'days').format('YYYYMMDD')
    // // console.log(startDate);
    // const limit = 90
    // const dateList = handleDate(startDate, limit)  // 近90天的新浪新闻链接
    // const startUrls = handleUrls(dateList)   // 处理开始url
    const weiboReg = /\/(\d{4})-(\d{2})-(\d{2})\/doc-(\w{8})(\d{7}).shtml/i;
    // startUrls.map(async(item) => {
    //     await handleWeiboNews({
    //         url: item.url,
    //         crawlDate: item.date
    //     }, weiboReg)
    // })
    const date = '20220501'
    handleWeiboNews(date, weiboReg)
}

main()

  