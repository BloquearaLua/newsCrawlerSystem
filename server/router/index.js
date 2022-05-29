const express = require("express");

const router = express.Router();

// 前台路由
// 用户相关路由
router.use(require('./user'));

// 新闻相关路由
router.use('/news',require('./news'));

// 记录相关路由
router.use('/record',require('./record'));

// 后台路由
router.use('/backstage',require("./backstage"))

module.exports = router;