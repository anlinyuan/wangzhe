module.exports = {
    //输出到哪个文件夹
    outputDir:__dirname+'/../server/admin',
    //生成的静态文件路径，默认是/
    //生产环境，npm run bulid满足下面的条件
    publicPath:process.env.NODE_ENV === "production"
    ?'/admin'
    :'/'
}