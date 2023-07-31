# Vue扩展和插件
## Vue插件
> Vue插件是一种注册组件的方式，使用Vue.use注册全局组件，并且在项目中直接使用。  
> 要使用Vue插件，需要向外暴露一个install方法。
### Vue插件步骤
> 下列以xdesign组件库的xbutton为例
1. 新建xdesign文件夹
2. 新建index.js(用于暴露install方法，便于外界使用)
3. 新建button文件夹，用于放置XButton.vue组件。
```js
// 主要介绍index.js里面，怎么编写
// 1. 引入XButton.vue组件
import Button from './button/XButton.vue'
// 2. 引入Vue
import Vue from 'vue'
// 3. 定义install方法
	// 3.1 该方法可以接收多个参数，第1个参数为Vue,第2个参数为用户的配置项。
const install = function(Vue){
	// 使用Vue全局注册组件的方式，一旦用户use了该文件，即可全局注册定义的XButton组件
	Vue.component("xbutton", Button);
}
// 4. 向外暴露install方法
	// 4.1 可以默认导出，如果有多个组件，就无法按需使用
	// 4.2 可以导出多个，按需使用

const Button.install = function(Vue){
	// 使用Vue全局注册组件的方式，一旦用户use了该文件，即可全局注册定义的XButton组件
	Vue.component("xbutton", Button);
}

export default Button
// 这样就可以实现按需导入。

// 默认导出的方式
export default install
// 按需使用
export {
	install,
	Button
}
```
- 如何在main.js上使用这个插件？
> 1.引入index.js 2.使用Vue.use
```js
// 如果是export default 的方式，则不需要加{}
import install from '@/xdesign/index'
// 如果是export 导出对象的方式，则需要加{}
import {install, Button} from '@/xdesign/index'
```

## Vue扩展
> Vue扩展也是一种批量创建并挂载组件的方式。（对象继承的方式）
> 原理：通过Vue提供的extend()方法，创建`组件构造器`，实例化该`组件构造器`来创建组件实例, 挂载。
> 例如：`Element UI`的`消息组件`： this.$message({message: "提示", type: "success"});  
> 本例中，我们将完成使用`this.$xxx()`即可创建批量自己组件的案例。
### 基本语法:
1. 首先，`this`是指`Vue`，因此`this.$message`实际是挂载在`Vue原型上的方法`，这样就可以实现全局使用该方法。
2. 其次，使用该方法是如何创建组件的？`Vue.extend()`提供了便利。
3. 当把`组件对象`作为参数传入时，会创建一个`组件构造器`。  
	- 3.1 一旦实例化(`new`)了一次该构造器，就等于`创建了一个组件`。
	- 3.1.1 如果用户要传props(例如option), 则可以`实例化`的时候，在组件构造器上传入{props:option}，在组件内接收props。
	- 3.2 只要在实例化以后，将组件挂载到DOM，然后挂载到body上即可。
	- 3.3 挂载到DOM： `xxx.$mount()` //不传参表示默认挂载，传参表示挂载到对应节点。
	- 3.4 挂载到body: document.body.append(xxx.$el); `xxx.$el `表示组件的根节点。
### 基本使用:
> 还是以之前的XButton的`install`方法为例
```js
// 在install 方法里面，挂载Vue原型的方法，规定以Vue.prototype.$xxx格式
const install = function(Vue){
	Vue.component("xbutton",Button);
	// 接下来设计原型方法，使用匿名函数
	Vue.prototype.$button = (option)=>{
		// 创建Button的组件构造器
		const ButtonContructor = Vue.extend(Button);
		// 创建Button的组件实例
		const instance = new ButtonContructor({
			props: option
			// 前提是定义组件的时候，也设置了props接收： props: [xxx] 或者 props: {xxx: {}}
		});
		// 创建完组件实例，就可以挂载组件
		// 挂载到默认DOM
		instance.$mount();
		// 最后挂载body
		document.body.append(instance.$el);
	}
}
```
- 一样的，需要use一下这个install方法。
- 在全局就可以使用this.$button({自定义props属性：属性值})创建并自动挂载组件。
### 测试功能
```js
// xdesign的index.js
const install = (Vue) => {
    Vue.component('xbutton', XButton);
    // 添加原型方法
    Vue.prototype.$xbutton = (option) => {
    	// 创建组件构造器
        const XButtonContructor = Vue.extend(XButton);
        // 创建组件实例
        const instance = new XButtonContructor({
            props: option
        })
        instance.$mount();
        document.body.append(instance.$el);
    }
}

```
```html
// XButton修改一下
<button :class="{ disabled: disabled }" ref="btn" class="xbutton">
        <slot>{{ value }}</slot>
</button>
<script>
export default {
    date() {
        return {
            value: '按钮'
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    mounted: function () {
        if (this.disabled) {
            this.$refs.btn.disabled = true;
        }
    }
}
```
```js
// 注意，这里实例化的时候，使用data来接收了
const instance = new XButtonContructor({
    data: option
})
```
- public.vue测试功能
```js
mounted(){
	this.$button({value: "登录"})
}
```