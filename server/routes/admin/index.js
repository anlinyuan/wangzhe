module.exports = app =>{
    const express = require('express')
    //npm i jsonwebtoken
    const jwt  = require('jsonwebtoken')
    //npm i http-assert 错误处理
    const assert = require('http-assert')

    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        //合并参数，里面也能访问到
        mergeParams:true
    })

    //封装登陆校验中间件 返回函数，使用要加()，authMiddleware()
    const authMiddleware = require('../../middleware/auth')
    //resourceMiddleware 中间件，取出来的名称用inflection转为模型的名称
    //inflection  npm install inflection
    const resourceMiddleware = require('../../middleware/resource')

    //通用接口
    //auth判断用户是否登陆
    //resourceMiddleware 中间件，取出来的名称用inflection转为模型的名称
    //inflection  npm install inflection
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)

    //创建资源
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //删除资源
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({success:true})
    })

    //修改资源
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    //获取资源
    //分类列表 实现可扩展性，不是每一个都要查parent
    //判断是否登陆的中间件
    router.get('/',async(req,res)=>{
        let queryOptions={}
        //modelName N大写
        if(req.Model.modelName==="Category"){
            queryOptions.populate = "parent"
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //获取特定资源
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
   
    //上传数据
    const multer = require('multer')
    //dirname绝对地址
    const upload = multer({dest:__dirname+'/../../uploads'})
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'), async(req,res)=>{
        const file = req.file
        file.url = `http://test.alinyuan.com/uploads/${file.filename}`
        res.send(file)
    })

    //登陆接口
    app.post('/admin/api/login',async(req,res)=>{
        // res.send('ok');
        const {username,password}=req.body;
        //找用户，校验密码，返回token
        //之前设定密码取不到，加select取密码
        
        const user = await AdminUser.findOne({
            username : username
        }).select('+password')
        //普通写法
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        //http-assert
        assert(user,422,"用户不存在")
        //校验密码，比较明文与密文是否匹配,返回布尔
        const isValid = require('bcrypt').compareSync(password,user.password)
        // if(!isValid){
        //     return res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        assert(user,422,"密码错误")

        //返回token jwt
        
        //app.get()一个变量获取参数，多个发起请求
        const token = jwt.sign({id:user._id},app.get('secret'))
        return res.send({token})
    })

    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
          message: err.message
        })
      })
}