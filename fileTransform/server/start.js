import os from "os";
import chalk from "chalk";
// 启动服务函数
function getLocalIP() {
    const iFaces = os.networkInterfaces();
    let ip = "";
    const iFaceArr = Object.keys(iFaces);
    for (const _iFace of iFaceArr) {
        for (const _address of iFaces[_iFace]) {
            if (
                _address.family === "IPv4" &&
                _address.address !== "127.0.0.1" &&
                !_address.internal &&
                !_address.address.includes("::")
            ) {
                ip = _address.address;
                break;
            }
        }
    }
    return ip;
}
const Address = getLocalIP();
const getLocalPort = (app, port, routerNames) => {
    const server = app.listen(port, "0.0.0.0", () => {
        console.log(chalk.green(`http://${Address}:${port}`));
        console.log(chalk.green(`http://localhost:${port}`));
        console.log(chalk.green("success!"));
        for (const routerName of routerNames) {
            console.log(chalk.yellow(`http://${Address}:${port}${routerName}`));
        }
    });
    server.on("error", (error) => {
        console.log(chalk.yellow(error));
        port++;
        getLocalPort(app, port);
    });
};

// 自动打开浏览器
const openDefaultBrowser = async(url, openCount) => {
    let exec = await
    import ("child_process");
    exec = exec.exec;
    switch (process.platform) {
        case "darwin":
            exec("open " + url);
            break;
        case "win32":
            exec("start " + url);
            break;
        default:
            exec("xdg-open", [url]);
    }
};
export const goServer = (app, port, routerNames) => {
    let argv = null;
    // console.log(routerNames);
    if (process.argv && process.argv.length > 0) {
        argv = process.argv.slice(-1)[0];
        if (/port/g.test(argv)) {
            argv = argv.split(":");
            argv = argv[argv.length - 1];
        } else {
            argv = null;
        }
    }
    getLocalPort(app, argv || port, routerNames);
};