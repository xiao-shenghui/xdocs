# React学习笔记
## 引入文件
```html
<!-- react 用于生成虚拟dom的文件 -->
<script src="./react/react_16.4.0_umd_react.development.js"></script>
<!-- react-dom 用于将虚拟dom生成真实dom的文件 -->
<script src="./react/react-dom_16.4.0_umd_react-dom.development.js"></script>
<!-- jsx转react.create的方法，支持jsx的babel包 -->
<script src="./react/babel-standalone_6.26.0_babel.min.js"></script>

<!-- 注意：react 16.4.8及以前的版本，函数组件没有useState()这个Hooks API -->
<!-- 17.0版本 -->
<script src="./react/react_17.0.0_umd_react.development.js"></script>
<script src="./react/react-dom_17.0.0_umd_react-dom.development.js"></script>
<script src="./react/babel-standalone_6.26.0_babel.min.js"></script>
```
## 编写react代码： script
```html
<script type="text/babel">
	
</script>
```
## ReactDOM渲染函数
- `ReactDOM.render()` 函数
	- 参数1: 要`渲染`的组件内容
	- 参数2: 要`挂载`的根标签
	- 参数3: `渲染`成功后的回调函数
```jsx
// 定义一个函数组件
function Hello(){
	// 函数组件的render方法
	render(){
		// jsx语法
		return (
			<div>
				<button>按钮</button>
			</div>
		)	
	}
}
ReactDOM.render(<Hello />, document.getElementById("app"), ()=>{
	alert("渲染成功");
})
```

## 函数组件
### 定义
- 组件名大写
	- `return ()` 里面只能有一个根节点
	- on绑定事件采用驼峰命名法
	- class需要改写为className
```jsx
function Button(){
		let i = 0;
		const myfn = function(){
			alert(++i);
		};
		return (
			<button onClick={myfn}>按钮</button>
		)
	}
function Hello(){
	return (
			<div>
				<Button />
				<Button />
				<Button />
				<Button />
			</div>
		)
}
ReactDOM.render(<Hello />, document.getElementById("app"), alert("渲染成功"));
```
### 传输数据
#### 使用props对象传输
- 父组件使用组件：
	- 组件的每条属性为props的属性，属性值为props.属性值。（这点和Vue组件很像）
	- 组件内使用，用JSX的语法 {}
- 定义组件：
	- 方式一：函数组件的函数参数，添加一个props形参。
	- 方式二：函数组件的函数参数，添加每条属性的解构组成的对象。
```jsx
// 方式一：
function Button(props){
		if(props.type){
			return (
				<button>{props.type}按钮</button>
			)
		}
		return(
			<button>普通按钮</button>
		)
		
	}
function Hello(){
	return (
			<div>
				<Button type="特殊1"/>
				<Button />
				<Button type="特殊2"/>
				<Button type="特殊3"/>
			</div>
		)
}
ReactDOM.render(<Hello />, document.getElementById("app"), alert("渲染成功"));
```
- 渲染结果
```html
<button>特殊1按钮</button>
<button>普通按钮</button>
<button>特殊2按钮</button>
<button>特殊3按钮</button>
```

#### 使用state定义内部数据
##### 函数组件(无状态组件)
- state和useState传输和使用。（函数组件，useState需要在脚手架项目内使用）
	- 引入useState函数，设置传入初始值
	- useState返回一个`数组`，数组`第一个值`是`变量`，`第二个值`是`修改变量的方法`
	- 用一个`变量`接收，表示`state变量`
	- 用一个`函数名`接收，表示`修改state`的`函数方法`
	- 该`方法`可以直接传入变量的表达式，
	- 该`方法`也可以传入一个`回调函数`作为参数，`函数的参数`就是接收变量的`自定义形参`
```jsx
import React, {useState} from 'react'
function Hello(){
	let [conut, setCount] = useState(0);
	btn(){
		return setCount(conut++);
	}
	return(
		<div>
			<h1>{count}</h1>
			<button onClick="btn">修改count值</button>
		</div>
	)
}
```
##### 类组件（继承自React.Component）
> 所有继承自React组件的类组件，都会继承一个state属性，默认属性值为null.  
> 该数据是响应式数据，一旦更新了，页面会自动重新渲染。  
> 但是要使用this.setState()传入要修改的state数据。
- state 初始化定义在构造函数上面。
	- 初始化： this.state = {} 使用`对象`保存，`属性：属性值`的方式设置变量和初始值
	- 使用state数据: `render()`函数内，使用`{this.state.xxx}` 直接使用
	- 修改state数据: 调用 `this.setState()` 函数，里面传入一个新的对象，用于修改`属性:属性值`
