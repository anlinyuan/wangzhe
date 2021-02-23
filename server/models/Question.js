const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    answers:[{
        name:{type:String},
        flag:{type:Number},
    }],
})
module.exports = mongoose.model('Question',schema)