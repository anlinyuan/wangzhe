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
    const Answer = mongoose.model('Answer')
    const TestItem = mongoose.model('TestItem')
    const Department = mongoose.model('Department')
    const Question = mongoose.model('Question')
    const Ad = mongoose.model('Ad')
    // const Department = mongoose.model('Department')

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
        // let model={}
        // if(req.Model.modelName==="Question"){
        //     req.body.forEach(async (value) => {
        //         if(value._id){
        //             await req.Model.findByIdAndUpdate(value._id,value)
        //         }else{
        //             model = await req.Model.create(value)
        //         }
        //     });
        // }else{
            
        // }
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
        }else if(req.Model.modelName==="Test"){
            queryOptions.populate = "categories"
        }else if(req.Model.modelName==="Answer"){
            queryOptions.populate = "test_item test"
        }else if(req.Model.modelName==="Recruit"){
            queryOptions.populate = "department"
        }else if(req.Model.modelName==="Vitae"){
            queryOptions.populate = "user"
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //获取特定资源
    router.get('/:id',async(req,res)=>{
        let queryOptions={}
        if(req.Model.modelName==="Test"){
            queryOptions.populate = "ture_or_false.id single_choice.id multiple_choice.id subjective.id"
        }else if(req.Model.modelName==="TestItem"){
            queryOptions.populate = [{
                path:"test",
                populate:{
                    path:"ture_or_false.id single_choice.id multiple_choice.id subjective.id"
                }
            },{
                path:"recruit"
            }
                // "test recruit"
            ]
        }
        else if(req.Model.modelName==="Answer"){
            queryOptions.populate = {
                path:"test",
                populate:{
                    path:"ture_or_false.id single_choice.id multiple_choice.id subjective.id"
                }
            }
            
        }
        const model = await req.Model.findById(req.params.id).setOptions(queryOptions)
        res.send(model)
    })
    //修改试卷的题目
    app.put('/admin/api/questions/test',authMiddleware(),async(req,res)=>{
        let model = [],a={},b={};
        for(let i=0;i<req.body.length;i++){
            if(req.body[i]._id){
                b=await Question.findByIdAndUpdate(req.body[i]._id,req.body[i])
                model.push(b)
            }else{
                a = await Question.create(req.body[i])
                model.push(a)
            }
        }
        // const a = await Question.create(req.body[0])
        // model.push(a)
        res.send(model)
    })
    //首页获取部门以及岗位
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
    //轮播图
    app.get('/admin/api/ads/list',async(req,res)=>{
        const cats = await Ad.find()
        res.send(cats)
      })
    //岗位id获取人
    app.get('/admin/api/recruit_item/:id',authMiddleware(), async(req,res)=>{
        let model = await Vitae.find({"recruits":req.params.id})
        let a = await TestItem.find({recruit:req.params.id},{_id:1,name:1,time:1})
        let b=[]
        for(let i=0;i<model.length;i++){
            b.push({})
            b[i].name = model[i].name;
            b[i].vitae = model[i]._id;
            b[i].user_id = model[i].user;
            b[i].test_answer = await Answer.findOne({"user":model[i].user,"test_item":a._id},{pass:1,score:1,_id:1})
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
        let queryOptions={}
        queryOptions.populate={
            path:"recruits",
            populate:{
                path:"department",
                select:"name"
            }
        }
        
        let model = await Vitae.findOne({"user":req.params.id},{id:1,recruits:1}).setOptions(queryOptions).lean()
        if(model.recruits){
            for(let i=0;i<model.recruits.length;i++){
                if(model.recruits[i].test){
                    model.recruits[i].test = await TestItem.findById(model.recruits[i].test,{name:1,time:1,id:1})
                    model.recruits[i].answer = await Answer.findOne({"user":req.params.id,"test_item":model.recruits[i].test._id},{_id:1,pass:1,score:1})
                }
                else{
                    model.recruits[i].test=""
                }
            }
        }
        res.send(model)
    })


    //分页获取题目，试卷
    //获取题目，试卷的条数
    app.post('/admin/api/:resource/num',authMiddleware(), resourceMiddleware(),async(req,res)=>{
        let findOption={};
        num = req.body.num;
        if(req.Model.modelName==="Test" && req.body.admin==0){
            findOption.public = req.body.admin
        }
        if(req.body.category_id){
            findOption.categories = req.body.category_id
        }
        let model = await req.Model.find(findOption).count()
        res.send(model)
    })
    //通过分类id获取题目，试卷
    app.post('/admin/api/:resource',authMiddleware(), resourceMiddleware(),async(req,res)=>{
        let findOption={},num,page,flag=1;
        num = req.body.num;
        if(req.Model.modelName==="Test" && req.body.admin==0){
            findOption.public = req.body.admin
        }
        if(req.body.category_id){
            findOption.categories = req.body.category_id
        }
        if(req.body.last_id){
            if(req.body.to>req.body.from){
                page = req.body.to-req.body.from-1
                findOption._id = {"$gt": req.body.last_id}
            }else{
                page = req.body.from - req.body.to-1
                flag = -1
                findOption._id = {"$lt": req.body.last_id}
            }
        }
        let model = await req.Model.find(findOption).sort({"_id":flag}).skip(page*num).populate({
            path: 'categories',
            select:"name _id",
            // populate: { path: 'parent', select:"name"}
          }).limit(num)
        res.send(model)
    })


    //通过关键词搜索题目或试卷
    app.get('/admin/api/search/:resource/:keyword',authMiddleware(), resourceMiddleware(),async(req,res)=>{
        const keyword = req.params.keyword
        const reg = new RegExp(keyword, 'i') //不区分大小写
        const model = await req.Model.find(
            {name:{$regex : reg}})
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
    //注册
    app.post('/admin/api/register',async(req,res)=>{
        // const {username,password}=req.body;
        const user = await AdminUser.findOne({
            username : req.body.username
        })
        assert(!user,422,"用户名已存在")
        const model = await AdminUser.create(req.body)
        res.send(model)
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
        assert(isValid,422,"密码错误")

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