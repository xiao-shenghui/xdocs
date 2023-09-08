# Js-To-Ts
> 设计这个文档，主要用于锻炼自己，快速将js转变为ts的能力。
## 练习前准备
> 全局安装tsc, 添加`test.ts`和`tsconfig.json`文件。
```sh
cnpm i typescript -g
tsc -v #查看版本
tsc -w ./test.ts #监控文件
```

## 基础概念
### 类型推导
```ts
// 对于单个变量的类型，一般借助"类型推导"
// 因此与js无差别
let arr = '2'
//arr = 1; //报错
```
### 联合类型
```ts
// 对于想让他可被赋值为别的类型。
// 指定联合类型 (|)
let arr:(number | string) = '2'
arr = 1; //不再报错
```
### 数组的类型
```ts
// 想让数组只接受一个类型
// 1. 类型 + []
// let arr: number[] = [1,2,'3']; //'3'报错
// 2. 泛型 Array<类型>
// let arr: Array<number> = [1,2,'3']; //'3'报错

// 想让数组只接收某些类型 例如：number和string,
// 也可以用类型联合类型
let arr:(number | string)[] = [1,2,'3'];
```
### 类型别名
```ts
// 对于某些类型来说，太长了，但是又经常用到，
// 便可以用 type关键字 指定类型别名,就跟变量一样
type myType = (number | string)[] 
// 使用时非常方便
let arr:myType = [1,2,'3'];
```
### 对象的类型
```ts
// 对于对象的类型, 一样, 在变量名后面补上类型指定即可
// 对于可选属性，可以添加?
let obj:{
	address: string,
	age: number,
	id?: number,
	sex?: string
} = {
	address: 'wc',
	age: 18
}

// ts的好处时，类型声明是未指定的键名，后续不能随意添加。
// 编译期间就会报错。
obj.sex = '男';
// obj.name = 'ddd'; //报错，...上不存在属性“name”

// 一样，可以使用类型别名
// 类型别名可以定义只读属性 readonly
type MyObj = {
	address: string,
	age: number,
	id?: number,
	sex?: string
}
// 就变得简洁很多了。
let obj1:MyObj = {
	address: 'wc',
	age: 18
}
```

### 接口
```ts
// 前面我们使用类型别名，来简化对象的类型
// 但其实还有一种格式，叫接口，
// 使用interface，也可以定义对象的格式
// 接口可以定义只读属性 readonly
interface MyObj{
	readonly address: string,
	age: number,
	id?: number,
	sex?: string
}
// 非常相似
let obj:MyObj = {
	address: 'wc',
	age: 18
}

// 接口和类型别名的实现思路不一样，
// 接口偏向类-面向对象的思路，类型别名偏向变量-面向过程的思路。
// 建议尽量使用接口实现需求
// obj.address = '22'; //报错，无法为“address”赋值，因为它是只读属性。
```

### 函数的类型
```ts
// 1. 可以给参数指定类型(arg:xxx)   
// 2.可以给函数的返回值指定类型():xxx
// 没有返回值
function sayHello(val:string, num: number):void{
	console.log(val,num)
}

// 指定返回值类型
function sayHello(val:string):number{
	console.log(val)
	return Number(val); //必须返回数字类型
}
```

### 解构赋值的参数类型
```ts
// js中我们常常用到解构赋值,
// 甚至可以指定别名和默认值
// 但是指定别名与ts的指定类型，有些相似
/*
	//js中
	function sayHello({val: num, age=1}){
		console.log(num, age)
	}
*/
// 在ts中，一样支持给解构赋值的参数指定类型，
// 做法: 在对象后面补上对应的类型即可
function sayHello({val: num, age = 1}: {val: number, age: number}):void{
	console.log(num, age)
}

// 这样写比较长，可以用接口优化一下对象
interface Parmas{
	val: number, 
	age: number
}

function sayHello1({val: num, age = 1}: Parmas):void{
	console.log(num, age)
}
```

### 接口定义函数
```ts
// 除了上面的方法，也可以用接口来一次性定义
// 函数的参数及返回值

// 就像定义对象一样，定义普通函数的接口,
// 实际上就等于把类型定义抽离出来了，还是和以前一样
// 定义普通函数的接口
interface myFun{
	// name和age分别是2个参数
	(name: string, age: number):void
}
// 定义解构赋值函数的接口
interface myFun2{
	// val, age是一个参数对象中，解构出来的属性
	({val, age}):({val:number, age:number}):void
}

// 使用时，需要将其放置在函数名后面
// 并且接口和类型别名都只能用于匿名函数。
let sayHello:myFun = function(name, age){
	console.log(name,age)
}
// 这样的话，依旧支持别名，默认值，并且更加简洁的加上了类型约束
let sayHello2:myFun2 = function({val:num, age = 18}){
	console.log(num,age)
}
```
### 类型别名定义函数
```ts
// 和接口有点区别, 使用箭头函数
// 接口和类型别名都只能用于匿名函数。
type MyFnType = (name: string, age: number) => void;

const sayHello3:MyFnType = function(name,age){
	console.log(name,age)
}
```

### 函数剩余参数的获取
```ts
// 在原生js中，使用...语法获取剩余参数
// 在ts中也是一样,可以指定类型
// 注意,...收集后,变量是个数组,因此必须遵照数组的指定类型的写法.
// 不加[]会报错: rest 参数必须是数组类型。
function sayHello(name: string, age: number, ...lastargs:(number|string|info)[]):void{
	console.log(name,age, lastargs)
}

interface info{
	name: string,
	age?: number
}
// 注意,我们上面使用了联合类型,并且指定了如果传入对象,必须满足接口info的类型格式
sayHello('dd',18,'江西',2023, {name: 'wc'})
```

