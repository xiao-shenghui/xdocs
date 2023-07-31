# vue动态路由(传递参数)
## 传递参数的2种方式
## 方式一： ?key=value&key=value
```js
// 方式一：
/*
通过URL设置？key=value&key=value的形式传递参数
通过设置组件的生命周期函数内，this.$route.query 来获取路由参数
*/
```
```vue
<!-- app.vue -->
<!-- 在设置router-link to的属性值时,添加?key=value&key=value -->
<router-link to="/home?name=admin&password=123456">HOME</router-link>
<router-view>
<!-- home.vue 或者组件home内 -->
Vue.component("home",{
	template: "#home",
	created(){
		console.log(this.$route.query) 
		//打印结果 {'name':'admin', 'password':'123456'}
	}
})
```
## 方式二： /:key/:key
```js
/*
通过设置组件的路由规则path, 添加/:key/:key 来接收路由参数.
通过URL设置/value/value 来传递参数
通过组件的生命周期函数内, this.$route.params 来获取路由参数.
*/
```
```vue
<!-- 路由规则内 -->
<!-- 设置该组件的路由规则,添加/:key/:key 来接收参数 -->
const router = new VueRouter({
		routes: [
			{
				path: "about/:name/:password",
				component: about
			}
		]
	});
<!-- app 内 -->
<!-- 通过URL传递参数 -->
<router-link to="/about/admin1/987654321">

<!-- about 组件内,-->
<!-- 在生命周期函数内,通过this.$route.params 获取路由参数 -->
Vue.component("about",{
		template: "#about",
		created(){
			console.log(this.$route.params)
		}
	})
```

## 完整案例
```vue
<body>
    <div id="app">
        <!-- 
            动态路由的2种方式：
            1. 方式一：
            通过URL设置?key=value&key=value的方式传递参数。
            通过组件的生命周期，设置this.$route.query获取参数。
            2. 方式二：
            通过设置组件的路由规则path，/:key/:key的方式接收参数。
            通过URL设置/value/value的方式，传递参数。
            通过组件的生命周期，设置this.$route.params获取参数。
         -->
        <!-- 路由 -->
        <router-link to="/">到主页</router-link>
        <router-link to="/home?name=admin&password=123456789">到home</router-link>
        <router-link to="/about/admin2/987654321">到about</router-link>
        <!-- 渲染 -->
        <router-view></router-view>
    </div>

    <template id="home">
        <div>
            <h1>我是home组件</h1>
            <h1>我是路由参数：{{queryURL}}</h1>
        </div>
    </template>

    <template id="about">
        <div>
            <h1>我是about组件</h1>
            <h1>我是路由参数：{{queryURL2}}</h1>
        </div>
    </template>
    <script>
        // 创建全局组件
        const home = Vue.component('home', {
            template: "#home",
            data() {
                return {
                    queryURL: []
                }
            },
            // 在created生命周期内，获取和使用
            created() {
                console.log(this.$route.query);
            },
            mounted() {
                this.queryURL.push(this.$route.query);
            }
        });
        // 
        const about = Vue.component('about', {
            template: "#about",
            data() {
                return {
                    queryURL2: []
                }
            },
            created() {
                console.log(this.$route);
                console.log(this.$route.params);
            },
            mounted() {
                this.queryURL2.push(this.$route.params);
            }
        });
        // 创建路由对象
        const router = new VueRouter({
            // 编写路由规则
            routes: [
                {
                    path: "/",
                },
                {
                    path: "/home",
                    name: "home",
                    component: home
                },
                {
                    // 设置path路径来接收参数
                    path: "/about/:name/:password",
                    name: "about",
                    component: about
                }
            ],
        });
        const vm = new Vue({
            el: "#app",
            router: router
        });
        // console.log(vm);
        // console.log(vm.$route);   //打印挂载到vue上面路由对象    
    </script>
</body>
```