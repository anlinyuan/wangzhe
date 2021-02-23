const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    // icon:{type:String}
})
module.exports = mongoose.model('Answer',schema)