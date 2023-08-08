# vue3
## 自定义指令
> vue2中，使用`directives`选项或者`Vue.directive`方法来自定义指令。  
> vue3中，没有使用 `<script setup>`情况下，依旧支持`directives`选项。  
> 使用`<script setup>`后，使用`v开头的自定义变量`的形式设置指令。  
### 没有使用`setup`语法糖
```js
// directives选项
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

### 使用`setup`语法糖
```js
// 自定义变量，驼峰命名
const vFocus = {
	mounted: (el) => el.focus()
}
// 该变量接收一个对象作为值，对象内是指令的钩子函数作为属性。
```
### 指令的`钩子函数`
> 指令的钩子函数又被称为`生命周期`,每个钩子函数都接收`el, binding, vnode...`作为参数。   
> 和vue2功能一样，但是更换为了新的方法。
- vue2指令的钩子函数
```html
<!-- 钩子函数 -->
bind: 只调用一次，指令第一次绑定到元素时调用。
inserted: 被绑定元素插入父节点时调用
update: 所在组件的 VNode 更新时调用
componentUpdated: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind: 只调用一次，指令与元素解绑时调用。
<!-- 钩子函数参数 -->
el: 指令所绑定的元素，可以用来直接操作 DOM。
binding: 一个对象，包含以下 property
	name：指令名，不包括 v- 前缀。
	value：指令的绑定值
	oldValue：指令绑定的前一个值
	expression：字符串形式的指令表达式。
	arg：传给指令的参数，可选。
	modifiers：一个包含修饰符的对象。
vnode: Vue 编译生成的虚拟节点。
oldVnode：上一个虚拟节点
```

- vue3指令的钩子函数
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```