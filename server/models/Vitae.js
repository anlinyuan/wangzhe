const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'AdminUser'},
    name:{type:String},
    student_id:{type:String},
    tel:{type:Number},
    avator:{type:String},
    email:{type:String},
    personal_website:{type:String},
    grade:{type:String},
    academic:{type:String},
    major:{type:String},
    projects:[{
        project_name:{type:String},
        project_time:[{type:Date}],
        project_detail:{type:String}
    }],
    awards:[{
        awards_name:{type:String},
        awards_time:{type:String},
        awards_detail:{type:String}
    }],
    programing:{type:String},
    language_skill:{type:String},
    self_evalute:{type:String},
    //申请的岗位进度,ref关联哪一个模型
    recruits:[{type:mongoose.SchemaTypes.ObjectId,ref:'Recruit'}],
})
module.exports = mongoose.model('Vitae',schema)