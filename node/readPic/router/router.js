var $file = require('../index/optfile.js');
module.exports={
	login:function(request,response){
		function callback(data){
			response.write(data)
			response.end();//不写没有http协议尾
		}
		$file.readFile('./index/view/login.html',callback);
		//response.write('login登录')
	},
	resgist:function(request,response){
		//response.write('注册页面');
		function callback(data){
			response.write(data)
			response.end();//不写没有http协议尾
		}
		$file.readFile('./index/view/resgist.html',callback);
	},
	WriteFile:function(request,response){
		//response.write('注册页面');
		function callback(data){
			response.write(data)
			response.end();//不写没有http协议尾
		}
		$file.WriteFile('./index/view/one.html','今天写了好多文件',callback);
	}
}