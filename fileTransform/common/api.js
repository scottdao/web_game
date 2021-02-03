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
        headers.headers = {
            'content-type': 'application/json',
            Auth:this.token
        }
        if(method !== 'get'){
            if(data){
                if(data.reponseType==='formData'){
                    let data = new FormData()
                    for (const item of Object.keys(data.params)) {
                        data.append(data.params[item])
                    }
                    headers.body = data
                    headers.headers['content-type'] = 'multipart/form-data'
                }else if(data.reponseType === 'blob'){
                    headers.body = JSON.stringify(data.params || {})
                }else{
                    headers.body = data.params?JSON.stringify(data.params):JSON.stringify(data)
                }
            }
        }else{
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

export  class API{
    
}