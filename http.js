
/**
 * 1. url地址
 * 2. 请求类型
 * 3. 数据
 * 
 * 
 */
//

/**
 * 为什么封装？
 *  1. 用的方便，提高开发效率
 *  2. 提高代码重用率，提高开发效率
 *  3. 提高代码可维护性，提高开发效率
 *  4. 提升性能
 * 何时需要封装？
 *   1. 使用频率高 http://cct296.com/nick/api/ajax_post
 *   2. 业务逻辑复杂（功能）
 *   3. 很多代码段相同，部分不同！ 不同的地方一般通过传递参数（注入）来解决
 */

function http(url,options){
	
	url = url || '';
	
	options = options || {};
	
	options.method = options.method || 'get';
	
	options.data = options.data || {};
	
	var data = '';
	
	var dataType = options.dataType || 'text';
	
	for(var i in options.data){
		
		data+='&'+i+'='+options.data[i];
		
	}
	
	data = data.substr(1);
	
	if(/get/i.test(options.method)){
		
		url+='?'+data
		
	}else{
		
		options.method = 'post';
		
		options.headers = {
			
			'content-type':'application/x-www-form-urlencoded'
			
		}
		
		options.body = data;
		
	}
	
	return fetch(url,options).then(function(result){
		
		return result[dataType] ? result[dataType]() : result.text();
		
	});
	
}

export default http


