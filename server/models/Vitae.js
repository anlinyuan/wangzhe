const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'AdminUser'},
    name:{type:String},
    student_id:{type:String},
    //申请的岗位进度,ref关联哪一个模型
    recruit:[{
        id:{type:mongoose.SchemaTypes.ObjectId,ref:'Recruit'},
        test:{type:mongoose.SchemaTypes.ObjectId,ref:'TestItem'},
        pass:{type:String}
    }],
})
module.exports = mongoose.model('Vitae',schema)