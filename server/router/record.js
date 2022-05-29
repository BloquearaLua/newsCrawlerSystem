const express = require('express');

const recordController = require('../controller/record');
const auth = require('../middleware/auth');

const router = express.Router();

// 浏览记录
router.post('/views',auth,recordController.addView);
router.get('/views',auth,recordController.getViews);

// 点赞
router.post('/like',auth,recordController.addLike);
router.get('/like',auth,recordController.getIsLiking);
router.delete('/like',auth,recordController.removeLike);

// 获取我的点赞记录
router.get('/mylikes',auth,recordController.getMyLikes);

module.exports = router;
