## vue指令
### 全局指令
- 使用Vue.directive()定义
	- 参数一： "name" 指令名字
	- 参数二： {} 包含钩子函数的配置对象
		- 钩子函数1： inserted: function(...){} 常用，表示挂载到父标签时触发
		- 钩子函数2： update: function(...){} 表示更新实例时触发
		- 钩子函数3： bind 只调用一次，第一次绑定的时候触发。
		- 钩子函数4： unbind 只调用一次，解绑的时候触发。
	- 钩子函数内，函数接收的参数
		- el: 表示使用该指令的节点元素，可以直接操作DOM
		- binding: 包含围绕指令的一系列属性的对象。
		- vnode和oldVnode: 不常用
	- 钩子函数的参数之binding:
		- binding.name: 表示指令的名字。例如 v-focus, 则name就是focus
		- binding.value: 表示指令的值。 例如 v-focus="123"
			- 注意：v-focus="username" 如果绑定时，值里面写的时字母，会被当成变量，因此需要在data内部定义变量，(username: "admin")才能使用。
		- binding.arg: 表示指令绑定的参数，例如：v-focus:true, 此时参数为true.
			- 注意：支持动态参数，但是需要加[]，例如：v-focus:[bool], 此时bool是变量，需要在data内部定义变量。(bool: true)
		- binding.expression: 表示直接拿指令的“字符串”值或者表达式。例如：v-focue="username", 此时binding.expression = "username"

### 局部指令 
- 在Vue()配置对象，指定directives属性。  
- 其他用法和全局指令一样。 指令名：对象(对象内是钩子函数) 
```js
new Vue({
	el: "#app",
	directives: {
		"focus": {
			inserted: function(el,binding){
				...
			}
		}
	}
});
```

- 实际案例:
```html
<div id="app">
    <h1>{{value}}</h1>
    <input placeholder="请输入用户名" v-model="value" v-focus v-default="username">
    <!-- v-focus 使用自己的定义的指令,执行钩子函数里面的代码（聚焦）。 -->
    <!-- <input placeholder="请输入密码" v-default:true> -->
    <!-- v-default 使用自己的定义的指令，执行钩子函数里面的代码
        （我用el.value="123456" 设置了 input.value 默认值, 
           用binding.arg中的true设置了 el.type为"password" 
          ）。 
     -->
    <!--  也可以换成动态参数。 -->
    <!-- <input placeholder="请输入密码" v-default:[bool]> -->
    <!-- 也可以传值,传值的话，指令的钩子函数里面，el.value就不用写死了 el.value = binding.value; -->
    <input placeholder="请输入密码" v-default:[bool]="123456789">
    <!-- 根据用户自己传入的值，就可以随意修改默认值 -->
    <!-- 同理，我也可以把他，用在用户名输入框 -->
</div>
<script>
    // 全局组件
    Vue.directive("default", {
        inserted: function (el, binding) {
            // console.log(el);
            // el.value = "123456";
            // binding是包含很多指令属性的对象
            // binding.arg 表示指令参数，如此处可以传：v-default:true 或者false
            // binding.arg 也可以传入动态的参数，但是要加[]中括号。v-default:[bool] 
            el.type = binding.arg ? "password" : "text";
            // binding.name 表示指令的名字，此处为 "default"
            // binding.value 表示指令时的值，例如 v-defalut = "123", 此时binding.value = 123, 但是如果里面是非数字，则表示data里面的属性，需要在data里面定义。例如： v-default = "username", 定义：username: "admin"
            el.value = binding.value || "";
        }
    });
    new Vue({
        el: "#app",
        data() {
            return {
                value: "",
                bool: true,
                username: "admin"
            }
        },
        // 局部指令
        directives: {
            "focus": {
                // inserted 是自定义指令的钩子函数，接收参数el,binding等等。
                inserted: function (el, binding) {
                    // el表示绑定的元素，类似于target
                    el.focus();
                }
            }
        }
    })
</script>
```