### 给对象动态扩展属性
```ts
// 一般定义一个接口,接口中属性为string类型 ,属性值为any任意类型
interface addProps{
	[idx: string]: any
	// 注意idx不是固定的,是自定义的
}

let obj:addProps = {};
// 让对象应用这个接口
// 就可以添加任意属性
obj.age = 18;
obj.name = 'wc'

// 更加严谨的做法
// 指定某些属性约束类型
// 其他属性约定范围
interface myObj{
	age?: number,
	name?: string,
	[idx: string]: (number | string)
}

let obj1:myObj = {};
obj1.age = 18;
obj1.name = 'wc'
// obj1.address = {}; //报错,类型不符合
```

### 给数组动态扩展属性
```ts
// ts中的数组,不再支持 打.自定义属性访问或者赋值自定义属性及值, 
// 而是通过['']的形式,
let arr:(number[]) = [1,2,3,4,5];
// 扩展属性
arr['myProps'] = function(val){
	console.log(val)
}
// 使用属性
arr['myProps'](123);
```

### 函数类型的参数
```ts
// 函数传参时,经常会遇到将"函数"作为参数传入, 也就是回调函数
function sayHello(callback:any):void{
	callback()
}
// 以上是一种妥协的做法，callback可以是任意类型

// 如何定义一个参数函数的类型？具体到该参数函数的参数
// 可以通过类型别名或者接口
type myFn = (val:number) => boolean;
interface myFn2 {
	(val:number):boolean;
}

// 使用时
function sayHello(callback:myFn|myFn2):void{
	callback()
}

```
### typeof
```ts
// 有时候我们的对象的属性的类型比较复杂, 
// 当传给形参以后,ts无法检测出形参的属性的类型. 以及该形参有哪些属性.
// 例如
/*
let res = {name: '小花', age:18, skills:[1,2,3]};
function sayHello(val){
	// 此时,ts就不知道val.name, val.age或者val.skills的类型
}

sayHello(res)
*/
// 鉴于以上问题, 可以使用typeof操作符
// typeof操作符: ts中的typeof操作符更多的是用来检测变量的类型.

let res = {name: '小花', age:18, skills:[1,2,3]};

type MyType = typeof res;
// 获取res的类型
function sayHello(val:MyType){
	console.log(val.name); //提示, 类型
}
sayHello(res);
```

### 类型断言
```ts
// js中,获取一个dom元素可以直接操作元素上的属性
let img = document.querySelector('#img');
// dom.src = 'xxx'; 
// 这在ts中是报错的, 因为ts无法检测到dom的节点类型
// 这时候,就急需要告诉ts, dom是一个节点类型
// 使用类型断言，as关键词指定更加具体的类型
// let 变量 = 值 as 具体类型;
let img1 = document.querySelector("#img") as HTMLImageElement;
img.src = 'xxx'; //此时是不报错的。

// 问题是，我怎么知道dom节点的具体类型？
```
技巧：如何得知dom的类型
1. 通过浏览器控制台，`__proto__`隐式原型。
2. document.createElement('a') 查看提示。
```ts
let a = document.createElement('a');
// HTMLAnchorElement  --- a标签
let b = document.createElement('img');
// HTMLImageElement --- img标签
let c = document.createElement('div');
// HTMLDivElement --- div标签
```

## js转ts测试题
> 提供原始js代码,转为对应的ts代码
### js之手写filter
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
// 测试使用
let arr = [1, 2, 3, 4]
let newArr = arr.myFilter(function (item, index) {
    return item > 1
})
console.log(newArr);
```
### ts之手写filter
```ts
let arr: (number[]) = [1, 2, 3, 4, 5];
interface myFn {
	(val:number):boolean;
}
arr['myFilter'] = function (callback: myFn) {
	let res = []; //用于过滤的数组
    // 遍历arr的每一项
    arr.forEach(e1 => {
        if (callback(e1)) {
            // 满足回调函数
            res.push(e1)
        }
    })
    return res;
}

// 注意，数组元素中，使用自己的方法不再能打点，
// 而是用['key']()调用对应的方法
let result = arr['myFilter']((e) => {
    return e % 2 == 0;
});

console.log(result);
```

### js之手写push
```js
// 手写push
let arr = [1, 2]   //__proto__    函数prototype也有__proto__

Array.prototype.myPush = function (...args) {
    for (let i = 0; i < args.length; i++) {
        this[this.length] = args[i]  //this.length 当数组长度发生改变 length会自动变
    }
    return this.length
}


console.log(arr.myPush(5, 6, 8, 9));   //3
console.log(arr);
```

### ts之手写push
```ts
let arr: (number[] | string[]) = [1, 2, 3];

// 我们默认只push number和string方法，避免使用any
arr['mypush'] = function (...val: number[] | string[]) {
    // 每一次push，arr的长度索引就添加值,arr的length会自动加1
    // 最好用for循环
    for (let i = 0; i < val.length; i++) {
        arr[arr.length] = val[i];
    }
    // 返回最新的length
    return arr.length
}
// 兼容push多个的情况
console.log(arr['mypush'](4, 5, 6)); //6
console.log(arr); //[ 1, 2, 3, 4, 5, 6, mypush: [Function (anonymous)] ]
```

