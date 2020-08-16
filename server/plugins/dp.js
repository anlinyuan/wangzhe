module.exports = app=>{
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{useNewUrlParser:true,useUnifiedTopology: true})
    //npm i require-all 把某个文件夹下的文件引用一遍，防止报错，定义未引用
    require('require-all')(__dirname+'/../models')

    
}