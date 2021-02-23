const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    questions:[{type:mongoose.SchemaTypes.ObjectId,ref:'Question'}],
})
module.exports = mongoose.model('Test',schema)