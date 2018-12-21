# 面试题

## html 与 css

1. 浏览器的解析机制

- 答：1.解析 html;2.解析加载 css,比较优先权重；3.css 加 html，渲染构建 dom 树，；4.绘制 dom 树，根据绘制好的 dom 树进行布局绘制；

2. 重绘与重排；

- 答：重绘是元素的外观的改变；不影响页面的整体布局结构；

  重排影响页面的整体布局结构；

  重排一定会重绘，重绘不一定重排；

  重排会发生 dom 布局变化，会重新对有结构变化的 dom,重新构建 dom 树，重新渲染。

## javascript

1.关于 addEventListener 监听事件，绑定两个函数，谁先执行的问题，按照 js 执行从上至下依次执行。有关该监听函数冒泡和捕获的原理。

```
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
```

2. 严格模式 和 非严格模式：

   - 意外的全局变量，没有用 var 声明；

   - 变量名重复

   - 内置对象的属性名问题；

   - eval 函数；

   - 进制字面量的不允许使用；

   - call/apply/bind 方法的第一个参数为 undefined 时，this 为 null 和 undefined；

## react.js

1. 虚拟 dom 和原生 dom 的区别；

2. 生命周期，组件加载完成，会执行哪些生命周期；

- componentWillMount(初始化组件只调用一次)--->render(创建虚拟 dom,进行 diff 算法，新的 dom 树在此处进行，不能更改 state)--->componentDidMount(组件渲染之后调用一次)

- 参数准备(constructor(){state,props})---->即将挂载(componentWillMount)----->虚拟 dom 计算，diff(render)---->挂载完成(componentDidMount)
