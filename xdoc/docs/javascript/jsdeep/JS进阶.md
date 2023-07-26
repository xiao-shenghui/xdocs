# JS进阶
## 代码的预解析
### 数据的存储
> 为什么要对数据进行分类？  
> 为了最大化的利用存储空间，要根据不同的数据类型去分配不同的存储空间  
- 栈区:存储基本数据类型(一般小一点, 大小是`固定的`)
- 堆区:存储引用数据类型(函数，对象，数组)(一般大一点, 大小`不固定`)
- 地址：堆区中的数据，会在`栈区中存储`相应的`地址`。 方便我们的变量 找到对应的堆  
```js
var a = 10
var obj = {
    name: 'xq'
}
var obj2 = obj 
//将obj对应的地址 赋给了obj2
obj2.name = 'wc' 
//通过地址, 找到堆，修改数据后，obj和obj2都会堆数据改变
obj2 = [] 
//修改地址，重新开辟一个堆空间存放空数组
```

### 代码的预解析
> 在代码执行之前, 在每个`代码段`，对其整个代码进行的操作  
> 什么是代码段？  一个`script标签`或者`js文件`就是一个代码段  
> `下面`代码段, 可以使用`上面`代码段的数据.(因为代码是`逐行执行`的)  
> 预解析做了什么？ 提升(变量提升和函数提升)
- 预解析
	- var 声明的变量，提升声明到顶部
	- function 声明的具名函数，提升定义和函数体到顶部.
	- 每个函数有局部变量，局部用var 和function 声明的, 提升到局部的顶部。
	- 匿名函数不提升。 必须声明之后调用。
	- function 是一等公民，var提升无法覆盖function提升的同名函数。
	- if(){}里面，如果有function，只提升函数名
		- 进入if判断的话，才立即给函数名赋值函数体。
		- 没有进if判断的话，则只有函数名，没有值，值为默认的undefined
	- let声明的变量，不会提升，初始化赋值之前无法使用。

```js
console.log(fn);  //函数体
function fn() {
    console.log('我是fn函数');
}
var fn = 123

console.log(fn);  //123
```

## EC和作用域链
### 产生EC
> js代码分为全局代码和函数(局部)代码，局部代码只有函数调用才会执行。  
> EC: 执行上下文，也就是一个执行时产生的环境(内存空间)
> ECG: 当全局代码一开始执行的是时候，就会产生全局执行上下文，也就是ECG.
> EC(fn): 当每次函数调用时，就会产生一个新的EC，也就是新的执行上下文。  
- 入栈和出栈： EC产生后，会进入栈区，栈区的数据就是存储在EC里面的。 
- 栈的特点是先进后出，所以ECG一直在环境中的底层。
	- 当一个函数调用后，外界没有其`局部变量`的`引用`时(`闭包`)，就会销毁EC，也就是出栈。
```text
代码是怎么执行的？
1. 首先执行全局代码，产生ECG，ECG入栈，
2. 在执行全局代码的过程中, 遇到了函数调用，就会产生一个新的EC，这个EC也要入栈，
3. 直到整个函数执行完毕，EC出栈，接着执行全局代码....
4. 直到全局代码都执行完毕时, ECG出栈....
```
### EC(执行上下文)
> 每个EC都包括三部分: 局部变量，作用域链，this  
> 当EC内，要查找数据的时候，先找局部变量，找不到顺着作用域链去找父级的局部变量。  
> 作用域链： 指`声明函数`时，嵌套(父子)关系形成的链条。
> ECG: 全局变量 + GO(也就是window)
```js
var c = 30  //看似是var 实际上已经挂载到window上了 也即是go
window.c = 20
console.log(c);  //先找全局 找不到 去go中找
console.log(window.c);
```
### EC练习题画图流程
> 首先执行全局代码，产生ECG, ECG画入左边栈区。  
> ECG上如果时基本类型，直接带值，如果是引用类型，写地址名，同时在堆区写引用类型的数据。  
> 如果遇到了函数调用，产生EC，EC画入左边栈区。
> 执行函数体，自己的变量，以及作用域链查找变量。  
> 直到执行完全部代码，ECG出栈。

### 闭包
> 产生闭包：闭包实际上就是两个嵌套的函数，内部函数使用了外部函数的变量.  
> 从执行上下文来看：一个`不能被立即释放`的栈空间(EC)就是一个闭包  
- 作用：
	- 保存: 延长了函数内部局部变量的生命周期
	- 保护: 闭包中的变量说白了，还是局部变量，外界不能直接访问
	- 另一种理解: 有了闭包，我们就可以像使用全局变量一样，使用一个局部变量
