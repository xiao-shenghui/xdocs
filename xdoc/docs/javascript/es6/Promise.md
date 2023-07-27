# Promise
## 回调函数-异步问题
```js
function exeCode(n, sCallBack, fCallBack){
	// 模拟一个网络请求
	setTimeOut(() => {
		if(n>0){
			sCallBack('成功了');
		}
		else{
			fCallBack('失败了');
		}
	});
}

exeCode(1, value => {
	console.log(value);
}, err => {
	console.log(err);
})

// 缺点：多层异步问题时，容易造成回调地狱。
// 代码难以维护，外层变量依靠与内层回调的结果
```
## Promise
```js
// ES6中提供了一个类 叫Promise  承诺
// new Promise时，传递一个执行器，执行器会立即执行
// 执行器时一个函数,有两个形参,resolve和reject

// 通过Promise创建出来的对象,都有then属性,因此可以调用.then
// Promise对象有三种状态: 
// Pending 
// (刚创建,未执行成功回调(resolve)或失败回调(reject))
// Success
// 内部执行了成功回调(resolve)
// Failure
// 内部执行了失败回调(reject)

let p = new Promise((resolve, reject) => {
	// 注意,执行器会立即执行,因此里面还是同步代码.
	// resolve('成功');
	// reject('失败');

	// 除非里面写异步代码
	setTimeOut(()=>{
		resolve('成功');
	});
});
// console.log(p); 注意,外面打印undefined,
	// 因为里面setTimeOut是异步的

// 每一个promise对象都有then属性, 
	// 并且接收两个参数,成功或者失败的数据
// then只认状态,不认数据,
	// return 所有的值(包括null,undefined) 都是成功的回调
	// 碰到 throw new Error(), 则未失败的回调,
	// 但下一个then又是成功的回调,因为失败的原因是字符串形式传递
p.then(res => {
	console.log(res)
}, err => {
	console.log(err)
})
// catch 为了分工合作阅读清晰,提出了catch表示then的第二个参数
p.then(res => {
	console.log(res)
}).catch(err => {
	console.log(err)
})
```

## resolve的实参问题
```js
// 1)resolve的实参可以是普通数据类型
resolve('成功')
// 2)也可以是引用数据类型
resolve([1, 2, 3])
// 3）可以传递一个Promise对象(new Promise...)
	// 那么我们外层Promise的状态,取决于传递的Promise
	// 一旦与一个reject()就是失败
resolve(new Promise((resolve,reject) => {
	resolve('成功');
	// reject('失败');
}))
// 4）参数可以是一个then对象 (模拟的promise对象)
	/*
		resolve({
			then(resolve,reject){
				// reject('上面要钱.....')
				resolve('办妥了...')
			}
		})
	*/
	
```

## reject的实参问题
```js
// reject, 不管传递什么, 都得到失败的promise
// 会将传递的内容, 原封不动的 展示给你
reject({
    then(resolve, reject) {
        resolve('666')
    }
})
// 传递then 对象

promise.then(res => {
    console.log('成功', res);
}, err => {
    console.log('失败', err); //打印
})
````
## 链式then
```js
let p = new Promise((resolve, reject) => {
    resolve('成功...')
})

p.then(res => {
    console.log(res, '成功');
    return undefined
}, err => {
    console.log(err, '失败');
}).then(res => {
    console.log(res, '成功1'); //undefined 成功1
}, err => {
    console.log(err, '失败1');
})

// 下一个then的执行,却决于上一个then执行的结果
// return 还是异常
```

## then的顺延
> 如果上一个then没有处理prmise的结果, 下一个then也可以处理，
```js
let p = new Promise((resolve, reject) => {
    reject('失败...')
})
p.then().then().then().then().then(res => {
}, err => {
    console.log(err);
})
```
## finally方法
> 无论promise `成功` 还是 `失败`都会执行
```js
p.then(res => {
    console.log(res, 'res');
}).catch(err => {
    console.log(err, 'err');
}).finally(() => {
    console.log('反正你逃不出我的手掌心');
})
```

## Promise 静态方法
```js
//  Promise.resolve()  
//  直接得到一个成功的Promise对象
let p1 = Promise.resolve('ok')

//  Promise.reject()
//  直接得到一个失败的Promise对象
let p2 = Promise.reject('ok')

//  Promise.all([p1,p2]).then(...)
//  同时处理多个promise, 以最后的结果为准打印全部
//  遇见一个失败,就立即停止,得到失败promise
Promise.all([p1,p2]).then(res => {}).catch(err => {})

//  Promise.allSettled([p1,p2]).then(...)
//  返回一个数组, 以键值对的形式展示所有 promise成功还是失败
//  全部执行,不管失败还是成功
Promise.allSettled([p1,p2]).then(res => {}).catch(err => {})

//  Promise.race([p1,p2]).then(...)
//  以最快的那个为准,不管成功失败,都不继续走
Promise.race([p1,p2]).then(res => {}).catch(err => {})

//  Promise.any([p1,p2]).then(...)
//  得到第一个成功的,任何一个成功 或者 所有的失败
Promise.any([p1,p2]).then(res => {}).catch(err => {})

```

## async 和 await
```js
//在声明函数的前面加上async (new Promise的语法糖)
// 就是一个async函数
async function foo() {
    console.log('666'); //同步代码
	   // await 行,以及await上面的, 都是同步,
	   // await 行下面的, 都是异步.
	   // await下面的代码相当于.then 是异步代码
	   // 并且,只有在await前面，可以获取promise成功后的结果
	   // promise成功了,才执行下面的代码.
	let res = await 123
	console.log(res);
}

foo()
```
```js
// 可以用try...catch,防止await阻塞代码
async function fn() {
    try {
        let res = await bar()
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

fn()
```

## 事件环
```js
// js是单线程
// 异步代码: 
	// 宏任务: setTimeOut, setInterval, DOM事件, ajax 
	// 微任务: .then, await后面的代码
// 事件执行顺序: 
	// 1. 执行全局的同步代码
	// 2. 如果过程中, 遇到宏任务,放到宏任务队列
	// 3. 如果过程中, 遇到微任务,放到微任务队列
	// 4. 执行完同步代码, 清空执行当前的微任务队列
	// 5. 然后从宏任务队列中, 捞一个出来执行.
		// 5.1 执行一个的过程中,宏任务代码里, 还有同步,微任务和异步,
		// 5.2 重复1,2,3,4,5
	// 所以, 一般来说执行完一个宏任务的所有代码,才执行下一个宏任务
	// 但是,如果宏任务里面, 还有宏任务,
	// 则里面的宏任务将被排到外层所有的宏任务的最后
```
```js
console.log('script start');  //第一个   
setTimeout(function() {
    console.log('setTimeout');  //第五个
}, 0);
Promise.resolve()
    .then(function() {
        console.log('promise1');  //第三个
    })
    .then(function() {
        console.log('promise2');  // 第四个
    });
console.log('script end');   //第二个
```
```js
async function bar() {
    console.log("22222")  //第二个
    return new Promise((resolve) => {
        resolve()
    })
}

async function foo() {
    console.log("111111")  //第一个

    await bar()

    console.log("33333")  //第四个
}

foo()
console.log("444444")  //第三个
```