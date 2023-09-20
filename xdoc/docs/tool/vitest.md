# 测试框架-vitest的使用
> TDD(测试驱动开发)是一种非常好的编程思想，
> 在学习源码的时候，如果想复现vue的核心实现，`TDD`将是必不可少的一部分。  
> vue3源码中`__tests__`文件夹，就是使用vite官方的测试库[vitest](https://cn.vitest.dev/guide/)  
> 基于`vitest`, 我们可以脱离浏览器，使用`Nodejs终端`测试自己的`功能库`是否合格。  

## 基本使用
## 创建vite基本项目
```sh
cnpm create vite@latest
# 选择原生
```

## 将vitest加入到项目里
```sh
cnpm i vitest -D
```

## package.json配置
```json
"script":{
	"test": "vitest"
}
```

## 编写测试文件
```js
// sum.js
export function sum(a,b){
	return a+b
}
// sum.test.js
import { sum } from './sum.js'
import { expect, test } from 'vitest'

test('添加', ()=>{
	expect(sum(1,2)).toBe(3)
})
```

## 引入并且运行
> 在入口文件`main.js`中，引入`sum.test.js`
> 执行`npm run test`, 查看测试结果。

## 项目- Vue3-myReactivity 
> 参考文档:[vue3-reactivity源码](https://github.com/vuejs/core/tree/main/packages/reactivity) 基于TS开发,Vitest测试。  
> 本次项目: 基于JS开发,Vitest测试，实现`vue3响应式核心之一`的**Reactivity**。   
> 实现的API有`ref`,`isRef`,`reactive`,`isReactive`,`isProxy`,`isReadonly`,`readonly`  
> 对应的功能有创建`响应式对象`，`ref对象`,`只读代理对象`, `Proxy代理检测`,`自带响应式标记`。

### 前置准备
1. 基于上面的**基本使用**创建的项目
2. 将`sum.js`修改为`myReactivity.js`, 对应的`test`文件修改为`myReactivity.test.js`。
3. 将文件放入到`test`文件夹下，并且在`main.js`中同步引入。

### myReactivity
> 其核心是`Proxy(target, hanlder)`的使用实现代理对象`objProxy`。  
- 借助`Map`数据类型，保存对应的对象类型，进而实现`isRef()`系列的方法。  
- 借助`hanlder配置对象`中`set()`的
	- 第4个参数`reciver`(表示代理对象)和`isReadonly()`
	- 实现对`readonly对象`中属性设置的`拦截`(特殊照顾)。
```js
// 创建一个代理对象，保存 目标对象和代理对象的地址。
export const reactiveMap = new Map()
export const readonlyMap = new Map()
export const refMap = new Map()
// 用于添加相应的响应式标记
export const ReactiveFlags = {
	SKIP: true,
	IS_REACTIVE: true,
	IS_READONLY: true,
	IS_SHALLOW: true,
	IS_RAW: true,
	IS_REF: true,
}

// 一个代理对象的方法
export function handleProxy(obj,cellectionMap,ReactiveFlag){
	const handler = {
		// target表示原始对象， key表示访问的属性名
		get(target, key){
		// console.log(`监听到了${target}的${key}被访问了`);
			return target[key]
		},
		// newValue表示新值
		// reciver表示代理对象。
		set(target, key, newValue,reciver){
		// console.log(`监听到了${target}的${key}被设置为了${newValue}`);
			// 如果键名是内置键名(例如__v_is_reactive)，允许设置。
			let isInKey = ['__v_is_reactive','__v_skip','__v_is_ref',
				'__v_is_shallow','__v_is_raw','__v_is_readonly'];
			if(isInKey.includes(key)){
				target[key] = newValue;
				return true; 
			}

			// 如果是readonly对象，不设置，只警告一下。
			if(isReadonly(reciver)){
				console.warn(`${key} is Readonly in ${target}`)
				return true;
			}
			target[key] = newValue;
			return true; //严格模式下,set必须返回true
		}
	}
	// obj是原始监听对象，handler是处理对象
	// proxyObj表示代理对象， 
	// obj是原始对象，也就是里面get的参数target
	// 后续访问和设置皆可以通过objRef
	let proxyObj =  new Proxy(obj, handler);
	// 代理成功后，用Map将代理对象存起来。
	// 原因: 一个对象可能被代理多次，但是都应该以最后一次代理为准。
	// 但是本着键名不重复的原则，只保存最后一次代理的值到Map中。
	cellectionMap.set(obj, proxyObj);
	// 添加对应的属性标记
	// proxyObj.__v_is_reactive
	// proxyObj.__v_skip
	// proxyObj.__v_is_ref
	// proxyObj.__v_is_shallow
	// proxyObj.__v_is_raw
	// proxyObj.__v_is_readonly
	if(ReactiveFlag){
		let key = '__v_'+ReactiveFlag.toLowerCase();
		proxyObj[key] = true;
	}

	return proxyObj
}

// 传入原生对象,返回代理对象.
export function reactive(obj){
	// 创建一个标记，让其能被察觉到是代理对象。
	// 如果执行了reactive,往里面map追加一个数据。
	return handleProxy(obj, reactiveMap,'IS_REACTIVE');
}

// ref方法
export function ref(data){
	const obj = {}
	obj.value = data;
	return handleProxy(obj,refMap,'IS_REF');
}

// readonly方法
// 实际上，就是set的时候，抛出异常和错误
export function readonly(obj){
	return handleProxy(obj,readonlyMap,'IS_READONLY');
}

// isReadonly方法
export function isReadonly(proxyObj){
	// 判断是否在存代理对象的Map里面
	// 判断一个map里的内容，是否与obj值相等
	for(let val of readonlyMap.values()){
		if(val == proxyObj){
			return true;
		}
	}
	return false
}

// isReactive方法
export function isReactive(proxyObj){
	// 判断是否在存代理对象的Map里面
	// 判断一个map里的内容，是否与obj值相等
	for(let val of reactiveMap.values()){
		if(val == proxyObj){
			return true;
		}
	}
	return false
}

// isRef方法
export function isRef(proxyObj){
	// 判断是否在存代理对象的Map里面
	// 判断一个map里的内容，是否与obj值相等
	for(let val of refMap.values()){
		if(val == proxyObj){
			return true;
		}
	}
	return false
}

// isProxy方法
export function isProxy(proxyObj){
	// 判断是否在存代理对象的Map里面
	// 判断一个map里的内容，是否与obj值相等
	if(isReactive(proxyObj) || isReadonly(proxyObj)){
		return true;
	}
	return false
}
```
### myReactivity.test
> 使用`test`方法，创建测试队列。    
> 使用`expect`方法和`toBe`方法，测试实现的功能。
```js
import { ref,isRef,reactive,isReactive,
isProxy,isReadonly,readonly } from './myReactivity.js'
import { expect, test } from 'vitest';

test('测试ref代理和isRef功能', ()=>{
	let obj = {
		name: 2
	}
	let res = ref(obj);
	res.value.name = 4;
	// console.log(res); 
		//cs: { value: { name: 4 }, __v_is_ref: true }
	// console.log(obj); { name: 4 }
	expect(obj.name).toBe(4);
	expect(isRef(res)).toBe(true);
	expect(isRef(obj)).toBe(false);
});

test('测试isProxy方法', ()=>{
	let obj = {
		name: 2
	}
	let res = ref(obj);
	let res2 = reactive(obj);
	// console.log(res2);  
		//cs: { name: 2, __v_is_reactive: true }
	expect(isProxy(res)).toBe(false); 
	expect(isProxy(res2)).toBe(true);
	//只有readonly 和 reactive是代理对象
	expect(isProxy(obj)).toBe(false);
});

test('测试reactive和isReactive方法', ()=>{
	let obj = {
		name: 2
	}
	let res = ref(obj);
	let res3 = reactive(obj);
	res3.name = 4;
	expect(obj.name).toBe(4);
	expect(isReactive(res)).toBe(false);
	expect(isReactive(res3)).toBe(true);
});

test('测试readonly和isReadonly方法', ()=>{
	let obj = {
		name: 2
	}
	let res = readonly(obj);
	// console.log(res);  
		//cs: { name: 2, __v_is_readonly: true }
	res.name = 3; 
	//尝试抛出警告，抛出成功 
	//cs: name is Readonly in [object Object]
	expect(obj.name).toBe(2);
	//测试有没有被修改,测试成功，未被修改
	expect(isReadonly(res)).toBe(true);
	expect(isReadonly(obj)).toBe(false);
	expect(isProxy(obj)).toBe(false); 
	//原生对象
	expect(isProxy(res)).toBe(true); 
	//只有readonly 和 reactive是代理对象
});
```

### 启动
```sh
npm run test
```
- 响应结果如下：
```js
/*
name is Readonly in [object Object]
✓ test/myReactivity.test.js (4)
	✓ 测试ref代理和isRef功能
	✓ 测试isProxy方法
	✓ 测试reactive和isReactive方法
	✓ 测试readonly和isReadonly方法

Test Files  1 passed (1)
  Tests  4 passed (4)
Start at  17:21:00
Duration  1.23s (transform 148ms, setup 0ms, collect 145ms, 
tests 13ms, environment 1ms, prepare 468ms)
*/
```


