# el-container组件源码分析与实现

> `el-container`组件源码分析与实现, 含`header`,`aside`,`main`和`footer`组件。

## el-container

### 组件用法

```html
<!--上下布局-->
<el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
</el-container>
<!--左右布局-->
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>
<!--上，下（左右）布局-->
<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
<!--左，右（上下布局）-->
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
```

- **el-container**: 当子元素中包含 `<el-header>` 或 `<el-footer>`时，全部子元素会垂直上下排列，否则会水平左右排列。(联想到`flex`布局，问题是如何判断子元素？)
- el的解释：`<el-container> `的子元素只能是后四者，后四者的父元素也只能是 `<el-container>`(如何遍历判断所有子元素？)
- el-container: 有`direction`,提供两个可选值`horizontal / vertical`，子元素中有 `el-header` 或 `el-footer` 时为 vertical，否则为 horizontal
- el-aside: 有`width`属性，用于指定侧边栏的宽度。
- el-header: 有`height`属性，用于指定底部栏的高度。
- el-footer: 有`height`属性，用于指定底部栏的高度。

> 猜测实现原理：首先`direction`的值，由遍历子元素的name，遍历的结果自动决定，获取当用户指定的话，以指定的为准。  
> 其次，使用`direction`设置`flex布局`的`flex-direction`。  
> 其次，遍历子元素name时，如果出现了意料之外的name,则报错。  
> 其次，`el-aside`组件内，有个默认的宽度，不然会占满全局。同理，`el-header`和`el-footer`有默认的高度。这两个属性的值，都用`props`接收，指定默认值。

### 查看源码-el-container

```html
<template>
  <section class="el-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: 'ElContainer',
    componentName: 'ElContainer',
    props: {
      direction: String
    },
    computed: {
      isVertical() {
        if (this.direction === 'vertical') {
          return true;
        } else if (this.direction === 'horizontal') {
          return false;
        }
        return this.$slots && this.$slots.default
          ? this.$slots.default.some(vnode => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === 'el-header' || tag === 'el-footer';
          })
          : false;
      }
    }
  };
</script>

```

### 分析源码-el-container

```javascript
// vnode.componentOptionsfooter// isVertical 用计算属性的返回值，判断是否有is-vertical样式
if (this.direction === 'vertical') {
  return true;
} else if (this.direction === 'horizontal') {
  return false;
}
// 如果没有指定direction
// 返回 xxx
return this.$slots && this.$slots.default
          ? this.$slots.default.some(vnode => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === 'el-header' || tag === 'el-footer';
          })
          : false;
// 三元表达式：如果里面有内容，即this.$slots && this.$slots.default有值，
// 为何要判断两次？
// this.$slots表示是否有插槽结构，并且 this.$slots.default表示是否有插槽内容
// 如果没有内容，返回false, 一样没有is-vertical样式，当普通div使用
this.$slots.default.some(vnode => {
     const tag = vnode.componentOptions && vnode.componentOptions.tag;
    return tag === 'el-header' || tag === 'el-footer';
})
// some() ES6新增的数组遍历的方法，检测数组中的元素是否满足指定条件
// 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
// 如果没有满足条件的元素，则返回false。
// 遍历插槽节点，vnode.componentOptions表示插槽节点的整体配置项对象。
// vnode.componentOptions.tag表示每个this.$slots.default的节点标签名tag。
// 一旦有一个，并且tag为el-header或者tag为el-footer，则表达式成立，
// 返回ture,即添加is-vertical样式
```

- `this.$slots.default `知识点

```text
在Vue.js中，this.$slots.default是一个特殊的插槽，用于渲染组件的默认内容。
插槽是一种允许组件在其模板中接受外部内容的机制。
this.$slots.default是一个数组，其中包含了插槽中的所有内容(虚拟节点集合)。
使用.some()方法，遍了this.$slots.default 数组中的每个虚拟节点（vnode），
并检查了每个虚拟节点的组件选项（componentOptions）中的标签（tag）。

tag表示虚拟节点对应的组件的标签名。
在这个例子中，代码检查了每个虚拟节点的标签是否为'el-header'或'el-footer'。
如果是其中之一，some()方法将返回true，否则返回false。
因此，tag在这里表示虚拟节点对应的组件的标签名。
```

- 虚拟节点的组件选项`(componentOptions)`

```text
组件的标签名componentOptions是一个组件选项对象，它包含了组件的各种选项和属性。
componentOptions对象具有以下属性：
  propsData：一个包含了组件实例的初始props数据的对象。
  listeners：一个包含了组件实例的父组件传递给它的事件监听器的对象。
  children：一个包含了组件实例的子组件的数组。
  slots：一个包含了组件实例的插槽内容的对象。
  scopedSlots：一个包含了组件实例的作用域插槽内容的对象。
  tag：组件的标签名。
  parent：组件实例的父组件实例。
  inject：一个包含了组件实例的注入内容的对象。
  provide：一个包含了组件实例的提供内容的对象。
注意：componentOptions属性只在组件的虚拟节点中存在，而不是在普通的HTML元素的虚拟节点中存在。
```
>  可以推测，`el-header`和`el-footer`有个height的props属性, 父类通过this.$slots.default遍历判断标签名tag, 通过props属性设置高度。

- 基本实现的思路掌握后，我们看下`css`文件

```css
/*省略掉css文件里，对兼容性的代码*/
.el-container {
    display: flex;
    /*默认flex方向是row，默认的水平方向*/
    flex-direction: row;
    /*如果作为子级，则直接按比例填充满*/
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0
}

.el-container.is-vertical {
  /*如果添加了is-vertical的话，方向改为column*/
    flex-direction: column
}
```

### 总结

- 如何判断子节点的标签名？`this.slots.default`表示插槽的`虚拟节点数组`,用`some`可以遍历数组，一旦有一个符合的，就会返回`true`.
- 遍历条件：每一个虚拟节点，有一个`componentOptions`配置对象，该对象有`tag`，表示`组件的标签名`。因此，每个子节点，最好都添加一个`componentName`属性，值和组件的`name`一样即可。
- 添加垂直布局的条件：首先是用户是否指定`direction`, 其次是是否有`el-header`或者`el-footer`

## el-header

### 组件用法

```html
<el-container>
  <el-header height="300px"></el-header>
</el-container>
```

- `height`属性，控制高度

> 猜测设计：设置height  props, 带默认值，并且调整style样式的高度。

### 查看源码

```html
<template>
  <!--用H5的header包裹，语义化-->
  <header class="el-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'ElHeader',
    componentName: 'ElHeader',
    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
```

> 与猜测的一致

## el-aside

### 组件用法

```html
<el-container>
  <!--设置宽度-->
  <el-aside width="200px">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>
```

>  这里没有什么特殊的，使用with设置宽度，由于container已经设置了flex布局的方向，因此基本和el-header一样。

### 查看源码

```html
<template>
  <aside class="el-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'ElAside',
    componentName: 'ElAside',
    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
```

## el-footer和el-main

> 这两个组件和el-height基本一样。就包裹的语义化标签不一样。
