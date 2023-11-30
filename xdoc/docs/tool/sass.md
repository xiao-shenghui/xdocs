# sass
> 本章将从0开始学习sass, 内容主要参考[sass中文网](https://www.sass.hk/docs/)和[菜鸟教程-sass教程](https://www.runoob.com/sass/sass-tutorial.html)
## sass介绍
> Sass 是一款`强化CSS`的辅助工具，CSS 预处理器。   
- Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承、内置函数等等特性。
- Sass 生成良好格式化的 CSS 代码，易于组织和维护。
- Sass 文件后缀为 `.scss`。

## 目录

1. [介绍](#介绍)
2. [安装](#安装)
3. [基本语法](#基本语法)
   - [变量](#变量)
   - [嵌套](#嵌套)
   - [混合](#混合)
   - [继承](#继承)
   - [函数](#函数)
   - [引入](#引入)
4. [案例演示](#案例演示)
   - [创建网格系统](#创建网格系统)
   - [自定义按钮](#自定义按钮)

## 介绍

SCSS是Sass的一种语法扩展，全称为"Sassy CSS"。它允许你使用类似编程语言的方式来编写CSS，使得样式表更加模块化、可重用和易于维护。

## 安装

要使用SCSS，首先需要安装Sass编译器。你可以使用npm或者yarn来安装Sass：

```
npm install node-sass
```

或者

```
yarn add node-sass
```

安装完成后，你可以使用命令行或者构建工具来编译SCSS文件为CSS文件。

- 实例:
```scss
/* 定义变量与值 */
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

/* 使用变量 */
body {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}
```
## 安装sass
> 对于vue, react而言，在创建项目时就可以选择预处理器。  
> 以下主要介绍如何手动安装sass到全局/项目里。  
### 全局安装
- 安装
```sh
npm i sass -g
```
- 编写`.scss`文件
- 编译文件
```sh
sass xxx.scss xxx.css # 将.scss文件保存到.css文件中。
```

SCSS是一种CSS预处理器，它扩展了CSS语法，提供了更多的功能和灵活性。本教程将带你逐步学习SCSS的基本语法和一些高级特性，包括变量、嵌套、混合、继承、函数等。每个知识点都会给出相应的案例，以便更好地理解。


## 基本语法

### 变量

变量可以帮助你存储颜色、字体、边距等常用的样式值，以便在整个样式表中重用。变量以`$`开头，后跟变量名和变量值。例如：

```scss
$primary-color: #ff0000;
$font-size: 16px;

h1 {
  color: $primary-color;
  font-size: $font-size;
}
```

### 嵌套

SCSS允许你在选择器中嵌套其他选择器，从而减少重复代码。例如：

```scss
nav {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
    }
  }
}
```

以上代码会生成以下CSS代码：

```css
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline-block;
}
```

### 混合

混合是一种可以将一组样式声明重用的机制。它可以像函数一样接受参数，并生成相应的样式。例如：

```scss
@mixin flex($direction, $justify, $align) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
}

.container {
  @include flex(column, center, center);
}
```

以上代码会生成以下CSS代码：

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

### 继承

继承允许你从一个选择器继承样式，减少重复代码。例如：

```scss
.button {
  border: 1px solid #ccc;
  padding: 10px;
}

.primary-button {
  @extend .button;
  background-color: #ff0000;
}
```

以上代码会生成以下CSS代码：

```css
.button, .primary-button {
  border: 1px solid #ccc;
  padding: 10px;
}

.primary-button {
  background-color: #ff0000;
}
```

### 函数

SCSS提供了一些内置函数，用于处理颜色、字符串和数字等值。例如：

```scss
$primary-color: #ff0000;

.dark-primary-color {
  color: darken($primary-color, 20%);
}
```

以上代码会生成以下CSS代码：

```css
.dark-primary-color {
  color: #cc0000;
}
```

### 引入
```scss
/* 支持使用其他文件的变量 */
@import 'common.scss'

.active{
  color: $activecolor
}
```

## 案例演示 <a name="example"></a>

### 创建网格系统 <a name="grid-system"></a>

下面是一个简单的案例，演示如何使用SCSS来创建一个响应式网格系统。首先，我们需要定义网格的基本设置：

```scss
$grid-columns: 12;
$grid-gutter: 20px;
```

然后，我们可以创建一个mixin来生成网格容器和网格列的样式：

```scss
@mixin grid-container {
  width: 100%;
  padding-left: $grid-gutter / 2;
  padding-right: $grid-gutter / 2;
  margin-left: auto;
  margin-right: auto;
}

@mixin grid-column($columns) {
  width: ($columns / $grid-columns) * 100%;
  float: left;
  padding-left: $grid-gutter / 2;
  padding-right: $grid-gutter / 2;
}
```

最后，我们可以根据需要在选择器中使用这些mixin来创建网格系统：

```scss
.container {
  @include grid-container;
}

.column {
  @include grid-column(6);
}
```

### 自定义按钮 <a name="custom-buttons"></a>

下面是一个示例，演示如何使用SCSS来创建自定义按钮。首先，我们定义一些按钮样式和颜色：

```scss
$button-padding: 10px 20px;
$button-border-radius: 5px;
$primary-color: #ff0000;
$secondary-color: #0000ff;
```

然后，我们可以创建一个mixin来生成不同类型的按钮样式：

```scss
@mixin button($background-color, $text-color) {
  display: inline-block;
  padding: $button-padding;
  border-radius: $button-border-radius;
  background-color: $background-color;
  color: $text-color;
  text-decoration: none;
}

.primary-button {
  @include button($primary-color, #ffffff);
}

.secondary-button {
  @include button($secondary-color, #ffffff);
}
```

最后，我们可以在选择器中使用这些mixin来创建自定义按钮：

```scss
.button {
  @include primary-button;
  @include secondary-button;
}
```

以上就是关于SCSS的详细教程，其中包括了基本语法和一些常用的特性。你可以根据需要进行进一步的学习和实践，以便更好地掌握SCSS的用法和功能。希望本教程能对你有所帮助！

