const express = require("express")

const app = express()
app.use(require('cors')())
app.use(express.json())

require('./plugins/dp')(app)
require('./routes/admin')(app)



app.listen(8080,()=>{
    console.log('http://localhost:8080/');
});