```js
function fn(count) {
    return function (num) {
        return count + num
    }
}
var a = fn(5)
// console.log(a(2));   //7
// console.log(a(8));   //13
// console.log(a(9));  //14
```
```js
let a = 0;  //全局a let声明的变量，是全局变量，不提升，不挂载到window
b = 0;    //全局b 但是是在GO
function A(a) {
    A = function (b) {
        alert(a + b++);
    }
    alert(a++)
}
A(1);  // 1
A(2);  // 4
```
## 深入变量
### var 声明的变量
> 变量提升: 会提升到代码段的最前面，函数内会提升到函数的最前面  
> 挂载到window: 不加声明的变量，或者去全局上用var声明的变量，会挂载到window上。  
### let 声明的变量
> 不提升：不能提前访问，声明时赋值完以后才能使用  
> 不挂载：不会挂载到GO上  
> 不同名：不能用let重复声明同一个变量 
> 块级作用域： 会和{}形成块级作用域
### const 声明的变量
> 基本类型不能被修改: 如果该变量声明赋值后，是个基本类型，则不能被修改。
> 不提升：不能提前访问，声明时赋值完以后才能使用。  
> 不挂载：不会挂载到GO上。
> 块级作用域： 会和{}形成块级作用域

## 立即执行函数
> 在声明函数的同时，立即调用它。  
> 表达式，并且外界不能调用内部的数据。 
> 用()包裹起来，表示表达式。 
- 写法1：
```js
(function fn(){
	console.log(123)
})()
```
- 写法2：
```js
(function fn(){
	console.log(123)
}())
```
- 写法3： + 号隐式转换
```js
+function fn(){
	console.log(123)
}()
```
- 写法4： ！ 号隐式转换
```js
!function fn(){
	console.log(123)
}()
```
- 注意点：由于编译的问题，写立即执行函数时，记得前面写一个分号。
```js
// let obj = {
//     name: 'wc',
//     age: '100'
// }

// 注意点：写立即执行函数时 记得前面写一个分号
; (function () {
     console.log(6666);
})()
```
- 立即执行函数找数据, 和普通函数一样，也是根据`作用域链`查找
```js
(function () {
    console.log(b);  //und
    b = 2;
    console.log(a); // und
    var b = 3;
    console.log(b);  //3
})();

var a = 1;
```

## this绑定
### this的产生
> this 是什么时候产生的？ 又是什么时候确定的？  
> this产生：产生EC时产生的(函数调用)  
> 确定: 动态绑定的，根据绑定规则

### 绑定规则
- 默认绑定
- 显示绑定
- 隐式绑定
- new绑定

### 默认绑定
> 函数的独立调用时，函数的this指向window  
> 与函数嵌套,对象属性等无关.  
> 只要调用时是独立调用, 无论父级是谁, 无论中间经历了什么, this都指向window.
```js
function fn() {
    console.log(this);
}
fn() //window
// 所谓独立调用,就是fn(), 
// 前面没有加对象.,
// 也没有用new创建,或用call和apply和bind修改.
```
```js
function fn() {
    console.log(this);
}

function gn() {
    console.log(this);
    fn() //window
}
function kn() {
    console.log(this);
    gn() //window
}

kn() //window
```
```js
let obj = {
    name: 'wc',
    fn: function () {
        console.log(this);
    }
}

let gn = obj.fn
gn()  //window
```
### 隐式绑定
> 通过对象`打点`调用函数,就是隐式绑定  
> 隐式绑定会把函数的this,指向`打点`前面的对象  
```js
function fn() {
    console.log(this);
}

let obj = {
    name: 'xq',
    fn: fn
}
obj.fn() //obj , 隐式绑定
```
```js
let obj = {
    name: 'wc',
    fn: function () {
        console.log(this);
    }
}

let obj2 = {
    name: 'xq',
    gn: obj.fn
}

obj2.gn() //obj2 , 隐式绑定
```
### 显示绑定
> call, apply, bind 方法
```js
// 函数实际上也是一个对象，
// 函数有 call apply bind 方法

// call  显示绑定this
    // 1)显示绑定this, this绑定给第一个参数(对象)
    // 2）让函数执行
// fn.call(obj)  //fn的this => obj
// fn()  //window
let obj = {
    name: 'wc'
}
function gn(num1, num2) {
    console.log(this, num1, num2);
    // {name: 'wc'}, 5, 10
}
gn.call(obj, 5, 10)

// apply 显示绑定this
// 作用和call一样，但是参数为数组
gn.apply(obj, [5,10])

// bind 显示绑定this
// 写法和call一样，但是不执行函数
// 返回绑定好this的函数，
let fn = gn.bind(obj, 111, 222)
fn();
```

