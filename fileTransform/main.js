
import express from 'express';
import swig from 'swig';
import multer from 'multer';
import path from 'path';
const app = express();
app.use(express.static(process.cwd() + "/public"));
import bodyParser from 'body-parser';
import { goServer } from './server/start.js';
import { ResponseMessage } from './server/response.js'

app.set("views", "./public/html");

app.set("view engine", "html");
app.engine("html", swig.renderFile);
swig.setDefaults({ cache: false });
app.set("view cache", false);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const _env = process.env.NODE_ENV
if(_env === 'development'){
    app.all('*', (req, res, next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","content-type");
        res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
        next()
    })
}
const fileName = 'files';
app.get('/transform/file', (req, res) => {
    res.render('index')
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        createDir(glob_fileDir_name).then(res=>{
            cb(null, path.join(process.cwd(), `./${glob_fileDir_name}`));    // 保存的路径，备注：需要自己创建
        })
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now());  
    }
});
const upload = multer({ storage: storage });
app.post('/api/upload/file', upload.single('file'), (req, res)=>{
    try{
        console.log(req.body)
        res.status(200).send(ResponseMessage.init(200))
    }catch(err){
        res.status(200).send(ResponseMessage.init(err.status, err))
    }
})
goServer(app, 8080)
// app.get('/api/transform/file', (req, res)=>{
//     res.send({
        
//     })
// })
// 加载配置文件生成路由
// const createRoutesPage = (projectRouter, routes_list=[]) =>{
//     const routes = Object.keys(projectRouter);
   
//     for (const route of routes) {
//         const _route = projectRouter[route].router;
//         const _router = projectRouter[route];
//         app.get(_route, (req, res) => {
//             res.render('index', {
//                 ..._router
//             })
//         });
//         routes_list.push(_route)
//         app.get(`/api${_route}`, (req, res) => {
            // res.send({
            //     ..._router
            // })
//         });
//     }
// }
// const routes_list = []
// createRoutesPage(projectRouter, routes_list)
// 路由配置接口调用
// const methods = Object.keys(handleMethod)
// for (const _method of methods) {
//     if( typeof handleMethod[_method] === 'function'){
//         handleMethod[_method](app, 
//             {
//                 callback:createRoutesPage,
//                 config_data:projectRouter,
//                 startSever:goServer
//             }, bodyParser)
//     }  
// }
// console.log(chalk.red(`${JSON.stringify(routes_list)}`))
// 启动服务函数

