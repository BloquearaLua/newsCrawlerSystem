const { body } = require("express-validator"); 

const validate = require("./validate");
const userDao = require("../../dao/user");
const md5 = require("../../util/md5");
exports.login = [
    validate([
        body("user.username").notEmpty().withMessage("邮箱不能为空"),
        body("user.password").notEmpty().withMessage("密码不能为空")
                // .isLength({min:6}).withMessage("密码错误")
    ]),
    validate([
        body("user.username").custom(async (username,{req}) =>{
            const user = await userDao.findOne({username});
            // console.log(req.body);
            if(!user ||(req.body.user.roleid !== user.role_id)){
                console.log(user.role_id,req.body.user.roleid);
                return Promise.reject("用户不存在");
            }
            // 将数据挂载到请求对象中
            req.user = user;
        })
    ]),
    validate([
        body("user.password").custom(async (password,{req}) => {
            if(md5(password) !== req.user.password){
                return Promise.reject("密码错误");
            }
        })
    ])
]