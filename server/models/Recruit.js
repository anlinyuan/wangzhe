const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    intro:{type:String},
    num:{type:String},
    qualification:{type:String},
    start:{type:Date},
    end:{type:Date},
    department:{type:mongoose.SchemaTypes.ObjectId,ref:'Department'},
    test:{type:mongoose.SchemaTypes.ObjectId,ref:'TestItem'}
})
module.exports = mongoose.model('Recruit',schema)