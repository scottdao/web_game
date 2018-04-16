var $file = require('../index/optfile.js');

function sendBack(req,response){
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
		function callback(data){
			response.write(data)
			response.end();//不写没有http协议尾
		}
		return callback;

}
module.exports={
	login:function(request,response){
		var callback = sendBack(req,res);
		$file.readFile('./index/view/login.html',callback);
		//response.write('login登录')
	},
	resgist:function(request,response){
		//response.write('注册页面');
		var callback = sendBack(req,res);
		$file.readFile('./index/view/resgist.html',callback);
	},
	WriteFile:function(request,response){
		//response.write('注册页面');
		var callback = sendBack(req,res);
		$file.WriteFile('./index/view/one.html','今天写了好多文件',callback);
	},
	showImg:function(request,response){
		response.writeHead(200,{'Content-Type':'image/jpeg;charset=utf-8;'});
		$file.readImg('./index/view/0902_26.jpg',response);	
	}
}