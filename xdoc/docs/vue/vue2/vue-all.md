# vue2
## 初识vue
```js
/*
vue都学习什么东西？
1.vue.js 核心
2.devTools调试工具
3.vue cli 脚手架
4.vue router 路由
5.vuex  状态集中化管理工具
6.vue服务端渲染
7.elementui和vue联动 vue-element-admin
*/

/*
学习vue的过程
(1.学习框架如何使用，如何通过框架实现自己目标)
(2.尝试阅读框架的底层代码，源码，逐渐熟悉源码，能在源码上进行二次开发)
(3.熟读源码，熟练进行整合和二次开发)
(4.精通源码)
*/
```
### 小胡子语法
```html
<!-- {{ 表达式 }} -->
<h1>{{ age > 20 ? '666' : '777'}}</h1>
```
### $mount
> 用于挂载模板，模板就是vue作用的容器
```html
<!-- 渲染模板类型1: 标签 -->
<template id="app"></template>
<!-- 渲染模板类型2: template选项中的模板 -->
<script type="text/javascript">
	let vm = new Vue({
		template: `<div></div>`
	})
</script>
```
- 挂载容器的方式
- `el`: 优先级比`$mount`**高**。
- `$mount`
```html
<div id="app">
</div>
<script type="text/javascript">
	let vm = new Vue({
		el: "#app"
	})
	// 或者
	vm.$mount('#app');
</script>
```
## 初识事件绑定
### 绑定，传参和传事件对象。
> vue中，使用`html级别`的事件绑定，并且把事件定义在`methods`选项上。    
> 使用`v-on:`或者`@`绑定事件类型。  
> 使用`$event`传递事件对象`e`
```html
<div id="app" v-on:click="handleClick($event,'admin')">点击触发</div>
<script type="text/javascript">
	new Vue({
		el: "#app",
		methods: {
			handleClick(e,val){
				console.log(e,val)
			}
		}
	})
</script>
```

### 事件修饰符
> vue中内部定义了大量与事件相关的修饰符。  
> 例如用于`阻止默认事件`,`键盘码`，`事件冒泡`等等。  
> 事件修饰符可以连用

|修饰符名称|功能|意义|
|---|---|---|
|.stop|阻止传播|---|
|.prevent|阻止默认事件|---|
|.capture|以事件捕获模式|---|
|.self|只当点击`e.target`为自身才触发|---|
|.once|只触发一次|---|
|.passive|阻止浏览器滚动的默认行为|---|

```html
<!-- 阻止默认事件 e.preventDefault()-->
<a @click.prevent="handle"></a>

<!-- 阻止事件传播 -->
<a @click.stop="handle"></a>

<!-- 只有点击的时自身时才触发 -->
<div v-on:click.self="doThat">...</div>
```

### 按键修饰符
> 监听键盘事件时，例如内置`键盘码`等功能  
> 支持使用`config.keyCodes`对象, `自定义`按键`修饰符别名`

|修饰符|名称|意义|
|---|---|---|
|.enter|回车事件||
|.tab|tab键事件||
|.delete|删除键事件||
|.esc|返回键事件||
|.space|空格键事件||
|.up|up键事件||
|.down|down键事件||
|.left|left键事件||
|.right|right键事件||
```html
<!-- 回车事件 -->
<input @keyup.enter="handle">
<!-- 支持自定义修饰符别名 -->
<!-- Vue.config.keyCodes.f1 = 112 -->
<input @keyup.f1="handle">
<!-- 当按下112键盘码时，触发 -->
```

