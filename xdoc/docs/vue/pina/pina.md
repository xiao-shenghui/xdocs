# pina状态管理
> vue3推荐的状态管理库  
> 更简单，更轻松，更自然的使用方式，完全拥抱vue3组合式API.  
> 同时支持`选项式`和`组合式`
## 安装
- 安装：必须先安装pina
```sh
cnpm i pina
```
## 组合式定义
- 使用`defineStore('name',callback)`
- 在 `Setup Store` 的`callback`中：
    - `ref()` 就是 `state` 属性
    - `computed()` 就是 `getters`
    - `function()` 就是 `actions`
- 定义
```js
// 安装完成后，项目内会自动引入pina
// 在store -- counter.js 内，可以定义store
// 自带模块化，counter.js就是其中一个模块counter
// 使用defineStore('模块名称', ()=>{
    // callback内定义状态数据
    // 支持组合式API,自动将ref, reactive, 转为state,
    // 将computed转为getter
    // 将普通方法转为action
    // 移除mutation, 由于其与action的区别只在于异步处理.
// })
/* store -- counter.js */
import { ref, computed } from 'vue'
const counterStore = defineStore('couter', ()=>{
    const num = ref(0);
    const add = computed(()=>{
        return this.num.value++
    });
    const reduce = function(){
        this.num.value--
    }
    // 将用到的东西暴露出去
    return {
        num,
        add,
        reduce
    }
});
```
## 组合式使用
- 组件内如何使用?
```js
// 引入js文件, 模块
import counterStore from './store/counter'
// 由于该模块是一个函数,所以需要使用(调用)它一下
const counter = counterStore();
```
```html
<!-- 在页面上,可以直接使用 -->
{{counter.num}}
<button @click="counter.reduce">减少</button>
<button @click="counter.add">增加</button>
```

## 选项式定义
- 使用`defineStore('name',object)`
- 在 `Option Store` 的`object`中：
    - 指定`state` 属性
    - 指定`getters`属性
    - 指定`actions`属性
- 定义
```js
// 跟原先vuex的定义非常类似,只是用defineStore()函数包裹
// 使用state, getter, action
// 依旧使用defineStore()定义状态构造器
const counterStore = defineStore('counter',{
    state: ()=> ({
        counter: 0
    }),
    getter: {
        add(state) => state.counter++
    },
    actions: {
        reduce(state) => state.counter--
    }
});
```

## 选项式使用
- 组件内如何使用?
```js
// 引入js文件, 模块
import counterStore from './store/counter'
// 由于该模块是一个函数,所以需要使用(调用)它一下
export default{
    setup(){
        const counter = counterStore();
        return {
            counter //暴露出去,给外界使用
        }
    }
}
```
```html
<!-- 在页面上,可以直接使用 -->
{{counter.num}}
<button @click="counter.reduce">减少</button>
<button @click="counter.add">增加</button>
```