### 内置函数的this
```js
arr.forEach( function (item, index) {
      console.log(this);
    }, 
    { name: 888 }
)
// 如果没传第二个参数，this是window，等于拆解出来，全局写
// 如果传了,this指向第二个对象.
// 此时this是{ name: 888 }
```

### new绑定
- new 做了什么?
```js
// 定义一个类(构造器/构造函数) 叫Person  
function Person(name) {
    this.name = name
    // new 做了什么
    // 1）创建了新的对象
    // 2）把函数的this绑定给, 这个新创建的对象
    // 3）函数执行
    // 4）返回这个对象  （只要new一次就会得到一个新的对象）
}

// 使用一个类  new Person()
// new出来永远都是一个对象
// 只要new一次, 就会得到一个新的对象

let obj = new Person('wc');
console.log(obj);


// console.log(new String('123456'));
```

### 绑定的优先级
```js
// new > 显示绑定 > 隐式绑定 > 默认绑定

// new 不能同时和call apply使用
// 因为call apply 都会让函数执行
```
### 箭头函数
- 认识箭头函数
```js
// 如果形参只有一个, 可以省略声明处的()
let fn = num1 => {
    console.log(num1 * num1);
}
// 如果只有一条语句，可以不写{} 
let fn = a => a * a;
// 如果没有形参()不能省
// 如果不想return{}不能省
let fn = () => { 1 + 1 };

// 只有一条语句, 又想return对象
// 使用()将其包裹即可
let fn = () => ({ name: 'wc' });
```
- 箭头函数的this
```js
// 箭头函数中没有自己的this
// 回去找父级的this
// 和作用域链是一样 去ECS找父级
function an(){
    return () => {
        console.log(this);
    }
}

an()(); //此时this是an函数


// 注意: 对象不会产生EC, 所以对于箭头函数而言, 对象不能当爹
let obj = {
    gn: () => {
        console.log(this);
    },
    fn: function fn {
        console.log(this);
    }
obj.gn(); //window, 无法隐式绑定,因为没有自己的this
obj.fn(); //obj

// 同理,箭头函数无法显示绑定
obj.gn.call('hello'); //window
```

### 练习题
```js
// 立即执行函数
; (function () {
    console.log(this); //window
})();
// 立即执行函数的this, 是window, 
// 就认为是独立调用,默认绑定

let btn = document.getElementById("btn");
function fn() {
    console.log(this);
}
btn.onclick = fn();   //函数的独立调用 this是window

btn.onclick = fn  //  btn节点
```

## OOP 面向对象
### 内置类
```js
// Number  类
var num = new Number(10)  //new 出来就是一个对象
console.log(num);  //{10}

// String 类
let str = new String('hello')
console.log(str);

// Boolean 类
let b = new Boolean()
console.log(b);  //{false}

// Date  类
let d1 = new Date()
console.log(d1);
console.log(d1.getDay());

// Math  一个不能被new的类  叫单体内置类
// Math is not a constructor
new Math()

//伪数组 {0：'a',1:'b',length: 2}   是对象
```
### 对象的创建
```js
// 判断某个对象经历过哪一个类
// instanceof
console.log(obj instanceof Object);

// 字面量创建对象的缺点：
// 1）有大量重复的代码
// 2）浪费内存空间

// 工厂函数批量产出对象
// 缺点： 代码量少，但仍旧占用一样的内存空间
function creatObject(name, age) {
    let obj = {}
    obj.name = name
    obj.age = age
    return obj
}
let obj = creatObject('xq', 18)

// 构造器 new 创建
// 缺点： 代码量更少了，但仍旧占用一样的内存空间
function Fn(name, age, address) {
    this.name = name
    this.age = age
}
let obj2 = new Fn('xq', 18)
```

## 原型和原型对象
### 公有属性和私有属性
```js
// 公有属性: 沿着__proto__(原型链)找,能找到的都是公有属性
// 私有属性: 自己身上的属性
// hasOwnProperty  判断某个属性, 是否是该对象的私有属性
console.log(obj.hasOwnProperty('name')); 
// in 判断一个对象中是否有某个属性，无论公有或私有
console.log('push' in []);
```
### 隐式原型__proto__
```js
// 每个对象, 都有一个__proto__属性，
// 该属性指向该对象的构造器的prototype (new的过程之一)。
// __proto__ 实际上是一个对象, 叫隐式原型对象

// 原型链: 沿着__proto__ 查找到 类的prototype对象 ，
// 如果找不到，再沿该原型对象的__proto__, 查找另一个原型对象
// 作用域链:先找自己的EC中的AO(变量),
// 如果找不到, 就去父级找, 最终ECG中有obj,就算找到了
```

