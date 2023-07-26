# DOM
## 认识DOM
### document对象
```js
// console.log(window); //在浏览器中window是我们的全局对象

// console.log(document);  //log打印元素
// console.dir(document);	//dir打印元素对象
// console.log(document.body);  //获取body
// console.dir(document.body);

// js是事件驱动为核心的一门语言
// Dom的三要素： 获取事件源 事件 事件驱动程序
// var divEle = document.querySelector('div')
// divEle.onclick = function () {
//     divEle.style.backgroundColor = 'blue'
// }

// document 是一个对象 挂载在window身上
// 学习Dom实际上就是学习操作对象中的属性和方法（api）
```
### 节点介绍
```js
/*
node
节点的分类：
   元素节点  就是标签节点 标签名
   文本节点  换行也是文本节点text
   注释节点  comment
   属性节点
*/
```
```html
<!-- 我是一个注释节点 -->
<div>
    <div class="son" title="son">
        son
    </div>
</div>
这是一行文本
```
### 节点关系
```js
var bodyEle = document.body;
console.log(bodyEle.firstChild);  
//firstChild 第一个子节点
console.log(bodyEle.firstElementChild);  
//firstElementChild 第一个元素子节点
console.log(bodyEle.firstChild.nextSibling);  
//nextSibling 下一个兄弟节点
console.log(bodyEle.firstElementChild.nextElementSibling);  
//nextElementSibling 下一个兄弟元素节点
console.log(bodyEle.parentNode);
console.log(bodyEle.parentElement);
// parentNode和parentElement 都可以拿父级节点
// 只有元素节点，才可以作为父节点   
```

## 获取节点
```js
// 通过id获取元素   
var box = document.getElementById('box')
// console.log(box);

// 通过标签名获取元素 获取到的是一个伪数组 
// 如果使用了标签名获取一定要注意使用前加索引
var uls = document.getElementsByTagName('ul')
// console.log(uls[0].textContent = '666');

// 通过类名获取元素 获取到的是一个伪数组
// 如果使用了类名获取一定要注意使用前加索引
var sonEle = document.getElementsByClassName('son')
// console.log(sonEle);


// querySelector(css选择器)  
// 只能匹配到符合选择器条件的第一个元素
var son = document.querySelector('ul.son')
// console.log(son);

// querySelectorAll(css选择器) 
// 匹配所有符合css选择器的元素 是一个伪数组
var sons = document.querySelectorAll('.son')
console.log(sons);
```
## 元素节点的属性
### nodeXXX
```js
el.nodeType == 1 //元素节点
el.nodeType == 3 //文本节点
el.nodeType == 8 //注释节点
el.nodeName //节点名称，#text #comment DIV ...
el.tagName //元素标签名称 undefined DIV ...
el.nodeValue 
//拿到节点里面的内容, 元素节点中nodeValue默认值是null
```
### 修改内容
```js
el.innerHTML = '<p>123</p>'
// innerHTML 获取/修改元素节点内的内容(解析HTML)
el.outerHTML = '<p>123</p>'
// outerHTML 获取/修改元素节点的内容(包含自己，解析HTML)
el.textContent = '123'
// textContent 只能识别文本(不解析HTML) 
```
### hidden隐藏属性
```js
// hidden 属性 决定元素是 展示 或 隐藏
div.hidden = !div.hidden
```

## 创建和挂载节点
```js
// 创建节点
var h1Ele = document.createElement('h1')
// 挂载节点
div.append(h1Ele) 
//作为 子节点 挂载到div节点的 最后面
div.prepend(h1Ele) 
//作为 子节点 挂载到div节点的 最前面
div.before(h1Ele)  
//作为 兄弟节点 挂载到div节点的 前面(当哥)
div.after(h1Ele)   
//作为兄弟节点 挂载到div节点的 后面(当弟)
```

## 删除替换和克隆节点
```js
div.removeChild(sonEle)
// 删除一个子节点
div.remove()
// 删除当前节点
div.replaceChild(newNode, oldNode)
// 替换节点
div.cloneNode()
// 浅克隆节点
div.cloneNode(true)
// 深克隆节点
```

## 属性操作
### 所有attributes
```js
div.hasAttribute('属性名');
// 判断是否有属性名
div.getAttribute('属性名');
// 获取属性名的属性值
div.setAttribute('属性名','属性值');
// 设置属性的属性值, 不存在就是新增
div.removeAttribute('属性名');
// 删除某个属性
div.attributes
// 获取元素的全部属性(伪数组)
```
### 内置attribute
```js
div.title = 'xxx'
div.className = 'xxx'
div.name = 'xxx'
div.id = 'xxx'
div.style.xxx = 'xxx' //修改行内样式
input.value = 'xxxx'
```

### dataSet自定义属性
> 由于非内置属性无法打点访问, 因此涉及了一个`data-xxx`和`dataSet`组合
```html
<input type="text" id="inp1" data-score="60">
```
```js
inp1.dataSet.score = '70'
```

