const recordDao = require('../dao/record');


// 获取浏览记录
async function getViews(req,res,next) {
    try {
        const { page, pagesize:pageSize } = req.query;
        // console.log(req.user);
        // console.log(req.query,page,pageSize);
        const userId = req.user[0].id;
        const result =await recordDao.getRecords({
            table: 'views',
            userId,
            page,
            pageSize
        });
        const count = await recordDao.getCount({
            table: 'views',
            userId
        });
        // console.log("??",result);
        res.status(200).json({
            data:result,
            count
        });
    } catch (error) {
        next(error);
    }
}

// 增加浏览记录
async function addView(req,res,next) {
    try {
        const { newsId } = req.body;
        // console.log(req.body,req.user);
        const userId = req.user[0].id;
        await recordDao.insertRecord({
            table: 'views',
            userId,
            newsId
        });
        res.status(201).json({
            userId,
            newsId
        })
    } catch (error) {
        next(error);
    }
}

// 获取点赞数
async function getIsLiking(req,res,next) {
    try {
        const { newsid:newsId } = req.query;
        const userId = req.user[0].id;
        console.log("???",req.user);
        const flag = await recordDao.getIfRecord(
            {
                table: 'likes',
                userId,
                newsId,
            });
        res.status(200).json({
            isLiking: flag
        });
    } catch (error) {
        next(error)
    }
}

// 增加点赞数
async function addLike(req,res,next) {
    try {
        const { newsId } = req.body;
        // console.log(req.body);
        const userId = req.user[0].id;
        await recordDao.insertRecord({
            table: 'likes',
            userId,
            newsId
        });
        res.status(201).json({
            userId,
            newsId
        })
    } catch (error) {
        next(error);
    }
}

// 移除点赞数
async function removeLike(req,res,next) {
    try {
        const { newsId } = req.body;
        const userId = req.user[0].id;
        console.log("body",req.body);
        await recordDao.deleteRecord({
            table:'likes',
            newsId,
            userId
        });
        // console.log(result);
        res.status(201).json({
            userId,
            newsId
        })
    } catch (error) {
        next(error);
    }
}

// 获取我的点赞记录
async function getMyLikes(req,res,next) {
    try {
        const { page, pagesize:pageSize } = req.query;
        const userId = req.user[0].id;
        const result = await recordDao.getRecords({
            table: 'likes',
            userId,
            page,
            pageSize
        });
        const count = await recordDao.getCount({
            table:'likes',
            userId
        });
        res.status(200).json({
            data:result,
            count   
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getViews,
    addView,
    getIsLiking,
    addLike,
    removeLike,
    getMyLikes
}