### 显示原型prototype
```js
// 每个构造器(类)上都有一个叫prototype属性
// prototype   叫显示原型
// 如果一个对象是被某个构造器new出来，
// 那么这个对象的__proto__，指向构造器的prototype对象

// prototype默认有一个constructor属性，指向该构造器。

// 三角关系图：
// obj (通过__proto__ 指向) Fn.prototype (通过constructor属性 指向) Fn
```
```js
// 就算是字面量声明的,你就当作js引擎内部帮你new了
let arr = [1, 2, 3]
// console.log(arr.__proto__);
// console.log(arr.__proto__ == Array.prototype);   //true
```
```js
// 因此，写在prototype上的，叫公有方法或属性
Person.prototype.fn = function () {
    console.log('这是每一个创建出来对象的公有方法...');
}
```

## 继承
> 继承：儿子可以得到父亲的一部分东西.
> 某些相似的类，new的对象们想一起使用类似的方法。

### 原型继承
```js
// Son.prototype = new Person()  核心代码
// 改变了Son的原型对象，
// 让所有的new Son() 都能通过__proto__ 去找到obj
function Person(name, age) {
    this.name = name
    this.ahge = age
}

Person.prototype.obj = {
    name: 'wc',
    age: 18
}

function Son(name, age) {
    this.name = name
    this.ahge = age
}
Son.prototype = new Person()
// 让以后new的Son不再找默认的Son原型对象，
// 而是去找 new 的 Person 对象, 进而实现继承。
Son.prototype.constructor = Son   
//手动修改原型对象中con的指向

new Person().obj.name = 'xq'
new Son().obj.name
```
```js
// 缺点: this.name = name 和 this.ahge = age 多次书写了
// 可以调用父类函数, 改变this指回自己,以节省代码
// 也就是组合继承
```
### 组合继承
```js
// 组合继承：
// 1） 核心：改变构造器的原型对象的指向
// Person.call(this, name, age)   
// 利用显示绑定, 调用代码,改回this,让其不受this改变的影响
// 从而达到代码简写，
// 不会影响子类的私有属性
// 2)缺点：会让父类多次执行

function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.say666 = function () {
    console.log('666...');
}

function Son(name, age, addres) {
    // this.name = name
    // this.ahge = age
    console.log(this);  //新对象
    Person.call(this, name, age)   
    //call  Person绑定给了new Son()
    this.addres = addres
}

Son.prototype = new Person()
Son.prototype.constructor = Son

new Son('wc', 18, 'bj')
```

### 寄生组合继承
```js
// Object.create(obj)  创建一个对象
// 创建一个对象，让这个对象的__proto__ 指向 obj
let obj = { name: 'wc'}
let obj2 = Object.create(obj)
// console.log(obj2.__proto__ === obj); true

// 利用这个API的特性,让子类显示原型的__proto__指向 父类的显示原型
// 从而让子类new出来的对象的__proto__, 间接指向 构造器的prototype
// 实现继承
// 寄生到一个新创建的对象上, 不再与new Person相关.
Son.prototype = Object.create(Person.prototype)
Son.prototype.constructor = Son
```
```js
function Person(name, age) {
    this.name = name
    this.ahge = age
}
Person.prototype.say666 = function () {
    console.log('666...');
}

function Son(name, age) {
    Person.call(this, name, age)
}

// 创建一个对象 对象的隐式原型指向 父类的显示原型
// 让子类的显示原型指向这个创建出来的对象
Son.prototype = Object.create(Person.prototype)
Son.prototype.constructor = Son

let obj = new Son()
obj.say666()
```

### ES6继承
#### ES6声明类
```js
// ES6中声明一个类, 只能当作类使用, 不能作为普通函数
// 声明关键字：class
class Person {
    // 当我new Person()  会自动调用constructor函数
    // constructor 的this指向新创建的对象
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    // 只要不写在constructor里面就是公有的
    say66() {
        console.log('666');
    }
    // 只要加了static的,就是类静态(私有)的
    static name = '123'
    // 只要不加static, 并且是属性赋值的,就是new对象的私有属性
    // 等同于写在constructor里面,带this.xxx的
    age = '18'
}
let obj = new Person('wc', 18)
console.log(obj);
```

