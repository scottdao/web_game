# 面试题

##  html 与 css

  1. 浏览器的解析机制
    
      答：1.解析html;2.解析加载css,比较优先权重；3.css加html，渲染构建dom树，；4.绘制dom树，根据绘制好的dom树进行布局绘制；
   
   2. 重绘与重排；

      答：重绘是元素的外观的改变；不影响页面的整体布局结构；

      重排影响页面的整体布局结构；

      重排一定会重绘，重绘不一定重排；

      重排会发生dom布局变化，会重新对有结构变化的dom,重新构建dom树，重新渲染。 


##  javascript

  1.关于addEventListener监听事件，绑定两个函数，谁先执行的问题，按照js执行从上至下依次执行。有关该监听函数冒泡和捕获的原理。
        <div  id="id1">
        <div  id='id2'></div>
        </div>
            <script>
            // function div1(){
            //  console.info(new Date().getTime()+':','div1')

            // }
            // function div2(){
            //  console.info(new Date().getTime()+':','div2')
                
            // }
    
            var id2 = document.getElementById('id2');
            var id1 = document.getElementById('id1');
            function ad1(){
                console.log('ad1')
            }
            function ad2(){
                console.log('ad2')
            }
            id2.addEventListener('click',ad2,false)
            id1.addEventListener('click',ad1,false)

            事件的监听者；
            </script>


  2. 严格模式 和 非严格模式：

      1.意外的全局变量，没有用var声明；

      2. 变量名重复

      3.内置对象的属性名问题；

      4.eval函数；

      5.8进制字面量的不允许使用；

      6.call/apply/bind方法的第一个参数为undefined时，this为null和undefined；
##  react.js

1.虚拟dom和原生dom的区别；

  

2.生命周期，组件加载完成，会执行哪些生命周期；

componentWillMount(初始化组件只调用一次)--->render(创建虚拟dom,进行diff算法，新的dom树在此处进行，不能更改state)--->componentDidMount(组件渲染之后调用一次)

参数准备(constructor(){state,props})---->即将挂载(componentWillMount)----->虚拟dom计算，diff(render)---->挂载完成(componentDidMount)
