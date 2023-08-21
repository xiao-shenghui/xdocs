# vuex状态管理
## 概念
> 实现集中式状态（数据）管理的一个Vue插件，
> 对多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式

## 何时使用？
多个组件需要共享数据时, 适用于任意组件间通信。

## 安装
- 安装
```sh
cnpm i vuex
```
## 定义
- 搭建vuex环境
```js
// src/store/index.js
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
actions,
mutations,
state
})
```
- 在`main.js`引入
```js
//引入store
import store from './store'
......

//创建vm
new Vue({
el:'#app',
render: h => h(App),
store
})
```
## 完整定义
```js
// 必须使用store变量接收，不然组件内无法注册和使用。
// 使用 new Vuex.Store({配置对象})定义一个store仓库。
const store = new Vuex.Store({
	// 配置对象
	state: {
		// 类似于vue里面的data，响应式数据
		count: 1;
	},
	mutations: {
		// 类似于vue里面的methods, 改变state里数据的方法。
		// 里面的方法，自带state对象作为默认参数。
		add(state){
			state.count++ ;
			// 直接调用state对象里面的数据
		}
	},
	getters: {
		// 类似于vue里面的computed计算属性，
		// 也是改变数据，但是返回的数据带缓存。
		addF(state){
			state.count++
			return  state.count;
		}
	},
	actions: {
		// 用于提交mutations里面的方法，
        // actions里的方法自带一个context对象，context对象等价于this.$store
		// 涉及到异步时使用。
		addA(context){
			context.commit('mutations里的方法名');
			// 外面的组件当要改变state里的数据时，
            // 一般采用this.$store.commit('mutations的方法名')的方式，提交方法。
			// 因此这里context.commit
		}
	},
	modules: {
		a: moduleA
		// 支持把上面这些配置对象，整个的抽离出来,放到模块里面。
		// 当外面组件使用时: 
		// 不抽离: 
			// 获取数据:this.$store.state  
			// 改变数据: this.$store.commit('');
		// 抽离以后: 
			// 获取数据:this.$store.模块映射名(a).state  
			// 改变数据: this.$store.模块映射名(a).commit('');
	}
});
// 抽离出的模块
const moudleA = {
	state: {
		countA: 1;
	},
	mutations: {
		addA(state){
			state.countA++ ;
		}
	}
}
```
## 使用
- 组件内如何使用?
- 读取vuex中的数据：`$store.state.xxx`
- 修改vuex中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`
```js
// 1. 根组件(Vue)内 引入注册
new Vue({
	el:"#app",
	store: store    
    //前面的store是属性, 
    // 后面的store是 const store = new Vuex.Store({})
});
```
```html
<!-- 2. 在任何组件内都可以使用 -->
<!-- 例如: -->
<!-- 获取共享数据: this.$store.state.xxx-->
<template id="father">
        <div>
            <h1>我是father的数据</h1>
            <h5>{{this.$store.state.count}}</h5>

<!-- 修改共享数据: 调用methods里的方法,在方法里: 
用this.$store.commit('mutations里的方法名')提交事件修改共享数据 -->
            <button @click="faAdd()">+</button>
            <son></son>
        </div>
</template>
<script>
Vue.component("father", {
    template: "#father",
    methods: {
        faAdd() {
            // 修改共享式数据时，
            // 不建议直接用 this.$store.state.xxx修改，不便于维护。
            // 建议使用this.$store.commit();
            // 提交(mutations 里面的方法名, 字符串形式)的方式修改。
            this.$store.commit('add');
        }
    }
}
</script>
```

## 四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。


## 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```


## 完整案例
```html
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.5/vue.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/vuex/3.6.0/vuex.js"></script>
<body>
    <div id="app">
        <father></father>
    </div>
    <template id="father">
        <div>
            <h1>我是father的数据</h1>
            <h5>{{this.$store.state.count}}</h5>
            <!-- count是vuex里面共享的响应式数据，先在组件内注册store,
            再用this.$store.state.xxx获取 -->
            <button @click="faAdd()">+</button>
            <son></son>
        </div>
    </template>
    <template id="son">
        <div>
            <h1>我是son的数据</h1>
            <h5>{{this.$store.state.count}}</h5>
            <!-- count是共享的响应式数据,需要先在根组件注册store，
            再用this.$store.state.xxx获取响应式数据 -->
            <button @click="sonReduce()">-</button>
        </div>
    </template>
    <script>
        // 定义vuex状态库 new Vuex.store({配置对象})    
    // 必须用store变量接收，以便其他组件使用store变量。
        const store = new Vuex.Store({
            state: {  //state 相当于data，里面是响应式数据
                count: 0
            },
            mutations: {
                //mutations属性, 相当于methods, 
                    // 里面是用于提交改变state的方法,
                // mutations 里面的方法，都默认接收外面的state对象，作为参数
                // 修改时直接使用state对象
                add(state) {
                    state.count++;
                },
                reduce(state) {
                    state.count--;
                }
            },
            getters: {
                addF(state){
                    return state.count--;
                }
            }, 
            //getters 类似于vue中的computed计算属性，
            // 会在使用一次后把返回的数据缓存起来，除非时数据发生了变化，
            // 才会重新渲染数据。 
            // 相比于mutations(vue中的methods)更节省性能。
            actions: { 
            //actions类似于mutations，但是是用于提交mutations方法，
                // 而不是直接修改属性的。 
                // 一般涉及到异步请求时，推荐使用action提交mutations方法，
                // 进而修改state里的共享数据。
                addF(context){
                    // actions对象里的方法类似于mutations里的方法，
                    // 只不过mutations的方法是默认接收state，进而修改数据。
                    // 而actions里的方法是默认接收context，代表整个store。 
                    // 等价于this.$store
                    context.commit('add');
                    // 因此一般是 this.$store.commit('mutations里的方法名');
                    // 而在actions里的方法，是借用context，
                    // context.commit('mutations里的方法名')
                }
            }
        });
        // 同时， new Vuex.Store({
        // 也支持modules 属性，将响应式数据分块
        /* modules: {
            a: moduleA,  自定义属性a 映射到 moduleA
            b: moduleB  自定义属性b 映射到 moduleB
        } */
        // });
        // 然后就可以在store外面定义模块
        /* 
            const moduleA = {
                state: {
                    count: 0
                },
                mutations: {
                    add(state) {

                        state.count++;
                    },
                    reduce(state) {
                        state.count--;
                    }
                }
            }
            使用的时候，一样先注册store, 
            然后: 获取数据：调用this.$store.a.state.xxx 
            // 区别就是this.$store多了一个自定义属性。
            改变数据时一样,调用各个模块的mutations方法。
            this.$store.a.commit(''); // this.$store.b.commit(''); 
        */
        // 定义两个组件
        Vue.component("father", {
            template: "#father",
            components: {
                "son": {
                    template: "#son",
                    methods: {
                        sonReduce() {
                            // 修改共享式数据
                            this.$store.commit('reduce');
                        }
                    }
                }
            },
            methods: {
                faAdd() {
                    // 修改共享式数据时，
                    // 不建议直接用 this.$store.state.xxx修改，
                    // 不便于维护。
                    // 建议使用this.$store.commit();
                    // 提交(mutations 里面的方法名, 字符串)的方式修改。
                    this.$store.commit('add');
                }
            }
        });
        new Vue({
            el: "#app",
            store: store
            // 根组件注册store
        });
    </script>
</body>
```