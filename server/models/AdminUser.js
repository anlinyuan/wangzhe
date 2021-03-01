const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{type:String},
    password:{
        type:String,
        //密码在编辑页面不要散列，不显示
        select:false,
        //set 自定义保存方法
        //npm i bcrypt 密码散列
        set(val){
            return require('bcryptjs').hashSync(val,10);
        }
    },
    admin:{type:String}
})
module.exports = mongoose.model('AdminUser',schema)