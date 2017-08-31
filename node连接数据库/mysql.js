var mysql = require('mysql');
// console.log(mysql);
//配置数据库名；
var config = {
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'',
	database:'test'
};

//创建数据库连接；
var db = mysql.createConnection(config);

//发送数据；
db.query('show tables',function(error,result,e){
			// console.log(error);
			// console.log(result);
			// console.log(e);
			if(error)return console.log(error);
});
//创建新闻列表；
db.query('create table if not exists news (id int unsigned primary key auto_increment,title varchar(30) not null default "",time int unsigned not null default 0,pv int unsigned not null default 0,del tinyint not null default 0)engine=innodb charset=utf8',function(e,result){
	
	// console.log(result);	

});

//添加数据；
db.query('insert into news(title,time) values("发布的时间：'+new Date().toLocaleString()+'",'+parseInt(new Date().getTime()/1000)+')',function(e,result){
	if(e)return console.log(e);
	// console.log('成功添加'+result.affectedRows+'条数据');
});
db.query('select * from news',function(error,result){
   if(error) return condsole.log(error);
   console.log(result);
   var html = '';
  for(var i = 0; i<result.length; i++){
		
		var tmp = result[i];
		
			
		html+='<li>'+tmp.id+'.'+tmp.title+'</li>\n';
			
		
	}
	console.log(html);
});

// db.query('select * from news where id >= ? and id <= ?',[2,3],function(e,result){

// 	  if(e){
// 	  	console.log(e);
// 	  }
// 	  console.log(result);
// });
db.query('update news set title="更新数据'+new Date().toLocaleString()+'" where id between 2 and 5',function(e,result){
           if(e)return console.log(e);
           console.log('成功更新'+result.affectedRows+'条数据');

});
db.query('delete from news where id > 4',function(e,result){
  if(e)return console.log(e);
  console.log('删除成功'+result.affectedRows+'条数');
})

db.end();