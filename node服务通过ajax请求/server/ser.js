
//设置开启服务器；
var http = require('http');//设置服务器协议；
 var rand_data = require('./rand_data.js');//引入随机数
 // console.log(rand_data.data());
var ser = {

	host:'127.0.0.1',

	port:80,//端口号只能设置成80；

	run:function(){
        //1.创建服务器；
	     var serv = http.createServer(function(request,response){
	     	//设置服务器状态码；
	     	response.statusCode = 200;
	     	//设置请求头；
	     	response.setHeader('Content-Type','text/html;charset=utf-8');
	     	//设置请求头，解决跨域问题；全局都可以访问；
	     	response.setHeader('Access-Control-Allow-Origin','*');
	     	//结束服务器请求响应；
	     	// response.end('正常运行');
	     	var data = rand_data.data();//获取随机数
	     	// response.end(data);
	     	response.end(JSON.stringify(data));//将随机数加载成json送数据
	     })
        //开启服务器监听；参数的前后顺序不能颠倒；
        serv.listen(this.port,this.host,function(){
        	console.log('运行中....');
        });
	}

}

ser.run();//调用运行服务器；

module.exports = ser;