### 事件双向绑定
> 将`v-model`作用在`input`上时，双向绑定
> `v-model`实际上可以认为是`v-input`和`v-bind:value`的语法糖
```html
{{ msg }}
<input v-model="msg">
<script type="text/javascript">
	new Vue({
		data(){
			return{
				msg: ''
			}
		}
	})
</script>
```
## 内置指令
### 内置指令
```html
<div id="app">
	<!-- v-bind:attr="响应式数据 或 表达式", 单向绑定属性值-->
	<img v-bind:src="url" />
	<!-- v-once, 只渲染一次, 后续更改不渲染-->
	<img v-bind:src="url" v-once>
	<!-- v-html, 将绑定的内容显示到节点中，可渲染html节点-->
	<div v-html="node1"></div>
	<!-- v-text, 将绑定的内容显示到节点中，不渲染html-->
	<!-- v-text 和小胡子写法是一样的 -->
	<div v-text="node1"></div>
	<!-- v-if 布尔值判断 控制节点的创建和销毁,耗费性能 -->
	<!-- 会引起重排(排, 节点顺序)，可能会重绘 -->
	<div v-if="isShow"></div>
	<div v-elseif="isShow"></div>
	<div v-else="isShow"></div>
	<!-- v-show 布尔值判断 控制节点的显示和隐藏 -->
	<!-- 只可能会引起重绘 -->
	<div v-show="isShow"></div>
	<!-- template标签  幽灵标签, 划分级别，不会渲染实际节点 -->
	<template v-if="style=='学习'">
		<span>学习</span>
	</template>
	<!-- v-model 基本input,textarea,select都是绑定value -->
	<input type="text" v-model="url">
	<!-- v-model 多个checkbox时，可以收集数组 -->
	<input type="checkbox" v-model="hob" value="11">1
    <input type="checkbox" v-model="hob" value="22">2
    <!--  v-model 收集radio, 指定value时，收集value -->
    <input type="radio" v-model="sex" value="男" name="sex">男
    <input type="radio" v-model="sex" value="女" name="sex">女
	<!-- v-for遍历数组 -->
	<span v-for="(item,index) in hob" :key="index">{{item}}</span>
	<!-- v-for遍历对象 -->
	<span v-for="(item,key,index) in hob" :key="index">{{key + ':' + item[key]}}</span>
	<!-- v-for遍历数字和字符串，遍历0-5 -->
	<span v-for="(item,index) in 5" :key="index">{{item}}</span>
</div>
<script type="text/javascript">
	new Vue({
		el: "#app",
		data(){
			return{
				url: "http...",
				node1: "<h1>数据</h1>",
				isShow: false,
				style: "学习",
				hob: [],
				user:{
					address: '11'
				}
			}
		}
	})
</script>
```

### $refs
> 一个对象，持有注册过`ref`属性的所有`DOM元素`或`组件实例`。
```html
<span ref="span"></span>
<script type="text/javascript">
	new Vue({
		mounted(){
			this.$refs.span.innerHTML = '我是span内容'
		}
	})
</script>
```

## 引用数据刷新
> 在使用`索引值`修改`引用数据`时，可能不会造成`页面重新刷新`。  
> vue内部对`splice`,`push`,`pop`,`sort`,`reverse`等数组方法，进行了包装，可以放心使用。  
> 直接给引用数据`重新赋值`可以触发刷新.  
> 或者使用`替换数组`的方法，并且`用新数组替换旧数组, 重新赋值`，也可以触发更新。
```js
// 如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事。

// 用一个含有相同元素的数组, 去替换原来的数组是非常高效的操作。
this.arr = this.arr.filter(e => e);
// 或者用包装后的方法
this.arr.splice(oldValue, 1, newValue);

// vue中提供了一些方法，用于强制刷新，或者设置响应式。
this.$forceUpdate();

Vue.set(vm.items, indexOfItem, newValue)
vm.$set(vm.items, indexOfItem, newValue)
```

## 计算属性
> 一般而言，计算属性选项`computed`, 默认为`getter`  
> 在有需要时，也可以提供一个`setter`函数
```js
// 写法一： getter写法
computed:{
	fullName(){
		return this.firstName + '' + this.lastName
	}
}
// 写法二: getter配合setter写法
computed:{
	fullName: {
		getter(){
			return this.firstName + '' + this.lastName
		}
		setter(newValue){
			var names = newValue.split(' ')
		    this.firstName = names[0]
		    this.lastName = names[names.length - 1]
		}
	}
}
// 此时，如果设置了fullName的值，会同步修改this.firstName和 this.lastName
vm.fullName = 'John Doe';
``` 

## 侦听器
### 常规写法
> 除了计算属性外，Vue还通过`watch`选项，提供了一个更加通用的方法，用于`响应`数据的变化。  
```js
data(){
	return{
		msg: '',
		answer: 'ddd'
	}
},
watch:{
	// 监听属性msg的变化
	msg: function(newValue, oldValue){
		this.answer = 'ddddd'
		console.log(newValue);
	}
}
```
### 立即监听和深度监听
> 除了基本写法，Vue还支持对象写法，以使用`立即监听`和`深度监听`
```js
watch:{
	msg: {
	    deep: true,//表示深度侦听
	    immediate: true,//表示立即侦听
	    handler(newValue, oldValue) {
	    	// 将原先的匿名函数，改为handler函数
	        if (oldValue) {
	            console.log(oldValue.name);
	        } else {
	            console.log(oldValue);
	        }
	        console.log('obj发生了变化');
	    }
	}
}
```