#### 继承类
```js
// extends 继承
// 子类构造器 继承 父类构造器的私有属性和私有方法(static)
// 子类构造器new出来的对象实例，会继承父类的显示原型的公有方法和属性。(prototype)
// 原理：寄生组合继承，同时子类构造器的__proto__ 指向 父类。
class Son extends Person {
    constructor(name, age, address) {
        // 调用父类的constructor 同时this绑定给我new Son()
        super(name, age)
        this.address = address
    }

    eating() {
        console.log('吃.....');
    }
}
let obj = new Son('xq', 20, 'bj')
console.log(obj);

obj.eating()

let perObj = new Person()

perObj.eating()

console.log(Son.name);//继承静态(私有)属性和方法
```

## JSON
### JSON数据格式
```js
// JSON:主要用来前后端互通信息的一种数据格式
// JSON实际上就是前后端交互最常用到的数据格式

// 学习JSON主要学习JSON的格式：
//   格式一："hello json"  不能使用单引号
//   格式二：对象的形式  对象的键必须使用 ""
//   格式三：数组的形式

// JSON和普通js对象的区别：
// 1）对象的键名必须使用""
// 2)JSON中数据的值不能是函数
// 3)JSON中没有注释

// https://www.bejson.com/  用来验证json格式是否正确

// 存储复杂数据类型时，需要序列化
localStorage.setItem('obj', JSON.stringify(obj));

// 反序列化: 将json格式的数据变为js中能被识别的数据
console.log(JSON.parse(localStorage.getItem('obj')));
```

### 封装数据存储工具
```js
class Cache {
    constructor(isLocal) {
        // 
        this.storage = isLocal ? localStorage : sessionStorage

    }
    setItem(key, value) {
        if (value) {
            this.storage.setItem(key, JSON.stringify(value))
        }
    }

    getItem(key) {
        let value = this.storage.getItem(key)
        if (value) {
            return JSON.parse(value)
        } else {
            return value
        }
    }

    removeItem(key) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }

    length() {
        return this.storage.length
    }
}


let $ = new Cache(true)

let b = new Cache()
```

## with,eval和严格模式
### with
```js
/*
作用域链：数据的查找机制

with：扩展一个语句的作用域链(破坏作用域链)
*/

let obj = {
    uname: 'xq',
    uage: 18
}
let uname = 'zs'

with (obj) {
    // let uname = 'wc'
    // 找uname 先找自己的 自己没有去obj中找 obj也没有再去ECG中找
    console.log(uname); //xq
}
```
### eval
```js
let age = 10
let jstr="var msg = 'haha';console.log(msg);console.log(age)"

// eval 是js中内置的函数 
// 用来将一片字符串, 像js代码一样去执行
eval(jstr) // haha 10
// 不安全： eval执行时不是一个沙箱，会受外界影响
```

### 严格模式
> ES5中提出了严格模式, "use strict"  
```js
"use strict"
// 1、不能使用没有声明关键字的变量
// uname = 'wc'
// console.log(uname);

// 2、形参不能重名
// function fn(x, y, z, x) { }

// 3、不能使用老的8进制数据的写法
// let num1 = 0x123  //16进制
// let num2 = 0013  //8进制
// let num3 = 0o13  //新的8进制写法

// 4、不能使用with语句
// let obj = {
//     msg: 'hello'
// }
// with (obj) {
//     console.log(msg);
// }

// 5、严格模式下，函数独立调用，不会默认绑定this，this是und
// 非严格模式下，函数独立调用，this默认绑定为window
// function fn() {
//     console.log(this); // und
// }
// fn()
// console.log(this); //window

// 6、在严格模式下，js串中定义的数据，不能被外界使用
// let a = 10  
// let jsstr = "var msg = 'haha';console.log(msg);console.log(a)"
// eval(jsstr) 
// console.log(msg); //报错
```
## 柯里化
> 分工明确，每个函数只做简单的事情
```js
// 未柯里化的函数
function add(x, y, z) {
    return x + y + z;
}
console.log(add(20, 10, 30));

// 柯里化处理的函数
function add2(x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        }
    }
}
console.log(add2(10)(20)(30));

let add2 = x => y => z => x + y + z;
console.log(add2(10)(20)(30));
let add3 = x => { return y => { return z => x + y + z } }
```

## 错误和异常对象
```js
// TypeError 类型错误
let a = 10
a()
// ReferenceError  引用错误
console.log(b);
// RangeError  范围错误
let arr = new Array(-10)
// SyntaxError 语法错误
let obj = {
    let a = 10
}
```
```js
// throw 抛出一个错误(异常)
throw '你的参数不合法'
// 阻止代码继续执行

// 捕获错误
// 如果不确定代码会报错，捕获后就不影响后续执行
try {
    console.log(a)  //这行代码有错误
} catch (err) {
    console.log(err);   //错误被catch捕获  
    // 捕获不影响下面的代码执行
}
console.log(1);
```
