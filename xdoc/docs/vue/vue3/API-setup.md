# 组合式API
> 本篇内容，完全参考至[vue3官网API](https://cn.vuejs.org/api/).  
> 以下主要学习常用的API,完整API请参阅官网。
## setup()
> 组件中使用组合式API的入口函数，通常适用`非单文件组件`(例如.html)或者`基于选项式`使用组合式API.
### 基本使用
> setup()函数可以将内部的`响应式API`声明的`对象`，暴露给`组件实例`或者`模板`使用。  

- 注意事项：
1. 组件实例或者模板使用时，`ref对象`会`自动解包`，而不需要加`.value`.
2. setup函数内使用时，没有`this`, 并且`ref对象`需要加`.value`
```js
// 基于选项式使用组合式API
import { ref } from 'vue'
export default {
  setup() {
    const num = ref(0);
    // setup函数内，return暴露给组件实例或者模板使用
    const addNum2 = function () {
      // 在setup函数内，需要用.value
      // 另外，setup函数内，没有this
      num.value++
    }
    // 需要暴露出去
    return {
      num,
      addNum2
    }
  },
  methods: {
    addNum() {
      // 注意，在实例上使用this访问时会自动解包
      this.num++
    }
  }
}
```

```html
<span>使用时自动解包: {{ num }}</span>
<button @click="addNum">methods添加</button>
<button @click="addNum2">setup添加</button>
```

### 访问Props
> `setup()函数`接收的`第一个参数`是`props选项的值`, 并且默认是响应式的。
> `setup语法糖`使用`defineProps()`接收`props对象的值`。

- 注意事项
1. 不仅是`setup()`中，即使是`setup语法糖`的`defineProps()`中，如果你解构了`props对象`, 将丢失响应式。
2. 如果你想让`props`解构后依旧有响应式，推荐使用`toRefs`和`toRef`两个`工具函数`。
3. `setup语法糖`内使用`defineProps()`传参时，就和选项式的`props`的值类型一样，支持数组或者对象。
- 
```js
// setup()函数内访问props
export default {
	// props的值是对象
	props: {
		title: String
	},
	setup(props){
		// const { title } = props;
		// 将使得title丢失响应性
		// 建议使用toRefs()工具函数
		const { title } = toRefs(props);
		return {
			title
		}
	}
}

// setup语法糖访问props
import { toRefs } from 'vue'
const msg = defineProps({
	title: String
})
// 使用toRefs解构
const { title } = toRefs(msg)
```

### 访问this上下文
> setup函数的第二个参数是`context`上下文对象, 也就类似于`this`  
> 并且该`对象`是非响应式的，可以安全的`解构`。
```js
export default {
	// context  { attrs, slots, emit, expose }
	setup(props, context){
		//等价于this.$attrs
		// 透传Attributes
		console.log(context.attrs); 
		// 等价于this.$slots
		// 插槽对象
		console.log(context.slots);
		// 等价于this.$emit
		// 提交触发事件
		console.log(context.emit);
		// 限制暴露的公共属性、
		console.log(context.expose)
	}
}
```
> `expose`用于显示限制return暴露的属性。   
> 当父组件通过`模板引用`访问子组件中的属性时，只能访问`expose`暴露的属性。
```js
expose();  //不暴露任何内容
const myCount = ref(0);
expose({count:myCount }); //显示暴露myCount, 父组件通过count访问。
```

### 返回一个渲染函数
> setup函数不仅可以使用`return`暴露属性，也可以返回一个`h`函数。  
> 如果返回一个渲染函数，则没法暴露属性，此时可以用到`expose`
```js
import { h, toRefs }
export default {
	props: {
		title: String
	},
	setup(props, {expose}){
		const { title } = toRefs(props);
		expose({title})
		return () => h('div', {}, 'hello');
	}
}
```

## 响应式核心
### ref()
> 返回一个`响应式的`，`可更改`的ref`对象`。此对象只有`一个`指向其内部值的属性`.value`。
- 注意几个点：
1. 响应式的
2. 可更改的
3. 只有一个属性`.value`, 并且指向`内部值`。
```js
const num = ref(0);
// 此时num为响应式的，带有.value指向其内部值0
// 并且num.value可被赋值或更改，且改完后依旧是响应式的
num.value = 1;
````
> 另外如果将`一个对象`赋值给`ref对象`, 或者作为`内部值`，那么这个对象将通过`reactive()`转为`深层次`的响应式对象。
```js
const obj = ref({
	name: 'wc',
	user: {
		info: 'www'
	}
})
obj.value.name = 'xx';
```
> 如果想避免这个发生，可以使用`shallowRef()`替代。(`shallow`: 浅的，表面的)
```js
const obj = shallowRef({
	name: 'wc',
	user: {
		info: 'www'
	}
})
```
### reactive()
> 返回一个对象的响应式`代理`对象, 并且这个代理是深层的。  
> `模板`或者`组件实例内`使用时将自动解包  
> 另外，`reactive()内`也将深层的解包所有的`ref属性`, 并保持与`源数据一致`。  
> 如果要避免深层次响应式，可以使用`shallowReactive()`替代。
```js
const num = ref(0); //一个ref对象
const obj = reactive({
	count: 1, //普通的响应性属性
	num  //将自动解包num.value
})
obj.count++  
obj.num++

console.log(obj.num); //1
console.log(num); //1
```
> 官网：将一个 `ref` `赋值`给一个 `reactive 属性`时，该 ref 会`被自动解包`。

### readonly()
> 接受一个对象, 无论是reactive,ref，或普通对象，返回`一个读代理`。  
- 注意：
1. 也是一种代理，但是`属性只读`。
2. 使用`isReadonly()`和`isProxy()`都是`true`
3. `深层的`代理。如果不想深层代理，可以使用`shallowReadonly()`代理。
```js
const user = readonly({
	name: 'admin',
	info: {
		age: 18
	}
})
user.name = 'ddd'; //Vue Warn 'name' is readonly
user.info.age = 19; //Vue Warn 'age' is readonly
isProxy(user); //true
isReadonly(user); //true
```
### watch()
> 类似于vue2的`watch选项`，支持监听多个，支持`flush`调整时机，支持`随时停止监听`。
> 第1个参数: 手动指定监听依赖, 支持监听getters函数，ref对象, 支持数组形式监听多个. 
> 第2个参数: 接收一个回调作为参数，回调带有`newValue`和`oldValue`.  
> 第3个参数: `配置项对象`支持`立即监听`和`深度监听`。  
> 调用其`返回值`, 即可随时停止监听。
```js
const count = ref(0);
const age = ref(18);
const cancelWatch = watch(count, (newValue,oldValue)=>{
	console.log(newValue)
},{
	deep: true, //深度监听
	immediate: true //立即监听
})

cancelWatch(); //支持随时监听。

watch(()=>count.value, (newValue,oldValue)=>{   //传入getters
	console.log(newValue)
})  

watch([count,age], ([newCountValue, newAgeValue], oldValue)=>{
	// 此时，newValue是一个数组，可以解构
})
```

### watchEffect()
> 对比watch更加强大, 可以立即执行一个`回调函数`，同时监听`函数内`响应式依赖变化。  
> watch需要`手动`指定依赖对象，而watchEffect可以`自动`收集`函数内`的响应式依赖。   
> watchEffect一样也支持`随时停止监听`, 调用`返回值`即可。
```js
const count = ref(0);
const cancelWatch = watchEffect(()=>{
	// 自定收集count
	console.log(count.value); //0
})

// 支持随时停止监听
cancelWatch();
```
> watchEffect也可以`用于清理副作用`.   
> 在回调函数中接受`1个参数`用于清理，可以调用`该参数`，传入对应的`清理逻辑`。
```js
const count = ref(0);
watchEffect((clearEffect)=>{
	// 自定收集count
	console.log(count.value);
	// 模拟异步请求
	let timer = setTimeout(()=>{
		console.log('发送请求成功')
	}，2000);
	// 调用回调函数的第一个参数，清理副作用
	clearEffect(()=>{
		clearTimeout(timer);
		console.log('清理副作用成功')
	})
})
```
> watchEffect默认`组件渲染之前`执行，也可以`自定义执行时机`.  
> 传入第2个参数, 是一个配置项对象，配置`flush`。
```js
watchEffect(()=>{

},{
	flush: 'post';   //组件渲染之后执行
})
```
#### 总结
1. 第1个参数作用: 自动收集依赖，监听。同时支持接收1个参数用于清理副作用。
2. 第2个参数作用: 配置对象，配置`flush`自定义执行时机。

#### 执行时机别名
> 除了在`watchEffect`的第2个参数，手动指定配置项定义执行时机。  
> 也可以使用`watchPostEffect()`和`watchSyncEffect()`两个别名。

## 响应式工具
### isRef()
> 判断一个值是否为`ref`。
```js
const num = ref(0);
const age = 18;
isRef(num); //true
isRef(age); //false
```

### unref()
> 解包工具，如果一个值是ref对象，将返回其`.value`, 否则返回本身。
```js
// 本质是isRef()表达式的语法糖
val = isRef(val) ? val.value : val
```

### toRef()
> 根据`值`, `ref对象`, `getters函数`或者一个`响应式对象上的属性`，创建为一个`ref对象`  
> 常用于`props`对象某些属性`解构`后，`丢失响应性`的问题。
```js
// 如果是值，跟ref()效果一致
const num = toRef(0);
// 并且支持getters函数
const foo = toRef(()=> props.foo);

const obj = reactive({
	name: 'zhangsan'
})

const { name } = toRef(obj,'name'); 
//此时如果不提前toRef, name就会丢失了响应性

const user = reactive({
      name: 'wc'
    });
const { name } = user;
//解构将直接丢失响应性
console.log(name); //wc
user.name = 'ddd';
console.log(name); //wc

// 由于是创建ref对象，如果源值更新了，ref对象也会更新。
```

### toValue()
> 与`unref()`类似，但是如果值是`函数`，将返回函数`执行的结果`。
```js
const num = ref(0);
console.log(toValue(num)); //num.value 0

const sayHello = function(){
	return 123
}

const res = toValue(sayHello) //123
```

### toRefs()
> 把一个`reactive`或者`响应式对象`转换为一个普通对象，并且该对象的每个属性，都使用了`toRef()`创建。    
> 应用: 常用于`props解构后丢失响应性`的解决，让其`保持`响应性。  
> 因此包装后的`对象.属性.value`与`源数据属性值`将始终`保持一致`。
```js
const user = reactive({
	name: 'admin'
})

const userMy = toRefs(user);
user.name = 'admin123';
console.log(userMy.name.value); //admin123
```

### isProxy()
> 检查一个对象是否由`reactive()`, `readonly()`, `shallowReactive()`或者`shallowReadonly()`代理。  
> 由此可见`readonly()`在设置一个对象的属性为只读的同时，也是一种`代理`。
```js
const obj = readonly({
	name: 'wc'
})
console.log(obj.isProxy()); //true
```

### isReactive()
> 检查一个对象是否由`reactive()`或者`shallowReactive()`代理。


### isReadonly()
> 检查一个对象是否为`只读对象`.  
> 通过`readonly()`或者`shallowReadonly()`代理设置的对象，都是`只读的`, 因为其没有`set函数`的`computed()`ref;
```js
const obj = readonly({
  name: '1223',
  user: {
    address: '郑州'
  }
})
console.log(isReadonly(obj)); //true
console.log(isReadonly(obj.name)); //false
console.log(isReadonly(obj.user)); //true
```

## 响应式进阶
### shallowRef()
> `ref`浅层的响应式形式,只对于`.value`是响应式的。    
> 官方: 常用于性能优化, 减少大型不可变数据的响应性开销。
> 只有`.value`整个改变，才会刷新视图，触发`监听`

```js
const obj = {state: 123}
const count = ref(obj);
count.value.state = 345;
console.log(count.value);  //Proxy(Object) {state: 345}
console.log(obj);  //{state: 345} 响应式，跟着改变

const obj2 = {state: 123}
const count2 = shallowRef(obj2);
count2.value.state = 345
console.log(count2.value);  // {state: 345} 普通对象(浅层代理)
console.log(obj2);  // {state: 345} 源数据也变了，但是不会刷新视图。

count2.value = {state: 345} //只有.value是响应式，会触发更改, 刷新视图。
console.log(count2.value); //{state: 345}
````

### triggerRef()
> 强制触发一个`shallowRef()`的副作用函数`watchEffect()`
> 因为浅层的ref对象,当修改内部值时，不会触发`监听`
```js
const obj = {state: 123}
const count = shallowRef(obj);
count.value.state = 345; //修改内部值，不带响应式, 不触发watchEffect()
watchEffect(()=> conole.log(count.value) );
triggerRef(count); //强制触发   //345
```

### customRef()
> 创建一个自定义的ref,使用回调函数的`get`和`set`   
> 内部使用`trigger()`实现`通知vue重新解析模板`
> 内部使用`track()`实现`通知vue追踪响应式依赖`
```js
// 看起来customRef()对于hooks, 或者精细化操作响应式过程，非常重要。
function myRef(value){
	return customRef(
			(track,trigger) =>{
					return {
						get(){
							track(); //通知vue追踪响应式依赖 value
							return value;
						},
						set(newValue){
							value = newValue;
							trigger(); //通知vue重新解析模板
						}
					}
			}
	);
}

const count = myRef(0);
count.value++;  //视图会跟着更新
```

### shallowReactive()
> 浅层次的`reactive()`形式。
> 类比`shallowRef()`, 也就是只有`根级别的属性`是响应式的。  
> 只有完整的修改`根级别属性值`，才会触发`更新`。
```js
const obj = shallowReactive({
	user: {
		name: 'admin'
	}
})

obj.user.name = 'zhangsan'; //不触发视图更新和监听
obj.user = { name: 'zhangsan' }; //触发视图更新和监听
```

### shallowReadonly()
> 浅层次的`readonly()`形式。
> 只有`根级别属性`转为了只读。

### toRaw()
> 获取到`响应式对象`(reactive和readonly系列)的原始数据源。   
> 可以用于`临时读取`,而不引起追踪开销。  
> 与`快照`不同，是`引用`，如果`响应式对象`中途修改了，再次打印时值也会修改。
```js
const count = reactive({
	user: 'admin'
})
const userObj = toRaw(count);
console.log(userObj) //{ user: 'admin' }
count.user = 'ddd';
console.log(userObj) //{ user: 'ddd' }
```

### markRaw()
> 将一个对象，标记为`禁止转为代理`的对象。
```js
const obj1 = {}
const user1 = reactive({
	obj: obj1,
})
console.log(isReactive(user1.obj)); //true

const obj2 = markRaw({});
const user2 = reactive({
	obj: obj2,
})
console.log(isReactive(user2.obj)); //false
```

## 生命周期钩子
> 详情见上一篇[vue3基础](./basic)
> vue2`动态组件keep-alive`，对应的生命周期`activated()`和`deactivated()`  
> vue3中为`onActivated()`和`deActivated()`
```js
onActivated(()=>{
	console.log('被激活了')
});
```
```html
<KeepAlive :max="10" :include="/a|b/" :exclude="">
  <component :is="activeComponent" />
</KeepAlive>
```

## 依赖注入
> 详情见上一篇[vue3基础](./basic)
```js
// 提供依赖
const count = ref(12)
provide('count', count)

// 被注入,消费值
// 赋给响应式变量
const myCount = ref(0);
myCount.value = inject('count')

// 赋给普通变量
const myCount2 = inject('count')
```