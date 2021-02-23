const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    intro:{type:String},
    icon:{type:String},
})
module.exports = mongoose.model('Department',schema)