//写成函数返回，可扩展性
module.exports = options =>{
    const jwt  = require('jsonwebtoken')
    //npm i http-assert 错误处理
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    return async (req,res,next)=>{
        //判断用户是否登陆中间件
        
        //获取token
        const token = String(req.headers.authorization || '').split(' ').pop();
        // assert(token,401,"请提供jwt token")
        assert(token,401,"请先登陆token")
        //解密token
        //不能直接app.get 中间件获取不到，要req.app.get
        const {id} = jwt.verify(token,req.app.get('secret'))
        // assert(token,401,"无效的jwt token")
        assert(token,401,"请先登陆jew")
        //验证id, 挂载到req上，让后续可以使用
        req.user = await AdminUser.findById(id)

        assert(req.user,401,"请先登陆")
        await next();
    }
}