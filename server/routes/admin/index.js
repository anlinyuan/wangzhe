module.exports = app =>{
    const express = require('express')
    //npm i jsonwebtoken
    const jwt  = require('jsonwebtoken')
    //npm i http-assert 错误处理
    const assert = require('http-assert')
    const nodemailer  = require("nodemailer");
    const moment = require('moment');

    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const Vitae = mongoose.model('Vitae')
    const Recruit = mongoose.model('Recruit')
    const Answer = mongoose.model('Answer')
    const TestItem = mongoose.model('TestItem')
    const Test = mongoose.model('Test')
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

    app.get('/admin/api/tests/test/:id',async(req,res)=>{
        let queryOptions={}
        queryOptions.populate = "ture_or_false.id single_choice.id multiple_choice.id subjective.id"
        const model = await Test.findById(req.params.id).setOptions(queryOptions)
        res.send(model)
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
            }]
        }
        else if(req.Model.modelName==="Answer"){
            queryOptions.populate = {
                path:"test",
                populate:{
                    path:"ture_or_false.id single_choice.id multiple_choice.id subjective.id"
                }
            }
        }else if(req.Model.modelName==="Vitae"){
            queryOptions.populate="recruits"
        }
        const model = await req.Model.findById(req.params.id).setOptions(queryOptions)
        res.send(model)
    })
    //修改试卷的题目
    app.put('/admin/api/questions/test',authMiddleware(),async(req,res)=>{
        let model = [],a={},b={};
        for(let i=0;i<req.body.length;i++){
            if(Array.prototype.isPrototypeOf(req.body[i].right)){
                req.body[i].right = req.body[i].right.join(",")
            }
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
        let a = await Recruit.findOne({"_id":req.params.id},{_id:1,name:1,time:1}).populate({
            path: 'test',
            // select:"name _id",
            // populate: { path: 'parent', select:"name"}
          })
        let b=[]
        for(let i=0;i<model.length;i++){
            b.push({})
            b[i].name = model[i].name;
            b[i].vitae = model[i]._id;
            b[i].user_id = model[i].user;
            b[i].test_answer = await Answer.findOne({"user":model[i].user,"test_item":a.test._id},{pass:1,score:1,_id:1,accept:1})
            b[i].test_item = a.test
        }
        // let c = await Answer.find({"test_item":"60438f983100f0798a5d6e27"},{pass:1,score:1,_id:1})
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
    app.post('/admin/api/search/:resource',authMiddleware(), resourceMiddleware(),async(req,res)=>{
        let findOption={},num,page,flag=1;
        num = req.body.num;
        if(req.body.keyword){
            const keyword = req.body.keyword
            const reg = new RegExp(keyword, 'i')
            findOption.name={$regex : reg}
        }
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
                // page = req.body.from - req.body.to-1
                // flag = -1
                page = 0
                findOption._id = {"$lt": req.body.last_id}
            }
        }
        // let model = await req.Model.find(findOption).sort({"_id":flag}).skip(page*num).populate({
        //     path: 'categories',
        //     select:"name _id",
        //     // populate: { path: 'parent', select:"name"}
        //   }).limit(num)
        let model = await req.Model.find(findOption).sort({"_id":flag}).populate({
                path: 'categories',
                select:"name _id",
                // populate: { path: 'parent', select:"name"}
              }).limit(num)
        res.send(model)
    })


    //发送考试邮件
    app.post('/admin/api/email',authMiddleware(),async(req,res)=>{
        let email="",model,name="同学",recruit,test_name,
        start_time=new Date(),
        end_time=new Date()
        if(req.body.vitae_id){
            model = await Vitae.findById(req.body.vitae_id)
            email = model.email
            name = model.name
        }else{
            model = await Vitae.find({"recruits":req.body.recruit_id})
            email = model[0].email
            // email+=","
            // email+=model[1].email
            for(let i=1;i<model.length;i++){
                email +=  "," + model[i].email
            }
        }
        let recruit_data = await Recruit.findById(req.body.recruit_id).populate({
            path: 'test',
            select:"name time",
          })
        recruit = recruit_data.name
        test_name = recruit_data.test.name
        start_time = moment(recruit_data.test.time[0]).format('YYYY-MM-DD HH:mm:ss');
        end_time = moment(recruit_data.test.time[1]).format('YYYY-MM-DD HH:mm:ss');
        assert(email,422,"邮箱为空")        
        let transporter = nodemailer.createTransport({
            host:"smtp.gdufs.edu.cn",
            port:25,
            secure:false,
            auth:{
                user:"20171003243@gdufs.edu.cn",
                pass:"691029538ada"
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        let test_mail=`<h2>亲爱的${name}</h2>`
        +`<p>感谢投递数据挖掘实验室${recruit}岗位，现邀请你参加在线笔试，笔试结果将作为进入面试的重要筛选条件。</p>`
        +`<p>笔试名称：${test_name}</p>`
        +`<p>考试时间：（北京时间）${start_time}————${end_time}</p>`
        +`<p>详细信息请前往招聘网页的个人信息中查看</p>`
        +`<p>如有疑问可咨询 20171003254@gdufs.edu.cn 黄同学</p>`
        +`<p>祝你考试顺利！:-D</p>`
        
        let info = await transporter.sendMail({
            from:'"数据挖掘实验室招新组" <20171003243@gdufs.edu.cn>',
            to:email,
            subject:"数据挖掘实验室笔试通知",
            text:"内容",
            html:test_mail
        })
        res.send(info)
    })
    //发送结果邮件
    app.post('/admin/api/email/pass',authMiddleware(),async(req,res)=>{
        let email="",name="同学",recruit,test_name,department,
        start_time=new Date(),
        end_time=new Date()
        
        let model = await Vitae.findById(req.body.vitae_id)
        email = model.email
        name = model.name
        
        let recruit_data = await Recruit.findById(req.body.recruit_id).populate({
              path:"department",
              select:"name"
          })
        recruit = recruit_data.name
        // test_name = recruit_data.test.name
        department = recruit_data.department.name
        // start_time = moment(recruit_data.test.time[0]).format('YYYY-MM-DD HH:mm:ss');
        // end_time = moment(recruit_data.test.time[1]).format('YYYY-MM-DD HH:mm:ss');
        assert(email,422,"邮箱为空")        
        let transporter = nodemailer.createTransport({
            host:"smtp.gdufs.edu.cn",
            port:25,
            secure:false,
            auth:{
                user:"20171003243@gdufs.edu.cn",
                pass:"691029538ada"
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        let thank_title=`感谢投递数据挖掘实验室招聘！`
        let thank_mail = `<h4>亲爱的${name}</h4>`
                        +`<p>您好！感谢您对数据挖掘实验室招聘的关注，同时也感激您对数据挖掘实验室的热情投入。</p>`
                        +`<p>我们很遗憾地通知您，在此次数据挖掘实验室招聘中，您投递的${recruit}岗位没有通过评估</p>`
                        +`<p>您的简历将进入人才库，我们将持续为您匹配合适的岗位，期待与您在未来相遇！</p>`
                        +`<p> 再次感谢您对数据挖掘实验室的关注！</p>`
                        +`<p>详细信息请前往招聘网页的个人信息中查看</p>`
                        +`<p>如有疑问可咨询 20171003254@gdufs.edu.cn 黄同学</p>`
                        +`<p>此致</p>`
                        +`<p>数据挖掘实验室招新组</p>`
        let pass_title=`数据挖掘实验室招聘录用通知！`
        let pass_mail = `<h4>亲爱的${name}</h4>`
                        +`<p>您好！恭喜您通过数据挖掘实验室招聘全部流程！诚邀您加入数据挖掘实验室，具体信息如下：</p>`
                        +`<p>录用部门：${department}</p>`
                        +`<p>岗位：${recruit}</p>`
                        +`<p>如接受offer，请您在收到offer后两天内到招聘网页的个人信息进行确认，谢谢！</p>`
                        +`<p>详细信息请前往招聘网页的个人信息中查看</p>`
                        +`<p>如有疑问可咨询 20171003254@gdufs.edu.cn 黄同学</p>`
                        +`<p>此致</p>`
                        +`<p>数据挖掘实验室招新组</p>`

        let info = await transporter.sendMail({
            from:'"数据挖掘实验室" <20171003243@gdufs.edu.cn>',
            to:email,
            subject:req.body.recruit_id==0?thank_title:pass_title,
            text:"内容",
            html:req.body.recruit_id==0?thank_mail:pass_mail
        })
        res.send(info)
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
                accessKeyId:"LTAI4G3c2Ttoom8U3qhV3yAA",
                accessKeySecret:"Qw3lSXXXegZVykNnEbu68C7QPFLprz",
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