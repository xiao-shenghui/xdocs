## element的row组件

### 组件用法

```html
<el-row gutter='20' type='flex' justify='center'>
  </el-row>
```

- `gutter`: 指定内部的分栏的间隔
- 默认占满全行 (div未设置宽度时,就是占满全行的)
- type='flex': 指定为flex布局
- justify: 可以指定弹性布局的对齐方式，指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。
- align: 可以指定弹性布局的垂直对齐方式

>  猜测其实现原理：默认type为grid布局，gutter对应gap，设置宽度为100%，如果指定type为flex，则用justify设置样式justify-content的属性值。

### 查看源码

```javascript
props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: String
  },
computed: {
  style() {
    const ret = {};

    if (this.gutter) {
      ret.marginLeft = `-${this.gutter / 2}px`;
      ret.marginRight = ret.marginLeft;
    }

    return ret;
  }
},
render(h) {
    return h(this.tag, {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
      ],
      style: this.style
    }, this.$slots.default);
  }
```

### 源码分析

```javascript
// 主要实现的函数：render(h)
render(h) {
    return h(this.tag, {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
      ],
      style: this.style
    }, this.$slots.default);
  }
  // this.tag === 'div'
  /*
  {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        // 如果指定了justify，类名就为is-justify-${this.justify}，然后根据css修改布局
        this.align ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
        // 如果this.type指定了flex，则类名有el-row--flex
      ],
      style: this.style //用计算属性，计算gutter/2为margin-left和margin-right,返回对象直接给style属性
    }
  */
  
```

- 基本实现的思路掌握后，我们看下`css文件`

```css
/*is-justify-${this.justify}*/
/*is-align-${this.align}*/
/*el-row--flex*/
/*这三个类名分别控制水平排布，文本对齐方式，布局方式*/
/*el-row--flex*/
.el-row {
    position: relative;
    /*猜测是给el-col的span布局用*/
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

/*以下是清除浮动用的*/
.el-row::after,
.el-row::before {
    display: table;
    content: ""
}

.el-row::after {
    clear: both
}
/*flex布局,带兼容性*/
.el-row--flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

/*is-justify-${this.justify}*/
.el-row--flex.is-justify-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center
}

.el-row--flex.is-justify-end {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end
}

.el-row--flex.is-justify-space-between {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between
}

.el-row--flex.is-justify-space-around {
    -ms-flex-pack: distribute;
    justify-content: space-around
}

/*is-align-${this.align}*/
.el-row--flex.is-align-top {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start
}

.el-row--flex.is-align-middle {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.el-row--flex.is-align-bottom {
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end
}
```

### el-row总结

- 默认未使用弹性布局
  - `div`未设置宽度时, 默认占满全行,高度由内容决定.
- 如果`指定flex`,则开启弹性布局,
  - 并且可以通过`justify``和`align`(基本是flex布局的缩写)设置`对齐方式`.
- 使用`render`函数, 
  - 通过`配置class`,设置基本样式和flex布局. 
  - 通过`计算属性`计算`gutter`并且设置`marginLeft`和`marginRight`返回个对象给`配置项style`
  - 通过`vue`提供的匿名插槽`API`,`this.$slot.default`指定该组件的内容为`匿名插槽内容`.
  - 可以猜测: 里面放的`col`组件内容,是由`匿名插槽`设计的

### 疑问?
- 为何设置`自身的`margin, 可以达到`设置分栏(col组件)`的margin的目的?
- 猜测: `col组件`接收了`row组件`的margin值.

## element的col组件

### 组件用法

```html
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="10">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
```

- span: 设置`col组件`占用父亲的`比例,` 最大为24
- offset: 设置`col组件`要`向左偏移`的`比例`,最大为24
- xs\sm\md\lg\xl: 设置`col组件`的响应式尺寸

>  猜测其实现原理: span设置该组件的宽度百分比或者rem, 继承父亲的。offset 利用margin或者padding实现的。 xs\sm\md\lg\xl 通过设置rem

### 查看源码

```javascript
props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let classList = [];
    let style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        );
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        let props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          );
        });
      }
    });

    return h(this.tag, {
      class: ['el-col', classList],
      style
    }, this.$slots.default);
  }
```

### 源码分析

```javascript
// 主要实现的方法,还是用render()函数
return h(this.tag, {
    class: ['el-col', classList],
    style
}, this.$slots.default);
// tag还是一样,默认用div

