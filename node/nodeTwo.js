var http = require('http');
var $url = require('url');
var $file = require('./index/optfile.js');

/*
var server = http.createServer(function(request,response){//同步
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
	if (request.url!=="/favicon.ico") {//清除二次访问；
		$router.readFileSync('./index/view/login.html',response);
		response.end();
		console.log('执行主程序');
	}

});
*/
var server = http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
	if (request.url!=="/favicon.ico") {//清除二次访问；
		function callback(data){
			response.write(data)
			response.end();//不写没有http协议尾
		}
		$file.readFile('./index/view/login.html',callback);
		console.log('执行主程序');
	}

});
//函数监听
server.listen(8080,'127.0.0.1',function(){
	console.log('running');
})