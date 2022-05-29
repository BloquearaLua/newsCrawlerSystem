const { verify } = require('../util/jwt');
const { secret } = require('../config/config.default');
const userDao = require('../dao/user');

module.exports = async (req,res,next) => {
    // 从请求头获取token数据
    let token = req.headers.authorization;
    // console.log(token);
    // 验证是否存在
    token = token ? token : null;
    if(!token){
        return res.status(401).json({
            'msg': "没携带token！"
        });
    }
    try{
        // 验证是否有效
        const decodeToken = await verify(token,secret);
        // 如果有效，就将用户信息挂载到请求对象上
        req.user = await userDao.getUserById(decodeToken.userId);
        next();
    }catch(error){
        return res.status(401).json({
            'msg': 'token过期了'
        });
    }
}