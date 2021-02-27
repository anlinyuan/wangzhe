const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'AdminUser'},
    name:{type:String},
    test_item:{type:mongoose.SchemaTypes.ObjectId,ref:'TestItem'},
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    questions:[{
        id:{type:mongoose.SchemaTypes.ObjectId,ref:'Question'},
        name:{type:String},
        answers:[{
            name:{type:String},
            //该选项是否为正确选项
            flag:{type:String},
            //是否选择该选项
            choose:{type:String},
        }],
    }],
    comment:{type:String},
    score:{type:String},
    pass:{type:String}
})
module.exports = mongoose.model('TestAnswer',schema)