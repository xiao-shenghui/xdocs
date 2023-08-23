# vue路由
## 安装和引入
```vue
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.0/vue.js"></script>
<!-- 首先引入vue2, 建议引入2.7.0及以上版本，2.6.0-2.6.8版本无法正确渲染router-link -->
<script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.0/vue-router.js"></script>
<!-- 再引入vue-router -->
```
## 编写组件页面，和创建全局组件
```vue
<!-- app根组件 -->
<div id="app">      
</div>
<!-- one组件 -->
<template id="one">
        <div>
            <h1>我是one组件</h1>
        </div>
</template>
<!-- two组件 -->
<template id="two">
    <div>
        <h1>我是two组件</h1>
    </div>
</template>
<!-- 注册组件 -->
<script>
	<!-- 注意：此处用了2个变量名 接收组件，目的是在编写路由规则routes的时候, 便于使用/引入组件 -->
	const one = Vue.component("one",{
		template: "#one"
	});
	const two = Vue.component("two",{
		template: "#two"
	});
</script>
```
## 创建路由对象，和编写路由规则
```vue
<!-- 用router接收路由对象，便于在app内引入路由 -->
<!-- 用new VueRouter()注册对象，里面是{}配置对象 -->
const router = new VueRouter({
	<!-- 路由组件的配置对象包裹：
		1. routes:  路由规则，数组类型，里面由多个pnc,r(r表示重定向 redirect)对象组成。 其中component: 组件变量名。
		2. mode: "hash" 默认为哈希模式，带#。 可指定为"history", 不带#
		3. linkActiveClass: "router-link-active" 默认激活状态下，跳转标签的类名。也可以修改为自定义类名。例如："a-active"
	 -->
	 routes: [
			{
		 		path: "/one",
		 		component: one
		 	},
		 	{
		 		path: "/two",
		 		component: two
		 	},
		 	{
		 		path: "/",
		 		redirect: "/one"
		 	}
 	 ],
 	 mode: "history", //修改为历史模式
 	 linkActiveClass: "a-active"
})
```

## 注册路由对象，和使用路由
```vue
<!-- 在app里面注册路由对象 -->
new Vue({
		el: "#app",
		router: router
	});

<!-- 在app页面使用路由 -->
<router-link to="/one" tag="button">跳转到one路由</router-link>
<router-link to="/two" tag="button">跳转到two路由</router-link>
<!-- 用 to属性指定跳转的路劲，类似于a标签的url，用tag标签自定义渲染后的标签，不指定tag时默认渲染a标签 -->

<!-- 显示当前匹配的路由的组件内容 -->
<router-view></router-view>
```

## 完整案例：
```html
<head>
    <!-- <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.5/vue.js"></script> -->
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.0/vue.js"></script>
    <!-- 注意：vue 2.6.0到vue 2.6.8都无法将router-link渲染为a标签 -->
    <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.0/vue-router.js"></script>
    <title>Document</title>
    <!-- 先引入vue，再引入vue-router -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .o-active {
            color: red;
        }
    </style>
</head>

<body>
	<div id="app">
	    <!-- 在使用router-link标签替换a标签，to属性选择切换的路由路劲名。 
	    当前默认渲染为a标签。也可以使用tag标签，指定渲染后的标签，例如 tag="button"
	    -->
	    <!-- 当前激活的状态默认含有类名 router-link-active, 官方建议修改类名，在定义路由的时候，除了pnc,还可以使用linkActiveClass 指定别的类名。 -->
	    <router-link to="/one">切换到one</router-link>
	    <router-link to="/two">切换到two</router-link>
	    <!-- <router-link to="/two" tag="button">切换到two</router-link> -->
	    <router-view></router-view>
	    <!-- 使用router-view 渲染当前匹配路由的组件 -->
	</div>
	<template id="one">
	    <div>
	        <h1>我是one组件</h1>
	    </div>
	</template>
	<template id="two">
	    <div>
	        <h1>我是two组件</h1>
	    </div>
	</template>
	<script>
	    // 注意此处定义全局组件的时候，必须用一个变量接收，表示该组件。
	    //不然在配置路由规则的时候，无法将此组件引入。
	    const one = Vue.component("one", {
	        template: "#one"
	    });
	    const two = Vue.component("two", {
	        template: "#two"
	    });
	    // 定义一个路由对象VueRouter()，由router变量接收。
	    // 配置对象是数组，里面由路由pnc对象组成。
	    const router = new VueRouter({
	        // 注意配置对象名称为: routes
	        routes: [
	            {
	                path: "/one", component: one
	                // 使用linkActiveClass 指定激活类名为"o-active"， 默认是router-link-active
	            },
	            {
	                path: "/two", component: two
	            },
	            {
	                path: "/", redirect: "/one"
	                // 使用linkActiveClass 指定激活类名为"o-active"， 默认是router-link-active
	            },
	            // {
	            //     path: "/one", component: one
	            //     // 使用linkActiveClass 指定激活类名为"o-active"， 默认是router-link-active
	            // },
	        ],
	        mode: "history",
	        // 与routes同级别，mode 修改模式，默认值是"hash", 带#。 可以修改为"history",此时不带#
	        linkActiveClass: "o-active"
	        // 与routes同级别，linkActiveClass修改激活时的类名，便于添加自定义样式
	    });

	    new Vue({
	        el: "#app",
	        router: router,
	        // 绑定路由对象到根组件上面。
	        components: {
	            one: one,
	            two: two
	        }
	    });
	</script>
</body>
```

## 路由对象之路由守卫
### 全局路由守卫:
> router.beforeEach((from,to,next)=>{})
```js
// 全局路由守卫是路由对象可以指定的方法： .beforeEach()
// 例如路由对象如下
const router = new VueRouter({
	routes: [{
		path: "/one",
		component: one
	}]
});
// 定义全局路由守卫: 路由对象的方法。
router.beforeEach(
	// 该方法接收一个回调函数，回调函数里面由三个参数组成
	// from,to,next, 
	// from表示来自哪个，要离开的路由对象，from.name则表示要离开的路由的name
	// to 表示即将去哪个路由对象，to.name则表示即将去的路由的name
	// next() 是一个方法，不带参数是表示默认去向to的路由，也可以带一个路由路径的名字符串，或者路由对象
	// 例如：next(), next("/two"), next({name: "two"})
		(from,to,next) => {
			if(to.name == "one"){
				...
				// 定义一些localstorage之类的操作。
				next("/two"); //必须带上这个方法,不然不跳转
				// 或者用next
			}
			else next()
		}
	);
```

### 局部路由守卫
> 仅供该路由规则独享，beforeEnter属性，属性值为回调函数。
> 定义在路由规则内部的指定的路由对象(pnc)上面的方法。
```js
const router = new VueRouter({
	routes: [
	{
		path: "/one",
		component: one,
		beforeEnter: (from, to, next)=>{
			if(to.path === "/two"){
				next("/one");
				// 模拟实现了重定向的功能，
				// 禁止跳转到"/two"路由的功能。
			}
		}
	},
	]
});
```