var express = require('express');

var http = express();
    var db;
	function shujuku(){
		//连接数据库；
		var mysql = require('mysql');

		var config = {
			host:'127.0.0.1',
			port:3306,
			user:'root',
			password:'',
			database:'test'
		};

		//创建数据库；
	    db = mysql.createConnection(config);

	}


//加载querying模块
var querystring = require('querystring');

http.all('*',function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
})

http.post('/news/add/',function(req,res){

    var shuju = {};
	req.on('data',function(can){
			//获取的数据转换json数据格式；
			 shuju = can.toString();
			 shuju = querystring.parse(shuju);
			 //parse，querystring将数据转换成json数据；
			 // console.log(shuju);
	});
	//添加end事件；
	req.on('end',function(){
		// res.send(shuju);
		//连接数据库；
		shujuku();
		//操作数据库；
		var sql = 'insert into news(title,time) values(?,?)';
		db.query(sql,[shuju.title,Math.floor(new Date().getTime()/1000)],function(e,result){
			if(e) return console.log(e);
			// console.log(result);
			res.json({e:e,result:result.insertId});
		}) 
	});

});

    //读取添加新闻列表；
	http.get('/news/list/',function(req,res){
		// res.send('get');
		//连接数据库；
		shujuku();
		//操作数据库；
		var sql = 'select * from news where del!=1';
		db.query(sql,[],function(e,result){
			if(e)return console.log(e);
			res.json(result);
		})
		db.end();
	});
	
    //删除新闻列表；
    http.get('/news/del/',function(req,res){
    	//连接数据库；
    	shujuku();
    	//获取ID值；
    	var id = req.query.id;
    	//操作数据库；

    	var sql  = 'update news set del=1 where id=?';
    	db.query(sql,[id],function(e,result){
    		if(e)return console.log(e);
			res.json(result);
			console.log('删除成功！');
    	})
    	db.end();
    });
//监听；
http.listen(80,'127.0.0.1',function(){
	console.log('运行中...');
});
//关闭连接；1.永远将数据库打开；2.啥时候开啥时候用；

// db.end();