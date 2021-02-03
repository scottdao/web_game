// https://www.cnblogs.com/RudeCrab/p/14250903.html
export class ResponseMessage{
        static code_message = {
            200:'成功',
            401:'没有权限',
            500:'服务器端出错',
            400:'客户端出错'
        }
       static _message = {
            success:true,
            data:null,
            msg:'成功', 
            code:200
       }
       static init=(status, data = null)=>{
           this._message.msg =  this.code_message[status]
           if(!this.code_message[status]){
              this._message.msg = '服务器资源有误'
           }
           this._message.data = data;
           this._message.code = status
           if(status !==200){
               this._message.success = false
           }else{
               this._message.success = true
           }
           return this._message
       }
}