- 定义类组件: `class 组件名 extends React.Component{}`
- 初始化类组件： `constructor(){}` 函数, 
	- 调用`super()`, 以便使用React.Component的`this`. 
	- 如果要使用`props`, `constructor` 以及 `super`还要传入`props作为参数`。
	- 定义state初始化数据
```jsx
class Hello extends React.Component{
	// 初始化函数
	constructor(){
		// 初始化this继承
		super();
		// 定义继承的state属性。
		this.state = {
			count: 0
		}
	}
	render(){
		return(
			<div>
				{/*使用state对象的count值*/}
				<h1>{this.state.count}</h1>
				{/* 调用fn函数 */}
				<button onClick={this.fn}>
					点击修改 {this.state.count}
				</button>
			</div>
		)
	}
	// 必须使用箭头函数，
	// 因为普通函数的this取决于调用时，而React内部调用方法时，使用的func.apply(context,funcArgs)修改了this指向为context的this.


	// 而箭头函数的this取决于定义时的外层this，且无法通过apply等修改。
	// 所以使用this.state 和 this.setState 可以拿到React上面的state和setState属性
	fn = () => {
		// 调用this.setState() 函数,重新传入一个state对象。
		this.setState(
			{
				count: ++this.state.count
			}
		);
	}
}

ReactDOM.render(<Hello />, document.getElementById("app"), alert("渲染成功"));
```

#### 数据驱动界面更新的原理
> 首先我们知道，是使用React.Component上面的setState()函数，来修改了state值，然后渲染了页面
```jsx
// NJComponent 模拟React.Component
class NJComponent extends React.Component{
	constructor(){
		super();
		// 模拟state默认值
		this.state = null;
	}
	// 模拟setState方法
	setState(val){
		console.log("数据需要更新");
		// 1. 更新state的值
		this.state = val
		// 2. 调用dom方法，更新页面
			// 2.1 第一个参数，组件对象，可以使用this.render() 表示继承子对象的整个渲染组件。
		ReactDOM.render(this.render(), document.getElementById('app'));
	}
}

// 这样就可以定义类组件，继承于模拟组件，并且使用state和setState
class Hello extends NJComponent{
	constructor(){
		super();
		this.state = {
			count: 1
		}
	}
	render(){
		return(
				<div>
					<h1>{this.state.count}</h1>
					<button onClick = {this.fn}>点击修改</button>
				</div>
			)
	}
	fn = () => {
		this.setState( { count: this.state.count + 1} )
	}
}

// 依旧可以执行，并且打印  数据需要更新
```
#### 总结
- 函数组件： 无状态组件，主要用于展示信息。（16.8.0 以前）
- 类组件：有状态组件，数据驱动视图。

## JSX
### 注释
> JS注释： `//`  或者 `/**/`
> JSX视为表达式：`{}`  
> 所以JSX的注释为： `{/* */}`
```jsx
return (
	<div>{1+1}  {/* 计算 */}</div>
	)
```

### JSX绑定属性
> 普通属性: 过去怎么绑定，现在也怎么绑定  
> class属性: 改用`className`, 而不是class
> style属性: 改用`{对象}`的写法  
> 并且原生中用`'-'`连接的属性，都改用`驼峰命名`。
```jsx
// {{backgroundColor: 'red', color: 'green'}}
const message = 'hello'
return(
	<div>
		<h1>{message}</h1>
		{/* JSX本质是把代码转换为JS，由于class是JS关键字，
		因此规定为className 
		因此，后面但凡是JS关键字的，都不能直接绑定		
		*/}
		{/*另外：如果要绑定样式，不能直接赋值字符串: style="backgorund: red"
		而是采用对象的模式： style = {{backgroundColor: 'red'}}
		注意： 这里的双大括号，一个是对象的括号，一个是JSX用于识别的js表达式的{}
		注意：样式属性原生中用-连接的，在js中用驼峰命名。
		*/}
		<p className={message} title={message}></p>
		<span style={{backgroundColor: 'red', color: 'green'}}></span>
	</div>
)
```
### JSX嵌入内容
> 任何合法的`JS表达式`都可以嵌入到`{}`中  
> 但是：`[]`,`true`,`false`,`null`,`undefined` 不会被渲染出来
```jsx
const flag = true
(
	<div>
		<h1>{flag = true ? '为真' : '为假'}</h1>
		<h1>{[]}</h1>
		<h1>{true}</h1>
		<h1>{false}</h1>
		<h1>{null}</h1>
		<h1>{undefined}</h1>
	</div>
	)
```
- 渲染出来的结构
```html
<div>
	<h1>为真</h1>
	<h1></h1>
	<h1></h1>
	<h1></h1>
	<h1></h1>
	<h1></h1>
	<!-- 不符合的都渲染为空 -->
</div>
```
### JSX灵活性
- 案例1:
> 通过点击，控制元素的显示和隐藏
> 使用JSX渲染列表，显示成绩
```jsx
class Hello extends React.Component{
	constructor(){
		super()
		this.state = {
			flag: true,
			arr: ['数学','语文','英语','物理','化学','生物'],
			score: [89,59,34,75,95,67]
		}
	}
	render(){
		return (
			<div>
				{/* 模拟一下v-if */}
				{this.state.flag && <p>我是段落</p>}
				{/* 模拟一下v-show */}
				<p style={{display: this.state.flag ? 'block' : 'none'}}></p>
				<button onClick={this.myFn}>点击显示/隐藏</button>
				{/* 使用map方法 将返回的每项配合成绩，渲染在页面上 */}
				<ul>{
					this.state.arr.map((item,index) =>{
						{/* 注意这里<li></li> 中间是表达式，需要加{}
						另外，根据React的建议，建议给每个li添加一个key属性*/}
						return 
						<li key={index}>{item + this.state.score[index]}</li>
						}
					})
				}</ul>
			</div>
		)
	}
	myFn = () => {
		this.setState({
			flag: !this.state.flag
		})
	}
}
ReactDOM.render(<Hello />, document.getElementById('app'), alert('渲染成功'))
```

