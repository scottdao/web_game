# 1.call方法的使用：参数是基本数据类型

                 function sum(x,y){
                    return x+y;
                 }
                 function  callEn(num1,num2){
                    return sum.call(this,num1,num2);
                 }
                 表示：callEn函数对sum函数的功能的一个继承；


# 2.apply方法的使用：参数是数组

            function applyEn(n1,n2){
                    return sum.apply(this,[n1,n2]);
                }


# 3.扩充函数赖以运行的作用域；

                window.name = 'liu';
                obj = {name:'bushiliu'};
                function type(){
                    console.log(this.name);
                }
                type.call(obj);


# 4.通过call实现继承；

             //方法；
                function method(a,b){
                    return a+b;
                }
                //自定义对象；
                function NewObj(x,y){
                    this.x = x;
                    this.y = y;
                    return this.x*this.y;
                }
                var newType = new NewObj(20,30);
                method.call(newType,newType.x,newType.y);


# 5.作用域链和执行环境。

        执行环境定义了变量和函数有权访问其他数据，决定了他们的各自的行为。
        *每一个执行环境都有一个与之关联的变量对象。环境中定义的所有变量和函数都保存在这个对象中。
        虽然我们代码无法访问它，但是解析器在处理数据时会在后台执行它。


# 6.垃圾回收机制

        它有两种方法，1.标记法，2.引用计数法；
        function test(){
            var a = 1;
            var b  = 2;
        }
        test();
        块级作用域：es5中不存在块级作用域
        test();
        function test(){
            for(var i = 0;i<=5;i++){
                console.log(i)
            }
            console.log(i);
        }
        闭包： //闭包；执行环境和作用域链
                //封闭性，使得函数内部的变量在函数外部进行使用。
               
                function first(a){
                    var temp = a;
                   return function(a){
                        temp += a
                        return temp;
                   } 
                }
                var f = first(2);
               console.log(f(10));
               console.log(f(20));
               console.log(f(5));
/**********************************分割线*************************************/

# 7.面向对象(javascript模拟创建对象)：

          7.1第一种创建方式,工厂模式创建对象；
            function dx(name,age,yz){
                var obj = new Object();
                obj.name = name;
                obj.age = age;
                obj.yz = yz;
                obj.sayFu = function(){
                    console.log(this.name);
                }
                return obj;
            }
            7.2创建对象方式，构造函数式
            function Man(name,age,sex){
                this.name = name;
                this.age = age;
                this.sex = sex;
                this.sayFu = function(){
                    alert('名字'+this.name);
                }
            }
            var f1 = new Man('scott',18,男);
            注：var f2 = new Man('scott',18,男);
            console.log(f1==f2)//false
            //同一类的模板创建的实例是不同的；


# 8.原型；

            所有实例对原型的所有的方法和属性，都会达到共享。
            利用isPrototypeOf判断对象是不是属于另一个对象的原型
             //原型
             function Person(){
             }
             var obj = Person.prototype;
             obj.name = 'scott';
             obj.age = 29;
             obj.sex = '男';
             var f1 = new Person();
             console.log(f1.__proto__==obj);//true,原型对象
             console.log(f1.__proto__.__proto__.__proto__);//null
             console.log(f1.__proto__.__proto__)//Object
             console.log(f1.__proto__.__proto__.constructor)//Object的构造函数


     /**
     * 原型实现原型构造器；Object.defineProperty,重造构造器。也可以实现双向数据绑定。
     *Object.defineProperty方法中的几个参数的设置。
     *属性描述中 ：
     *1.configurable设置为true,表示对象上的属性可以删除或更改。默认为false.
     *2.enumerable设置为true时，该属性才能被枚举出来。默认为false.
     *3.value表示属性的值。
     *4.writable为true时，属性值才能被改变。默认为false.
     *5.get和set为属性提供一个getter和setter方法。
     */
    var some = {
    }
    Object.defineProperty(some,'name',{
        value:'scott'
        configurable:false,
        enumerable:true,
        writable:true
    })
    //some.name = 123
    console.log(some)
    function Two(){
     }
     Two.prototype = {
        age:18,
        name:'scott',
        type:'function'
     }
    Object.defineProperty(Two.prototype,'constructor',{//为原型重设构造器。
            enumerable:false,
            value:Two
    })
     var two = new Two();
     console.log(two)

            组合设计模式,既有私有属性，又有公有属性。
            function Person(name,son,age){
                    this.name = name;
                    this.son = son;
                    this.age = age;
                    this.say = function(){
                        return this.name;
                    }
            }
            Person.prototype={
                    constructor:Person,
                    i:123,
                    job:234
            }
            var person = new Person('s','1','13');
            console.log(person); 

            /**
         * 稳妥构造模式；不能使用this对象。
         */
        function Person(age,name,type){
            var obj = new Object();
            obj.age = age;
            obj.name = name;
            obj.type = type;
            obj.syName = function(){
                
            }
        }



