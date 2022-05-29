const backstageDao = require("../dao/backstage");


async function wordcloud(req,res,next) {
    try {
        // 日期
        const { date } = req.query;
        const result = await backstageDao.getKeywords({date});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function crawlDetails(req,res,next) {
    try {
        // 日期
        const last = await backstageDao.getDatails({detaDay: 1});
        const prev = await backstageDao.getDatails({detaDay: 2});
        const userCount = await backstageDao.getCount({table: 'users'});
        const wallCount = await backstageDao.getCount({table:"news",sourceId:2})
        const weiboCount = await backstageDao.getCount({table:"news",sourceId:1})
        const viewsCount = await backstageDao.getCount({table: "views"});
        const likesCount = await backstageDao.getCount({table: "likes"});
        console.log("last:",last,prev);
        // console.log("prev:",prev);
        console.log(userCount,wallCount,weiboCount,viewsCount,likesCount);
        res.status(200).json({
            last: last[0],
            prev: prev[0],
            userCount,
            weiboCount,
            wallCount,
            viewsCount,
            likesCount
        });
    } catch (error) {
        next(error);
    }
}

async function weekCount(req,res,next) {
    try {
        const result = await backstageDao.getweekCount();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
async function getUsers(req,res,next) {
    try {
        const { roleId } = req.params;
        const result = await backstageDao.getUsersByRoleId({roleId});
        const count = await backstageDao.getCount({
            table: "users",
            roleId
        });
        res.status(200).json({
            data: result,
            count
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    wordcloud,
    crawlDetails,
    getUsers,
    weekCount
}