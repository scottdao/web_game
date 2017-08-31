//控制器入口；
//加载 express;

var express = require('express');

//实例化；http
var http = express();

//加载模型；
var news_model = require('../model/news_model.js');

var querystring = require('querystring'); 

//添加路由规则；
http.all('*',function(req,res,next){

	res.setHeader('Access-Control-Allow-Origin','*');

	console.log('监视你！');

	next();

}).post('/news/add',function(req,res){
   
	res.send('添加成功');

}).get('/news/list',function(req,res){

	res.send('show list');

}).get('/news/del',function(req,res){

	res.send('删除');

}).get('/news/update',function(req,res){

	res.send('更新');

});

//监听；
http.listen(80,'127.0.0.1',function(){
	console.log('服务器已开启！');
});