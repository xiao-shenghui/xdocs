# typescript 入门到精通
> [原文链接](https://blog.csdn.net/weixin_46185369/article/details/121512287)
## TypeScript 是什么
1. TypeScript 简称：TS，是 JavaScript 的超集。简单来说就是：JS 有的 TS 都有。JS写的代码在TS的环境下都能跑。
2. 在 JS 基础之上，为 JS 添加了类型支持。TypeScript = Type + JavaScript
3. TypeScript 是微软开发的开源编程语言，可以在任何运行 JavaScript 的地方运行
```ts
// TypeScript  代码有明确的数据类型
let age1: number = 18
// JavaScript  代码没有明确的类型
let age2 = 18
```
## 为什么要为 JS 添加类型支持?
### JS的缺陷
1. JS 的类型系统是弱类型的，没有类型的概念
```js
let ar = 11  // 这里是数值
ar = []  // 偷偷的改成了数组类型
arr.toFixed(2) // 这里会报类型错误
```
没有类型校验，导致了在使用 JS 进行项目开发时，会经常遇到类型错误的问题，增加了找 Bug、改 Bug 的时间，严重影响开发效率  
2. JavaScript 属于动态类型的编程语言,  
边解释边执行，错误只能在运行阶段才能发现。

### TS属于静态类型的编程语言
1. 它要先编译，再执行。不能直接执行，需要编译成js才能执行
2. 它会在编译期间做类型检查，从而提前发现错误。配合 VSCode 等开发工具，TS 可以提前到在编写代码的同时就发现代码中的类型错误，减少找 Bug、改 Bug 时间
### 对比：
- 使用 JS：
	1. 在 VSCode 里面写代码
	2. 在浏览器中运行代码 --> 运行时，才会发现错误【晚】
- 使用 TS：
	1. 在 VSCode 里面写代码 --> 写代码的同时，就会发现错误【早】
	2. 在浏览器中运行代码
### 生态
Vue 3 源码使用 TS 重写、Angular 默认支持 TS、React 与 TS 完美配合，TypeScript 已成为大中型前端 项目的首选编程语言  
目前，前端最新的开发技术栈：
1. React： TS + Hooks
2. Vue： TS + Vue3 (注意： Vue2 对 TS 的支持不好~)

## TypeScript 初体验
### 目标
安装可以把TS编译成JS的工具，搭建一个可以运行TS的环境
### 全局安装编译 TS 的工具包
安装包：`npm i -g typescript`
- typescript 包：用来编译 TS 代码的包，提供了 tsc 命令，实现了 TS -> JS 的转化
- 验证是否安装成功：tsc –v (查看 typescript 的版本)
注意：Mac 电脑安装全局包时，需要添加 sudo 获取权限：sudo npm i -g typescript

### 编译并运行 TS 代码
步骤
1. 创建js文件。例如 hello.ts 文件（注意：TS 文件的后缀名为 .ts）
2. 编译。将 TS 编译为 JS  
在终端中输入命令，tsc hello.ts（此时，在同级目录中会出现一个同名的 JS 文件）
3. 执行 JS 代码。
	1. 在node中运行。在终端中输入命令，node hello.js
	2. 在浏览器中运行。
### 拓展：在线运行
https://www.typescriptlang.org/play

## ts-node 简化运行 TS 的步骤
### 目标
了解ts-node命令的基本使用；

### 问题描述
每次修改代码后，都要重复执行两个命令，才能运行 TS 代码，太繁琐。
```sh
tsc  你的代码.ts
node 你的代码.js
```
### 简化方式
使用 `ts-node` 包，直接在 Node.js 中执行 TS 代码。它提供了 `ts-node` 命令，可以简化执行命令。

### 安装命令
`npm i -g ts-node`  
使用方式：`ts-node hello.ts` 相当于：1 tsc 命令 2 node（注意：ts-node 不会生成 js 文件）  
解释：ts-node 命令在内部偷偷的将 TS -> JS，然后，再运行 JS 代码

### 小结
在初始学习阶段，我们会使用ts-node来运行代码，在项目阶段就不会再这样使用了。

### ts-node报错问题
#### console.log报错问题
`Cannot find name 'console'. Do you need to change your target library? Try changing thelibcompiler option to include 'dom'.`

#### 解决
1. `tsc --init` 生成配置文件 tsconfig.json
2. 写代码时，用{}包起来
