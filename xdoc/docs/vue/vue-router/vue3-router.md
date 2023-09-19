# 路由4.x
> 本文主要学习`4.x`在vue3中的使用姿势。  
> 对比`vue-router 3.x`和`vue-router 4.x` 
> 具体参考至[从Vue2迁移](https://router.vuejs.org/zh/guide/migration/)

## 安装
```sh
cnpm install vue-router@4
```
## 配置路由规则

```js
// 文件夹: src / router / index.js
// 主要用到  
	// createRouter:创建路由实例  
	// createWebHashHistory:hash路由模式  
	// createWebHistory: history路由模式
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

// 配置路由规则routes
const routes = [
	{
		path: '/',
		component: ()=>imports('./App.vue'),
		children:[
			path: 'home',
			component: ()=>imports('./Home.vue'),
		]	
	}
]

// 创建路由对象
const router = createRouter({
	routes,
	history: createWebHistory(),
	// 或者 hash: createWebHashHistory(),
})
// 暴露路由对象
export default router
```
## 挂载路由对象
```js
import { createApp } from 'vue'
import router from '@/router/index.js'

const app = createApp(App)
// 使用并挂载路由
app.use(router);
app.mount('#app');
```

## 编程式导航
```js
import {useRoute, useRouter} from 'vue-router';
const route = useRoute();
const router = useRouter();
console.log(route.path);
router.push({path: '/home',params: {user: 'admin'}});
```

## 导航守卫
> 支持通过`返回false`取消导航。  
> 支持通过`返回一个路由地址`来替代`next()`。  
> 依旧支持`next`, 并且`next变为可选参数`

### 全局路由守卫
```js
const router = createRouter({
	routes
});

// 前置路由守卫
router.beforeEach((to,from,next) =>{
	if(to.path == '/admin'){
		// 返回false取消导航
		return false;
	}
	else if(to.path == '/user'){
		return {path: '/home'};
		// 或者 return {name: 'Home'}
	}
	next()
})
```
### 路由独享的守卫
```js
// 路由独享的守卫，与3.x版本写法一样
const routes = [
	{
		path: '/about',
		beforeEnter: (to,from)=>{
			return false
		}	
	}
]
```
### 组件独享的守卫
> 选项式API中，组件路由守卫依旧是`beforeRouteEnter`,`beforeRouteUpdate`和`beforeRouteLeave`。
> 这里我们主要学习组合式API`setup语法糖`中，组件路由守卫的写法。
```js
// 引入 onBeforeRouteUpdate 和 onBeforeRouteLeave 表示当前组件内，路由更新和离开的守卫
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue';
const flag = ref(false);
// 组件内路由更新: onBeforeRouteUpdate
onBeforeRouteUpdate((to,from,next)=>{
	// ... 写条件
	if(!flag){
		return false;
	}
	next()
})
// 组件内路由离开: onBeforeRouteLeave
onBeforeRouteLeave((to,from,next)=>{
	// ...同上
})
```


## 从vue2迁移
> 与vue2的大致区别如下:

|意义|版本2|版本3|说明|
|---|---|---|---|
|引入|vueRouter|{createRouter}|由引入`整个类`，转换为`解构`类的方法。
|创建路由实例|new vueRouter()|createRouter()|由`类`创建，转换为`函数`创建|
|路由模式|mode:'history'|history: createWebHistory()|由`mode`指定`字符串`, 转换由`history`或者`hash`指定`函数返回值`|
|挂载路由|Vue.use + 选项式 router:router|app.use(router), 不需要指定|挂载到app上|
|编程式导航|this.$route, this.$router|useRoute(), useRouter()|由`全局属性`, 转换为`函数返回值`|
|指定渲染`tag`|tag="span"|v-slot="{ navigate }"|由props指定，更改为使用`v-slot`作用域插槽形式|
