## 父子数据互传
### 父传子：
- 传递时：
```vue
<!-- 传递时，子组件名上，使用约定的自定义属性，
属性值为父组件的动态属性，让动态属性携带值。 -->
<!-- 如父亲组件内使用子组件： -->
<son :message="fathermessage"></son>
<!-- message为父子约定的自定义属性，
fathermessage为父亲要传递过去的数据，一般用动态属性携带值 -->
```
- 接收时：
```vue
<!-- 接收时，子组件实例内，定义props属性，
属性值可以是一个数组，每项为约定的自定义属性，字符串形式。
也可以是一个对象，对象的每个属性为自定义属性，属性值是大写的类型。
 -->
 components: {
 	"son":{
 		template: "#son",
 		props: ['message'],
 		<!-- 或者 -->
 		props: {
 			message: String,
 		}
 	}
 }
```
- 子组件使用数据：
```vue
<!-- 直接把接收的数据，当成自己实例的，data内的动态属性使用 -->
<h1>{{message}}</h1>
```
### 子传父：
- 传递时：
```vue
<!-- 传递前，子组件内绑定一个事件，例如@click="send()"，用来触发看效果。 -->
<!-- 传递时，send事件内，使用this.$emit(); 传递约定的事件名和数据 -->
<!-- this.$emit(第一个参数为约定的事件名，第二个参数为传递的数据(一般用动态属性携带值))
例如：
-->
<button @click="send()">点我传递<button>
data(){
	return{
		sonmessage: "hello"
	}
	},
methods: {
	send(){
		this.$emit('accept', this.sonmessage);
	}
}
```
- 接收时：
```vue
<!-- 在使用子组件的时候，用@绑定约定的事件名，属性值为自身methods内的方法名，记得方法名不能带括号() -->
<son @accept="rendermsg"></son>
```
- 父组件使用数据：
```
<!-- 然后父组件在自身methods的方法内使用数据，
因为该方法会默认带一个value的参数，携带接收的数据 -->
methods: {
	rendermsg(value){
		console.log(value);
	}
}
```
### 完整案例：
```html
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.5/vue.js"></script>
<body>
    <!-- 父传子： 如何把父亲的message信息，传递给儿子？
        传递时：在组件名上，使用自定义属性和动态属性 :xxx="fatherxxx", 动态属性携带值。
        接收时：子组件的Vue实例上，使用props属性，props:[xxx]
        props属性的属性值是由自定义属性名组成的数组，也可以是自定义属性名组成的对象。
        对象的配置：value, 属性值。 type，属性值的类型。
        接收后如何使用？ 当成data里的动态属性一样直接使用，this.XXX也可以获取。
    -->
    <!-- 
        子传父：如何把儿子的sMessage信息，传递给父亲？
        传递时：子组件先定义一个方法，用来点击后传递看效果。
        方法内通过this.$emit(); 传递数据。
        this.$emit('',sonxxx) 接收2个参数：一个是自定义事件名，一个是动态属性。
            参数1：自定义事件名，父组件使用子组件时，子组件上@的自定义属性。
            参数2：sonxxx是动态属性，携带值，传递的数据。
        接收时：
            父组件使用子组件时，带上自定义属性，并且用@触发，
            后面属性值是方法，使用父组件自身的方法,注意：不带括号
            该方法在methods里面定义的时候，要带一个参数，一般为value, 表示的是接收传递的数据。
     -->
    <div id="app">
        <h2>{{appmessage}}</h2>
        <father :message="appmessage"></father>
        <!-- 其中，第一个约定的自定义属性message，是传递给子组件的属性 -->
        <!-- 第二个是父组件的data内的属性message。 -->

    </div>
    <template id="father">
        <div>
            <h3>接收到App的文本：{{message}}</h3>
            <h4>接收到son的文本：{{sMessage}}</h4>
            <son @inc="accept"></son>
            <!-- inc是子传父时, 约定的事件名 -->
            <!-- accept是自身methods内的方法 -->
        </div>
    </template>
    <template id="son">
        <div>
            <h1>{{sonMessage}}</h1>
            <button @click="send()">将我的数据传递过去</button>
        </div>
    </template>
    <script>
        Vue.component("father", {
            template: "#father",
            data() {
                return {
                    fMessage: "i am father message",
                    sMessage: ""// 定义一个变量，用来接收儿子传过来的数据。
                }
            },
            methods: {
            	// 子传父时触发了约定的事件名, 进而触发自身的方法,该方法自带一个value参数,携带子组件传递过来的数据.
                accept(value) {
                    this.sMessage = value;
                }
            },
            components: {
                "son": {
                    template: "#son",
                    data() {
                        return {
                            sonMessage: "i am son message"
                        }
                    },
                    methods: {
                        send() {
                        	// 用this.$emit()传递数据给子传父时,约定的inc事件名.
                            this.$emit("inc", this.sonMessage); // inc是约定的事件名。
                        }
                    }
                }
            },
            props: ['message']
            // 用props接收父传子时约定的属性, 接收数据.
        });
        new Vue({
            el: "#app",
            data() {
                return {
                    appmessage: "hello world"
                }
            }
        });
    </script>
</body>
```
