# ES6及6+
## let和const
```js
// let 声明的
	// 1. 变量名不能重复
    // 2. 会和{}形成块级作用域
    // 3. 会形成暂时性死区 就是不能提前访问

// 对于for中的let,
// 每一次循环都会有一个独一无二的i, 
// let i 和{}形成块级作用域
for (let i = 0; i < 10; i++) {

}
console.log(i);

// const 和let一样
// 区别
	// 1. 声明时必须赋值
	// 2. 不能修改值, 对栈区的数据而言
	// 3. 不能修改地址, 对堆区的数据而言
```
## 解构赋值
### 数组的解构
```js
// 通过解构   --》   赋值  来拿数组中的元素
// 根据类型解构

// 数组解构：根据顺序解构
let arr = ['wc', 'xq', 'lh']
let [a, b, c] = arr
console.log(a, b, c);
let [, , d] = arr
console.log(d);
```
### 对象的解构
```js
// 对象的解构：键名必须一致
let obj = {
	name: 'wc',
	arrO: [1,2]
}
// 起别名的解构
let {name: uname} = obj
// 根据键值类型解构
let {name, arrO: [a1,a2]} = obj
// 赋予默认值的解构
let {age = 'ss'} = obj
```
### 字符串的解构
```js
// 字符串的解构
// （1）可当作数组(解构值) 
let [a,b,c,d] = 'malu'
// （2）可当作对象(解构长度)
let {length: len} = 'malu'
```

### 函数形参的解构
```js
// 根据形参类型，按解构规则解构
function foo(a = 20, c = 30) {
    return a + c
}

console.log(foo(10, 20));

 function foo({ x = 1, y = 2 }) {
    return x + y
}
console.log(foo({ y: 5 }));
```

## 展开运算符
> `...` 放在`等号右边`时, 叫扩展运算符，点运算符。  
> 可以把一个`复杂数据类型`转为用`逗号隔开`的`序列`。  
> `...` 放在`等号左边`时, 叫rest收集参数，点运算符。  
> 可以把一个`逗号隔开`的`序列`转为`数组`。
### 扩展运算符  
```js
let arr = [1, 2, 3];
// ... 放在等号右边，表示展开
let b = [...arr];

// 拼接数组
let arr2 = [4, 5, 6];
let arr3 = [...arr, ...arr2];
console.log(arr3);
// 快速求最大值
Math.max(1, 2, 3,4,5,6);
Math.max(...arr3);
Math.max.apply(null, arr3);

// 函数实参展开
function foo(a, b, c) {
    return a + b + c
}
console.log(foo(...arr));
```
### rest参数
```js
// ... 放在等号左边，表示rest收集
function foo(...args) {
    console.log(args); //[1,2,3,4]
    console.log(arguments); //[1,2,3,4]
}
foo(1, 2, 3, 4)

// rest 参数和解构赋值一起应用
let arr = [1, 2, 3]
let [a, ...b] = arr
console.log(a, b); // 1,  [2,3]

// 接收剩余参数
function foo(array, ...args) { // rest参数
    array.push(...args); //扩展
    console.log(...array); //扩展
}
let arr = [1, 2, 3];
let arr2 = [4, 5, 6]
console.log(foo(arr, ...arr2)); //扩展
```

## 箭头函数
### 语法规则
```js
// 如果只有一个形参，声明处的()可以省略
// 如果只有一条函数体，函数体的{}可以省略, 
	// 并且执行的结果会被return返回出去
// 如果没有形参，声明处的()不可以省略
let fn = a => a++;
let fn2 = () => console.log(2);
console.log(fn(1)); //2

// 如果不想将函数体返回，则函数体必须加{}
// 如果想将对象返回出去，则函数体可以加()包裹
let fn3 = a => {a++;}
console.log(fn3(1)); //undefined
let fn4 = () => ({name: 'wc'});
```

### 箭头函数的this
```js
// 箭头函数自己本身是没有this，
	// 用this需要去找父级的this
// 箭头函数找this, 就像闭包找值一样去找this。
	// 根据定义时父级的EC决定
	// 所以箭头函数也不能用call, apply, bind 改变自己的this,因为没有自己的this.
let p = {
    name: 'wc',
    getName: function () {
        console.log(this); //p
        setTimeout(() => {
            console.log(this); //p
        }, 1000)
    }
}
p.getName();

// 什么场景不适合箭头函数?
// 1. 箭头函数不能用作类，因为没有prototype, 也没有自己的this
// 2. 任何要用自己this的地方，要用arguments的地方。
```

