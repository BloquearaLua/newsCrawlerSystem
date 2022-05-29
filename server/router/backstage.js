const express = require('express');

const backstageController = require('../controller/backstage');

const router = express.Router();


// 获取词云数据
router.get('/wordcloud',backstageController.wordcloud);

// 获取爬虫信息、用户、新闻总数量
router.get('/details',backstageController.crawlDetails);

// 获取一周的数量
router.get("/details/week",backstageController.weekCount)

// 获取管理员用户/普通用户
router.get('/users/roleId=:roleId',backstageController.getUsers);



module.exports = router;
