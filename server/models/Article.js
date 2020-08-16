const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String},
    //文章所属分类，要用数组！！！可能属于几类！！类型不能是string,ref关联哪一个模型
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String}

},{
    //时间戳
    timestamps:true
})
module.exports = mongoose.model('Article',schema)