## ES6对于对象的扩展
### 属性和方法简写
```js
// 属性简写
// 属性名和属性值变量一致时，省略键名
let a = 'wc'
let b = '18'

// 老写法，定义属性名为a, 值为a变量值
let obj = {
    a: a,
    b: b
}
// 新写法，
let obj = {
    a,
    b
}

// 方法的简写
// 不再写:function()
// 直接写:fn(){}
// 老写法
let obj = {
    say666: function(){
    	console.log('666...');
    }
}
// 新写法
let obj = {
	say666(){
		console.log('666...');
	}
}
```

### Object静态方法
```js
let obj = {
	name: 'wc',
	age: '18'
}

Object.keys(obj) //由obj的键名组成的真数组
Object.value(obj) //由obj的键值组成的真数组
Object.assign(targetObj, obj1, obj2) 
//将obj的属性和值复制到某一个对象上
Object.defineProperty(obj, 'name', {
	get(){ //获取时执行
		return val
	},
	set(newVal){ //设置时执行
		val = newVal;
	},
	value: 'wc',
	enumerable: false, //能否被枚举
	configurable: false, //能否被删除
})
// 精细化操作对象的某个属性
// Vue2响应式原理，Vue3改用new Proxy(obj, handleFn); 代理对象
```
### 深copy
```js
// 最简单的深拷贝
JSON.parse(JSON.stringfy(obj));
// 缺点：无法拷贝函数

// 手写深拷贝
// 递归思想
// 每次向内传递一个 newObj 新结果, 
// 回归时回收到最外层
let obj = {
    name: 'add',
    address: {
        province: 'zz',
        gdp: 1222
    }
}

function deepClone(obj){
    if (target == null) return null;
    if (target instanceof Date) return new Date(target)
    if (target instanceof RegExp) return new RegExp(target)
    if (typeof target !== 'object') return target
    // ..... 还有很多其它的数据类型.......
    // 定义一个copy, 用来接收结果。
    let copy;
    if(Array.isArray(obj)){
        // 数组的话，定义为空数组
        copy = [];
        // 遍历索引
        for(let item of obj){
            // 用push方法，
            // 里面传深拷贝后的结果(也就是只有普通类型能返回，不然会继续遍历)
            copy.push(deepClone(obj))
        }
    }
    else{
        copy = {};
        // 遍历键名
        for(let i in obj){
            // 用键值添加的方法，
            // 里面传深拷贝后的结果(只有普通类型能返回，不然会继续遍历)
            copy[i] = deepClone(obj[i]);
        }
    }
    
    // 最终就返回结果。
    return copy;
}

let obj2 = deepClone(obj);
obj.name = "hello"
console.log(obj);
```

## Symbol
> 可以创建一个唯一值，保证对象的键唯一
```js
// 调用Symbol函数时可以传参,标识符
let s = Symbol('s')
let a = Symbol('a')
console.log(typeof s); //Symbol
console.log(a, s); //...
console.log(a === s); //false

let obj = {
    // 字面量声明时使用symbol作为键名,
    // 需要加[], 不能省
    [a]: '111'
}
```
```js
// 防止键名重复覆盖，找Symbol类型的键值时，也要通过标识符查找
let obj1 = {
	name: 'wc',
	xq: 'xq'
}

let name = Symbol('name1')
obj1[name] = 'zs'
console.log(obj.name); //'wc'
console.log(obj[name]); //'zs'
```

## Proxy
> `new Proxy()` 可以得到一个代理对象。  
> 这个代理对象，可以代理所有键，无论深度。   
> 修改/查看了该代理对象，会执行配置函数，并且响应到原始对象上。
```js
let obj = {
    name: "wc",
    age: 18,
    address: "bj",
    arr: [1, 2, 3]
};

let objProxy = new Proxy(obj, {
    //  访问器  
    // target表示原始对象
    get(target, key) {
        console.log('访问了', key);
        return target[key]
    },
    set(target, key, val) {
        console.log('修改了', key, '为', val);
        target[key] = val
    }
})

console.log(objProxy.name); //'wc'
objProxy.age = 20;
console.log(objProxy.age); //20
console.log(obj); // 响应式 {name: 'wc', age: 20...}
```