## 动态类名和样式
> 使用`v-bind`处理`class`和`style`时，支持多种写法。
### 对象语法
> 使用对象中，属性值的布尔值来决定，该属性类名是否`存在`。
```html
<span class="defaultClass" :class="{active: isActive, 'text-danger': hasError}"></span>

<!-- 对应的data
	data: {
	  isActive: true,
	  hasError: false
	}
 -->
```

### 数组语法
> 使用数组中，多个动态属性，排布该属性类名。  
> 并且支持与对象语法一起使用。
```html
<span class="defaultClass" :class="[{active: isActive}, hasError]"></span>
<!-- 对应的data
	data: {
	  isActive: true,
	  hasError: false
	}
-->
```

### 用在组件上
> 当类名写在组件上时，会自动被添加到`根元素`上。
```html
<my-component v-bind:class="{ active: isActive }"></my-component>
<!-- 渲染为如下 -->
<p class="foo bar active">Hi</p>
```

### 内联样式
> 与绑定`类名`基本一样，支持对象和数组。  
> 区别是需要写为`驼峰式`或者`短横线分隔`命名。  
> 也可以将其绑定到一个`样式对象`上，模板将会更加清晰。
```html
<span :style="{color: isActive}"></span>
<span :style="styleObject"></span>
<div :style="[baseStyles, overridingStyles]"></div>
<!-- 
data: {
  isActive: 'red',
  styleObject: {
    color: 'red',
    fontSize: '13px'
  },
  baseStyles: {
	color: 'red',
  },
  overridingStyles:{
	fontSize: '14px'
  }
}
 -->
```
> 单个样式支持多重值，以满足兼容性
```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
<!-- 当渲染数组时，只渲染最后一个被浏览器支持的值 -->
```

## 组件的使用
### 定义组件
> 注意: 在该部分定义的组件,都是`组件构造器`, 只有`注册`或者`new`了以后,才是组件实例.
> 组件名一般大写。
- 方式一: Vue.extend(obj)
```js
// 其中，obj的写法和vue实例的配置项一样
let Cobj = {
	template: `<h1>{{ msg }}</h1>`,
	data(){
		return{
			msg: 'ddd'
		}
	}
}
let Com1 = Vue.extend(Cobj)
// 例如new为组件实例,就可以跳过注册,直接使用
new Com1().$mount('#app')
```
- 方式二: Vue.extend的简写。
```js
// 当定义的一个对象，符合Vue实例的格式时，
// 注册时会被自动识别/转换为组件。
let com1 = {
	template: `<h1>{{ msg }}</h1>`,
	data(){
		return{
			msg: 'ddd'
		}
	}
}
```
- 方式三: 单文件组件
```html
<!-- 在.vue文件中，单个文件就是一个组件 -->
<template>
</template>
<script type="text/javascript">
	export default {
		data(){
			return{

			}
		}
	}
</script>
```
### 注册组件
- 全局组件
```js
let Com1 = {
	template: `<h1>{{ msg }}</h1>`,
	data(){
		return{
			msg: 'ddd'
		}
	}
}
// 使用Vue.component(name, obj)注册全局组件。
Vue.component('Coma',Com1)
```
- 局部组件
```js
// 使用选项components: {}注册局部组件
new Vue({
	components: {
		Coma: Com1
	}
})
```

### 使用组件
> 在定义，引入和注册以后，可以当成普通标签使用。  
> 但是需要注意写为`短横线分隔`的写法。
```html
<com-a></com-a>
<script>
	import Coma from './Coma'
	export default {
		components: {
			Coma
		}
	}
</script>
```

