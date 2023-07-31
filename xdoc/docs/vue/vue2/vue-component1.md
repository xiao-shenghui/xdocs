## Vue组件
### 全局组件与局部组件
```js
// 1. 全局组件注册:Vue.component()
// 参数1：组件名字
// 参数2：组件配置对象（与Vue实例配置类似，都可以有data，components，methods等等）
// 区别之处：
	// 1. el 更换为 template
	// 2. components: {} 里面不仅仅只写组件名,需要与全局组件类似，走一遍组件注册的过程。
	// 例如： 
	/*
	Vue.component("father", {
			template: "#father"
				components:{ 
				"局部子组件的名称(son)"：{
					template: "#son",
					data(){
						return{}
					}...
				}
			}
	})*/
// 全局组件
Vue.component("name",{
	template: "#fatherID",
	// 注册局部组件
	components: {
		"sonName": {
			template: "#sonID"
		}
	}
});
```
```html
<!-- 其template模板，可以写在script里，用js反引号 -->
<!-- 也可以直接写在html标签内 -->
<!-- 注意：
	1. template的id必须与注册配置里对象填写的一样
	2. template里面，根组件也只能有一个。
 -->
<template id="fatherID">
	<div>
		<h1>我是father的内容</h1>
		<son></son>
	</div>
</template>
<template id="sonID">
	<div>
		<h2>我是son的内容</h2>
	</div>
</template>
```
- 案例：
```html
<!-- app的基本结构 -->
    <div id="app">
        <father></father>
        <!-- 使用全局的父组件，无需再在app内注册 -->
    </div>

    <!-- 组件的内容，用template包裹，id获取（也可以写在js代码里面） -->
    <template id="father"> <!-- 此处为father父亲组件 -->
        <div> <!--同样，div根节点只能有一个-->
            <h1>我是{{name}}组件节点的内容</h1>
            <son></son>
            <!-- 使用局部的子组件，需要注册和配置子组件。 -->
        </div>
    </template>

    <template id="son"> <!--和父节点一样的写法-->
        <div>
            <h2>我是{{name}}组件节点的内容</h2>
        </div>
    </template>

    <script>
        Vue.component("father", {
            template: "#father",
            data() {
                return {
                    name: "父亲"
                }
            },
            components: {
                // 注册局部子组件
                "son": {
                    // 子组件的注册引用内容
                    template: "#son",
                    data() {
                        return {
                            name: "儿子"
                        }
                    }
                }
            }
        });
        //Vue.component(); 注册全局组件
        /*  参数一： "name" 组件名字
            参数二：{} 配置对象: 里面跟Vue的配置基本一样，
            区别一：el换成了template 
            区别二：components 里面，是各个子组件对象。属性名为：子组件名（字符串），属性值为配置对象。
            注意：components 不能直接只写一个组件名。
                {
                    template: "css选择器",
                    components: {
                        "son":{
                            template: "子组件的css选择器"
                        }
                    }
                }
        */
        new Vue({
            el: "#app", //绑定根节点
            data() {  //data(){}  函数的形式
                return {  //return  返回配置对象

                }
            }
        });
    </script>
```