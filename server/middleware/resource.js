//写成函数返回，可扩展性
//自动获取模型中间件
//resourceMiddleware 中间件，取出来的名称用inflection转为模型的名称
//inflection  npm install inflection
module.exports = options =>{


    return async (req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        //请求对象上挂载属性model
        req.Model = require(`../models/${modelName}`)
        next()
    }
}