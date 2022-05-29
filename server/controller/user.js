const userDao = require('../dao/user');
const md5 = require("../util/md5");
const jwt = require("../util/jwt");
const { secret } = require("../config/config.default")

// 登录
async function login(req,res,next) {
    try {
        // 处理请求
        // 将获取到的对象转为json对象
        // console.log();
        // const user = JSON.stringify(req.user);
        const { user } = req;
        const token = await jwt.sign(
            {
                userId: user.id
            },
            secret,
            {
                expiresIn: 60*60*24*2
            }
        );
        // 删除密码
        delete user.password;
        // 响应
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error);
    }
}

// 注册
async function register(req,res,next) {
    try {
        // 1. 获取请求体数据
        const { user } = req.body;
        // console.log(data.user);

        // 2. 数据验证(都交给validate中间件处理)
        // 2.1 基本数据验证（类型判断）
        // 2.2 业务数据验证（跟数据库相关）
        
        // 3. 验证通过，插入数据库
        // 将密码加密处理
        const password = md5(user.password);
        // console.log(pwd);
        console.log("user//",user);
        await userDao.insertUser({
            ...user,
            password
        });
        const newUser = await userDao.findOne({username: user.username});
        delete newUser.password;
        // 4. 发送成功响应信息
        delete user.password;
        res.status(201).json(newUser)
    } catch (error) {
        next(error);
    }
}

// 获取用户
async function getUser(req,res,next) {
    try {
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        next(error);
    }
}

// 更新用户
async function updateUser(req,res,next) {
    try {
        const { user } = req.body;
        console.log(user,req.user);
        await userDao.updateUser({
            ...user,
            id: req.user[0].id,
        });
        res.status(200).json({
            msg: "更新成功"
        });
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req,res,next) {
    try {
        const { userid:userId } = req.body;
        console.log(userId);
        await userDao.deleteUser({
            id: userId
        });
        res.status(200).json({
            msg: "删除成功"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    register,
    getUser,
    updateUser,
    deleteUser
}