### JSX编码规范
1. 在编写JSX代码的时候，建议使用`()`将JSX代码包裹起来。
2. 在JSX中，只能有一个`根元素`
3. 在JSX中可以编写`单标签`，也可以编写`双标签`。但是如果编写的是`单标签`，那么必须加上`闭合符号`。
4. 在使用`组件`的时候，可以使用`单标签`，也可以使用`双标签`。一样要带闭合符号。
5. 如果`组件`中没有内容，建议使用`单标签`
```jsx
return (
	<>
		<img />
		<h1>双标签</h1>
	</>
)
```

### JSX绑定事件
1. 事件监听方法中的`this`:   
 - 默认情况下React在`调用事件监听方法`时，通过`apply`来调用的
 - 并且在调用的时候，将`this改为了undefined`
2. 所以默认情况下无法在方法中使用this, 解决方案：
	- **2.1** 可以在`定义时`，`改为ES6箭头函数`的方式。 因为`箭头函数`的`this`在定义时就固定为`外层函数的this`了，无法被改变。
	- **2.2** 可以在`添加监听方法时`，`手动`将其改回`this`,利用`bind(),call(),apply()`
	- **2.3** 可以在`构造函数方法中`, `手动`将其改回`this`, 赋值给`新的方法名`。
	- **2.4** 可以在`添加监听方法时`,`外层`套上一层`箭头函数`。 原理和`2.1`一样。
3. 在企业开发中，最为推荐的一种方式，就是第四种**`2.4`**，外层套`箭头函数`的方式，`定义时`依旧是`普通函数`。
```js
// 默认情况下的事件方法
btnClickA(){
	console.log(this);
	/* 打印undefined */
}

/*2.1. 修改为箭头函数*/
btnClickB = () =>{
	console.log(this)
	// 这个组件对象
}
```
```jsx
{/*2.1.箭头函数解决this问题*/}
<button onClick={this.btnClickB}>按钮点击</button>
{/*2.2. 添加监听方法时，手动修改回原先的this, 也可以解决this问题*/}
<button onClick={this.btnClickA.bind(this)}>按钮点击</button>
```
```js
constructor(){
	super();
	// 2.3 构造函数内，手动绑定回this,然后赋值给新的方法名
	this.myFn = this.btnClickA.bind(this);
}
```
```jsx
render(){
	return (
		<div>
			{/*2.3 构造函数做法 */}
			<button onClick={this.myFn}>按钮</button>
			{/*2.4 添加监听方法时，外层套一个箭头函数 */}
			<button onClick={() => {this.btnClickA()}}>按钮</button>
		</div>
	)
}
```

