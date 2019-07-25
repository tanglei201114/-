const express=require('express');
//引入b-pz中间件
const bodyParser=require('body-Parser');
//引入用户路由器
const userRouter=require('./routes/user.js')
var app=express();
app.listen(8080);
//使用bady-parser
app.use(bodyParser.urlencoded({
extended:false

}));
//托管静态资源到public目录

app.use(express.static('./public'));

//使用路由器，搞载到、user.js
app.use('/user',userRouter);
