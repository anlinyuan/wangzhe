const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'AdminUser'},
    name:{type:String},
    test_item:{type:mongoose.SchemaTypes.ObjectId,ref:'TestItem'},
    test:{type:mongoose.SchemaTypes.ObjectId,ref:'Test'},
    //添加一个父类字段，类型不能是string,ref关联哪一个模型
    ture_or_false:[{
        question:{type:mongoose.SchemaTypes.ObjectId,ref:'Question'},
        choose:{type:String},
    }], //判断题
    single_choice:[{
        question:{type:mongoose.SchemaTypes.ObjectId,ref:'Question'},
        choose:{type:String},
    }], //单选题
    multiple_choice:[{
        question:{type:mongoose.SchemaTypes.ObjectId,ref:'Question'},
        choose:[{type:String}],
    }],//不定项
    subjective:[{
        question:{type:mongoose.SchemaTypes.ObjectId,ref:'Question'},
        choose:{type:String},
    }], //主观题
    // answer:[{
    //     question:{type:mongoose.SchemaTypes.ObjectId,ref:'Question'},
    //     choose:{type:String},
    // }],
    comment:{type:String},
    score:{type:String},
    pass:{type:String}
})
module.exports = mongoose.model('Answer',schema)