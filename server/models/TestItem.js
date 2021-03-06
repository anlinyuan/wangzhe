const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    test:{type:mongoose.SchemaTypes.ObjectId,ref:'Test'},
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    time:[{type:Date}],
    // start:{type:Date},
    // end:{type:Date},
    recruit:{type:mongoose.SchemaTypes.ObjectId,ref:'Recruit'},
    author:{type:mongoose.SchemaTypes.ObjectId,ref:'AdminUser'}
})
module.exports = mongoose.model('TestItem',schema)