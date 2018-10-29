//获取随机数；
//生成若干个随机字符
module.exports = {
	
	text:'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm',

	getRand:function(min,max){
		var num = Math.floor(Math.random()*(max-min+1)+min);
		return num;
	},
	randText:function(min,max){
	

		var num =this.getRand(min,max);
		var str = '';
		for(var i = 0;i<num;i++){
			str += this.text[this.getRand(0,this.text.length-1)];

		}
		return str;
	},
	data:function(){
		var data = [];
		for(var i = 0; i<10;i++){
			data.push(this.randText(4,10));
		}
		return{
			result:data,
			sucess:true,
			time:new Date().getTime()
		}
	}
}