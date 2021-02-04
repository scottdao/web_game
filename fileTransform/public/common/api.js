export class Network{
    static init=(api, token)=>{
        this.api = api || ''
        this.token = token  || ''
    }
    static get=(url, data)=>{
        return this.request('get', url, data)
    }
    static put=(url, data)=>{
        return this.request('put', url, data)
    }
    static post = (url, data)=>{
        return this.request('post', url, data)
    }
    static delete = (url, data) =>{
        return this.request('delete', url, data)
    }
    static makeGetURL = (obj)=>{
        let _str = ''
        for (const item of Object.keys(obj)) {
            _str +=`${item}=${obj[item]}&`
        }
        return _str.slice(0,-1)
    }
    /**
     * @params data
     * data.responseType 非必填属性
     * data.params = {} 非必填属性
     * data  = {}  params responseType 为空，则为data
     * ***/
    static request=(method,url,data)=>{
        let headers = {
            method
        };
        if(this.token){
            headers.headers.Auth = this.token
        }
        if(method !== 'get'){
            if(data){
                if(data.reponseType==='formData'){
                    let _data = new FormData()
                    for (const item of Object.keys(data.params)) {
                        _data.append(item, data.params[item])
                    }
                    headers.body = _data;
                }else if(data.reponseType === 'blob'){
                    headers.headers = {
                        'content-type': 'application/json'
                    }
                    data.params?(headers.body = JSON.stringify(data.params)):""
                }else{
                    headers.headers = {
                        'content-type': 'application/json'
                    }
                    headers.body = data.params?JSON.stringify(data.params):JSON.stringify(data)
                }
            }
        }else{
            headers.headers = {
                'content-type': 'application/json'
            }
            url = (data &&  data.params)?`${url}?${makeGetURL(data.params)}`:url
        }
        return fetch(this.api?`${this.api}${url}`:url, headers).then(res=>{
            if(data && data.reponseType === 'blob'){
                return res.blob()
            }
            return res.json()
        })
    }
}
Network.init('http://192.168.0.74:8000/api')
export  class API{
    static fileUpload=(data)=>{
        return  Network.post('/upload/file', data)
    }
   
}