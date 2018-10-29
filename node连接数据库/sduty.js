//加载模块；
var express = require('express');

//实例化一个模块；
var http  = express();

//get 获取数据；
http.get('/',function(request,response){
	console.log('首页');
	response.send('首页');
});

http.get('/tv/',function(request,response){
	console.log('电视剧');
	response.send('电视剧');
});
http.get('/tv/guzhuang',function(request,response){
	console.log('古装剧');
	response.send('古装剧');
});
http.get('/moving/',function(request,response){
	console.log('电影');
	response.send('电影');
});
//开启监听；
http.listen(80,'127.0.0.1',function(){
	console.log('你努力的跑吧！');
})