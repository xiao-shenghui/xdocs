# canvas
> 学习canvas-API, 用于图片绘制，裁剪，二维码，验证码等应用场景。
## 基本使用
### 创建canvas画布
> canvas又叫画布，是一片用js操作的区域。   
> H5新增了`canvas`标签，Js提供了`2d`和`webgl`的渲染上下文(`画笔`)  
> 一般默认用`ctx`变量，表示`上下文`
- 创建标签
```html
<canvas width="300" height="150" id="canvas">
	兼容性描述：您的浏览器不支持canvas
</canvas>
```
- 开启上下文
```js
const canvas = document.querySelector('#canvas');
canvas.style.backgroundColor = '#eee'; //便于观察
// 获取上下文  getContext('2d') 主要研究2d
let ctx = canvas.getContext('2d');
console.log(ctx);
// 可以看到ctx很多默认属性，后面会有应用
/*
fillStyle #000000  画笔填充颜色
font 10px sans-serif 默认字体和大小
strokeStyle #000000 边框颜色
*/
```

### 绘制图形
### 绘制矩形
> 填充型矩形:`fillRect(x,y,w,h)`  
> 边框型矩形:`strokeRect(x,y,w,h)`  
> 清除矩形区域: `clearRect(x,y,w,h)`
```js
// 1.fillRect(x,y,w,h) 绘制填充矩形
ctx.fillStyle = 'red' //改下默认画笔填充颜色
ctx.fillRect(0,0,20,20)

// 2.strokeRect(...) 绘制边框矩形
ctx.strokeStyle = 'red' //改下默认画笔边框颜色
ctx.strokeRect(20,20,40,40)

// 3.clearRect(...) 清除矩形区域
ctx.clearRect(10,10,5,5) //可以用来做清除画笔
```
### 案例-基础画板
> 实现画笔/画板颜色，画笔大小, 绘画,橡皮擦和清空画板功能。  
> 用到大致原理`鼠标监听按下，移动和抬起`,`canvas绘制和清理矩形`
- 页面
```html
<h4>画板</h4>
<canvas id="cvs" style="border: 1px solid #333;" width="500" height="500">
   您的浏览器不支持canvas
</canvas>
<br/>
<button id="fill">画笔</button>
<button id="remove">橡皮擦</button>
<input id="sizeIpt" type="number" value="10" max="30" min="10">
<button id="clear">清空画布</button>
<input type="color" name="" id="color">
<input type="color" name="" id="bgcolor">
```
- 逻辑
```js
let ctx = cvs.getContext('2d'); //上下文
let status = true; //表示默认的绘画状态
let fillSize = 10; //画笔大小

// 3个按钮
fill.onclick = function(){
	status = true;
}
remove.onclick = function(){
	status = false;
}
clear.onclick = function(){
	ctx.clearRect(0,0,cvs.width,cvs.height)
}

// 鼠标绘制
cvs.onmousedown = function(){
	cvs.onmousemove = function(e){
		if(status){
			onDraw(e.offsetX,e.offsetY,fillSize)
		}
		else{
			onRemove(e.offsetX,e.offsetY,fillSize)
		}
	}
}
cvs.onmouseup = function(){
	cvs.onmousemove = null;
}

// 信息同步
color.onchange = function(e){
	ctx.fillStyle = e.target.value;
}
bgcolor.onchange = function(e){
	cvs.style.backgroundColor = e.target.value;
}
sizeIpt.onchange = function(e){
	fillSize = e.target.value;
}

function onDraw(x,y,s){
	ctx.fillRect(x,y,s,s)
}

function onRemove(x,y,s){
	ctx.clearRect(x,y,s,s)
}
```

### 绘制路径
> 绘制直线段路径，路径一般由`起点位置`，`终点位置`，`线段粗细及颜色`构成。  
- 对应的步骤：
1. 创建路径:`beginPath()`
2. 画笔移动到起点:`moveTo(x,y)`
3. 路径移动到某个点: `lineTo(x,y)`, 可以由多个点。
4. 结束路径: `closePath()`
5. 绘制路径类型:描边型`stroke()`, 填充型`fill()`
```js
// 绘制一段路径
ctx.beginPath() //创建
ctx.moveTo(20,20) //画笔起点
ctx.lineTo(90,90) //移动到下一个点
ctx.lineTo(180,20) //...
ctx.closePath() //闭合路径
ctx.stroke(); //描边型
// 至此绘制出了一个描边三角形
```
### 绘制多边形
```js
// 如上，// 闭合路径后，
// 由stroke或fill决定类型
// 起点为moveTo
// 中间的点为lineTo
// 绘制正方形
ctx.beginPath()
ctx.moveTo(20,90)
ctx.lineTo(90,90)
ctx.lineTo(90,160)
ctx.lineTo(20,160)
ctx.closePath()
ctx.fill() //填充型正方形
```
### 绘制圆弧
```js
// 待更新
```
### 绘制圆形
```js

```
### 绘制图像
```js

```