# 9面向对象

        /**
        *通过hasownProperty()来判断属性是属于实例还是原型的，
        **/
        function SecondClass(){
        }
        SecondClass.prototype.name = 'scott';
        SecondClass.prototype.age = 18;
      var se = new SecondClass();
        se.name = 'less'
        alert(se.hasOwnProperty('name'))//true

       /**
         * *in操作符判断属性是否为实例属性和原型属性。
         */
        function SecondClass(){
        }
        SecondClass.prototype.name = 'scott';
        SecondClass.prototype.age = 18;
        var se = new SecondClass();
        //se.name = 'less'
        alert('name' in se) //true


       /**
         * 判断是否为原型属性。
        */
       function hasPrototype(object,name){
            return !object.hasOwnProperty(name) && name in object
        }
        //console.log(111)
        console.log(hasPrototype(se,'name'))//true


# 10实现each方法：

            /**
             * 遍历多维数组，实现each方法；
             */
            Array.prototype.each = function(callBack){
                try{
                    this.count = this.count || 0;//计数器
                    if(this.length>0 && callBack.constructor == Function){//能遍历的条件；
                            while(this.count<this.length){
                             var ele = this[this.count] 
                             if(ele && ele.constructor == Array){
                                ele.each(callBack)
                             }else{
                                callBack.apply(ele,[ele,this.count,this])
                             }
                            this.count++;
                            }
                            this.count = null;//释放内存；
                    }
                }catch(e){

                }
                return this;
            }



# 11 继承，普遍存在三种继承方式；

         * 原型继承：父类实例直接赋值给子类的原型。继承父类的原型，
         * 父类的私有属性的继承造成不方便。
        function Father(name,age,type){
            this.name = name ;
            this.age = age;
            this.type = type
        }
        var f = new Father('s',18,'j');
        function Son(){}
        Son.prototype = f;
        var son = new Son()
         console.log(son)

         类继承：call和apply只继承模板不继承原型对象
         function Father(age,sex,type){
            this.age = age;
            this.sex = sex;
            this.type = type;
         }
         Father.prototype.say = 'id'
         function Son (age,sex,type,id){
            this.id = id;
          Father.call(this,age,sex,type)
         }
         var son = new Son(18,'nv',3,'12')
         console.log(son)

          //最合理的继承方式，既能继承父类原型对象又能继承父类的模板。
         //混合继承会继承两次父类构造函数，继承一次原型对象。
          function Father(age,sex,type){
            this.age = age;
            this.sex=sex;
            this.type = type;
         }
         Father.prototype.say = 'id'
         var father = new Father()
         function Son (age,sex,type,id){
            this.id = id;
            Father.call(this,age,sex,type)
         }
         Son.prototype = father;
         var son = new Son(18,'nv',3,'12')
         console.log(son)

#  接口的实现方式

### 1.注解描述的方式:

        优点：程序员可以参考
        缺点：他只是一个属于一个文档的范畴。方式过于松散，无检查接口的实现。

### 2.属性检测的方式：

        缺点：能实行类里的接口，无法实现原型方法，无面向对象的思想。

        //检测类所有的接口是否实现方法。
        function checkCompsite(instance){
           if(!IsImlements(instance,'compsite','formItem')){
                throw new Error('Object does not implement a required interface!')
            }
       }
     function IsImlements(object){//方便解耦。
       for(var i =1 ; i<arguments.length;i++){
                var interfaceName = arguments[i]
                var interfaceFlag = false;
         for(var j = 0;j<object.inplement.length;j++){
                if(object.inplement[j] == interfaceName){
                             interfaceFlag = true;
                            break;
                    }   
                        
                }
                if (!interfaceFlag) {
                        return false
                }
            }
            return true;
        }



### 3.鸭式辩型法；

        鸭式辩型法：一个类实现接口的目的，把接口的方法都实现。完全面向对象，
        代码实现统一，也解耦。
         
         接口实现2个参数，
         
         参数一：接口的名称
         
         参数二：接收方法名称的集合 

        接口的劣势：对于中小型程序，接口的优势体现不出来，只能增加复杂度。

        实现接口优势：提高代码的复用性，对于程序员来说那些类使用了什么方法，减少类与类之间的冲突，实现解耦。测试和调试变得更加轻松。

# 设计模式：

## 单体模式

 1 简单单体
    
    对象字面量，简单单体；划分命名空间（区分代码）。    
    
 
 2 闭包单体

      创建自己的块级作用域，创建私有变量；保护变量，保护数据的目的。防止内存泄露。

3.惰性单体

        通过变量控制返回所需的方法和变量。

4.分支单体

        判别浏览器类型。