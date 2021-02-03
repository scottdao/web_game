import os from 'os';
import chalk from 'chalk'
// 启动服务函数
function getLocalIP() {
    const iFaces = os.networkInterfaces();
    let ip = '';
    const iFaceArr = Object.keys(iFaces)
    for (const _iFace of iFaceArr) {
        for (const _address of iFaces[_iFace]) {
            if(_address.family === 'IPv4' && _address.address !=='127.0.0.1' && !_address.internal && !_address.address.includes('::') ){
                ip = _address.address;
                break;
            }
        }
    }
    return ip;
}
const Address = getLocalIP()
const getLocalPort = (app, port)=>{
    const server = app.listen(port, '0.0.0.0', ()=>{
        console.log(chalk.green(`http://${Address}:${port}`))
        console.log(chalk.green(`http://localhost:${port}`))
        console.log(chalk.green('success!'))
    })
    server.on('error', (error)=>{
        console.log(chalk.yellow(error))
        port++;
        getLocalPort(app, port);
    })
}
export const goServer = (app, port)=>{
    let argv = null
    if(process.argv && process.argv.length>0){
        argv = process.argv.slice(-1)[0]
        if(/port/g.test(argv)){
            argv = argv.split(':')
            argv = argv[argv.length-1]
        }else{
            argv = null
        }
    }
    getLocalPort(app, argv || port)
}