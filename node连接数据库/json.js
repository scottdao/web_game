var express = require('express');

var http = express();

http.get('/num/',function(rq,res){
	res.json([{'my':123},{'who':455}]);

});

http.get('/',function(rq,res){


    // res.json([{'my':123},{'who':455}]);
   http.set('jsonp callback name','my');
    res.jsonp([{'my':123},{'who':455}]);
});

// console.log(11);
//开启监听；
http.listen(80,'127.0.0.1',function(){
	console.log('看见喇叭！');
});