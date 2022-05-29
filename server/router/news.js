const express = require('express');

const newsController = require('../controller/news');
const auth = require('../middleware/auth');

const router = express.Router();

// 获取新闻
router.get('/', newsController.getNews);

// 关键词查询新闻
// router.get('/:keyword', newsController.getSearchNews);

// 根据id获取新闻
router.get('/id=:id', newsController.getANews);

// 根据分类查询
router.get('/search',newsController.searchNews)

router.get('/analysis', newsController.analysisData)

module.exports = router;
