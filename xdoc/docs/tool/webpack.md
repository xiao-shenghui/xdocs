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
## webpack打包优化
> 具体从`webpack-bundle-analyzer`插件查看依赖  
> 到`按需加载`，`resolve配置`, `代码压缩`, `sourceMap`的角度。

### webpack-bundle-analyzer插件
> 一个 plugin 和 CLI 工具，它将 bundle 内容  
> 展示为一个`便捷的`、交互式、可缩放的`树状图形式`。   
> `不需要`的或者`体积较大`的依赖包来进行针对性的优化。

- 普通项目，`插件`使用
1. 安装
```sh
npm i webpack-bundle-analyzer --save-dev
```
2. 引入插件
```js
const BundleAnalyzer = require('webpack-bundle-analyzer')
// webpack.config.js
module.exports = {
	plugins: [
		// 配置插件
		new BundleAnalyzer(), //使用默认配置

	]
}
```
3. 运行查看
```sh
npm run build --report
```
- 也支持`CLI`使用, 
> 具体查看插件官网 [Options (for CLI)](https://github.com/webpack-contrib/webpack-bundle-analyzer)

- vue-cli2中: 
> 内置webpack-bundle-analyzer  
> 直接运行查看。

### 具体优化
### 按需加载
1. 路由`懒加载`，`异步加载`组件。 vue2和vue3都有对应的API.  
2. 组件库引入方式：按需加载第三方组件或插件。

### 优化loader解析查找规则 
- 优化webpack中loader的配置(rules)
	- test: 优化正则表达式，减少文件查询时间
	- loader: 开启cacheDirectory选项，开启缓存，
	- 添加include, exclude, 指定或者排除无关文件

- 示例
```js
// webpack.config.js
module.exports = {
	// 通过rules配置所有的loader
	rules: [
		{
			test: '/\.js$/',  
			loader: 'bable-loader?cacheDirectory', //在loader上，添加?cacheDirectory
			include:[resolve('src')]
		}
	]
}
```

### 优化文件路径 - resolve
> resolve可以设置模块如何的规则`被查找`和`被解析`  
> 例如`import 'lodash'`, 设置依次查找解析`.js`,`.vue`

- 优化webpack中的resolve的配置
- 配置别名，设置解析查找规则，加快查找模块的速度
	- 配置extensions选项，配置解析规则
	- 配置alias选项，配置别名
```js
// webpack.config.js
module.exports = {
	resolve:{
		extensions: ['.js','.vue','.json'],
		alias: {
			'@': resolve('src')
		}
	}
}

// 配置完如上, 即可以在项目中引入和配置
import tool from '@/utils/tool'
// 会从src开始查找，仅查找.js, .vue, .json后缀
```

### 代码压缩 - optimization
> webpack开启`production`模式时，会默认使用`TerserPlugin`插件，对代码压缩。  
> 指定别的压缩插件(例如[`closure-webpack-plugin`](https://github.com/webpack-contrib/closure-webpack-plugin))   
> 将它作为 `optimization.minimizer`, 插件确保具有`Tree-Shaking`的能力. 

- tree-shaking: 
	- **rollup**提出的一种概念，具有`删除未引用代码`(dead code)的能力  

- 通过配置`optimization`中的`minimizer`选项，可以配置压缩插件
```js
const ClosurePlugin = require('closure-webpack-plugin')
// 例如指定生产模式
module.exports = {
	// mode: 'production',
	// 例如使用ClosurePlugin插件压缩
	optimization: {
		minimizer: [
			new ClosurePlugin()
			/* 默认等价于如下配置
			new ClosurePlugin({mode: 'STANDARD'}, {
		        // compiler flags here
		        //
		        // for debugging help, try these:
		        //
		        // formatting: 'PRETTY_PRINT'
		        // debug: true,
		        // renaming: false
		      })
			*/
		    ]
		]
	}
}
```

### 关闭sourceMap - 生产环境
> sourceMap是一种映射功能，可以将打包后的代码映射到原始位置。  
> 便于开发时追踪到错误和警告。 

- 如何开启source-map? 
- 配置webpack中的`devtool`
```js
// webpack.cofig.js
module.exports = {
	devtool: 'inline-source-map',
	// 一般配合webpack-dev-server使用(见webpack官网)
	// 指定serve路径
	devServer: {
		static: './dist',
	}
}
```
- 例如
```js
/*
Uncaught ReferenceError: cosnole is not defined
   at HTMLButtonElement.printMe (print.js:2)
*/
```

- 如何关闭source-map?
- 配置webpack中的`devtool`
```js
module.exports = {
	devtool: 'none'
}
```

- vuecli中的sourceMap配置
	- productionSourceMap
```js
//vue.config.js
module.exports = {
	productionSourceMap: false,  //默认为true
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
}
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