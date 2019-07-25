const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.用户注册
router.post('/reg',function(req,res){
	//获取post请求数据
	var obj=req.body;
	console.log(obj);
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		//阻止往后执行
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if(!obj.email){
		res.send({code:403,msg:'email required'});
		return;
	}
	if(!obj.phone){
		res.send({code:404,msg:'phone required'});
		return;
	}
	//执行SQL语句
	pool.query('insert into xz_user set ?',[obj],function(err,result){
		if(err) throw err;
		//console.log(result);
		//如果注册成功
		//{ code:200,msg:'register suc' }
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'});
		}
	});//res.send('注册成功');	
});
//2.用户登录
router.post('/login',function(req,res){
	//2.1获取数据
	var obj=req.body;
	//console.log(obj);
	//2.2验证数据是否为空
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd require'});
		return;
	}
	//2.3执行SQL语句
	//查找用户和密码同时满足的数据
	pool.query('select * from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],function(err,result){
		if(err) throw err;
		//console.log(result);
		//判断是否登录成功
	if(result.length>0){
		res.send({code:200,msg:'login suc'});
	}else{
		res.send({code:301,msg:'login err'});
	}
	})
});
//3.检索用户
router.get('/detail',function(req,res){
  //3.1获取数据
  var obj=req.query;
  //console.log(obj);
  //3.2验证是否为空  
  if(!obj.uid){
	res.send({code:401,msg:'uid required'});
	return;
  }
  //3.3执行SQL语句
  pool.query('select * from xz_user where uid=?',[obj.uid],function(err,result){
	if(err) throw err;
	//console.log(result);
	//判断是否检索到用户，如果检索到，把该用户的对象响应到浏览器，否则响应检索不到
	if(result.length>0){
		res.send( result[0] );
	  }else{
		res.send({code:301,msg:'can ont found'});
	  };
	})

//4.修改用户
  router.get('/update',function(req,res){
  var obj=req.query;
  for (var key in obj )
  {if(!obj[key])
	  //console.log(key,obj[key])
  //res.send('修改用户')
  }
})

//导出路由器对象
module.exports=router;
