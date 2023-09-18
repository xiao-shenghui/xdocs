# setup语法糖
> 本篇内容，完全参考至[vue3官网API](https://cn.vuejs.org/api/).  
> 以下主要学习单文件组件中，`setup语法糖`中的一些使用细节。 
> 以下如果不说明适用条件，则均表示在 `setup语法糖`中。
## 基本语法
### 顶层绑定的暴露
> 顶层的绑定(包括变量，函数声明，以及import导入的内容), 都能在模板内直接使用。
```html
<script setup>
const msg = 'hello';
</script>
<template>
  <h1>{{ msg }}</h1>
</template>
```

## 响应式
> 和`setup()`一样，需要使用`响应式API`来声明。   
> ref在模板中使用时，一样会自动解包。

## 使用组件
> 引入的组件名，可以直接在模板中使用，并且建议使用`PascalCase 格式`以保持一致性。

### 动态组件
> 通过内置组件`component`, 绑定`is`属性决定当前激活的组件。  
> 并且支持三元表达式。
```html
<!-- 官网举例 -->
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>
<template>
	<component :is="Foo"></component>
	<component :is="someCondition ? Foo : Bar"></component>  
	<!-- someCondition 一些条件 -->
</template>
```

### 递归组件
> 组件可以在其模板中引用它自己。  
> 为了避免`循环引用`, 可以参考vue2中的递归组件，设置递归条件。
```html
<!-- Foo.vue -->
<script setup>
import Foo from './Foo.vue'
</script>
<template>
	<Foo></Foo>
</template>
```

## 自定义指令
> 全局注册的自定义指令(`使用app.directive()`)依旧可以使用。  
> 在`setup语法糖`中，可以使用`定义对象`的方式，定义自定义指令。  
> 但是必须遵循`vName`这样的命名, 例如`vColor`;
```html
<script setup>
	const vColor = {
		inserted: (el,binding){
			console.log(el)
		}
	}
</script>
```
> 具体的自定义指令细节，跳转至[vue3深入](./deep)

## defineProps()和defineEmits()
> 在`script setup`中，这两个函数将自动可用,不需要引入。  
> `defineProps` 接收与 props 选项相同的值  
> `defineEmits`接收与 emits 选项相同的值。
```html
<script setup>
const props = defineProps({
  foo: String,
  bar?: Number
})

const emit = defineEmits(['change', 'delete'])
// setup 代码
</script>
```
## defineExpose()
> 在`script setup`中，组件内的数据默认是关闭的  
> 当父组件通过`ref`绑定在子组件上时，当试图拿到子组件实例上的数据  
> 需要用到`defineExpose()`, 也是自动可用的。  
> 在[组合式API](./API-setup)的`context上下文`有提到`expose()`;
- 父组件使用`ref`绑定子组件
```html
<!-- Parent.vue -->
<script setup>
import { ref } from 'vue'
let child = ref(null)
console.log(child.value);  //此时child表示组件容器
console.log(child.value.num);  //0 子组件暴露过了，所以可用。
</script>
<template>
	<Child ref='child'/>
</template>
```
- 子组件使用`defineExpose()`暴露数据。
```html
<script setup>
import { ref } from 'vue'
let num = ref(0)
defineExpose({
	num
})
</script>
```