## 生命周期函数
> 在组件实例的某个特定时期内，自动执行的钩子函数。
> 一共有8个，都是`成对出现`的，从组件的`创建`-`挂载`-`更新`-`销毁`
```js
export default {
	data(){
		return{ 
			msg: '我是消息'
		}
	},
	beforeCreate(){
		// 创建之前, vm实例即将创建
	},
	created(){
		// 创建实例后，可以操作实例的选项，但是未渲染模板，不能操作dom
	},
	beforeMount(){
		// 挂载之前，此时已经渲染好了模板，vnode -> node
	},
	mounted(){
		// 此时已经将真实dom挂载到了容器上。
	},
	beforeUpdate(){
		// 数据更新之前
	},
	Updated(){
		// 数据更新之后
	},
	beforeDestroy(){
		// 卸载之前
		// 即将卸载监听器选项，子组件，事件监听等等。
	},
	destroyed(){
		// 卸载之后
	}
}
```

## 自定义指令
> Vue支持使用`directives`选项，定义`局部指令`。  
> 支持使用`Vue.directive`函数，定义`全局指令`。
> 定义指令时，vue提供了一些`钩子函数`，用于`指令`作用于`被绑元素`的时期。  
> 同时,这些`钩子函数`支持接收固定的`函数参数`，用于传输`指令相关`的数据。

### 全局指令
```js
// 以一个v-color指令为例
// html:   <span v-color:theme="mycolor">内容</span>
// 全局指令
Vue.directive('color',{
	bind: function(el,binding, vnode){
		// 只调用一次,用于作用一次的指令, 
		// 指令第一次绑到元素身上生效.
		// el: 被绑元素
		// binding: 指令相关的信息
			// binding.value 就是绑定值, v-color="mycolor"中的mycolor
			// binding.name 就是指令名称, v-color中的'color'
			// binding.arg 就是绑定时的传参,v-color:theme中的theme
			// binding.modifiers 就是绑定时的修饰符对象,v-color.foo中的{foo: true}
		// vnode: Vue编译生成的虚拟节点
		el.color = binding.value
	},
	inserted:function(el,binding,vnode){
		//...
	},
	update:function(el,binding,vnode){
		//...
	},
	componentUpdated:function(el,binding,vnode){
		// ...
	},
	unbind:function(el,binding,vnode){
		// ...
	}
})
```
### 局部指令
```js
	export default {
		data(){
			return{

			}
		},
		directives: {
			color: {
				bind: function(el, binding){
					el.color = binding.value
				}
			}
		}
	}
```

## 自定义过滤器
> Vue支持使用`Vue.filter(name, function(val){})`, 和`filters`定义全局或局部过滤器.  
> 和计算属性非常类型, 可被用于一些常见的`文本格式化`。
> 和自定义指令一样,支持全局定义和局部定义过滤器.  
> 过滤器一般和管道符`|`一起使用,并且过滤器支持`连用`.  
### 全局过滤器
```js
Vue.filter('toLowerCase', function(value){
	return value.toLowerCase();
})
// 使用, 在{{}}中, 或者在v-bind中
// <span>{{ msg | toLowerCase }}</span>
// <input :value="msg | toLowerCase">
```
### 局部过滤器
```js
export default {
	data(){
		return {
			msg: 'dsFFWEsAsdadD'
		}
	},
	filters: {
		toLowerCase: function(val){
			return val.toLowerCase();
		}
	}
}
```

## 混入
> `mixins`选项支持以`恰当`的方式`合并`  
> 定义`mixins`和定义配置对象或者定义组件简写一模一样.  
> 使用`mixins`选项, 使用混入.
```js
let myMixins = {
	data(){
		return{
			msg: 'aaaa',
			name: 'admin'
		}
	},
	methods: {
		handlerA(){
			console.log(this.msg)
			console.log(this.name)
		}
	}
}

export default {
	data(){
		return{
			name: 'test'
		}
	},
	mixins: [mixin], //选项合并
	created(){
		this.handlerA(); //aaaa   test
	}
}
```

## 依赖注入
> 当子组件较深时,使用`父-子-子-子`传输数据较耗费精力.  
> 因此设计了`provide`(依赖)选项,函数形式提供  
> 和`inject`(注入,消费)选项, 接收数组的数据来实现深度传输.  
> 无论子组件有多深,都能`消费`父组件`提供`的数据.  
```js
// 使用provde, 类似于data的写法, 返回一个对象或者方法给后代使用
data(){
	return{
		msg: 'dddd'
	}
},
provide: function(){
	return {
		msg: this.msg,
		updataMsg: function(){
			this.msg = 'aaaa'
		}
	}
}

// 使用inject, 类似于props写法, 使用父提供的数据
inject: ['msg','updataMsg']
```
> 可以把依赖注入看作一部分**大范围有效的prop**

