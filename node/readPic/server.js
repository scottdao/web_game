var http = require('http');
var $url = require('url');
//var $router = require('./router/router');
var Opt = require('./index/optfile.js');
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'image/jpeg;charset=utf-8;'});
	if (request.url!=="/favicon.ico") {//清除二次访问；
		Opt.readImg('./index/view/0902_26.jpg',response);
	}

});
//函数监听
server.listen(8080,'127.0.0.1',function(){
	console.log('running');
})