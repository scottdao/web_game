
//加载配置文件；

var config = require('../config/dbconfig.js');

// console.log(config);

//加载mysql;
var mysql = require('mysql');

//创建连接数据库；
var db = mysql.createConnection(config);


function chaxun(sql,arr,callback){
	db.query(sql,arr,function(error,result){
    		if(error)return console.log(error);
			// res.json(result);
			// console.log(result);
			callback(result);
    	})
}

// chaxun('select * from news',[],function(data){
// 	console.log(data);
// })

module.exports = {
	add:function(data,callback){
        var  sql  = 'insert into news (title,time) values(?,?)';

        query(sql,data,callback);   
	},
	del:function(data,callback){
        var  sql  = 'update news set del=1 where id=?';

        query(sql,data,callback);   
	},
	list:function(callback){
        var  sql  = 'select * from news where del!=1 ';

        query(sql,[],callback);   
	},
	update:function(){
		
	}
}