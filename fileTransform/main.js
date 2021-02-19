import express from "express";
import swig from "swig";
import multer from "multer";
import path from "path";
import multiparty from "multiparty";

import bodyParser from "body-parser";
import { goServer } from "./server/start.js";
import { ResponseMessage } from "./server/response.js";
import { createDir } from "./server/utils.js";

import { routers } from "./server/router.js";

const app = express();
app.use(express.static(process.cwd() + "/public"));

app.set("views", "./public/html");
app.set("view engine", "html");
app.engine("html", swig.renderFile);
swig.setDefaults({ cache: false });
app.set("view cache", false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const _env = process.env.NODE_ENV;
if (_env.trim() == "development") {
    app.all("*", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "content-type");
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
        next();
    });
}

const routerConfig = Object.keys(routers);
let routerIndexNames = [];
for (const config of routerConfig) {
    if (routers[config].isOpen && _env.trim() === "development") {
        routerIndexNames.push(routers[config].routerName);
    }
    app.get(routers[config].routerName, (req, res) => {
        res.render("index", {
            ...routers[config],
        });
    });
}
app.post("/api/upload/file", (req, res) => {
    try {
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            // console.log(fields, files, 8788);
            if (err) {
                res.status(200).send(ResponseMessage.init(400, err));
            } else {
                res.status(200).send(ResponseMessage.init(200));
            }
        });
        // console.log(req.body, ResponseMessage.init(200))
    } catch (err) {
        res.status(200).send(ResponseMessage.init(err.status, err));
    }
});
goServer(app, 8080, routerIndexNames);
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