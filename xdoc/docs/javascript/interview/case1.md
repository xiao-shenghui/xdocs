# 经典面试1
## 参数默认值
- 默认值之undefined
```js
function fn(a,b=1,c){
	// b=1 其实等价于
	// let b = b == undefined ? 1 : b
	console.log(a,b,c)
}
fn(1,undefined,3)  // 1, 1, 3
```
- 默认值之函数调用时机
```js
function say(){
	console.log('say')
	return 1
}
function fn(a, b=say(), c){
	// 当将一个函数作为默认值时，
	// 只有需要用默认值时，才会调用。
	// let b = b == undefined ? say() : b;
	console.log(a,b,c)
}

fn(2)  //2 say 1 undefined
fn(2,3) //2 3 undefined
fn(2,3,4)// 2 3 4
```
- 默认值之暂时性死区
```js
function say(n){
	return n
}
function fn(a=say(b), b, c){
	// 调用默认值时报错，
	// 因为当需要用默认值时，发现let b在赋值之前不允许使用。
	console.log(a,b,c)
}

fn(1,2,3)  //1，2，3
fn(1)  //1，undefined , undefined
fn() //Cannot access 'b' before initialization
```
## curry-柯里化
```js
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
function curry(fn) {
	//书写curry函数，实现参数数量不固定传参，依旧打印值-
	return function curryInner(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...args2) => curryInner(...args, ...args2);
  };
   // 1.根据外层参数args的长度，如果第一层长度就满足，直接调用fn
	// 2.否则，返回一个匿名函数，将第二层的参数args2接收过来，
	   // 再次调用自己，但是要把第二层的参数args2往后放
	   // 再次调用时，就涉及递归的概念，因此可以随意搭配参数的位置和数量。
	// 也就是使用...args rest参数的好处，可以自定义放置参数的位置，并且自动收集和扩展。
}

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
```

## 判断数据类型
```js
// typeof 系列
console.log(typeof [])  //'object'
console.log(typeof {})  //'object'
console.log(typeof function(){})  //'function'
console.log(typeof undefined) //'undefined'
console.log(typeof null) //'object'

// instanceof 系列
console.log([] instanceof Array)  //true 
console.log([] instanceof Object) //true
console.log({} instanceof null) //error  //null不是一个对象
console.log({} instanceof Object) //true
console.log(function(){} instanceof Object) //true

// Object.prototype.toString.call()
Object.prototype.toString.call([])  //'[object Array]'
Object.prototype.toString.call({})  //'[object Object]'
Object.prototype.toString.call(function(){})  //'[object Function]'
Object.prototype.toString.call(1) //'[object Number]'
Object.prototype.toString.call("a") //'[object String]'
```
## Object方法的考察
```js
let a = {name: 'ddd'}
Object.freeze(a)
// 冻结一个对象，不允许对其配置，
// 实际上是修改configurable为false

Object.assign(a, {a:1}); 
//浅拷贝，第1个参数为目标对象，拷贝后面源对象与目标合并

Object.is(1, '1'); 
//大部分情况下等同于 ===， 处理了-0和+0不相等，NaN相等的情况。

Object.getOwnPropertyDescriptor(a, 'name')
// 获得对象中一个属性的描述符
// {value: 'ddd', writable: true, enumerable: true, configurable: false}

let obj = Object.create(obj1);
// 创建一个对象，让创建出来对象的__proto__指向参数对象
// 寄生组合的应用  
	// new Son() = Object.create(Father.prototype);
// 创建纯净对象的应用 
	// let obj = Object.create({})
```

## 手写实现Promise
> Promise特征1: 有三个状态，pending, success, fail  
> Promise特征2: 一旦确定成功或者失败的状态，无法逆转或改变  
> Promise特征3: 在调用reject或者resolve之前，都是pending状态。
> Promise特征4: 只要调用了reject, 哪怕后面调用了resolve, 依旧是失败态.  
> Promise特征5: 有.then方法和catch方法,可以拿到成功或者失败的结果。  
> Promise特征6: `then方法`和`catch`方法,返回的依旧是一个promise对象。
### 原生的Promise演示
```js
let result = new Promise()
```


### 实现
```js
// 基于以上特征, 我们一个个实现功能
function MyPromise(callbackFn){
	// 定义状态
   let status = 'pending';
   // 定义成功和失败的结果.
   let successResult = '';
   let failResult = '';

   // callbackFn  --- 表示构造时传入的函数,该函数定义时传了2个参数，因此在者内部，
   // 要调用该函数，传入实参。 
   // 定义实参之一：resolve函数，
   function resolve(res){
      // res是用户new Promise内部,调用resolve('成功的结果')传入的实参
      // 这里如果用户没传实参,则成功的结果是undefined

      // 在这里要改变status
      status = 'success';
      // 将用户传入的值,放入成功的结果.
      successResult = res;
   }
   // 定义实参之二：reject函数，
   function reject(rej){
      // rej是用户new Promise内部,调用reject('失败的结果')传入的实参
      // 这里如果用户没传实参,则失败的结果是undefined

      // 在这里要改变status
      status = 'fail';
      // 将用户传入的值,放入失败的结果.
      failResult = rej;
   }
   callbackFn(resolve, reject);

   // 核心机制: 一旦调用了失败,也就是有失败的结果了, 就直接失败了.
   // 可以再次调用失败函数,防止状态被覆盖.
   if(failResult){
         reject(failResult);
   }
   // 否则就是成功了,不需要做操作.
   
   // 作为构造函数，已经满足new出来是个对象了
   // 但是还有个then方法,用于接收成功或失败的结果.
   this.then = function(resFn,rejFn){
      // resFn -- 是then调用时,传入的第一个函数
      // resFn(); //调用它, 传入成功的结果
      // rejFn -- 是then调用时,传入的第二个函数
      // rejFn(); //调用它, 传入失败的结果

      // 在then之前,已经有成功或失败的结果了.
      // 可以根据status判断,调用哪个函数了.

      // 首先是如果两个状态都没确定的情况下
      // 这种情况两个都不调用
      // 其次是成功状态
      if(status == 'success'){
         resFn(successResult);
      }
      else if(status == 'fail'){
         rejFn(failResult);
      }
      return this
   }
   // 还有个catch方法,用于捕获错误的结果.
   this.catch = function(rejFn){
      // 这里只捕获错误的
      if(status == 'fail'){
         rejFn(failResult);
      }
      return this
   }
}

// 把这个类型添加到Object.prototype上面
Object.prototype.MyPromise = MyPromise;
```

### 测试使用
```js
// 测试使用
let result = new MyPromise((resolve, reject) => {
   // resolve('成功的结果')
   reject('失败的结果')
})

// result.then((res)=>{
//    console.log(res);  //成功的结果
// }, (rej)=>{
//    console.log(rej);
// });

result.catch((rej)=>{
   console.log(rej); //失败的结果
});

// 连续使用
new MyPromise((res,rej)=>{
    res('123')
}).then((res)=>{
    console.log(res)  //123
})
```