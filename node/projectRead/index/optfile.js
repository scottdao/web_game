
var fs = require('fs');

module.exports={
		readFileSync:function(path,res){//同步读取,性能不推荐；
			var data = fs.readFileSync(path,'utf-8');
			res.write(data)
			console.log('执行同步方法');
		},
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