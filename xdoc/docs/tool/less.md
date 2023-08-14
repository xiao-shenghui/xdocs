# less
## 准备
> [less 中文官网](http://lesscss.cn/)  
> VSCode插件：`Easy in Less`, 将less文件编译为css。  
> npm包: `lessc`, 官方推荐的一款控制台工具，和插件功能一样。

## 安装lessc
1. 命令行全局安装lessc到npm里面
```sh
npm install lessc -g
```
2. 新建html文件，用less语法书写样式表，写完后编译为.css文件引入即可。
3. 命令行用lessc编译.less文件
```sh
lessc bootstrap.less bootstrap.css
```

## 注释
> 用法与原生css一致。  
> `//`单行注释，不会编译。  
> `/**/`多行注释，会被编译。

## 变量
> 在less中 可以通过`@`去定义变量  
> 变量分为：`局部`和`全局`变量。
```less
@h: 100px;
@w: @h;

div{
	width: @w;
	@c: gold;
	.son{
		color: @c;
	}
}
```
```css
div{
	width: 100px;	
}

div .son{
	color: gold;
}
```

## 插值
> 通过`@{xx}`，实现通过定义变量来表示`选择器`或属性。
```less
@w: width; //用变量来表示属性
@m: div; //用变量来表示选择器
@s: 100px; //用变量来表示属性值

@{m} {
    @{w}: @s;
    height: 100px;
    background: red;
}
```
```css
div{
	width: 100px;
	height: 100px;
    background: red;
}
```

## 运算
> 通过`()`，可以直接对值进行运算，简化原生js的`calc`  
> 并且，自带单位推断。

```less
div {
    width: (200px/2);
    height: (200px/2);
    margin-top: (200px*0.5);
}
```
```css
div {
    width: 100px;
    height: 100px;
    margin-top: 100px;
}
```

## 混合
> 混合的本质是`复制粘贴`代码。

### 普通混合
> 通过将重复的样式，封装到一个`类`中，来定义`混合`。  
> 通过`加括号`或者不加`括号`使用`混合`。   
```less
// 封装一个混合
	// (定义时加()表示保留在编译结果中)
.center() {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

	// (定义时不加()表示不保留在编译结果中)
.top {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(0, -50%);
}

// 使用混合
.father {
    .center;
    width: 300px;
}

.son {
    .top();
    width: 300px;
}
```
```css
/*定义时的混合，没加()，所以遗留在编译后的文件中了。*/
.top {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(0, -50%);
}

.father {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
}

.son{
	position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(0, -50%);
    width: 300px;
}
```

### 带参数的混合
> 一般定义混合时，会带上`()`, 借助less变量(`@xxx`)的特性，可以传参。  
> 定义混合：添加`:`指定默认值。  
> 不完全赋值：使用时，可以传入`变量`+`:`,指定给`对应的`参数赋值。 
```less
// 定义一个圆角边框的混合
.bor(@bw:1px, @bc:red, @br:5px) {
    border: @bw solid @bc;
    border-radius: @br;
}

.box {
    width: 300px;
    height: 300px;
    // .bor(3px, yellow,10px);  //传参用法
    // .bor();  //默认值
    .bor(@bc:orange) //不完全赋值
}
```

```css
.box {
    width: 300px;
    height: 300px;
    border: 1px solid orange;
    border-radius: 5px;
}
```

### 可变参数
> 有些css属性，属性值可以不写全，例如`border:1px solid`  
> less的混合中，也可以使用`...`和`@arguments`实现可变参数。
```less
.bor(...) {
    border: @arguments;
}

div {
    width: 100px;
    height: 100px;
    .bor(1px, solid)
    .son{
    	.bor(1px, solid, red)
    }
}
```
```css
div {
    width: 100px;
    height: 100px;
    border: 1px, solid;
}
div .son{
	border: 1px, solid, red;
}
```

## 匹配模式
> 通用匹配`@_`, 类似于`finally`, 无论同名那个匹配到，都会执行。
> 支持通过`参数名称`来，指定匹配哪个混合。
```less
.triangle(@_, @w, @c) {
    width: 0;
    height: 0;
    border-width: @w;
}

.triangle(Top, @w, @c) {
    border-color: transparent transparent @c transparent;
}

.triangle(Right, @w, @c) {
    border-color: transparent transparent transparent @c;
}

.triangle(Bottom, @w, @c) {
    border-color: @c transparent transparent transparent;
}
.triangle(Left, @w, @c) {
    border-color: transparent @c transparent transparent;
}

div{
	//指定匹配第一个参数为Top的混合
	.triangle(Top, 10px, red);
}
```

```css
div{
	width: 0;
    height: 0;
    border-width:10px;
    border-color: transparent transparent red transparent;
}
```

## 文件导入
> 原生css中，使用`import url()`来导入外界文件。  
> less中，使用`@import '';`来导入外界文件，`.less`后缀的文件名可以省略。
```less
@import './tool'
div{
	.triangle(Top, 10px, red);
}
```

## 层级结构
### 嵌套书写
> 支持嵌套书写，默认表示`后代选择器`, 使用`&`(机械与)符号可以编译直接后拼接。
```less
.father{
    width: 300px;
    height: 300px;
    .son{
        width: 100px;
        height: 100px;
    }
    // 当我们去使用& 编译后会直接拼接
    &:hover{
        background: yellow;
    }
}
```
```css
.father{
    width: 300px;
    height: 300px;
}
.father .son{
	width: 100px;
    height: 100px;
}
.father:hover{
	background: yellow;
}
```

### 继承
> 定义时，使用`:extend(xxx)`表示继承类`xxx`  
> `继承`的本质是`并集选择器`, 与之对应的`混合`的本质是`复制粘贴`  
```less
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

// extend(.center) 表示继承上面的类
.father:extend(.center) {
    width: 300px;
    height: 300px;
    .son:extend(.center) {
        width: 200px;
        height: 200px;
        background-color: yellow;
    }
}
```
```css
.father,
.center,
.son{
	position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.father{
	width: 300px;
    height: 300px;
}
.father .son{
	width: 200px;
    height: 200px;
    background-color: yellow;
}
```

## 条件判断
> `逻辑与&&`在less中的体现是`when(xxx)and(xxx)`  
> `逻辑或||`在less中的体现是`when(xxx),(xxx)`
```less
.size(@width, @height)when(@width>100px)and(@height>100px) {
    background: yellow;
}
//表示当宽和高都大于100px，混合才生效

.size1(@width, @height)when(@width>100px),(@height>100px) {
    background: yellow;
}
//表示当宽或者高大于100px，混合就生效
.box {
    .size(101px, 99px)
    //不生效
}
.box1 {
    .size1(101px, 99px)
    //生效
}
```