// class里面主要是classList
['span', 'offset', 'pull', 'push'].forEach(prop => {
    if (this[prop] || this[prop] === 0) {
      classList.push(
        prop !== 'span'
          ? `el-col-${prop}-${this[prop]}`
          : `el-col-${this[prop]}`
      );
    }
});
// 遍历span和offset组成的数组。
// 如果使用组件时，如果传递了对应的props
// 并且遍历不是span时，将 `el-col-${prop}-${this[prop]}`  push进classList
// 如果遍历到span时，将`el-col-${this[prop]}` push进classList
// 所以span是一个单独的样式，el-col-xxx, 其他的是：例如 el-col-offset-xxx, xxx为传入的props值

  
// 下面是如何用父组件row的margin，来设置子组件col的间距的
if (this.gutter) {
  style.paddingLeft = this.gutter / 2 + 'px';
  style.paddingRight = style.paddingLeft;
}
// 使用col自身的gutter属性，设置内边距，paddingLeft和paddingRight
// 疑问？？ col自身哪里来的gutter属性？
// 解决：col的计算属性gutter
computed: {
    gutter() {
      // vue提供的钩子，this.$parent拿到父节点
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'ElRow') {
        // 如果有父节点,并且父节点不是row组件,
        // 再往上找一层父节点
        parent = parent.$parent;
      }
      // 如果找到父节点，或者就是row, 返回父节点的gutter
      // 父节点的gutter(就是marginLeft和margintRight组成的对象)
      return parent ? parent.gutter : 0;
    }
},
// 所以是找父节点的计算属性gutter，返回过来的。
// 为何要找row的gutter?而不是自己设置自己的gutter?
// 大部分情况下，会写多个col组件，如果都自己设置，非常麻烦。
```

- 基本实现思路已经清晰，我们看下`css文件`是如何设置的

```css
/*先看span的样式 el-col-xxx */
/*`el-col-${this[prop]}`*/
/*也就是:span='24', 则为el-col-24*/
.el-col-1 {
    width: 4.16667%
}
.el-col-24 {
    width: 100%
}
.el-col-0 {
    display: none;
    width: 0%
}
/*可以看到，确实用百分比设置的，最大24. 
另外一旦传入0,会不显示*/
[class*=el-col-] {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}
/*注意，设置了所有的col: 怪异盒子，防止padding撑起盒子，
  另外设置了左浮动, 这个左浮动我们最后讲解*/
/*还记得，row里面，用了清除浮动的方法，防止高度塌陷。*/

/*然后我们别的属性，非span的情况，el-col-offset-xxx
`el-col-${prop}-${this[prop]}`*/
/*也就是:offset='6', 则为el-col-offset-6*/
.el-col-offset-1 {
    margin-left: 4.16667%
}
.el-col-offset-24 {
    margin-left: 100%
}
.el-col-offset-0 {
    margin-left: 0
}
/*
  所以offset和span的比例是一样的，设计好的百分比
  当offset传入0的时候，等于设置没有左边距
*/

/*默认样式里设置了float:left,
以及row组件的样式中设置了清除浮动*/
/*row组件的css代码，上面可见*/
/*
/*以下是清除浮动用的*/
.el-row::after,
.el-row::before {
    display: table;
    content: ""
}

.el-row::after {
    clear: both
}
*/

/*下面是push和pull的实现*/
.el-col-push-1 {
    left: 4.16667%
}

.el-col-push-24 {
    left: 100%
}

.el-col-pull-1 {
    right: 4.16667%
}

.el-col-pull-24 {
    right: 100%
}
/*因此，它其实是给pull和push用的，
push是设置浮动left的距离，pull是设置浮动right的距离*/
/*所以有种push是往右推，pull是往左拉的感觉*/
```

### el-col总结

- 边距实现：
  - 设置自己的`gutter`计算属性。里面：通过判断`this.$parent`拿到`row组件`的`gutter`计算属性。
  - 它是一个`{marginLeft: xxx, marginRight: xxx}`组成的对象。
  - 在`render()`函数里面，判断自己的`gutter`计算属性是否`有值`，返回给局部变量`style对象`
    - 即用户有没有在`row`设置`gutter`. 
    - 有值就将值(`margin`) 设置为style对象的`paddingLeft和paddingRight`
  - 渲染时，`配置项style`接收`style对象`
- span实现：
  - `render()`函数里面，遍历各个字符串(`span`、`offset`)。为了便于给局部变量：classList数组 添加类名
  - 如果`col组件`传入了`对应的字符串`组成的props，就开始判断
    - 如果传入了`span`，就添加`el-col-${this[prop]}`进classList。
    - (例如：`:span='12'`, 则就是`el-col-${this[span]}` 也就是 `el-col-12`)
    - `el-col-xxx`就是使用`span`控制的样式，css设置`宽度百分比`实现的。
  - 渲染时，`配置项'class'`接收一个数组,由默认样式和classList局部变量组成 `['el-col',classList]`
- offset实现:
  - 紧接着上面，`遍历`判断:
    - 如果传入的是`非span`，就添加`el-col-${prop}-${this[prop]}`进classList。
    - 例如：`:offset=12`, 则就是`el-col-offset-${this[offset]}` 也就是`el-col-offset-12`
    - `el-col-offset-xxx`就是`offset`控制的样式， css设置`margin-left`来实现的。

- pull和push实现：
  - 判断部分与上面一样, `el-col-pull-xxx` 和 `el-col-push-xxx`主要看css部分
    - css上来给所有`el-col-`开头的，设置了`float:left`，左浮动
    - 然后给`el-col-pull-xxx` 设置`right`的`百分比`, 目的是模拟`拉`的效果。
    - 给`el-col-push-xxx` 设置`left`的`百分比`, 目的是模拟`推`的效果。
    - 并且，还记得`row组件`样式里，有用`伪元素`清除浮动的css代码。 