## 插槽
> 使用`slot`标签, 定义`匿名插槽`, `具名插槽` 和 `作用域插槽`.  
- 对于`具名插槽`, 需要使用`template`这个`幽灵标签`,   
	- 使用`v-slot:nameA`或者`#nameA`指定对应的插槽名.  
- 对于`作用域插槽`, 有利于`插槽外部`，访问`组件插槽内部`的数据。  
	- 在`具名插槽`的基础上，给`插槽名`赋值变量。
	- 并且在对应的`插槽`, 添加`自定义属性`，借助属性传值。
- 匿名插槽
```html
<!-- 组件内预留一个位置, 用于使用组件时放内容 -->
<div id="app">
	<slot>我是插槽的默认内容</slot>
</div>
<!-- 使用组件时,放置内容 -->
<com-a>显示插槽内容</com-a>
<com-a></com-a>
```
- 具名插槽
```html
<!-- 在slot标签上,指定name -->
<div id="app">
	<slot name="header"></slot>
	<slot></slot>
</div>

<!-- 使用组件时,在幽灵标签上指定v-slot:插槽名或者#插槽名 -->
<com-a>
	<template #header>
		显示具名插槽的内容
	</template>
	<template v-slot:header>
		显示具名插槽的内容
	</template>
</com-a>

<!-- 实际上匿名擦火车,就等价于名称为default的具名插槽 -->
<com-a>
	<template #default>
		显示匿名插槽的内容
	</template>
</com-a>
```
- 作用域插槽
```html
<com-a>
	<template #header="user">
		<!-- 指定插槽时，绑定一个变量user，
		该变量user接收，内部插槽“自定义属性”绑定的值。 -->
		{{user.userInfo.name}}
		{{user.userInfo.address}}
	</template>

	<!-- 匿名插槽的作用域插槽写法 -->
	<template #default="user">
		{{ user.userInfo.name }}
		{{ user.userInfo.address }}
	</template>

	<!-- 支持解构 -->
	<template #default="{ userInfo }">
		{{ userInfo.name }}
		{{ userInfo.address }}
	</template>
</com-a>

<div id="app">
	<!-- 给对应的插槽，添加自定义属性userInfo -->
	<slot name="header" :userInfo="user">
		{{ user.name }}
	</slot>

	<!-- 匿名(默认)插槽也支持写成作用域插槽 -->
	<slot :userInfo="user"></slot>
</div>
<script type="text/javascript">
	export default {
		data(){
			return{
				user: {
					name: 'admin',
					address: 'wc'
				}
			}
		}
	}
</script>
```

## 动态组件
> 使用`keep-alive`和`component`内置组件,使得渲染的组件带有`缓存`,  
- `keep-alive组件`有`include`, `exclude` 和`max`属性,  
	- 用于细节操控缓存的子组件或子组件数量.  
- 使用component组件的`is`属性, 
	- 决定`动态组件`, 也就是当前`激活`或者`失活`的子组件.  
    - 组件内的`activated`和`deactivated`两个生命周期钩子,能监听到`相应的状态`
```html
<keep-alive max="2">
	<component :is="comName"></component>
</keep-alive>

<script type="text/javascript">
	export default {
		data(){
			return{
				comName: 'com-a'
			}
		},
		activated(){
			console.log('当前组件被激活')
		},
		deactivated(){
			console.log('当前组件失活,且被缓存')
		}
	}
</script>
```
## eventBus
> 使用`事件总线`, 借用Vue的`发布`-`事件中心`-`订阅`的模式, 自定义事件机制，实现数据的跨组件传递.
> 由于太过方便，若使用不慎，容易造成`维护的`灾难。后续才推出`Vuex`。
> eventbus更适合`小项目`，数据被更少组件使用的项目.  
```js
// 在main.js中注册一个属性，作为事件总线
Vue.prototype.$EventBus = new Vue();

// 在A组件中，使用$on 订阅事件, 注册事件总线的事件，发送数据。	
this.$EventBus.$on('msg', '123')

// $on 注册订阅事件，同时发送数据
this.$EventBus.$on('sayHello','hello')

// $emit 触发总线的事件，发布事件，接收数据
this.$EventBus.$emit('sayHello',(data)=>{
	this.msg = data;
})

// 在B组件中，使用$emit, 触发事件总线的方法，接收数据。
this.$EventBus.$emit('msg', (data) => {
		this.msg = data;
})

// 在组件被销毁前，需要将事件监听移除，防止重复后创建监听
beforeDestory(){
	this.$EventBus.off('msg')
}
```

