## Vue插槽
### 插槽的作用
> 提前占坑,使用时根据外边传入的不同数据,渲染不一样的内容.  
### 插槽的语法
- 匿名插槽
```vue
<!-- 父组件内 -->
<template id="fatherID">
    <div>
        <son></son>
        <!-- 一般来说，son内不传任何内容 -->
        <!-- 需求：如果要使用时传入数据，如何接收并渲染？-->
        <son>我是father传入的文本</son>
        <son>
            <template>
                <h1>我是father传入的文本</h1>
            </template>
        </son>
        <!-- 也可以像上面一样，传入复杂的标签结构 -->
    </div>
</template>
```
```vue
<!-- 子组件内 -->
<template id="sonID">
    <div>
        <h1>我是son的内容</h1>
        <slot>我是外边不传内容时，渲染的文本<slot>
        <!-- 使用slot，插槽标签接收，当外面传入了内容，会替换掉默认内容 -->
        <slot>重复渲染外面的内容</slot>
    </div>
</template>
```
- 具名插槽
```vue
<!-- 匿名插槽每次写一对 slot标签时，都会重复渲染一遍外面的内容，因此一般企业中，子组件内只写一对slot插槽标签 -->
<!-- 如何实现传入文本，渲染到指定的插槽里面，并且不会重复？ -->
<!-- 此时运用到具名插槽 -->
```
```vue
<!-- 子组件如何定义插槽？ -->
<template id="sonID">
    <div>
        <h1>我是son的内容</h1>
        <slot></slot>
        <!-- 当没有属性时(匿名插槽)，其实自带默认name属性="default"-->
        <slot name="slotname"></slot>
        <!-- 具名插槽就是在slot标签上，添加name属性，属性名就是插槽名，但是插槽名必须全部小写 -->
    </div>
</template>
```
```vue
<!-- 父组件如何传入文本结构？ 
在vue2.6.0以前：父组件用的slot属性，属性值指定插槽名，此时属性值为字符串
在vue2.6.0以后，该slot属性被废弃了，改为了v-slot:插槽名
注意：
1. 此时插槽名，不用添加双引号 
2. 外面的内容需要用template包裹起来。
 -->
```
```vue
<!-- 父组件 -->
<!-- vue 2.6.0 以前,目前不再使用 -->
<template id="fatherID">
    <div>
        <son></son>
        <son slot="slotname">
        <!-- 注意此处，直接用slot属性，指定具名插槽 -->
            <h1>我是father传入的文本</h1>
        </son>
    </div>
</template>
```
```vue
<!-- vue 2.6.0 以后 -->
<template id="fatherID">
    <div>
        <son></son>
        <son>
            <!-- 1. 用template包裹起来 2.v-slot: 指定插槽名 -->
            <template v-slot:slotname>
                <h1>我是slotname插槽才渲染的，father传入的文本</h1>
            </template>
            <!-- v-slot:插槽名 可以缩写为 #插槽名-->
            <template #slotname>
                <h1>我是father传入的文本</h1>
            </template>
            <!-- 当不指定v-slot:插槽名时，表示匿名插槽，也可以指定为default-->
            <template #default>
                <h1>我是匿名插槽渲染的，father传入的文本</h1>
            </template>
        </son>
    </div>
</template>
```
- 案例
```html
<div id="app">
    <father></father>
</div>
<template id="father">
    <div>
        <h1>我是app22</h1>
        <!-- <son>我是father传入的插槽内容</son> -->
        <!-- 当son内没有放内容的时候，子组件的插槽内容默认被渲染 -->
        <!-- 当son内放内容时，会代替 子组件内插槽的内容被渲染 -->

        <!-- vue2 2.6.0 之前,用slot属性,渲染指定的具名插槽 -->
        <!-- <son>
                <div slot="slotName">我是father传入的具名为slotName的插槽才渲染的内容</div>
            </son> 
        该slot属性被废弃-->
        <!-- 在vue2 2.6.0 以后,废弃了slot属性,改用了v-slot: 或者#, 但是要用template包裹起来 -->
        <son>
            <template v-slot:slotname>
                <h1>我是v-slot:slotname, 子组件内具名为slotname的插槽才渲染的内容</h1>
            </template>
            <!-- v-slot:插槽名 缩写为#插槽名: 注意插槽名必须全部小写-->
            <template #slotname2>
                <h3>我是#slotname2, v-slot:slotname2的缩写.</h3>
            </template>

            <template #default>
                <!-- 默认的内容,匿名插槽,#default可写可不写 -->
                <h3>我是匿名插槽的缩写#default.</h3>
            </template>

            <template #slotName>
                <h3>我是name名称的错误示范,按匿名插槽渲染</h3>
            </template>
        </son>
    </div>

</template>
<template id="son">
    <div>
        <h2>我是son的文本</h2>
        <!-- slot标签里面的为默认内容（可以不写），当外面使用该组件时，被渲染 -->
        <!-- slot标签可以理解为"提前占坑"，以便外面使用时传入内容并渲染 -->
        <slot>我是son内插槽的默认内容</slot>
        <!-- 当仅仅为 <slot>标签时,称为匿名插槽,传入文本就渲染, 多对slot重复渲染多次 -->

        <!-- 当给定一个name属性时,称为具名插槽,外面使用时需要指定name才渲染,不指定不渲染 -->
        <!-- 一个不带 name 的 <slot> 出口会带有隐含的名字“default” -->

        <slot name="slotname">我是指定slotName才渲染的插槽默认内容</slot>
        <slot name="slotname2">我是指定slotName2才渲染的插槽默认内容</slot>

        <!-- 注意:1个子组件内最好只有1个匿名插槽 -->
    </div>
</template>
<script>
    Vue.component("father", {
        template: "#father",
        components: {
            "son": {
                template: "#son"
            }
        }
    })
    let vm = new Vue({
        el: "#app",
        data() {
            return {

            }
        }
    });
</script>
```