var LDY = {};

LDY.Interface = function (name,methods){//检验接口
			//console.log(methods)
				if(arguments.length !=2){

					throw new Error("this instance interface constructor arguments' length must  be 2 !")
				}

				this.name = name;

				this.methods = [];//定义一个内置的空数组对象，接收methods里的元素；
				//console.log(this.methods)
				for(var i = 0,len = methods.length; i<len;i++){
					
					if(typeof methods[i] !== 'string'){
						throw new Error("this interface methods' name must be string!")
					}

					this.methods.push(methods[i]);

				}
		}

LDY.Interface.ensureImplements = function(object){//检测方法
			//var interface = arguments[1];
			if(arguments.length<2){
					throw new Error('this Interface arguments.length must be >= 2!')
			}
			//if(interface.constructor !==  Interface )
			//获得接口实例对象
			for(var i =1,len = arguments.length;len>i;i++){

				var newInterface = arguments[i];
			
				if(newInterface.constructor !== LDY.Interface){
					throw new Error('the arguments constructor not be Interface class')
				}
				for(var j=0;j<newInterface.methods.length;j++){
					
					var methodName = newInterface.methods[j];

					if(!object[methodName] || typeof object[methodName] !=='function'){
						throw new Error("the method's'"+methodName+"'is not found!")
					}
				}
			}
		}

LDY.extend = function(sub,sup){

	//sub.prototype = new sup();
	
	var func  = new Function();

	func.prototype  =sup.prototype;

	sub.prototype = new func();

	sub.prototype.constructor = sub;

	sub.superClass = sup.prototype;

	if(sup.prototype.constructor == Object.prototype.constructor){
		sup.prototype.constructor = sup
	}

}

LDY.bindIncident = function(ele,incident,callBack){
	if(ele.addEventListener){
		ele.addEventListener(incident,callBack,false)
	}else if(ele.attachEvent){
		ele.attachEvent('on'+incident,callBack)
	}

	return this
}


