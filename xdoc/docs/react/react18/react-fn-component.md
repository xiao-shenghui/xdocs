# 函数组件和Hooks
> 由于`react18`已经不推荐使用`类组件`, 推荐使用`函数组件`写项目。
> 该文档主要学习`函数组件`, 强大的`Hooks`, 以及`类组件的迁移`。
## 定义和使用组件
> 一个函数作为一个组件, `return`一个`(JSX的结构)`  
> `react`内部会自动调用`React.createDOM()`创建相应的节点。
### 定义组件
```jsx
// 引入react
import React from 'react';
// 定义一个函数作为组件
const Hello = function(){
	return(
		<>
			<h1>我是Hello组件</h1>
		</>
	)
}

export default Hello
```
### 使用组件
```jsx
// 例如在App.js中使用组件
// 引入组件
import Hello from './Hello'

// 使用组件
const App = function(){
	return(
		<>
			<h1>我是App组件</h1>
			{/*使用Hello组件*/}
			<Hello />
		</>
	)
}
```
### 定义内部状态(数据)
> 函数组件中，使用`useState()`这个`Hooks`，一举代替`类组件`的`state`和`setState`
> 函数组件中，不再因`this指向`问题头疼，因为基本用不上`this`.
```jsx
import React from 'react'
const Hello = function(){
	const [count, setCount] = useState(0);
	// 定义1个state为count，1个修改count的方法。
	const add = function(){
		setCount(count => count++)
	}
	return(
		<>
			<h1>Hello</h1>
			<span>{count}</span>
			<button onClick={add}>点我增加</button>
		</>
	)
}

export default Hello
```
## 数据通信
## Hooks
## 生命周期的实现
## 类组件的迁移