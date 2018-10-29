
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
		},
		WriteFile:function(path,data,callback){
			fs.writeFile(path,data,function(error,data){//异步写文件
				if(error){
					throw error;
				}
				console.log('it is saved!');//文件被保存
				callback('文件保存存')

			});
		},
		readImg:function(path,res){
			fs.readFile(path,'binary',function(error,file){//'binary' 表示二进制流的文件
				if(error){
					console.log(error);
					return;
				}else{
					res.write(file,'binary');
					res.end();
					console.log('图片');
				}
			});
		}
	
	}