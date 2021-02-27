const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'AdminUser'},
    vitae:{type:mongoose.SchemaTypes.ObjectId,ref:'Vitae'},
    //申请的岗位进度,ref关联哪一个模型
    recruit:{type:mongoose.SchemaTypes.ObjectId,ref:'Recruit'},
    test_item:{type:mongoose.SchemaTypes.ObjectId,ref:'TestItem'},
    pass:{type:String}
})
module.exports = mongoose.model('Schedule',schema)