## el-radio 单选框 组件源码分析

> 涉及：基础单选框，element-ui中dispatch和broadcast的封装和实现，vue中$nextTick()函数的使用。

### 基础用法

> 官方解释：设置v-model绑定变量，选中就绑定label属性的值，label支持：String、Number或Boolean。

```javascript
<template>
  <el-radio v-model="radio" label="1">备选项</el-radio>
  <el-radio v-model="radio" label="2">备选项</el-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```

> 猜测实现思路：首先，v-model是用于绑定input的value的，（给普通标签加v-model，会有什么效果？）通过value,与传入label的props通过v-model绑定，比较，如果相等，设置checked为true, 并且设置样式。

### 自己的实现思路

```html
<template>
    <div class="x-raido" ref="main" :value="value">
        <input type="radio" v-model="labelCheck">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XRadio',
    props:{
        label: String
    },
    computed:{
        labelCheck(){
           return this.$refs.main.value == this.label ? true : false;
        }
    }
}
```

问题：div标签没有value, 有没有别的办法？可以带有value，同时是个双标签。
手动添加一个value属性，无效。
如果是多个radio，如何与slot的文字绑定？(不能用label for id, 因为id是唯一的)(如果点击div, 就让其被选中呢？需要添加点击事件，用emit的方式)

### 查看源码

>  源码比较多，分块分析

- template: 

```html
<template>
  <label
    class="el-radio"
    :class="[
      <!--传入了border，或者radioSize,则根据radioSize添加样式-->
      border && radioSize ? 'el-radio--' + radioSize : '',
      <!--是否传入了禁用-->
      { 'is-disabled': isDisabled },
      <!--是否传入了focus-->
      { 'is-focus': focus },
      <!--是否传入了border-->
      { 'is-bordered': border },
      <!--是否被选中，根据model和label的值判断-->
      { 'is-checked': model === label }
    ]"
    role="radio"
    <!--MDN: 控制元素的选中状态，即使是非input，也可以。
    这里主要是为了设置css样式，所以用这个API-->
    <!--必须配合role，tabindex一起使用的。-->
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    <!--MDN: 要启用焦点，需要使用 tabindex 属性。-->
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
  <!-- 重写input:radio, 用span模拟单选框-->
    <span class="el-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <!--这就是单选框图标-->
      <span class="el-radio__inner"></span>
      <input
        ref="radio"
        class="el-radio__original"
        :value="label"
        type="radio"
        <!--aria-hidden? 是什么属性？使残障人士更容易访问 的代码-->
        aria-hidden="true"
        <!--用model控制选中还是不选-->
        v-model="model"
        <!--方法-->
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        autocomplete="off"
      >
    </span>
    <!--单选框文字-->
    <span class="el-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
```

- script

```javascript
import Emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElRadio',

  mixins: [Emitter],

  // inject是子组件接收父组件用provide属性定义的数据。
  // 这里主要用于接收form和formItem 使用传下来的数据，
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  componentName: 'ElRadio',

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },

  data() {
    return {
      focus: false
    };
  },
  computed: {
    isGroup() {
      // 一直往上判断，父组件有没有ElRadioGroup，
      // 一旦找到的话，赋值给_radioGroup，返回true, 
      // 否则跳出循环，返回false
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ElRadioGroup') {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      // 计算属性的get和set, 更加细腻的控制属性的值。
      // 主要是有个Group组件。
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('ElRadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
      }
    },
    // 返回elFormItem的尺寸
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    // 计算返回单选按钮的尺寸
    radioSize() {
      const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize;
    },
    // 判断是否禁用,返回布尔值
    isDisabled() {
      // 根据计算属性的结果(父组件是否有ElRadioGroup)
      // 走不同的判断流程.
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled || (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled;
    },
    // 标签索引 0 or -1
    tabIndex() {
      return (this.isDisabled || (this.isGroup && this.model !== this.label)) ? -1 : 0;
    }
  },

  methods: {
    handleChange() {
      //vue执行完渲染后会执行this.$nextTick()里面的callback函数。
      this.$nextTick(() => {
        this.$emit('change', this.model);
        this.isGroup && this.dispatch('ElRadioGroup', 'handleChange', this.model);
      });
      // this.$nextTick(callback); 
      //可以将事件保留到DOM更新以后,即this绑定到当前实例了,再触发
      // 也就是延迟触发,相当于绑定到mounted的方法.
      /* Vue官网: 在修改数据之后立即使用这个方法，可以获取更新后的 DOM。
      methods: {
        example: function () {
          // 修改数据
          this.msg = 'changed'
          // 改完后，DOM 还没有更新，更新是异步的
          console.log('not nextTick():',document.getElementById("div").innerHTML) //不是'changed'
          this.$nextTick(function () {
            // DOM 现在更新了， `this` 绑定到当前实例
            console.log('use nextTick():',document.getElementById("div").innerHTML) //不是'changed'
          })
        }
      }
      */
      // vue执行完渲染后会执行this.nextTick()里面的callback函数。
      
      // 为何需要$nextTick??  
      // vue data中的数据更新时，它不会立即去渲染页面，不会立即修改页面中的dom，而是先存储起来，
      // 如果一个数据被改了很多次，以最后一次修改为准，这就是所谓的异步更新DOM。(类似于防抖)
      // 而想要立即获取修改后的数据, 这样同步代码会比异步代码先执行。所以官方提供一个 $nextTick() 异步方法。

      // 所以其实用setTimeOut()也可以达到渲染后获取的效果,因为是宏任务。
      // 执行顺序：同步代码 > nextTick > Promise > setTimeout
    }
  }
};
```