## $-API
> $root: 获取到根节点实例对象。   
> $parent: 获取到`父节点实例对象`。  
> $children: 获取到第一层`子节点实例对象`。  
> $attrs: 获取到父亲通过`自定义属性`传递下来的属性集合(除了用props接收的以外)。  
> $nextTick: 传递一个回调函数，这个回调函数会在DOM更新之后再执行。获取更新后的数据。   
> $listener: 获取到所有的`自定义事件`。

## 自定义插件
> Vue提供了一个`Vue.use(plugin)`方法，用于安装`插件`。  
> 该方法会自动执行`插件`提供的`install`方法(或者属性)，并且将`Vue`对象传入。  
> 以便于插件内定义`全局方法`，`组件`，`过滤器`等操作。
```js
// main.js 使用插件
import MyPlugin from '@/plugin/MyPlugin'
Vue.use(MyPlugin, {message: 'hello'})
// 当Vue.use(MyPlugin)时, Vue会执行MyPlugin.install, 并且传入Vue 和options作为实参.


// src/plugin/MyPlugin/index.js
const install = function(Vue, options){
	// 使用Vue.extend({})创建出来的,
	// 都是组件构造器,
	// 需要注册或者new一下才能变为实例, 以使用或挂载.
	const ComponentConstructor = Vue.extend({
		data(){
			return{
				msg: options.message
			}
		}
	})

	// 注册全局方法
	Vue.prototype.$message = function(){
		// 创建组件实例,以便于直接挂载.
		const coma = new ComponentConstructor();
		coma.$mount()
		document.body.append(coma.$el);

	}

	// 也可以扩展已经有的单文件组件, 再注册一下,变为实例,且全局使用.
	const ComponentConstructor2 = Vue.extend(Message);
	// 也可以全局注册组件构造器, 注册为单个组件实例
	Vue.component('comb', ComponentConstructor2);
}

const MyPlugin = {
	install
}
export default MyPlugin
```
- 总结:
1. 使用`Vue.extend`可以扩展`一个对象`, 或者`单文件组件`. 等同于定义组件,也就是`定义组件构造器`
2. 扩展后的`组件构造器`需要`注册`或者`new`一下,才能使用.
3. `注册`等同于`自动`(Vue内部会帮我们new), 而`new`等同于`手动`.

## 路由
> Vue-Router的内容

### 手写一个路由
> 定义路由对象  
> 将路由对象加入到配置项
```js
// 定义路由对象
// router/index.js
import VueRouter from 'vue-router'
// 引入VueRouter

const routes = [
	{
		path: '/',
		// 路由重定向
		redirect: '/home',
		beforeEnter: (from,to,next)=>{
			// 定义局部路由守卫.
			next()
		}	
	},
	{
		path: '/home', //路径, 路由信息之一
		name: 'home', //组件名, 路由信息之一
		component: ()=>imports('@/views/Home.vue'), //显示组件
		children: [  //子级路由
			{
				path: 'add',  //子级路由不加"/"
				component: ()=>imports('@/views/HomeAdd.vue'),
				meta: {  //路由元信息, 可以使用$route.meta.xxx获取
					icon: "add"
				}	
			}
		]
	}
]


// 创建路由实例对象
const router = new VueRouter({
	routes,
	mode: history,   //历史模式路由对象
})

// 定义路由的全局前置路由守卫
router.beforeEach((from, to, next) => {
	// 假设已经引入了getToken方法,用于获取是否有token
	if(to.path != '/login' && getToken()){
		next() //放行
	}
	next('/login')
})

// 将路由对象暴露出去
export default router


// 使用路由对象
// main.js
import router from '@/router'
import App from './App'

// 将路由对象,添加到配置项中
new Vue({
	render: (h)=>{
		h(App)
	},
	router
})
```
### 内置路由组件
> 路由内部创建了两个路由组件,用于跳转路由和显示路由组件.
```html
<router-link to="/foo" tag='div'>Go to Foo</router-link>
<!-- 可以使用tag属性,指定渲染后的标签类型,默认为a标签 -->
<router-link to="/bar">Go to Bar</router-link>
<router-link :to="{path: '/home', params: {name: 'admin'}}">Go to Home</router-link> 
<!-- 支持v-bind:to传递一个对象,类似于编程时导航 -->
<router-view></router-view>
```
> 页面及组件: 将`router-view`独占单个页面
### 内置路由组件的传参
```html
<!-- 支持2种路由传参形式 -->
<!-- 形式1: 查询模式: 不安全,显示在路径上 -->
<router-link to="/foo?name=admin&password=123">Go to Foo</router-link>
<!-- 形式2: 动态路由模式: 安全,但是要改变路由定义时的path,来接收 -->
<router-link to="/foo/admin/123">Go to Foo</router-link>

<!-- 对于动态路由, 相应的路由上, 要定义接收 -->
<!-- 
{
	path: '/foo/:name/:password'
}
 -->
```

