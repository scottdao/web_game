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

