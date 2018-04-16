
var fs = require('fs');

module.exports={
		readFile:function(path,callback){//异步读取文件
			fs.readFile(path,function(error,data){
				if(error){
					console.log(error)
				}else{
					callback(data);
					console.log('执行异步方法');
				}
			});
			//console.log('执行异步方法')
		}
	
	}