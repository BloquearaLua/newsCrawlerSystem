const express = require("express");

const userController = require('../controller/user');
const userValidator = require("../middleware/validate/user");
const loginValidator = require("../middleware/validate/login");
const editValidator = require('../middleware/validate/edit');
const auth = require("../middleware/auth");

const router = express.Router();

// 用户登录
router.post('/users/login', loginValidator.login, userController.login);

// 用户注册
router.post('/users', userValidator.register, userController.register);

// 获取用户
router.get('/user', auth, userController.getUser);

// 更新用户
router.post('/user', auth, editValidator.edit, userController.updateUser);

// 删除用户
router.delete('/user',userController.deleteUser);

module.exports = router;