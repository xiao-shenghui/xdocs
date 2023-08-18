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
## 自定义过滤器
> vue2中可以使用`Vue.filter(name,callback(val))`定义`全局过滤器`  
> 根据`callback`中的返回值决定`过滤器`的作用。
> vue3中移除了`|`及`过滤器`功能。
> 可以自定义一个全局方法，用于过滤, 但是不能用vue2的`|`管道符写法。
> 通过给全局配置对象属性`app.config.globalProperties`添加全局自定义方法  
> 例如`$filter`，通过函数的形式给值过滤。
### vue2过滤器
```js
Vue.filter('onefilter', function(val){
  if(val%2){
    return val
  }
  else{
    return val-1
  }
})
```
### vue3自定义过滤器
> 注意，以下只是通过类似于`给原型对象`添加`共享方法`的形式，实现过滤功能。  
> 并不是官方全局过滤器。 
```js
const app = createApp(Vue);
app.config.globalProperties.$filter = {
  // 例如定义一个过滤数组奇数的过滤器
  oneFilter: function(arr){
    return arr.filter(e => e % 2 == 0)
  }
}

// 使用时
const arr = [1,2,3,4,5,6,7];
// 在组件实例上使用
// script setup模式
// 引入inject，可以拿到定义在全局的方法
import { inject } from 'vue'
const oneFilter = inject('$filter');
oneFilter(arr);

// setup()模式
export default {
  mounted() {
    console.log(this.oneFilter(arr)) // [2,4,6]
  }
}
```

## 自定义混入

## 自定义插件
> vue2中可以使用`Vue.extend`来定义`组件构造器`, 配合`插件Vue.use()调用install`功能，可以轻松做到一键创建全局组件。  
> vue3中依旧支持`插件功能`, 通过`app.use调用install()`函数。  
### vue2插件
```js
// 定义插件
// MyPlugin/index.js
const install = function(Vue, options){
  // 比如实现一个全局的消息组件。
  // 每次调用this.$message('提示信息');
  // 自动创建和挂载一个组件实例
  Vue.prototype.$message = function(msg){
      const Message = Vue.extend({
        data:{
          msg
        },
        template: `
          <h1>${msg}</h1>
        `,
        mounted(){
          alert('我挂载了');
        }
    });
    const instance = new Message();
    instance.$mounted('#app');
  }
}
const MyPlugin = {
  install
}

export default myPlugin

// 使用时
import MyPlugin form 'MyPlugin'
Vue.use(MyPlugin);
```
### vue3定义插件
```js
// 定义插件
// 其实是一样的，
// 1. 把Vue换成app, 
// 2. 把Vue.prototype 换成 app.config.gloablProperties
// 3. 把Vue.extend --- 换成 app.defineComponent() 
// 4. 把Vue.component ---- 换成 app.component
// 5. vue3中不再使用new创建实例，而是使用createApp()函数。 
  //    把组件构造器的new换为createApp，将组件构造器放进去
const myPlugin = {
  install(app, options){
    app.config.gloablProperties.$message = function(msg){
      // 我们还是定义一个组件构造器(局部)
      const Message = app.defineComponent({
        (props) => {
          const msg = ref(msg)
        },
        render: ()=>{
          return h('div',{}, msg)
        }
      });
      const app = createApp(Message)
      app.mount('#app');     
      }
  }
}

export default myPlugin

// 使用插件
import myPlugin form 'myPlugin'
const app = createApp(Vue);
app.use(myPlugin)
```

### vue3使用共享方法
```js
// 而定义在全局的$message如何使用？
// 在script setup模式下
// 引入 inject 可以拿到全局方法
import {inject} from 'vue'
const message = inject('$message')
message('提示信息');

// 在setup()选项模式下
// 直接通过 this.$message()使用
export default {
  setup(props){

  }
  mounted(){
    this.$message('提示信息');
  }
}
```

### element-plus源码
```js
// make-install.js
const makeInstaller = (components = []) => {
  const install = (app, options) => {
    if (app[key.INSTALLED_KEY])
      return;
    app[key.INSTALLED_KEY] = true;
    // 遍历调用app.use,注册每个组件。
    components.forEach((c) => app.use(c));
    if (options)
      useGlobalConfig.provideGlobalConfig(options, app, true);
  };
  return {
    version: version.version,
    install
  };
};

exports.makeInstaller = makeInstaller;

// defaults.js
var makeInstaller = require('./make-installer.js');
var component = require('./component.js');
var plugin = require('./plugin.js');

var installer = makeInstaller.makeInstaller([...component["default"], ...plugin["default"]]);
exports["default"] = installer;
```

## vue3内置组件
### Teleport
> 解决问题：有些组件`视图上`明明已经脱离了当前父组件，但是`逻辑`还在当前父组件
> 对于`css`的样式上，如果`嵌套太深`，非常不好设置。
> Teleport: 将Teleport的模板，“传送”到body标签下的最后一个位置。  
> Teleport组件的出现，对于模态框，弹出提示，弹出登录非常有用，不再需要依赖于父级的css，而是直接`传送`到特定的DOM元素。  
> 并且，该组件的数据依旧使用`定义时`的数据，就可以在视图脱离的同时，保证`逻辑位置不变`。
```html
<!-- 可以使用to属性，指定要传送的DOM节点的内部末尾位置 -->
<Teleport to="body">
  <div v-if="show == true">
      <h1>我是头部</h1>
      <h1>我是中间</h1>
      <h1>我是底部</h1>
  </div>
</Teleport>
```