### 编程式导航
> 除了使用`内置路由组件`, 还可以使用`$route`和`$router`,  
> 更加灵活的切换路由和传参
```html
<button @click="$router.push('/home')">跳到home</button>
<button @click="$router.push({path:'/home'})">跳到home, 对象格式path</button>
<button @click="$router.push({name:'home'})">跳到home, 对象格式name</button>
<button @click="$router.push({path:'home', params: {name: 'admin'}})">跳到home, params携带参数</button>
<button @click="$router.push({path:'home', query: {name: 'admin'}})">跳到home, query携带参数</button>
<button @click="$router.push({name:'home', params: {name: 'admin'}})">跳到home, params携带参数</button>
```
> 使用`$router`的`push`, `replace`, `go`, `back`和`forward`等**方法**,灵活切换路由  
> `addRoute`和`removeRoute`, 可以添加/删除`路由规则`.
> `hasRoute`和`getRoutes`可以判断或者获取`路由规则对象`
> `beforeEach`和`afterEach`可以定义全局`前置`或者`后置路由守卫`
> 使用`$route`对象上的**属性**,可以方便的拿到`路由信息`
```js
created(){
	// 添加新的路由规则
	this.$router.addRoute({
		path: '/about',
		name: 'about',
		component: ()=> imports('...')
	})

	// 添加新的路由规则到, 特定父级name的路由下面
	this.$router.addRoute('home',{
		path: '/del',
		name: 'del',
		component: ()=> imports('...')
	})
	// 删除name为del的路由
	this.$router.removeRoute('del');

	// 判断是否有个name为del的路由
	this.$router.hasRoute('del');

	// 获取一个包含所有路由的数组。
	this.$router.getRoutes()

	/*
	router.beforeEach((from,to,next) => {
		next()
	})
	*/

	console.log(this.$route.params)  //路由参数
	console.log(this.$route.meta)	//路由元信息
	console.log(this.$route.name)	//路由名称
	console.log(this.$route.path)	//路由路径
	console.log(this.$route.fullPath)	//路由全路径
}
```
## 状态仓库
> 基于eventbus的维护问题,vue2官方推荐使用vuex集中化管理数据和状态.  
> vuex由`state`,`mutations`,`getters`,`actions`和`modules`组成.  
### 手写一个状态库
> 基于vuex3.0
```js
// 分模块处理
// 每个模块有自己的state, mutations和actions(处理异步)
// 作用分别类似于data, methods
const moduleA = {
	state: {
		msg: 'hello'
	},
	mutations: {
		// state表示状态数据
		handleEdit(state, payload){
			state.msg = payload
		}
	},
	actions: {
		// context表示模块实例
		asynchandleEdit(context,payload){
			context.commit('handleEdit','olleh')
		}
	}
}
// 类似于计算属性
const getters = {
	UpperMsg: (state) => state.moduleA.msg.toUpperCase();
}

// 暴露store
const store = new Vuex.store({
	getters,
	modules: {
		moduleA: moduleA
	}
})

export default store
```
### 注册store和使用
```js
// main.js
import store from '@/store/index.js'
new Vue({
	store
})

// 使用store中的数据
// 提交mutations
this.$store.moduleA.commit('handleEdit', data);
// 分发actions
this.$store.moduleA.dispatch('asynchandleEdit', data);
// 使用state的数据
$store.moduleA.state
// 使用getters的数据
$store.getters.UpperMsg
```