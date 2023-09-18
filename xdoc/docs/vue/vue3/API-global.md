# 全局API
> 本篇内容，完全参考至[vue3官网API](https://cn.vuejs.org/api/). 
> 主要学习`app.xxx()`方法，代替vue2中的`Vue.xxx()`以及`Vue.prototype.xxx`

## app实例方法-app.xxx()
### createApp()
> 用于创建一个vue实例，替代`new Vue()`的方法。
> 与vue2一样，支持选项式创建，也支持传入组件。
```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp({
	setup(){
		console.log(123)
	}
})
const app = createApp(App)
```

### mount()
> 用于挂载实例，每个组件实例内，仅挂载一次。  
> 支持css选择器，或者真实dom.
```js
app.mount('#app');
app.mount(document.documentElement.firstChild)
```

### component()
> 用于注册全局组件。  
> 如果仅传入1个字符串，返回已注册的组件实例。  
> 第2个参数为注册组件时的选项。	
```js
// 注册全局组件
app.component('comA',{
	setup(props,context){

	}
})
// 得到组件实例
const comA = app.component('comA')
```

### directive()
> 用于注册全局指令
> 如果仅传入1个字符串，返回已注册的全局指令。  
> 与vue2一样，第2个参数支持对象或者函数。
```js
// 注册全局指令
app.directive('color',{
	inserted: (el,binding){
		conosole.log(binding.value)
	}
})
// 得到已注册的全局指令
const vColor = app.directive('color');
```

### use()
> 安装一个插件。
> 插件可以是一个带`install()`方法的对象，也可以是`将被用作install()`的函数
- 安装插件
```js
import MyPlugin from './plugin/MyPlugin.js'
app.use(MyPlugin)
```
- 定义插件
```js
import ElButton from './ElButton.vue'
// MyPlugin.js
// 第1种形式，1个带`install()`方法的对象
const MyPlugin = {
	install(app,options){
		app.component('el-button',ElButton);
		// app.config.globalProperties.xxx 替代 Vue.prototype.xxx
		app.config.globalProperties.$message = function(){
			alert('我是提示消息');
		}
	}
}


// 第2种形式，将被用作install()的函数本身
const install = function(app,options){
	app.component('el-button',ElButton);
	// app.config.globalProperties.xxx 替代 Vue.prototype.xxx
	app.config.globalProperties.$message = function(){
		alert('我是提示消息');
	}
}

// 暴露出去
export default {
	MyPlugin,
	install
}
```

### provide()
> 依赖注入，提供一个值(对象)，供后代组件使用。  
> 第1个参数是`属性名`, 第2个参数是`属性值`。
```js
app.provide('message', 'hello')
```

### app.config
> 组件实例暴露出来的配置项，  
> 一般用于捕获错误，检测性能，添加全局方法和属性，修改组件选项等等。
> 具体的`app.xxx`属性，跳转至官网学习使用。


### app.config.globalProperties
> 用于`添加全局方法和属性`, 是vue2种`Vue.prototype`的替代。
```js
// 以下贴一段element-plus中ElMessage的源代码
// 以便深刻理解插件的使用。
app.config.globalProperties.$message = function(){
	app.component('el-message',ElMessage);
	app.mount(document.body);
}
```