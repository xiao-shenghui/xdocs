# JSX
## 认识JSX
> JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。  
> JSX 看起来和 HTML 很像，但它的语法更加严格并且可以动态展示信息。
## JSX规则
1. 只返回一个根元素

```html
<!-- 可以用一个div标签 包裹 -->
<div> </div>
<!-- 或者用一个<> </> 标签包裹-->
<> </>
```

2. 标签必须闭合
> JSX要求标签必须带闭合符号
```html
<div>
	<img />
	<!-- 类似于img的所有单标签，后面必须加/闭合符号 -->
</div>
```
3. 使用驼峰命名法给大部分属性命名
- `class => className`
- `onclick => onClick`
- `stroke-width => strokeWidth`
```html
<button className="btn" onClick="fn"></button>
```
4. JSX中，通过`{}`大括号可以写表达式
```jsx
export default function Hello(){
	const avatar = "https:...";
	const desc = "这是一个头像";
	return (<img src={avatar} title={desc} />)	
}
```

> 大括号内任何js表达式都能运行，甚至是调用一个函数。

```jsx
export default function User(){
	const user = {
		name: "admin",
		getName: function(){
			return this.name;
		}
	}
	return (
		<button onClick={alert(user.getName())}>点击提示名字</button>
	)

}
```

> 大括号能用在哪里？
1. 文本上嵌入。 
```jsx
/*<{tagName}>123</{tagName}> 该用法无效*/
```
2. 用作紧跟在`=`符号的属性。 
```jsx
<div class={className}>123</div>
```
3. JSX中，双`{{}}`的情况。
> 为了支持css和对象原本就有的{}，因此`{{}}`的形式也是支持的。  
> 实际就是{}里面包了一个对象而已，由于对象自带{}
- 支持css 
```jsx
<div style={{background: "black", color: "red"}}></div>
```
- 支持对象
```jsx
<span>{{name: 'admin'}}</span>
```