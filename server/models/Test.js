const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    ture_or_false:[{type:mongoose.SchemaTypes.ObjectId,ref:'Question'}], //判断题
    single_choice:[{type:mongoose.SchemaTypes.ObjectId,ref:'Question'}], //单选题
    multiple_choice:[{type:mongoose.SchemaTypes.ObjectId,ref:'Question'}],//不定项
    subjective:[{type:mongoose.SchemaTypes.ObjectId,ref:'Question'}], //主观题
    // questions:[{type:mongoose.SchemaTypes.ObjectId,ref:'Question'}],
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    public:{type:String},
})
module.exports = mongoose.model('Test',schema)