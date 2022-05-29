const { body } = require("express-validator");
const validate = require("./validate");
const userDao = require("../../dao/user");

exports.register = validate([
    // 1. 配置验证规则
    body("user.username")
        .notEmpty().withMessage("用户名不能为空")
        .custom(async (value) => {
            const id = await userDao.findOne({username: value})
            if(id){
                return Promise.reject("用户名已存在");
            }
        }),
    body("user.password")
        .notEmpty().withMessage("密码不能为空")
        .isLength({min:6}).withMessage("密码不能少于六位数"),
    body("user.email")
        .notEmpty().withMessage("邮箱不能为空")
        .custom(async (value) => {
            const id = await userDao.findOne({email:value});
            if(id){
                return Promise.reject("邮箱已存在");
            }
        }),
    body("user.gender")
        .notEmpty().withMessage("性别不能为空")
]);