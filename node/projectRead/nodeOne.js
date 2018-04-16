// 路由加模块
var http = require('http');
var $url = require('url');
var $router = require('./router/router.js');
//console.log($router)
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
	if (request.url!=="/favicon.ico") {//清除二次访问；
		
		var pathName = $url.parse(request.url).pathname;
		pathName = pathName.replace(/\//,'');
		$router[pathName](request,response)
		response.end();
	}

});

function func(res){
	res.write('<div>欧式典范</div>')
}

//函数监听
server.listen(8080,'127.0.0.1',function(){
	console.log('running');
})