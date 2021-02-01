##### 设计模式精读
- [中介者模式](https://cloud.tencent.com/developer/article/1527809)
    - 用一个[中介](https://yq.aliyun.com/articles/455192)对象来封装一系列的对象交互。中介者使各对象不需要显示地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。
- [场景：解决循环依赖](https://mp.weixin.qq.com/s/w35WOPSR2Ahf3CRFDEFTgw)
-------------------------------
```
const memberA = new Member('美术')
const memberB = new Member('程序')

const picture = memberA.draw() // 美术画出图
const product = memberB.code(picture) // 程序按照美术画的图做产品
```
-----------------------------