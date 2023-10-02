# webpack
> 本节将学习webpack的`由来`, `核心概念`以及使用。   
> 更加详细的学习，参考至[webpack中文网](https://www.webpackjs.com)  
## 由来
- 为什么需要webpack?
1. 模块化开发: 浏览器无法识别模块，只能识别`三大件`
2. 依赖管理: `自动解析`模块之间的依赖关系，并打包到一起。
3. 代码压缩: 将模块打包为1个文件，并压缩以`减少体积`。
4. 兼容性: 不同浏览器对`某些特性`的支持不同，可以处理兼容性
5. 自动化构建: 手动构建过程繁琐，例如`热重载`,自动实时编译更新。

> 总结: 简而言之，vue-react-angular及模块化开发的热门，导致了打包工具的存在非常有必要。  

## 核心概念
> 介绍配置文件:`webpack.config.js`的`入口(entry)`,  
> `输出(output)`,`转换(loader)`,`插件(plugin)`和`模块(mode)`

### 入口(entry)
> 配置构建`依赖图(bundle)`的`起点`文件, 
> 默认值是`./src/index.js`,   
> webpack会从该文件开始，找入口文件(`直接`或`间接`)的依赖。  
```js
// 支持在 webpack.config.js 手动修改
module.exports = {
	entry: './index.js',  
	//单入口，常用，一般适用于单页面应用
	entry: {
	    pageOne: './src/pageOne/index.js',
	    pageTwo: './src/pageTwo/index.js',
	    pageThree: './src/pageThree/index.js',
  	},  
  	//多个入口，SSR, 一般适用于多页面应用
}
```

### 输出(output)
> 配置输出`打包`的`文件路径`，以及输出的`文件名`。  
> 默认值: 路径`./dist`, 文件名`main.js`。
> webpack会把打包好的文件(`bundle`)，输出到指定的文件夹。
```js
// 支持在webpack.config.js 手动修改
// 需要引入path, 
// 配置output对象的path 和 filename 属性
const path = require('path');
module.exports = {
	output:{
		path: path.resolve(__dirname, 'dist'),  
		//当前路径下的dist
		filename: 'my-first-webpack.bundle.js'
		// 单入口：输出的文件名
		filename: '[name].js',
		// 多入口，使用[name]占位符，需保证每个文件有唯一的文件名。
	}
}
```

### 处理器(loader)
> 用于对`模块`的源代码进行`转换`, 配置`处理其他文件`的能力。  
> webpack本身只具有`import`模块后，预处理`js`和`json`的能力，  
> 配置`loader`使其预处理更多文件，将其转换为`js`或`dataURL`.  
> 每个`loader`是module.rules里的每一项规则,由`test`和`use`组成.  
```sh
# 例如处理css的css-loader 和 处理ts的ts-loader
npm i css-loader ts-loader --save-dev
```
```js
// 使用module.rules作为配置项, 配置loader
module.exports = {
	module:{
		// 规则数组
		rules: [
			// 每一个loader表示一个规则，都由test和use组成
			{
				test: /\.css$/,  //匹配.css结尾的
				use: 'css-loader'
			},
			{
				test: /\.ts$/,  //匹配.ts结尾的
				use: 'ts-loader'
			}
		]
	}
}
```

### 插件(plugins)
> 插件是拓展webpack其他能力的模块或者js对象集合.    
> 用于解决`loader`无法实现的**其他功能**.  
> 插件是一个`具有 apply 方法`的 JavaScript 对象。  
> 插件可以`携带参数/选项`，向plugins属性传入一个 `new 实例`。
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
module.exports = {
	plugins: [
		new HtmlWebpackPlugin(),
		// HtmlWebpackPlugin 将生成一个 HTML 文件
		new webpack.ProgressPlugin(),
		// ProgressPlugin 用于自定义编译过程中的进度报告，
	]
}
```

### 模式(mode)
> 可以启用 webpack 内置在相应`环境`下的`优化`。
> 指定`development`, `production`(默认)或者`none`
```js
module.exports = {
	mode: 'development'
}
```

### 支持ES2015
> ES2015 中的 `import` 和 `export` 语句已经被标准化。
> webpack 能够提供开箱即用般的支持.
```js
// npm和nodejs只支持 const a = require('./a.js')
import { say } from './a.js'
// 而用webpack构建的话,支持ESM

export {
	say
}
// module.exports = {
// 	say
// }
```

## 从零搭建一个vue-webpack模板
> 基于上面学习的`核心配置`, 以及`vue-loader`的内容.    
> 我们来练手从零搭建一个`vue-webpack模板`, 不使用vue-cli脚手架.  
> 有关`vue-loader`的内容, 学习至[vue-loader官网](https://vue-loader.vuejs.org/zh/#vue-loader-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)
### 初始化项目
> 初始化一个webpack项目
1. 初始化package.json
```sh
npm init -y
```
2. 安装webpack,webpack-cli和html-webpack-plugin
```sh
npm i --save-dev webpack webpack-cli html-webpack-plugin
# 表示仅仅将webpack用于构建,打包上线时不使用
# webpack-cli是为了命令行可以使用webpack
```
3. 新建`webpack.config.js`, 添加基础配置
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 使用默认的入口src/index.js
// 使用默认出口./dist
// 配置空loader,plugins,环境为默认不配置
module.exports = {
	module: {
		rules: [

		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
}
```
4. 新建`src文件夹`和`index.js`
```js
import { say } from './a.js'
say()
console.log(123);
```
5. 新建`a.js`
```js
const say = function(){
	console.log('aaaaaaa')
}

export {
	say
}
```
6. 修改`package.json`,确保是私有的
```json
//"main": "index.js", 移除掉这行
"private": true,
```
7. 添加`build`命令
```json
"build": "webpack"
```

8. 运行测试
```sh
npm run build
```
- 打包成功
```js
// 多了1个dist文件夹, index.html和main.js
(()=>{"use strict";console.log("aaaaaaa"),console.log(123)})();
```

### 安装和配置vue
> 主要是安装`vue`,以及安装`vue-loader`和`vue-template-compiler`  
> 注意：`vue`和`vue-template-compiler`版本号必须一致。  
> 参考至：[手动设置](https://vue-loader.vuejs.org/zh/guide/#vue-cli)
...待续