- 这里用了混入，我们看一下混入的文件，长啥样(主要是把methods方法，混入进来)

```javascript
function broadcast(componentName, eventName, params) {
  // 遍历子组件，一旦子组件的组件名符合传入的"comonentName"，派发事件给子组件。否则继续遍历。
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 共有方法，派发事件到父组件以及更上级别的指定组件进行接收的。
    // 传入组件名，事件名，参数，主要用来修改this，
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      // 主要用来判断父节点的componentName名字是否等于传入的componentName，如果父节点不等于，往上查找，找到的话，就name修改为爷爷节点的名字。
      // 一旦查找到符合传入的组件名时，退出循环，此时执行对应的父组件实例的$emit
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      // 如果有父/爷节点，$emit提交事件，绑定this为parent。
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    // 将数据或者方法广播到子组件以及子孙指定组件进行接收。
    broadcast(componentName, eventName, params) {
      // 使用递归思想，一旦某个子组件.broadcast(xxx),就将this改为该子组件，然后执行函数，起到广播的功能。
      broadcast.call(this, componentName, eventName, params);
    }
};
```

### dispatch 和 broadcast

> 以下资料来自CSDN

- dispatch

```javascript
// componentName：需要触发事件的组件名称、eventName：将要触发的事件名称、params：回调函数传递的参数（call所以是数组）
dispatch(componentName, eventName, params) {
    var parent = this.$parent || this.$root; //找到组件的父组件，或者这个组件本就是根组件。
    var name = parent.$options.componentName;//获取到组件的componentName的值

    while (parent && (!name || name !== componentName)) {
    //只要parent为true,并且没有name，或者name和componentName不全等，就一直循环。(因为element-ui组件都会加componentName这个属性)
        parent = parent.$parent; //获取上一层组件实例对象

        if (parent) {//如果上层组件存在，重新将上层组件的componentName的值赋值给他
                name = parent.$options.componentName;
        }
    }
    // 其中的componentName是element组件自定义的一个属性.
    if (parent) {
    	parent.$emit.apply(parent, [eventName].concat(params));
    }
}

```

我们看一个调用dispatch的例子：

```javascript
//form-item中mounted执行了这句话。this是form-item实例对象
this.dispatch('ElForm', 'el.form.addField', [this]);
```

dispatch一共做了两件事：

- 找到这个组件指定的父组件
- 使用vm.$emit触发这个父组件的事件（包括自定义事件）

- while循环干了啥,为啥要循环：
  - 如果你要找的父组件不是直接父组件，就无法派发事件出去了，所以要一直循环往外派发

```javascript
<el-form >
  <el-row>
    <el-col :span="24">
      <el-form-item prop="checkPass">
        <el-tag>标签一</el-tag>
      </el-form-item>
    </el-col>
  </el-row>
</el-form>
```

所有while循环做了一件事情: 就是层层往上找，直到找到这个父组件或者直到根组件也没有找到想要的，那么这个parent就是undefined。undefined也就不会执行下面的$emit了。

- broadcast

```javascript
// 定义 broadcast 方法，接受三个参数，分别是：组件名称、将要触发的事件名称、回调函数传递的参数
function broadcast(componentName, eventName, params) {
 // 依次循环当前组件的子组件
 this.$children.forEach(child => {
  // 获取每个子组件的名字
  var name = child.$options.componentName;

  // 判断子组件的名字是否等于传入的组件名称
  if (name === componentName) {
   // 如果子组件的名字等于传入的组件名称就调用 $emit 触发事件
   child.$emit.apply(child, [eventName].concat(params));
  } else {
   // 如果子组件的名字不等于传入的组件名称就递归遍历调用 broadcast 孙子组件
   broadcast.apply(child, [componentName, eventName].concat([params]));
  }
 });
}
```

#### 总结

- dispatch: 不断的基于当前组件, 向父组件进行遍历，直至找到和接受的`组件名称匹配`，就会停止遍历，`触发匹配组件中的监听事件`。
- broadcast: 向所有子孙后代组件传递，直至获取到的子组件名称` 等于 `传入的组件名称相等，`触发当前子组件的监听事件`。

- 往父亲派发事件，使用`while遍历`父组件的`componentName`。
- 往子组件广播事件和数据, 使用`递归遍历` 子组件的`componentName`。

>  实际上，这两个方法在Vue1.0中有实现，但是Vue2.0移除了，因为（1）事件流的方式是基于组件树的，一旦业务复杂的话，维护起来比较困难。（2）这种方式没有解决兄弟组件的通信问题。  
为何Element-Ui要重新封装？因为这样可以避免通过传 props 或者使用 refs 调用组件实例方法的操作， 可以定向的往具体的父或子组件远程调用事件。