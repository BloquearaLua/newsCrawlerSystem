const moment = require("moment");
const crawlDao = require("../dao/crawl");
const schedule = require('node-schedule');

// 获取今日新闻关键词，并统计出现的次数
async function getKwdMap(today) {
    const res = await crawlDao.getTodayKwd({today});
    console.log(res);
    const calcObj = {};
    let kwd = null;
    res.forEach((item) => {
        kwd = item.keywords.split(",");
        // console.log(kwd);
        kwd.forEach((item) => {
            if(calcObj[item]){
                calcObj[item] += 1;
            }else{
                calcObj[item] = 1;
            }
        })
    })
    return calcObj;
}

// 获取出现前topN次的关键词
function getTopN(today,obj,topN) {
    const arr = [];
    for(let key in obj){
        arr.push([today,key,obj[key]])
    }
    arr.sort((a,b) => b[2]-a[2]);
    return arr.slice(0,topN);
}

// 获取今日日期（yyyymmdd）
function getToday() {
    const date = new Date();
    return moment(date).format('YYYYMMDD');
}

// 处理爬虫情况的详情
async function handleDetails() {
    const today = getToday();
    // const today = "20220406";
    // 统计出现前20的关键词，并插入数据库
    const obj = await getKwdMap(today);
    const topNkwd = getTopN(today,obj,40);
    console.log(topNkwd);
    crawlDao.insertTodayKwd(topNkwd);

    // 统计今天爬取的新闻条数
    const weiboCount = await crawlDao.getCount({sourceId: 1, date: today});
    const wallstreetCount = await crawlDao.getCount({sourceId: 2,date: today});
    console.log(weiboCount,wallstreetCount);
    crawlDao.insertCount({date: today,wallstreetCount,weiboCount})
}

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0,6)];
rule.hour = 11;
rule.minute = 5;
rule.second = 0;
rule.tz = 'Etc/UTC';
// 定时爬取
function scheduleCrawler() {
    // schedule.scheduleJob(rule,() => {
        handleDetails();
    // });
}

scheduleCrawler();