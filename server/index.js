const express = require("express")

const app = express()
app.use(require('cors')())
//jwt密钥
app.set('secret',"1234idsnoi")


app.use(express.json())
//静态文件
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./plugins/dp')(app)
require('./routes/admin')(app)
require('./routes/web')(app)


app.listen(8080,()=>{
    console.log('http://localhost:8080/');
});