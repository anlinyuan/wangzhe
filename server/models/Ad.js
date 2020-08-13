const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    //一个广告位会有很多个广告，数组
    items:[{
        image:{type:String},
        //点击跳转
        url:{type:String}
    }]
})
module.exports = mongoose.model('Ad',schema)