## Set和Map类
### Set(集合)
> Set构造出来的对象中，同一个数据只能出现一次。  
> 可以理解为`中间没有空数据，且不重复的一维数组`
```js
let s = new Set()

// 添加/修改数据 .add
s.add(1)
// 删除数据 .delete
s.delete(1)
// 清空数据 .clear()
s.clear()
//检测是否有该值
s.has(1)
// 获取数据长度
s.size
// Set时一个可迭代对象，可以用for...of 遍历
```
```js
// 利用Set去重
// 转Set类型，然后转回数组
let arr = [1,2,3,3,4,4,5]
console.log(Array.from(new Set(arr))); //[1,2,3,4,5]
```

### Map(映射)
> Map构造出来的对象，键可以时任意类型  
```js
let m = new Map();

//添加/修改数据 .set
m.set({name: 'wc'}, 'xixi');
// 删除数据 .delete
m.delete({name: 'wc'})
// 查询访问数据 .get
m.get({name: 'wc'})
// 检测是否有该值
m.has({name: 'wc'})
// 获取Map对象 数据的长度
m.size
```

### WeakSet和WeakMap
> 弱引用：不能确保其引用的对象不会被垃圾回收器回收的引用。
> `Weak`: 回收时间取决于内部数据，强引用的指向。
```js
// WeakSet 和Set类似
// 只不过数据只能是对象 {} []
// WeakSet对自身的数据都是弱引用
let weakset = new WeakSet()
weakset.add({name: 'wc'});
weakset.add([1,2,3]);

//  WeakMap 和Map的类似
// 1. key只能是对象 {}
// 2. 对key对应的对象是弱引用
// 3. key和value都不能迭代.(不能使用for of, forEach)
let obj1 = { age: 18 };
let m = new WeakMap();
m.set(obj, 'wc');
```

## class定义类
### 基本使用
```js
// 使用class创建一个类
class Person {
    constructor(name, age) {
        this.name = name //对象的私有属性
        this.age = age
    }
    // 写在了peroson构造器的prototype上
    eating() {
        console.log('...吃');
    }
}
let obj = new Person('xq', 18)
obj.eating()
```
### 自定义规则
```js
// _属性名  不希望被外界直接访问
// 不打算用打点的形式直接修改和访问，
// 而是使用内部的方法修改和访问。

// #属性名 表示私有
// 不打算通过对象直接去找
// 而是通过内部的方法去获取
 class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
        this._address = 'bj'
        this.#id = '001'
    }

    #money = '10块'
    _version = '1.1.0'

    static name = '我是父类的静态(私有)属性'
    // 类的静态属性，只有类或者继承的子类能访问，
    // new出来的实例对象不能访问
    eating() {
        console.log('...吃');
    }

    get address() {
        console.log('被访问了');
        return this._address
    }

    set address(val) {
        console.log('被修改了');
        this._address = val
    }
}

```

## ES7~ES13
```js
// ES7
// 新版：算一个数的几次方
console.log(2 ** 3);
// 旧版：Math.pow
console.log(Math.pow(2, 3));

// ES8~ES9
let obj = {
    name: 'wc',
    age: '18'
}
// 将对象处理为多维数组   
console.log(Object.entries(obj));  
//[[],[]] 

//.padStart(length,val) 和 .padEnd(length,val)
// 如果字符串长度不够，用参数补足
let str = 'malu'
console.log(str.padStart(7, '*'));
// ***malu
// 新增async 和 await, 详-- Promise

// ES10
// .flat(n==1) 给数组降维
let arr = [[1, 2], [3, 4]]
console.log(arr.flat(1));

// ES11
// 新增BigInt类型，在数后面加n
// 注意: BigInt类型的数据，只能和BigInt一起运算
let max = Number.MAX_VALUE
let num = 9007199254740991n
console.log(max + num); //报错
console.log(num + 2n);

// 新增??运算符，和||类似，但是只认识null和undefined
let info = ''
info = info ?? 'haha'
console.log(info); //''

// 可选链运算符  ?.
// 如果有就继续往下访问 没有就到此为止
console.log(obj1.friend.name);//如果没有friend属性，报错
console.log(obj1?.friend?.name);

// ES13
// 新增静态方法： Object.hasOwn(obj, key) 
Object.hasOwn(obj, 'name'); 
// 判断对象上是否有该属性，等同于obj.hasOwnProperty();
obj.hasOwnProerty('name');
```

