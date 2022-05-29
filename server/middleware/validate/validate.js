const { validationResult } = require("express-validator");

//  暴露一个函数，函数接收验证规则，返回一个函数
module.exports = (validations) => {
    return async (req,res,next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        let errorsObj = {};
        errors.array().forEach(item => {
            if(!errorsObj[item.param.slice(5)]){
                errorsObj[item.param.slice(5)] = item.msg;
            }else{
                errorsObj[item.param.slice(5)] = errorsObj[item.param.slice(5)] + item.msg;
            }
        })
        res.status(400).json({
            errors: errorsObj
        })
    }
}