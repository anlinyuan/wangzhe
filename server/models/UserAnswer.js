const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId},
    test_item:[{type:mongoose.SchemaTypes.ObjectId,ref:'TestItem'}],
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    answer:[{
        question:{},
        choose:{},
        answer:{},
    }],
    score:{type:String}
})
module.exports = mongoose.model('UserAnswer',schema)