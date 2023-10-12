# canvas
> 学习canvas-API, 用于图片绘制，裁剪，二维码，验证码等应用场景。
## 基本使用
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

## 绘制图形
## 绘制矩形
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
> 具体可以在[`Codepen`](https://codepen.io/pen/)中测试。
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

## 绘制路径
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
## 绘制多边形
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
## 绘制圆弧
> 也分为`stroke`和`fill`类型，需要用`beginPath`和`closePath`
1. `arc(x, y, r, startAngle, endAngle, direction)`, 默认是逆时针
2. `arcTo(x1, y1, x2, y2, radius)`根据给定的控制点和半径，绘制圆弧
```js
// 绘制圆弧
ctx.fillStyle = 'red'
ctx.beginPath()  //开始绘制
ctx.arc(100,100,60,0,Math.PI * 2, true)
// 绘制圆，x,y,半径，开始角度，结束角度，逆时针
ctx.closePath()
// 关闭路径
ctx.fill()
// 填充型
```
### 案例-绘制圆形图
```js
// 绘制圆弧
draw('red',0,0,30)
draw('green',50,50,30)
draw('yellow',100,100,60)

function draw(color,x,y,r){
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x,y,r,0,Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()
}
```
## 绘制文本
> 使用`fillText`和`strokeText`绘制文本，传入`文本`和`坐标`  
> 使用`font`，`textAlign`, `direction`控制`文本样式`
```js
let ctx = canvas.getContext('2d')
ctx.fillStyle = '#333'
ctx.font = '30px sans-serif'
ctx.fillText('你好', 150,150)  //填充型文字
ctx.direction = 'ltr'  //ltr, rtl, inherit(默认)
ctx.strokeText('Hello', 160, 160)//描边型文字
```

## 绘制图片
> 使用`drawImage(imgObj,x,y)`绘制图片  
> 绘制图片时，要确保图片已经加载出来了，再进行绘制。  
> 因此一般放在图片的`onload`事件里面。
```js
let ctx = canvas.getContext('2d')
// 1.创建图片对象
let img = new Image()
// 2.设置资源路径
img.src = 'https://img1.baidu.com/it/u=1750517541,3683208234&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
// 3.监听onload事件
img.onload = () => {
	ctx.drawImage(img, 0, 0)
}
```
### 缩放图片
> 用`drawImage(img,x,y)`绘制出来的图片，往往尺寸与原图一致。  
> 通过指定新增的`w`和`h`参数, 可以实现`缩放`图片绘制。  
> 即`drawImage(img,x,y,w,h)`实现`绘制与缩放`图片
```js
let ctx = canvas.getContext('2d')
// 1.创建图片对象
let img = new Image()
// 2.设置资源路径
img.src = 'https://img1.baidu.com/it/u=1750517541,3683208234&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
// 3.监听onload事件
img.onload = () => {
	ctx.drawImage(img, 0, 0, 20, 20)
}
```

### 裁剪图片
> 如果要实现`裁剪`图片, `drawImage`可以再新增`4`个参数，  
> 此时`前4个参数`表示`相比原图`裁剪的`位置和大小`,   
> 后4个参数表示`裁剪好的图片`放置于`相比画布`的`位置和大小`
> 返回的是一个`新的裁剪好的`图片。
```js
let ctx = canvas.getContext('2d')
// 1.创建图片对象
let img = new Image()
// 2.设置资源路径
img.src = 'https://img1.baidu.com/it/u=1750517541,3683208234&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
// 3.监听onload事件
img.onload = () => {
	ctx.drawImage(img, 50, 50, 80, 80, 0, 0, 80, 80)
	// 表示相比原图，再50,50的坐标开始裁剪, 裁剪80,80
	// 将图片裁好后,放置再canvas画布的0, 0位置和大小80,80
}
```

### 裁剪区域
> 支持在原有的`ctx`上，创建裁剪区域
> 使用`ctx.clip()`后，可以显示`drawImage()`裁剪的内容。   
> 缺点: 一旦创建了该区域，会影响该区域下的后续绘制。    
> 除非使用了`ctx.restore()`, 恢复之前的状态。
```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var img = new Image();
img.src = 'https://img1.baidu.com/it/u=3358848204,1936258606&fm=253&fmt=auto&app=120&f=JPEG?w=1421&h=800';
img.onload = function() {
  // 绘制原始图像
  ctx.drawImage(img, 0, 0);
  // 创建裁剪区域
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(150, 150);
  ctx.lineTo(50, 150);
  ctx.closePath();
  ctx.clip();

  // 绘制裁剪后的图像
  ctx.drawImage(img, 0, 0, 200, 200, 0, 0, 100, 100);
}
```

### 图片显示不全
> 大部分原因是因为图片宽高尺寸过大。  
> 解决方法: 计算图片和canvas的最小比例。
```js
var img = new Image();
img.src = 'https://img1.baidu.com/it/u=3358848204,1936258606&fm=253&fmt=auto&app=120&f=JPEG?w=1421&h=800';
img.onload = ()=>{
	// 计算缩放比例
  var scale = Math.min(canvas.width / img.width, canvas.height / img.height);

  // 计算缩放后的宽高
  var width = img.width * scale;
  var height = img.height * scale;

  // 计算居中位置
  var x = (canvas.width - width) / 2;
  var y = (canvas.height - height) / 2;

  // 绘制图片
  ctx.drawImage(img, x, y, width, height);
}
```

## 案例-图片裁剪和预览
- 基础版: 固定区域大小
- 升级版: 拖动设置区域大小
### 基础版
> 在canvas上, 根据区域的位置, 实时裁剪图片
> 技术点:`鼠标按下,抬起和移动`,`区域位置`, `drawImage裁剪`  
- html
```html
<div class="container" id='container'>
  <canvas id="cvs" style="border: 1px solid #333;" width="400" height="250">
   您的浏览器不支持canvas
 </canvas>
  <canvas id="cvsa" style="border: 1px solid #333;" width="80" height="80">
   您的浏览器不支持这个canvas
  </canvas>
  <p id="slice" style="position: absolute; top:0; left:0; border: 1px solid #333; width: 100px; height: 100px;">拖动我吧  </p>
</div>
<button id="check">确认裁剪</button>
```
- css
```css
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container{
  position: relative;
  width: 400px;
  height: 250px;
  display: flex;
}

#slice{
  background-color: #eee;
  opacity: 0.5;
  cursor: move;
  user-select: none;
}

#cvsa{
  width: 80px;
  height: 80px;
}
```

- js
```js
let ctx = cvs.getContext('2d'); //上下文
let ctx2 = cvsa.getContext('2d');
// 绘制初始图片
let img = new Image()
let sliceW = parseInt(slice.getBoundingClientRect().width)
let sliceH = parseInt(slice.getBoundingClientRect().height)
let cvsW = parseInt(cvs.getBoundingClientRect().width)
let cvsH = parseInt(cvs.getBoundingClientRect().height)

// getBoundingClientRect() 获取元素相对于视口的xy位置和宽高尺寸对象
img.src = 'https://img1.baidu.com/it/u=4159158149,2237302473&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
// 原图是800*500
// canvas是400*250
// 比例是2:1
img.onload = function(){
ctx.drawImage(img,0,0,cvsW,cvsH)
  
}
// 鼠标拖动移动方块
container.onmousedown = function(e){
  container.onmousemove = function(e){
    //判断边界值
    let x = e.pageX
    let y = e.pageY
    Position(x, y);
  }
}
 

container.onmouseup = function(e){
  let x = e.pageX
  let y = e.pageY
  Position(x, y);
  //   此时进行裁切slice
  //   先清空画布
  console.log('裁切')
  ctx2.clearRect(0, 0, cvsa.width, cvsa.height);
  //   绘制图片
  ctx2.drawImage(img, (x-sliceW/2)*(2),(y-sliceH/2)*(2),sliceW,sliceH, 0,0,cvsa.width, cvsa.height)
  container.onmousemove  = null;
}

function Position(x, y){
    if(x <= sliceW/2){
      x = sliceW/2
    }
    else if(x >= cvsW-sliceW/2){
      x = cvsW-sliceW/2
    }
    if(y <= sliceH/2){
      y = sliceH/2
    }
    else if(y >= cvsH-sliceH/2){
      y = cvsH-sliceH/2
    }
    slice.style.left = x -  sliceW/2 + 'px';
    slice.style.top = y  - sliceH/2 + 'px';
}
```

### 升级版
> 相比基础版，添加四个小方块区域，当鼠标按下并拖动时，修改区域大小。  
> 小方块的位置跟随区域大小一起移动。(`使用css变量`)  
- 待更新。。。。



## 二维码
> 利用`qrcode`库，可以将网址生成二维码   
> 具体使用细节查看npm官网: [qrcode](https://www.npmjs.com/package/qrcode?activeTab=readme)

### 安装
```sh
cnpm i --save qrcode
```

### 引入和使用
- 浏览器-ESModule使用(项目中)
- html
```html
<html>
  <body>
    <canvas id="canvas"></canvas>
  </body>
  <script src="index.js" type="module"></script>
</html>
```
- js
```js
// index.js
import QRCode from 'qrcode'
var canvas = document.getElementById('canvas')

// 转为canvas图像, 显示在canvas上。
QRCode.toCanvas(canvas, 'https://www.npmjs.com', function (error) {
  if (error) console.error(error)
  console.log('success!');
})
```
- nodejs使用
```js
const QRCode = require('qrcode')
QRCode.toDataURL('https://www.npmjs.com', function(err,url){
  console.log(url)
  // url就是二维码图片的base64地址
})

// 指定{type: 'terminal'}后，可以将二维码显示在控制台。
QRCode.toString('https://www.npmjs.com',{type: 'terminal'}, function(err,url){
  console.log(url)
  // url就是二维码图片的base64地址
})
```