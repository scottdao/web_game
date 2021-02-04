import fs from 'fs';
import path from 'path';
// 服务端----读取并创建文件
export const createDir=(fileDir_name)=>{
    let path_url = path.join(process.cwd(), `/${fileDir_name}`);
    return new Promise((resolve,reject)=>{
            fs.readdir(path_url, (err,status)=>{
                console.log(err);
                if(err){
                    reject(err)
                }
                resolve(status)
            });
    }).then((s)=>{
        return Promise.resolve(s)
    }).catch(err=>{
        if(err){
            return new Promise((resolve,reject)=>{
                    fs.mkdir(path_url,(err, s)=>{
                        if(err){
                            reject(err)
                        }
                        resolve(s)
                    });
            })
        }
    })
   
}