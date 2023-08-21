# eventbus
## 介绍
> 在 Vue 2 中，可以使用 `EventBus`来实现组件之间的通信和事件触发。  
> EventBus 是一个基于`发布-订阅模式`的`事件总线`，用于`跨组件通信`。
## 定义
下面是使用 EventBus 的示例代码：
```javascript
// EventBus.js
import Vue from 'vue';
const EventBus = new Vue();
export default EventBus;
```
在上面的示例中，我们创建了一个`Vue 实例`作为事件总线，将其命名为 EventBus，并将其导出为一个模块。
## 使用
> 接下来，我们可以在需要的组件中使用 EventBus 进行`事件的订阅和触发`：  
> 事件的订阅和解除订阅：`EventBus.$on/$off(evenName,callback)`
```javascript
// ComponentA.vue
import EventBus from './EventBus';
export default {
  mounted() {
    EventBus.$on('eventA', this.handleEventA);
  },
  destroyed() {
    EventBus.$off('eventA', this.handleEventA);
  },
  methods: {
    handleEventA() {
      // 处理事件 A
    },
  },
};
```
> 事件的触发：`EventBus.$emit(evenName)`
```javascript
// ComponentB.vue
import EventBus from './EventBus';
export default {
  methods: {
    triggerEventA() {
      EventBus.$emit('eventA');
    },
  },
};
```
## 总结
1. 在上面的示例中，ComponentA 组件通过 `EventBus.$on` 方法订阅了名为 'eventA' 的事件，并定义了处理该事件的回调函数 `handleEventA`。  
2. 而 ComponentB 组件通过 `EventBus.$emit` 方法触发了名为 'eventA' 的事件。
3. 这样，当 ComponentB 组件触发 'eventA' 事件时，ComponentA 组件会收到该事件并执行对应的处理函数。  
注意：使用 EventBus 时需要适度使用，过度使用 EventBus 可能会导致代码的`可读性和维护性变差`。因此，在使用 EventBus 时需要慎重考虑，并确保合理地管理和使用事件。