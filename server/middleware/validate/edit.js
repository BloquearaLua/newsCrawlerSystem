const { body } = require("express-validator"); 

const validate = require("./validate");
const userDao = require("../../dao/user");
exports.edit = [
    validate([
        body("user.username").notEmpty().withMessage("用户名不能为空"),
        body("user.email").notEmpty().withMessage("邮箱不能为空")
    ]),
    validate([
        body("user.username").custom(async (username,{req}) =>{
            console.log(req.user);
            const id = req.user[0].id;
            const isUsername = await userDao.findOne({ username, id });
            // console.log(user);
            if(isUsername){
                return Promise.reject("用户名已存在");
            }
        })
    ]),
    validate([
        body("user.email").custom(async (email,{req}) => {
            const id = req.user[0].id;
            const isEmail = await userDao.findOne({ email,id });
            if(isEmail){
                return Promise.reject('邮箱已存在')
            }
        })
    ])
]