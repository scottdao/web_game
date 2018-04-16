var http = require('http');
var $url = require('url');
//var $router = require('./router/router');
var Opt = require('./index/optfile.js');
var server = http.createServer(function(request,response){
		if (request.url!=="/favicon.ico") {//清除二次访问；
			var pathName = $url.parse(request.url).pathname;
			pathName = pathName.replace(/\//,'');
			console.log(pathName);
			$router[pathName](request,response)
			//$router.login(request,response)

			console.log('执行主程序');
		}

});
//函数监听
server.listen(8080,'127.0.0.1',function(){
	console.log('running');
})