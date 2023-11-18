# sass
> 本章将从0开始学习sass, 内容主要参考[sass中文网](https://www.sass.hk/docs/)和[菜鸟教程-sass教程](https://www.runoob.com/sass/sass-tutorial.html)
## sass介绍
> Sass 是一款`强化CSS`的辅助工具，CSS 预处理器。   
- Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承、内置函数等等特性。
- Sass 生成良好格式化的 CSS 代码，易于组织和维护。
- Sass 文件后缀为 `.scss`。

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

