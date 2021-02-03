
import express from 'express';
import swig from 'swig'
const app = express();
// import projectRouter from './server/index.js';
app.use(express.static(process.cwd() + "/public"));
// import handleMethod from './server/handleMethod.js';
import bodyParser from 'body-parser';
import { goServer } from './server/start.js';
import chalk from 'chalk'

app.set("views", "./public/html");

app.set("view engine", "html");
app.engine("html", swig.renderFile);
swig.setDefaults({ cache: false });
app.set("view cache", false);
app.use(bodyParser.urlencoded({ extended: false }));

const _env = process.env.NODE_ENV
if(_env === 'development'){
    app.all('*', (req, res, next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","content-type");
        res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
        next()
    })
}
app.get('/transform/file', (req, res) => {
    res.render('index', {
        title:'LDY',
        name:'scott'
    })
});
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
goServer(app, 8080)