## 事件
> DOM事件都是异步的,宏任务.
### 事件一览
|序号|事件触发源|事件名|代码|执行意义|
| --- | --- | --- | --- | --- |
|01|鼠标|单击|click|鼠标单击触发事件|
|01|鼠标|双击|dblclick|鼠标双击触发事件|
|01|鼠标|抬起|mouseup|鼠标抬起触发事件|
|01|鼠标|按下|mousedown|鼠标按下事件|
|01|鼠标|移入|mouseover|鼠标移入事件|
|01|鼠标|移出|mouseout|鼠标移出事件|
|01|鼠标|移动|mousemove|鼠标在元素上移动的事件|
|01|鼠标|单击右键菜单|contextmenu|鼠标右键菜单的事件|
|02|键盘|键盘按下|keydown|键盘按下的事件|
|02|键盘|键盘抬起|keyup|键盘抬起的事件|
|02|键盘|长按键盘|keypress|长按键盘触发的事件,不包括功能键|
|03|页面|加载完毕|load|页面加载完毕触发的事件|
|03|页面|内容加载完毕|DOMContentLoaded|页面的静态资源加载完毕, 触发的事件|
|04|表单|获取焦点|focus()|元素自动获取焦点|
|04|表单|获取焦点|focus|元素获取焦点触发的事件|
|04|表单|失去焦点|blur|元素失去焦点触发的事件|
|04|表单|内容输入改变|input|文本框内容发生改变时触发的事件|
|04|表单|内容确认被改变|change|内容发生改变并且失去焦点, 触发的事件|
|04|表单|重置|reset|表单重置触发的事件|
|04|表单|提交|submit|表单提交触发的事件|
|05|所有|事件对象|e.preventDefault()|阻止元素自带的默认事件|
|05|所有|滚动|scroll|元素滚动时触发的事件|

### 事件级别
- html级别
```html
<!-- 写在标签上 -->
<button onclick="fn">按钮</button>
```
- Dom0级别
```js
// 本质:元素对象的属性赋值
// 优先级高级html级
btn.onclick = function () {
    console.log('被点击了...');
    // Dom0 事件解绑
    btn.onclick = null
}
// 因此,同一个事件,只生效一次.
```

- Dom2级别
```js
// 本质:方法的调用
// 优先级取决于书写顺序
btn.addEventListener('click', function fn() {
    console.log('点击2...');
    // Dom2 事件解绑
    btn.removeEventListener('click', fn);
})
// 因此,同一个事件,可以多次触发
```

### 事件冒泡和捕获
- 事件冒泡
```js
 /* 
事件冒泡：从内到外 由子级向父级传递
*/
father.addEventListener('click', function () {
    console.log('冒泡点击了父元素');
})
son.addEventListener('click', function () {
    console.log('冒泡点击了儿子元素');
})
sz.addEventListener('click', function () {
    console.log('冒泡点击了孙子元素');
})

/*
    冒泡点击了孙子元素
    冒泡点击了儿子元素
    冒泡点击了父元素  
*/
```
- 事件捕获
```js
/*
事件捕获:从外到内 由父级向子级传递
.addEventListener(事件，函数，布尔值) 当布尔值为true时就事件捕获
*/
father.addEventListener('click', function () {
    console.log('捕获点击了父元素');
}, true)
son.addEventListener('click', function () {
    console.log('捕获点击了儿子元素');
}, true)
sz.addEventListener('click', function () {
    console.log('捕获点击了孙子元素');
}, true)

// 如果事件冒泡和捕获同时存在，先捕获再冒泡
/*
    捕获点击了父元素
    捕获点击了儿子元素
    捕获点击了孙子元素
    冒泡点击了孙子元素
    冒泡点击了儿子元素
    冒泡点击了父元素
*/
```
- 阻止事件冒泡
```js
// 当我点击了sz元素，不希望再触发son和father的点击事件
e.stopPropagation()
// 给sz和son添加阻止冒泡代码.
```

### 事件委托
```js
// 事件委托
// 将事件赋给父元素 通过事件对象.target 
// 找到真正触发事件的元素
ul.onclick = function (e) {
    // 判断触发事件的元素文本是1是才会打印1
    if (e.target.textContent == 1) {
        console.log(1);
    }
}
```

## 操作盒子模型
### client家族(尺寸,只读)
```js
// client
// clientWidth  获取盒子内容加+左右padding
console.log(box.clientWidth);  //210

// clientHieght 获取盒子内容加+上下padding
console.log(box.clientHeight);

// clientTop  获取盒子上边框粗度
console.log(box.clientTop);

// clientLeft  获取盒子左边框粗度
// console.log(box.clientLeft);

// 获取当前窗口显示区域的宽度和高度
console.log(document.documentElement.clientWidth);
console.log(document.documentElement.clientHeight);
```

### offset家族(距离,只读)
```js
// offsetWidth 获取盒子的宽+左右padding+左右border
console.log(box.offsetWidth);  //215
// offsetHeight 获取盒子的高+上下padding+上下border
console.log(box.offsetHeight);  //230
// offsetTop 相对父级顶部的偏移量
console.log(son.offsetTop);   //20
// offsetLeft 相对父级左侧的偏移量
console.log(son.offsetLeft);  //30
// 获取盒子定位的参考点  offsetParent
console.log(son.offsetParent);   //父盒子
```

### scroll家族(卷曲距离)
```js
// scrollHeight  获取盒子里面内容的高度
console.log(div.scrollHeight);  //336  算上盒子内容溢出的部分
console.log(div.clientHeight);  //200

// scrollTop   获取滚动条滚动的距离
div.onscroll = function () {
    console.log('滚动了', div.scrollTop);
}

//  scrollLeft  底部滚动条想左边滚动的距离
console.log(div.scrollLeft);

// scrollWidth   获取内容的宽度  不包含侧边滚动条
console.log(div.scrollWidth);  //183
```
```js
// 计算 可以滚动多高
// scrollHeight-clientHeight = 溢出内容的高度(最大滚动高度)
div.onclick = function () {
    div.scrollTop = 0
}
```