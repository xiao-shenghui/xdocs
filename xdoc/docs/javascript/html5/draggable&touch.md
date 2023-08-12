# draggable和touch属性
## draggable
> HTML5新增的属性，用于拖拽  
> 要开启拖拽，必须给DOM节点的`draggable` 赋值为`true`;
- 拖拽的事件顺序：
1. dragstart: 源节点即将被拖动前触发一次。
2. drag: 源节点被拖动过程中反复触发。
3. dragenter: 源节点进入目标对象范围内时触发，一般要`pereventDefault`阻止默认拒绝的拖拽。
4. dragover: 源节点在目标对象范围内移动时触发, 一般要`pereventDefault`阻止默认拒绝的拖拽。
5. dragleave: 源节点离开目标对象范围时触发。
6. drop: 源节点在目标对象范围内被释放时触发。
7. dragend: 源节点拖动结束时触发。

- 触发对象和事件：
|触发对象|事件名称|对应的拖拽时顺序|
|---|---|---|
|源对象|dragstart|1|
||drag|2|
||dragend|7|
|目标对象|dragenter|3|
||dragover|4|
||dragleave|5|
||drop|6|

- 拖拽排序
> 由于拖动是实时的，所以没有使用drop而是使用了dragenter触发排序。  
> 在拖放的过程中涉及到两种元素，一种是被拖拽元素（源对象）。  
> 一种是放置区元素（目标对象），不同的对象有不同的拖放事件。  

## 拖拽相关库
### vue-draggable
> 基于Sortable.js的Vue拖放组件  
> 用于vue2: vue-draggable   
> 用于vue3: vue.draggable.next,

## touch事件
> touch事件是为了兼容移动设备的触摸而设计的。  
- touch事件的顺序
1. touchstart: 节点刚被触摸时，触发一次
2. touchmove: 节点被触摸后拖动时，不断触发
3. touchend: 节点被触摸结束后，触发一次

- 触摸时，e事件相关的属性
	- e.touches: 当前跟踪触摸操作的Touch对象的数组
	- e.targetTouches: 特定事件目标的Touch对象的数组
	- e.changeTouches: 自上次触摸以来，发生改变的Touch对象的数组。

- 每个touch对象包含如下属性
	- clientX：触摸目标在视口中的x坐标。
	- clientY：触摸目标在视口中的y坐标。
	- pageX：触摸目标在页面中的x坐标。
	- pageY：触摸目标在页面中的y坐标。
	- target：触摸的DOM节点目标。

```js
/*
e.touches
TouchList
	0: Touch {identifier: 0, target: h1, screenX: 371, screenY: 256, clientX: 167.25332641601562, …}
	length:1 
	[[Prototype]]: TouchList
	
//如果只有1个触摸节点
e.target === e.touches[0].target
*/
```