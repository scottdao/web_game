/**
 * 关于this
 * @type {Object}
 */
var obj = {
	bar:"boo",
	add:function(){
		var self = this;
		console.log(this.bar);//boo
		console.log(self.bar);//boo
		(function(){
			console.log(this.bar);//undefined
			console.log(self.bar);//boo
		})()
	}
}
obj.add();
//结果： boo boo undefined boo


/**
 * Promise的问题
 * 
 * 通过promise解决异步回调的厄运金子塔；适用于node服务开发。
 * *
 */

new Promise(function(resolve){
	resolve(1)
	console.log(2)
	new Promise(function(resolver){resolver(4)}).then(function(t){console.log(t)})
	setTimeout(function(){
		console.log(3)
	},0)
	}).then(function(t){
	console.log(t)
});

//结果：2 4 1 3；


/**
*
*javascript函数基础题；
*
×
*/
//关于变量的问题；
var z = 10;
function NIO(age){
    console.log(age)//function age(){}
    var age =99;
    console.log(age)//99
    function age(){
        console.log(age)
    }
    age()//报错
}
//结论：在同一作用于域内，表示用var声明变量赋值的优先级大于同名形参的优先级；还大于同名function函数的优先级；形参的优先级最低；
NIO(100);

//变量作用域的问题；
var a = 10;
		(function(){
			
			console.log(a);//undefined

			var a = 100;
			console.log(a);//100
		})()

//函数执行的问题
var data = [];
for(var k = 0;k<3;k++){
    data[k] = function(){
        console.log(k)
    }
}

data[0]();//3

//同步异步


function test(){
for(var i = 0;i<5;i++){
	setTimeout(function(){
		console.log(i)//5个5
	},1000)
}
      console.log(i)//5
}

test();

//变量名和函数名的特性；变量名的提升。
a = 10
function test() {
	console.log(a);
	console.log(foo());
	var a = 2;
	function foo(){
		return 2
	}
}
test();

//变量赋值；
(function(){
			var a = b =5;
})()
console.log(b);//5s


/*
*
*类与对象
*
******/
	function F1(){
			this.name = 'f1'
		}
		function F2(){
			this.name = 'f2'
			return {

			}
		}
		console.log(new F1().name);//f1
		//console.log(F1().name);//报错
		console.log(new F2().name);//undefined
		console.log(F2().name);	//undefined



