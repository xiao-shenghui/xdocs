# 面试题
```js
let a = {
    i: 1,
    valueOf() {
        return this.i++
    }
}

if (a == 1 && a == 2 && a == 3) {
    console.log("i love you~");
}
```

```js
let a = [1, 2, 3]

// shift  删除数组的第一个元素    
// 复杂数据和普通数据比较时会调用valueOf  toString
a.valueOf = a.shift
if (a == 1 && a == 2 && a == 3) {
    console.log("i love you~");
}
```
```js
// mvvm  数据改变页面刷新 页面改变数据刷新
// 当我数据刷新改变时我需要去干点什么.....

// 怎么样去干点事?在什么去干?
// Object.defineProperty()
// 参数一:要操作的对象
// 参数二:要操作的新的属性  
    // 如果这个属性不存在就会默认添加
// 参数三:一个对象  
    // 对象里面都是对第一个参数对象的属性的精细化操作
let obj = {
    name: 'wc'
}
let value = obj.name;
Object.defineProperty(obj, 'name', {

    get() {  
    //访问器 当obj里面的name被访问时就会执行
        console.log('name被访问了...');
        return value
    },
    set(val) {  
    //修改器 当obj里面的name被修改时就会执行
    // val是新值
        console.log('name被修改了');
        value = val
    }
})
console.log(obj.name);
obj.name = 'xq'
console.log(obj);
```
```js
let i = 1
Object.defineProperty(window, 'a', {
    get() {
        return i++
    }
})
if (a == 1 && a == 2 && a == 3) {
    console.log("i love you~");
}
```
```js
let obj = {
    2: 3,  //2:1
    3: 4,   //3:2
    length: 2,  //3  4
    push: Array.prototype.push
}

obj.push(1);   //2:1
obj.push(2);
console.log(obj);  
```
```js
let arr = [1];   //1  2
arr.push(2);
console.log(arr);
// 对数组最后面添加一个新元素  
// 这个新元素的索引怎么算?索引是原来的length
// 将数组的length改变  length+1
// 返回push过以后的长度  
```
```js
// 手写push
let arr = [1, 2]   
//__proto__    函数prototype也有__proto__
Array.prototype.myPush = function (...args) {
    for (let i = 0; i < args.length; i++) {
        this[this.length] = args[i]  
        //this.length 当数组长度发生改变 length会自动变
    }
    return this.length
}

console.log(arr.myPush(5, 6, 8, 9));   //3
console.log(arr);
```
```js
function double(num) {
    return num * 2;
}
function square(num) {
    return num ** 2;
}
// console.log(double(10));
// console.log(square(10));

// 需求：给一个数字，先乘以2，再平方
let count = 12;
let res = square(double(count))
console.log(res);
```
```js
let add2 = x => y => z => x + y + z;
console.log(add2(10)(20)(30));
```
```js
// 手写filter
Array.prototype.myFilter = function (fn) {
    let newArr = []
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i)) {
            newArr.push(this[i])
        }
    }

    return newArr
}
let arr = [1, 2, 3, 4]
let newArr = arr.myFilter(function (item, index) {
    return item > 1
})
console.log(newArr);

// let newArr = arr.filter(function (item, idnex) {
//     return item > 1
// })
// console.log(newArr);

// filter写在了哪？
// filter的实参形参 传递了什么？
// filter里面的this是谁？
// filter过滤时怎么通什么的值得到是否符合要求的
// filter返回了什么？
```
```js
function Dog(name) {
    this.name = name;
}
Dog.prototype.bark = function () {
    console.log('wangwang');
}
Dog.prototype.sayName = function () {
    console.log('my name is ' + this.name);
}
function _new(Fn, ...args) {
    //=>完成你的代码 
    // let obj = {}
    // if (typeof Fn != 'function') {
    //     throw new TypeError('Fn is nat a constructor')
    // }
    if (!Fn.hasOwnProperty('prototype')) {
        throw new TypeError('Fn is nat a constructor')
    }
    // obj.__proto__ = Fn.prototype
    let obj = Object.create(Fn.prototype)
    let res = Fn.call(obj, ...args)
    if (res) {
        if (typeof res == 'object' || typeof res == 'function') {
            return res
        }
    }

    return obj

}
// _new(666)
let sanmao = _new(Dog, '三⽑');
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三⽑"
// instanceof  判断一个对象的隐式原型是否会经过某个类的显示原型
console.log(sanmao instanceof Dog); //=>true
// TypeError
```
```js
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();  //2
getName();  //4
Foo().getName();  //1
getName();  //1
new Foo.getName();  //2
new Foo().getName();  //3
// new Foo()  obj => foo.prototype =>getName()
new new Foo().getName();  //3
```
```js
// call的原理
(function () {
    function mycall(context) {
        // 绑定this 传参 函数执行
        context = context ? Object(context) : window 
        //强制转换数据为对象类型

        // arguments 可以获取函数传递进来的所有实参  组成一个伪数组
        console.log(arguments);
        let arr = Array.from(arguments)
        arr.shift()  
        //删除需要绑定this的对象 这个对象是第一个实参
        // 隐式绑定
        // 将fn函数添加到对象里
        context.fn = this    
        //this 是隐式绑定fn.mycall(obj, 6, 8)   是fn函数
        let value = context.fn(...arr)    
        //将arr展开传参给 fn函数   6,8
        delete context.fn   
        //用完了 fn 还原对象 将fn删除
        return value
    }
    Function.prototype.mycall = mycall;

}())

function fn(num1, num2) {
    console.log(this);
    return num1 + num2
}
let obj = {
    name: "wc"
}
// fn.mycall()
let res = fn.mycall(obj, 6, 8)
console.log(res)
```
```js
// 函数接收参数的几种方式
// 1)形参接收
// 2)...args   rest参数
// 3)argumnets 直接获取所有的实参  组成伪数组

// 绑定this的情况
// 1)默认绑定 window
// 2)隐式绑定 .前面的
// 3)显示绑定 call   apply  bind
// 4)new 绑定 new出来的对象
```
```js
console.log(typeof {}); //object
console.log(typeof []); //object
console.log(typeof null); //object
// instanceof 判断对象是否经过某个类的原型对象
console.log([] instanceof Object);  //true
console.log({} instanceof Object);  //true
console.log(function fn() { } instanceof Object);  //true
```
```js
let obj = {
    name: 'wc'
}
let arr = [1, 2, 3]
function fn() {

}
// constructor 判断复杂数据很准 普通数据类型有小问题
console.log(obj.constructor == Object); //true
console.log(arr.constructor == Array); //true
console.log(fn.constructor == Function); //true
console.log('66'.constructor == String); //false
console.log((123).constructor == Number); //false
console.log(null.constructor == Number); //false
```
```js
// 让toString this绑定给123
console.log(Object.prototype.toString.call(123));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(function () { }));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));


// toString()

function checkType(res) {
    return Object.prototype.toString.call(res).slice(8, -1).toLowerCase()
}
console.log(checkType({}));
```