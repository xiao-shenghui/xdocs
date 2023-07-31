# Vue-Render 渲染函数
> vue提供的一种更接近编译器的，渲染模板的方法。
## 先看一段代码
> 不用看懂，这是element-ui中，row组件的row.js源码。
```js
export default {
  name: 'ElRow',
  componentName: 'ElRow',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: String
  },
  computed: {
    style() {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },
  render(h) {
    return h(this.tag, {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
      ],
      style: this.style
    }, this.$slots.default);
  }
};

```
> 疑惑：
1. 此组件没有xxx.vue文件, 纯js渲染组件？
2. 此组件的render()函数，是如何渲染组件的？
3. 什么时候要用render()，什么时候用template模板？

## 开始学习render()
> [官网文档](https://v2.cn.vuejs.org/v2/guide/render-function.html)  
> render函数的好处：在一些场景中，使用JavaScript 的完全编程的能力可以简化重复代码。
### 简单使用render
```vue
<!-- 用模板生成h1 -->
<!-- data里面的用msg响应式数据 -->
<!-- msg: "hello" -->
<h1>{{msg}}</h1>
```
```js
// 添加render()函数
// render的基础写法： render: function(){} 或者 render(){}
// render函数可以传入1个参数，表示创建虚拟节点(VNode)的方法名。
render(createElement){
	console.log(createElement);
	console.dir(createElement);
	// 看一下它是什么？
	// ƒ (a, b, c, d) { return createElement$1(vm, a, b, c, d, true); } 一个函数，返回vue提供的创建节点的方法。
	// anonymous(a, b, c, d) 一个函数或对象
	// 在vue.js源码里面找到 createElement$1(currentInstance, type, props, children, 2, true);
	// function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize)
	// currentInstance: 当前实例。 type: 标签类型/组件 props:配置参数 children: 字节点

	// 并且，页面上不会有之前写在模板里的<h1>{{msg}}</h1>
	// 说明，遇到render()函数后，会自动忽略模板里的内容，以render函数为准。
	
	//因此可以调用这个函数，传入a,b,c,d四个参数
	// 接下来我们看官方文档，a,b,c,d分别表示什么？
	// a: HTML标签名(字符串类型)，或者组件对象(组件名)，或者 async 函数(暂时不常用)
	// b: (可写，可不写)一个数据配置对象(对象)，里面可以包含( 1.普通的 HTML标签属性 2.innerHTML等JS DOM属性 3.dom属性 4.组件的props属性写法 5.组件的指令directives  )
	// c: 子级虚拟节点。（1）可以用字符串，表示'虚拟文本节点'（2）或者用数组包含，里面的每个子级都是createElement()方法的调用。
	
	// 此时，要实现渲染上面那个h1,可以如下写法
	return createElement('h1',this.msg); 
}
```
### 使用总结:
> 注意: 一旦使用了`render`时，`template`里的内容`不会再渲染`。
1. `render`是一个属性，属性值是函数方法，所以可以简写。
```js
render: function()
render()
```
2. `render`渲染函数支持传入一个参数，约定为`createElement`或者`h`。
```js
render: function(h){}
````
3. `h`参数是一个内置方法，用于创建虚拟节点。
```js
render: function(h){
	console.log(h);
	// ƒ (a, b, c, d) { return createElement$1(vm, a, b, c, d, true); } 
	console.dir(h);
	// anonymous(a, b, c, d)
}
```
4. `h`方法，可接收多个参数。 `h(a,b,c, d)`
|序号|参数|类型|实参意义|功能|
|----|----|----|----|----|
|1.1|a|String|`HTML标签名`|指定虚拟DOM的标签名|
|1.2|a|Object|`组件对象或组件名`|指定虚拟DOM的结构|
|1.3|a|Function|`async 函数`|暂时未用上|
|2|b|Object|组件的`配置项`|一个与模板中 `attribute` 对应的数据对象。|
|2.1|配置项说明: class| { 'class': { foo: true, bar: false } } | 与模板中的`v-bind:class`用法一样| 接受一个字符串、对象或字符串和对象组成的数组|
|2.2|配置项说明: style| { style: { color: 'red', fontSize: '14px' } } | 与模板中的`v-bind:style`用法一样| 接受一个字符串、对象或字符串和对象组成的数组|
|2.3|配置项说明: attrs| { attrs: { id: 'foo' } } | `attrs 属性`表示HTML的属性集合。属性值为`HTML属性`集合组成的对象|
|2.4|配置项说明: props| { props: { tag: true } } | `props 属性`与Vue实例中的props作用和用法一样|
|2.5|配置项说明: domProps| { domProps: { innerHTML: 'baz' } } | `原生JS`里，标签的`属性`集合|例如:textContent,value等等|
|2.6|配置项说明: on|{ on: {click: myFn} }|`原生JS`里，DOM0级别的`on`绑定事件|里面是事件名和处理函数|
|2.7|配置项说明: ref|{ref: 'myRef'}|类似于`template`里面的`ref`|如果给多个元素都起了同一个`ref`名字，`this.$refs.xxx`会变成一个数组|
|3.1|c|String|`文本内容`|子节点为1个文本节点时，使用字符串指定内容|
|3.2|c|Array|`数组`|多个子虚拟节点组成的数组，里面可以是createElement()，或者字符串|
|3.3|c|NewArray|`返回的数组`|支持使用map方法，遍历渲染多个createElement()，只要返回的是数组即可|
5. 使用案例
```js
// 渲染一个简单节点,<h1>helloworld</h1>
render(h){
	return h('h1',{},'helloworld');
}
// 渲染一个带多个子节点的节点(可以使用遍历，更加方便)
/*
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
</ul>
*/
data(){
	return{
		ul: 'ul'
		arr: [1,2,3,4]
	}
}
render(createElement){
	return createElement(
		this.ul,
		{},
		this.arr.map( e => createElement('li',{},e+'')
	)
}

// 渲染如下结构：
// 并且类名用props接收的container变量
/*
<div class="container">
	<h1 style="backgroundColor: red; color: green">我是h1标签内容</h1>
	<p>我是一段p的文字内容</p>
	我是div的文字内容
</div>
*/
props:{
	container: {
		default: true,
		type: Boolean
	}
}
render(createElement){
	return createElement('div',{
		'class': {
			container: this.container
		}
	},
	[
		createElement('h1',{
			style: {
				backgroundColor: 'red',
				color: 'green'
			}
		},'我是h1标签内容'),
		createElement('p',{},'我是一段p的文字内容'),
		'我是div的文字内容'
	]
	)
}
```