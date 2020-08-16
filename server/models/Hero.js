const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    //头像
    avatar:{type:String},
    //背景图
    banner:{type:String},
    //别名
    title:{type:String},
    //分类（战士。。。）关联分类中的英雄分类
    //一个英雄有很多分类，写成数组
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    //生存xxx分，攻击xxx分
    scores:{
        //难度
        difficult:{type:Number},
        //技能
        skills:{type:Number},
        //攻击
        attack:{type:Number},
        //生存
        survive:{type:Number},
    },
    //技能
    skills:[{
        icon:{type:String},
        name:{type:String},
        delay:{type:String},//冷却值
        cost:{type:String},//消耗
        description:{type:String},
        tips:{type:String}
    }],
    //出装，与装备数据库关联
    //1顺风，2逆风
    //SchemaTypes!!!有个s！！！！
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    //使用技巧
    usageTips:{type:String},
    //对抗技巧
    battleTipes:{type:String},
    //团战技巧
    teamTipes:{type:String},

    //英雄搭档
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String}

    }]
})
module.exports = mongoose.model('Hero',schema,'heroes')