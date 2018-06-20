
（原生node）
-----------------------------------------------------

#1.node创建服务

        内部函数调用，以及外部文件函数的调用；
        进行模块调用，通过module.exports进行导出


                    var http = require('http');
                    var server = http.createServer(function(request,response){
                        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
                        if (request.url!='favicon.ico') {//清除二次访问
                            //response.write('欧式典范')
                            func(response);
                            response.end('')
                        }
                    });
                    function func(res){
                        res.write('<div>欧式典范</div>')
                    }
                    //函数监听
                    server.listen(8080,'127.0.0.1',function(){
                        console.log('running');
                    })


#2路由初步；


        路由初步解析：
        需要引入url（API--http://nodejs.cn/api/url.html#url_class_url）对象；


                moudle.exports(对模块进行导出)与exports(模块内部有效，不导出)；
                    var $url = require('url');
                    var server = http.createServer(function(request,response){
                    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
                    if (request.url!=="/favicon.ico") {//清除二次访问；
                        
                        var pathName = $url.parse(request.url).pathname;//路由
                        pathName = pathName.replace(/\//,'');
                        $router[pathName](request,response)
                        response.end();
                    }
                });

#3文件读取：


       通过加载fs插件；
       同步加载文件
       代码如下：
       1.主程序文件：




                var http = require('http');
                var $url = require('url');
                var $router = require('./index/optfile.js')
                var server = http.createServer(function(request,response){
                    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
                    if (request.url!=="/favicon.ico") {//清除二次访问；
                        $router.readFileSync('./index/view/login.html',response);
                        response.end();
                        console.log('执行主程序');
                    }
                });



        2.读取文件程序代码：
                    readFileSync:function(path,res){//同步读取,性能不推荐；
                        var data = fs.readFileSync(path,'utf-8');
                        res.write(data)
                        console.log('执行同步方法');
                    }

##4异步读取文件


            主文件代码：


                        if (request.url!=="/favicon.ico") {//清除二次访问；
                            function callback(data){
                                response.write(data)
                                response.end();//不写没有http协议尾
                            }
                            $file.readFile('./index/view/login.html',callback);
                            console.log('执行主程序');
                        }


            非主文件程序代码
            readFile:function(path,callback){//异步读取文件
            fs.readFile(path,function(error,data){
                if(error){
                    console.log(error)
                }else{
                    callback(data);
                    console.log('执行异步方法');
                }
            });
            //console.log('执行异步方法')
        }
    

#5路由读取文件+路由读文件的效果；

  ###服务端server.js开启服务



                    var http = require('http');
                    var $url = require('url');
                    var $router = require('./router/router');
                    var server = http.createServer(function(request,response){
                        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
                        if (request.url!=="/favicon.ico") {//清除二次访问；
                            var pathName = $url.parse(request.url).pathname;
                            pathName = pathName.replace(/\//,'');
                            console.log(pathName);
                            $router[pathName](request,response)
                            //$router.login(request,response)
                        console.log('执行主程序');
                    }
                    });
                    //函数监听
                    server.listen(8080,'127.0.0.1',function(){
                        console.log('running');
                    })
  

  ###路由文件；


          var $file = require('../index/optfile.js');
        module.exports={
            login:function(request,response){
                function callback(data){
                    response.write(data)
                    response.end();//不写没有http协议尾
                }
                $file.readFile('./index/view/login.html',callback);
                //response.write('login登录')
            },
            resgist:function(request,response){
                //response.write('注册页面');
                function callback(data){
                    response.write(data)
                    response.end();//不写没有http协议尾
                }
                $file.readFile('./index/view/resgist.html',callback);
            }
        }

   ###读取文件


                var fs = require('fs');
                module.exports={
                        readFile:function(path,callback){//异步读取文件
                            fs.readFile(path,function(error,data){
                                if(error){
                                    console.log(error)
                                }else{
                                    callback(data);
                                    console.log('执行异步方法');
                                }
                            });
                            //console.log('执行异步方法')
                        }
                            
                    }
  
服务端开启的代码同步异步读取代码，通过回调函数，进行传参回调，开启异步线程。

#6同步异步写文件

   ###读取文件夹里


                   WriteFile:function(path,data,callback){
                    fs.writeFile(path,data,function(error,data){//异步写文件
                        if(error){
                            throw error;
                        }
                        console.log('it is saved!');//文件被保存
                        callback('文件保存存')
                    });
                }

   ###路由文件夹里

   
             WriteFile:function(request,response){
                //response.write('注册页面');
                function callback(data){
                    response.write(data)
                    response.end();//不写没有http协议尾
                }
                $file.WriteFile('./index/view/one.txt','今天写了',callback);
            }

#7读取图片（一般都采用异步读取）


        readImg:function(path,res){
            fs.readFile(path,'binary',function(error,file){//'binary' 表示二进制流的文件
                if(error){
                    console.log(error);
                    return;
                }else{
                    res.write(file,'binary');
                    res.end();
                    console.log('图片');
                }
            });
        }

        if (request.url!=="/favicon.ico") {//清除二次访问；
                Opt.readImg('./index/view/0902_26.jpg',response);
            }


#8路由改造，实现图文混排；


        采用闭包增加回调，利用img中src实现img的调用；
        
        服务文件中，server.js改变；


        var server = http.createServer(function(request,response){
        if (request.url!=="/favicon.ico") {//清除二次访问；
            var pathName = $url.parse(request.url).pathname;
            pathName = pathName.replace(/\//,'');
            //console.log(pathName);
            $router[pathName](request,response)
            //$router.login(request,response)
            console.log('执行主程序');
        }
    });


###router.js增加回调，判断状态码的处理；


    var $file = require('../index/optfile.js');
        function sendBack(req,response){
            response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'});
                function callback(data){
                    response.write(data)
                    response.end();//不写没有http协议尾
                }
                return callback;
        }
        module.exports={
            login:function(request,response){
                var callback = sendBack(request,response);
                $file.readFile('./index/view/login.html',callback);
                //response.write('login登录')
            },
            resgist:function(request,response){
                //response.write('注册页面');
                var callback = sendBack(request,response);
                $file.readFile('./index/view/resgist.html',callback);
            },
            WriteFile:function(request,response){
                //response.write('注册页面');
                var callback = sendBack(request,response);
                $file.WriteFile('./index/view/one.html','今天写了好多文件',callback);
            },
            showImg:function(request,response){
                response.writeHead(200,{'Content-Type':'image/jpeg;charset=utf-8;'});
                $file.readImg('./index/view/0902_26.jpg',response); 
            }
        }
