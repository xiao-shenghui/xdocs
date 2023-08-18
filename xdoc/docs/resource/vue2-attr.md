# vue2实例的属性
## 常用属性大全
> vue2.4.0及以上的版本。  

## 基础的全局方法
> 包含: Vue.component, Vue.filter, Vue.set, Vue.delete, Vue.mixin, Vue.directive.  
> 这里主要记录`Vue.filter`和`Vue.mixin`和`Vue.directive`
### Vue.filter
> `Vue.filter`: 注册全局过滤器
```js
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```

### Vue.mixin
> `Vue.mixin`: 定义全局混入，影响注册之后所有创建的每个 Vue 实例。**`谨慎使用！！`**
- 全局混入
```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
```

- 局部混入
```js
// 局部混入，通过定义一个对象的方式。
// (就跟定义一个局部组件，局部过滤器一样)
// 在要使用混入的地方，使用mixins: [混入名]
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})
```

### Vue.directive
> 主要用于定义全局自定义指令
- 全局指令
```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
- 局部指令
```js
// 使用directives 的选项
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```
#### 钩子函数
> 指令的值是一个对象，对象可以包含多个`钩子函数`作为属性。  
- `bind`: 只调用一次，被绑定时调用
- `inserted`: 绑定的元素，插入到父节点时调用。
- `update`: 该组件更新时调用
- `componentUpdated`: 该组件及子组件更新完调用
- `unbind`: 只调用一次，解绑时调用。

#### 钩子函数参数
> 每个`钩子函数`都可以接收`el, binding`等作为参数。
- `el`: 绑定的DOM元素
- `binding`: 一个对象，包含指令的所有属性
  - `name`: 指令名字
  - `value`: 指令的绑定值
  - `oldValue`: 指令绑定前的值
  - `expression`: 字符串形式的表达式`v-focus="1+1"`
  - `arg`: 传给指令的参数`v-focus:foo`中的`foo`
  - `modifiers`: 一个包含修饰符的对象。`v-click.prevent`
- `vnode`: Vue编译生成的虚拟节点
- `oldVnode`: 上一个虚拟节点。
```js
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
```


## 高级的全局方法
> 包含Vue.observable, Vue.compile, Vue.extend, Vue.use, Vue.nextTick
### Vue.observable
> `Vue.observable(object)` : 把一个对象变为响应式，也是Compile类的主要功能。
```js
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```
### Vue.compile
> `Vue.compile(template)`：把一个模板，编译为render函数，编译后可以使用render选项编译为真实DOM。
```js
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```
### Vue.extend
>`Vue.extend(options)`：类似与new Vue(options), 但是创建的是组件构造器。一般用于手动创建局部组件。
创建局部组件的方法有：
1. 单文件组件 
2. 定义一个对象 
3. 使用Vue.extend()方法。
4. 在局部组件属性的属性值上，写对象。
```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```
### Vue.use
> `Vue.use(obj)`方法，会自动调用obj的install方法.
- 并且传入`Vue`，以便在install方法内添加:
  - 全局组件(使用Vue.component)，
  - 全局方法（使用Vue.prototype），
  - 全局过滤器(使用Vue.filter())，
  - 全局混入(使用Vue.mixin), 
  - 写一个库，提供自己的API 等等功能。
```js
Vue.use(MyPlugin, { someOption: true })
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

### Vue.nextTick
> `Vue.nextTick(callback)`方法，在DOM更新完成后，延迟执行`callback`
- 常常用于获取更新后的值。
```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

## 私有属性
|属性类别|功能类别|属性名|意义|重要性|
|---|---|---|---|---|
|私有属性|实例 property|$attrs|包含了`父组件`的`所有属性`对象。除`props`绑定的 (`class` 和 `style` 除外)。||
|---|---|$children|包含了当前实例的`直接子组件实例`。|⭐⭐⭐⭐⭐|
|---|---|$createElement|`ƒ (a, b, c, d)`, `render函数`常用的方法。||
|---|---|$data|Vue 实例的`数据对象-data选项`||
|---|---|$el|获取该组件`选项中el`绑定的`容器`|⭐⭐⭐⭐⭐|
|---|---|$listeners|包含了`父作用域`中的`v-on 事件监听器。`,可以通过`v-on="$listeners"`传入内部组件||
|---|---|$options|Vue 实例的`初始化选项`,ElementUI源码有用于`获取`自己的`选项`。|⭐⭐⭐⭐⭐|
|---|---|$parent|`父实例`，如果当前实例有的话。|⭐⭐⭐⭐⭐|
|---|---|$props|当前组件接收到的props对象。|⭐⭐⭐⭐⭐|
|---|---|$refs|持有注册过`ref`属性的`所有DOM元素`和`组件实例`。|⭐⭐⭐⭐⭐|
|---|---|$root|当前组件树的`根Vue实例`。||
|---|---|$scopedSlots|用于访问`作用域插槽`|⭐⭐⭐⭐|
|---|---|$slots|用来访问被`插槽分发`的内容。|⭐⭐⭐⭐|
|---|---|$vnode|用来访问`虚拟节点`||
## 继承属性
|属性类别|功能类别|属性名|意义|重要性|
|---|---|---|---|---|
|继承属性|实例方法/数据|$delete|`删除`对象的`property`(全局`Vue.delete`的别名)||
|---|---|$set|向`响应式`对象中`添加`一个`property`(全局`Vue.set`的别名)||
|---|---|$watch|观察Vue实例上的一个表达式或者一个函数计算`数据结果的变化`。(选项`watch`的功能)||
|---|实例方法/事件|$on|`监听/添加`当前实例上的`自定义事件`。(选项`methods`的功能)||
|---|---|$off|`移除`自定义事件监听器。(`不传`事件则移除`全部`，`传`事件则移除`对应`的事件)||
|---|---|$once|`监听`一个`自定义事件`，但是只触发`一次`。||
|---|---|$emit|`提交触发`当前`父组件的事件`。`附加参数`都会传给`监听器回调`。||
|---|实例方法/生命周期|$forceUpdate|`迫使` Vue 实例`重新渲染`。||
|---|---|$destroy|完全`销毁`一个实例, `解绑`它的全部指令及事件监听器。||
|---|---|$mount|使用`vm.$mount()`手动地`挂载`一个未挂载的实例。(优先级`低于el选项`)||
|---|---|$nextTick|将回调`延迟到`下次 DOM 更新循环`之后`执行。(与全局方法`Vue.nextTick`一样)||

## 私有属性
### $attrs
> 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定。(class和style除外)  
> 可以通过`v-bind="$attrs"`,传入内部组件——在创建高级别的组件时非常有用。

### $children
### $createElement
### $data
### $el
### $listeners
### $options
### $props
### $parent
### $refs
### $root
### $scopedSlots
### $slots
### $vnode

## 继承属性
### $delete
### $destroy
### $emit
### $forceUpdate
### $inspect
### $mount
### $nextTick
### $off
### $on
### $once
### $set
### $watch
