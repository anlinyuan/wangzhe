module.exports = app =>{
    const express = require('express')
    //npm i jsonwebtoken
    const jwt  = require('jsonwebtoken')
    //npm i http-assert 错误处理
    const assert = require('http-assert')

    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const Vitae = mongoose.model('Vitae')
    const Recruit = mongoose.model('Recruit')
    const TestAnswer = mongoose.model('TestAnswer')
    const TestItem = mongoose.model('TestItem')
    const Department = mongoose.model('Department')

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
        let model = await req.Model.findById(req.params.id)
        if(req.Model.modelName==="Test"){
            // model.questions[0]=1
            let questionList = model.questions;
            for(let i=0;i<questionList.length;i++){
                model.questions[i] = await mongoose.model('Question').findById(questionList[i]);
                // model.data.questions[i] = 1;
            }
        }
        
        res.send(model)
    })

    app.get('/admin/api/departments',async (req,res)=>{
        const data = await Department.aggregate([
          {
              //左外链接
              $lookup:{
                  //名字默认是模型名字的小写加复数，（模型第三个参数可以设定）
                  from:'recruits',
                  //本地键
                  localField:'_id',
                  //外键
                  foreignField:'department',
                  as:'recruitList'
              }
          },
        ])
        res.send(data)
      })



    //岗位id获取人
    app.get('/admin/api/recruit_item/:id',authMiddleware(), async(req,res)=>{
        let model = await Vitae.find({"recruits":req.params.id})
        let a = await TestItem.find({recruit:req.params.id})
        let b=[]
        for(let i=0;i<model.length;i++){
            b.push({})
            b[i].name = model[i].name;
            b[i].vitae = model[i]._id;
            b[i].user_id = model[i].user;
            b[i].tset_answer = await TestAnswer.find({"user":model[i].user,"test_item":a._id},{_id:1,pass:1,score:1})
            b[i].test_item = a
        }
       
        res.send(b)
    })
    //通过用户id获取简历
    app.get('/admin/api/vitae/:id',authMiddleware(), async(req,res)=>{
        let model = await Vitae.findOne({"user":req.params.id})
        res.send(model)
    })
    //通过用户id获取进度
    app.get('/admin/api/schedule/:id',authMiddleware(), async(req,res)=>{
        let model = await Vitae.findOne({"user":req.params.id})
        if(model){
            let recruitsList = model.recruits;
            for(let i=0;i<recruitsList.length;i++){
                let list = await Recruit.findOne({_id:recruitsList[i]}).populate("test").lean()
                // let list = await Recruit.aggregate([
                //     //match条件（while）
                //     {$match:{_id:recruitsList[i]}},
                //     {
                //         //左外链接
                //         $lookup:{
                //             //名字默认是模型名字的小写加复数，（模型第三个参数可以设定）
                //             from:'testitems',
                //             //本地键
                //             localField:'test',
                //             //外键
                //             foreignField:'_id',
                //             as:'test_item'
                //         }
                //     },
                //   ])
                // await Recruit.findById(recruitsList[i])
                list.answer = await TestAnswer.findOne({"user":req.params.id,"test_item":list.test},{_id:1,pass:1,score:1})
                model.recruits[i] = list
                // model.recruits[i] = await Recruit.findById(recruitsList[i])
            }
        }
        res.send(model)
    })


    //上传数据
    const multer = require('multer')
    const MAO = require('multer-aliyun-oss');
    //dirname绝对地址
    const upload = multer({ 
        // dest:__dirname+'/../../uploads'
        storage:MAO({
            config:{
                region:"oss-cn-shenzhen",
                accessKeyId:"LTAI4GGTwB9nFWsyQMer1vYb",
                accessKeySecret:"TNA7rUOUmhzE0HNLGcU9fgrkh0tiL0",
                bucket:"wangzhe-ly"
            }
        })
    })
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'), async(req,res)=>{
        const file = req.file
        // file.url = `http://test.alinyuan.com/uploads/${file.filename}`
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
        const isValid = require('bcryptjs').compareSync(password,user.password)
        // if(!isValid){
        //     return res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        assert(user,422,"密码错误")

        //返回token jwt
        
        //app.get()一个变量获取参数，多个发起请求
        const token = jwt.sign({id:user._id},app.get('secret'))
        return res.send({
            "token":token,
            "username":user.username,
            "user_id":user._id,
            "admin":user.admin
        })
    })

    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
          message: err.message
        })
      })
}