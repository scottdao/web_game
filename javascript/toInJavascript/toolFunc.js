// var arr = [1,2,3,4,5,[10,20,[12,[45,34]]]];
var arr = [2,3,4,5,6];
/*arr.forEach(function(res,index,a){
		 console.log(res);
})*///遍历一维数组

/**
 * 遍历多维数组，实现each方法；
 */
Array.prototype.each = function(callBack){
	try{
		this.count = this.count || 0;//计数器
		if(this.length>0 && callBack.constructor == Function){//能遍历的条件；
				while(this.count<this.length){
				 var ele = this[this.count]	
				 if(ele && ele.constructor == Array){
				 	ele.each(callBack)
				 }else{
				 	callBack.apply(ele,[ele,this.count,this])
				 }
				this.count++;
				}
				this.count = null;//释放内存；
		}
	}catch(e){

	}
	return this;
}
arr.each(function(item,index,a){
	console.log(item)
	// console.log(index)
})