#### JSX绑定事件-企业开发
> 企业倾向于**`2.4`**是有原因的，因为该方法可以方便的`传参数`。
```js
btnClickA(a,b){
	console.log(a,b);
	console.log(this)
}
btnClickB = (a,b) => {
	console.log(a,b);
	console.log(this)
}
```
```jsx
constructor(){
	super();
	this.myFn = btnClickA.bind(this);
}
render(){
	return(
		<div>
			{/*方法1:无法传参，要想传参还得再套一层函数*/}
			<button onClick={btnClickB}>
			方法1:定义时的箭头函数</button>
			{/*方法2:传参不方便，得看bind脸色行事*/}
			<button onClick={btnClickA.bind(this,[1,2])}>
			方法2:添加监听方法时，手动bind改回this</button>
			{/*方法3:和方法1一样，无法传参，不方便*/}
			<button onClick={this.myFn}>
			方法3:构造函数内，bind后赋值新变量</button>
			{/*方法4: 传参非常方便，维护简单*/}
			<button onClick={() => {this.btnClickA(1,2)}}>
			方法4: 外层套一个箭头函数，让其特性来恢复this</button>
		</div>
	)
}
```
### JSX事件对象
> 在React中，当`监听方法`被触发的时候，也会`传递`一个`e`事件对象  
> 但是，该事件对象并不是`原生的事件对象`，而是React自己`合成的`事件对象。  
> 但是，提供的`API`与`原生的`几乎一致。
> 并且，可以通过`e.nativeEvent`获取到`原生`的事件对象，进行操作。
```jsx
render(){
	return(
		<div>
			<button onClick={(e) => 
			{console.log(e)}}>合成e事件对象</button>
			<button onClick={(e) => 
			{console.log(e.nativeEvent)}}>
			通过e.nativeEvent拿到原生事件对象</button>
		</div>
	)
}
```
```js
// React 合成的e对象
// SyntheticBaseEvent 
// {_reactName: 'onClick', _targetInst: null, 
// type: 'click', nativeEvent: PointerEvent, target: button, …}
// 原生的e对象  e.nativeEvent
// PointerEvent {isTrusted: true, pointerId: 1, 
// width: 1, height: 1, pressure: 0, …}
```

## React脚手架
> 脚手架：快速帮我们生成项目模板的工具
### 安装和使用
> React脚手架-create-react-app
```sh
# 安装create-react-app
npm install -g create-react-app #全局安装create-react-app
# 创建项目
create-react-app 项目名称
# 进入项目和启动
cd 项目名称
npm start
```
> 注意点：
- 项目名称：只能是`英文`,并且只能`小写`。
- 项目名称：如果出现了多个单词，需要通过连字符`-`或`_`连接。`(myName -> my_name -> my-name)`

### 脚手架定义组件
- 定义函数组件
```jsx
// 由于要用到jsx转react的createElement创建虚拟DOM，需要引入React
import React from 'react'
function Hello(){
	return(
		<div></div>
	)
}
export default Hello;
// 将Hello组件导出到外界环境
```
- 定义类组件
```jsx
// react的一切类组件都继承自React.Component{} 类
import React from 'react'
class Hello extends Reac.Component{
	constructor(){
		super();
		// 继承必备
	}
	render(){
		return(
			<div></div>
		)
	}
}
export default Hello;
// 将Hello组件导出到外界环境
```
## 父-子组件通讯
### 函数组件
> 函数组件一般将父亲传过来的通讯数据，写在属性值里面。 在定义组件时，用props对象作为参数接收。
```jsx
import React from 'react'
function Son(props){
	return(
		<div>
			<h1>我是son的h1</h1>
			<h1>我是son的name{props.name}</h1>
		</div>
	)
}

function Father(){
	return(
		<div>
			<Son name="sonname"/>
		</div>
	)
}
```
### 类组件
> 类组件传输数据是一样的，写在属性值里面。  
> 由于继承特性，该数据会保留到React.Component类里面.   
> 所以定义子组件的时候，可以在构造函数上面，携带参数，一并继承this过来。
```jsx
import React from 'react'
class Son extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<h1>{this.props.name}</h1>
			</div>
		)
	}
}
class Father extends React.Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div>
				<Son name="sonname"/>
			</div>
		)
	}
}
```

### 子-父组件通讯
> React中，子向父传递数据，采用`回调函数`的机制.  
> 父亲传一个值为`回调函数`的props(带形参)，接收或者操作子组件传递的数据。
```js
// 举例说明
// 父组件
// App.js
function myFn(a,Fn){
	console.log(a);
	console.log(Fn)
}

// 子组件
// Footer.js
// 调用父组件的函数,传入数据和回调函数
myFn(123,callBack);
```
> 父组件使用组件时,定义一个props属性, 属性值是方法(方法里携带数据的形参).
> 子组件中接收这个props, 直接使用,或者触发个自己的方法来调用执行这个props.
> 子组件往父组件传过来的props方法里,传入实参.
> 父组件就可以使用了.
## 函数组件
> 和类组件机制一样，不展开。
## 类组件
```jsx
class App extends React.Component{
	constructor(){
		super()
	}
	render(){
		return(
			<Footer fatherFn={()=>{ this.myFn }}/>
		)
	}
	myFn(a,b){
		alert(123);
		console.log(a,b);
	}
}

class Footer extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<button onClick={() => {this.myButton()}}>点击提示</button>
			</div>
		)
	}
	myButton(){
		this.props.fatherFn('1','2');
	}
}
```