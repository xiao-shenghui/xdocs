# express 入门
## 目录
- 路由
- 中间件
- 静态文件服务
- 模板引擎
- 一个连接Mysql的Demo
## 第一个Demo
### 原生js搭建: 
- 创建一个`server.js`文件。
```js
//使用node原生的http模块搭建简单的后端服务
//引入http模块
const http = require('http');
//使用http模块的creatServer()方法，创建服务器
const server = http.createServer(function(req,res){
	res.statuCode = 200;
	//设置请求成功的状态码
	res.setHeader('Content-Type','text/html');
	//设置请求头格式
	res.end('2131321');
	//给客户端发送内容
});
server.listen(3000,function(){
	console.log("服务已启动");
});
//server的listen方法，启动并监听服务。
```
- cmd启动
```sh
node server.js
```
### express-js搭建: 
- 1.初始化package.json
```sh
npm init
```
- 2.下载express包
```sh
npm install express
```
```json
"dependencies": {
    "express": "^4.18.2"
  }
```
- 3.搭建后端服务：
```js
const express = require('express');
//引入express
const app = express();
//使用express创建服务对象：app
app.get('/',function(req,res){
	res.send();
	//用send方法给前端发送内容。
});
//服务对象的get方法，创建接口
app.listen(3000,function(){
	console.log('express服务已启动');
});
//用listen方法启动并且监听服务
```
### 对比优劣势：
- express不用手动配置响应头，响应格式。
- express的接口很好扩展。
- express更好设置请求方式。
### Request 和 Response对象
> Request请求对象：回调函数里的req参数，携带前端请求时带的属性，参数和cookie等等。  
> Response响应对象：就是回调函数里的req参数，它的方法可以执行响应操作，返回内容，状态等等。
查看Request和Response对象的 [所有API](https://www.expressjs.com.cn/4x/api.html)
### express路由机制
思考：我们在向后端发起请求时，通过什么去区分接口的？
答：请求方式+Url
我们在express中，定义路由的方式：
```js
app.METHPD(URL,CALLBACK);
```
### nodemon
> 一个检测工作区代码变化，自动重启node服务的包
- 安装
```sh
npm install nodemon --save-dev
```
可以发现，package.json多了一个依赖
```json
"devDependencies": {
    "nodemon": "^2.0.22"
  }
```
- 使用(修改package.json文件中的启动命令)
```json
"start": "nodemon server.js"
```
- 启动项目
```sh
npm start
```
## 核心概念
### 路由
#### 路由方法
Express 支持对应于HTTP的`get`、`post`、`put`、`delete`等等。
使用方法为：
```js
app.METHPD(URL,CALLBACK);
```
有一种特殊的路由方法：app.all(), 所有请求都响应，用于给所有请求装入中间件函数。
- 示例：
```js
app.all('/about', function(req,res){
	res.send({
		name: 'hello',
		age: 10
	});
})
```
#### 路由路径
Express 支持`字符串`(普通)、`字符串模式`、`正则表达式`这3种路由路径：
- 字符串模式:
```js
app.get('/ab?cd',function(req,res){
	res.send('ab?cd');
});
//以上`/ab?cd`中`b?`表示`b`可有可无，不确定。
```
因此可以匹配`/abcd`,`acd`;
```js
app.get('/ab+cd',function(req,res){
	res.send('ab+cd');
});
//以上`/ab+cd`中`b+`表示`b`可有1个或多个。
```
因此可以匹配`/abcd`,`abbcd`;
- 正则表达式:
```js
app.get('/.*fly$/',function(req,res){
	res.send('/.*fly$/');
});
//以上`/.*fly$/`中,fly$表示以fly结尾，.*表示任意内容，任意个字符。
```
因此可以匹配`/fly`,`/abbfly`;
#### 路由拆分
- 需求：商品/物流/用户 三个模块
当我们路由越来越复杂，不统一管理的话会显得特别乱，这时对路由拆分是个不错的选择。
- 拆分前：
```js
app.get('/user/list',function(req,res){
	res.send('/list');
});
app.get('/user/detail',function(req,res){
	res.send('/list');
});
app.get('/goods/list',function(req,res){
	res.send('/list');
});
app.get('/goods/detail',function(req,res){
	res.send('/list');
});
```
> 很乱，很复杂，不好管理。
- 拆分后：
```js
const app = express();
const user = express.Router();
// 用express的Router方法，路由方法。
user.get('/list',function(req,res){
	res.send('/list');
});
user.get('/detail',function(req,res){
	res.send('/detail');
});
app.use('/user',user);
//注册user路由。
```
### 中间件
学习js时，一切皆对象。然而，学习express时，一切皆中间件。  
比如常见的请求参数解析、cookie解析、日志打印等，都可以通过中间件来完成。  
在Express中，中间件就是一个函数：
```js
function someMiddleware(req,res,next){
	//自定义逻辑
	console.log("这是一个全局中间件");
	next();
}
//next函数用来触发下一个中间件的执行。
```
- Express中的两种中间件：
	- 全局中间件：任何请求都会执行该中间件
	```js
	app.use(someMiddleware);
	//app.use()函数可以注册全局中间件，并且任何请求都会先执行该中间件。
	```
	- 路由中间件：路由定义时注册的中间件，只在用户访问该路由时执行。
	```js
	app.get('/midleware',someMiddleware,(req,res)=>{
		res.send('Hello World');
	})
	```
### 模板引擎
可以理解为升级版的html文档，express用模板引擎来渲染前端页面。
express对jade,ejs,nunjunks,Hanlebars等模板引擎都提供了很好的支持。
- 实例Hanlebars:
1. 首先安装模板引擎：
```sh
npm install hbs
```
2. 创建views文件夹，新建index.hbs文件
```html
<h1>express 入门课程</h1>
```
3. server.js内设置引擎和引擎文件夹，接口内用res.render(hbs文件名);渲染页面：
```js
const app = express();
app.set('views','views');
app.set('view engine','hbs');
app.get('/',(req,res)=>{
	res.render('index');
});
```
4. 当我们前台访问'/'路径时，会渲染index.hbs页面。
```js
//server.js
//render方法的第二个参数可以携带一些动态参数
app.get('',(req.res)=>{
	res.render('index',{name: 'jackie',age: 18});
});
```
```html
<!-- index.hbs -->
<p>讲师：{{ name }}</p>
<p>年龄：{{ age }}</p>
```
### 静态文件服务
Express自带了静态文件服务的中间件：express.static,使用起来非常方便
- 假设我们的静态资源在public下面：
```text
public
 ---css
 	---style.css
 ---img
 	---logo.png
```
- 我们只需在server.js中添加如下代码：
```js
app.use(express.static('public'));
```
- 在前台页面就可以直接访问到了这些资源了：
```text
http://localhost:3000/css/style.css
http://localhost:3000/img/logo.png
```
- 在模板引擎内引入这些资源，就可以在模板中使用了：
```html
<link rel="stylesheet" type="text/css" href="/css/style.css">
```
### 处理404和内部错误
针对一些路由未定义的接口，我们可以返回404或者500错误处理。
- 404：只需在所有路由之后，添加一个路由中间件，用于接收所有路由均匹配失败的请求。
```js
app.get('*',(req,res)=>{
	res.status(404).render('404',{url:req.originaUrl});
});
//*匹配所有路由，状态码设置为404，渲染404.hbs页面，携带参数request的路径。
```
```html
<h1>找不到你要的页面了</h1>
<p>你所访问的路径{{url}}不存在</p>
```
- 内部错误：在所有路由之后，添加一个全局中间件
```js
//全局中间件
app.use((err,req,res,next)=>{
	res.status(500).render('500');
});
```
```html
<h1>服务器好像开小差了</h1>
```
## 连接Mysql的Demo
### 电脑环境
- 先确定自己的电脑上的环境  
需要node.js，npm，数据库（MySQL），数据库管理工具（也可以不用，Navicat，Workbench等都可以）。
### 使用express
- express的使用
使用express建立服务器：  	
（1）先创建一个文件夹
```sh
npm init -y 
```
会自动创建一个package.json文件，用来管理下载的包。  
（2）安装express
```sh
npm i express 
```
在文件夹里创建一个app.js作为主文件。

（3）先起一个服务器
```js
// 引入express
const express = require("express");
// 创建服务器的实例对象
const app = express();
// 启动服务器，3007为端口号，选择一个空闲的端口号
// post请求
app.post('/', (req, res)=>{
    res.send('post')
})
// 监听客户端的get请求
app.get('/user', (req, res) => {
    // 调用express调用的res.send()方法
    res.send({
        name: 'zs',
        age: 20,
        gender: '男'
    })
})
 
// :id是一个动态的参数 
app.get('/infor/:id/:name', (req, res)=> {
    // req.params获取到动态匹配到的参数
    console.log(req.params);
    res.send(req.params);
})
app.listen(3007, () => {
  console.log("Server running at http://127.0.0.1:3007");
```
### 连接mysql  
- 安装数据库
```sh
npm i mysql
```
项目中新建一个文件夹db，文件夹下新建一个文件index.js 
```js
// 引入mysql
const mysql = require("mysql");
// 建立一个连接池
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的IP地址(本地的或者是云服务器的都可以)
  user: "clh",
  password: "clh123",
  database: "nodetest", //指定要操作哪个数据库
});
// 检测数据库是否连接成功
db.query("select 1", (err, results) => {
  if (err) return console.log(err);
  console.log(results);
}); 
// 将文件暴露出去
module.exports = db
```
### 查询数据：
先在数据库中添加几条数据用于测试，表名为：user_infor
```js
//app.js
// 引入Mysql
const db = require("./db/index");
// 查
app.get("/infor", (req, res) => {
  // 定义sql语句
  const sql = "select * from user_infor";
  // 执行sql语句
  db.query(sql, (err, result) => {
    // 执行失败
    if (err) {
      return res.send({ state: 1, message: err });
    }
    return res.send({ state: 0, message: "查询成功", data: result });
  });
});
```
### 增加数据：
添加数据需要从前端拿数据，但前端传的数据和后端要写入的数据格式不同。
要先运用中间件把前端拿到的数据在后端进行解析。
```js
//挂载路由之前先配置解析数据的中间件。
// 配置解析表单数据的中间件  内置中间件，只能解析application/x-www-form-urlencoded格式的数据
app.use(express.urlencoded({extended: false}))
// 增
app.get("/increase", (req,res)=>{
  // 先取到要增加的字段值
  const addInfor = req.body
  // 定义sql语句
  const sql = "insert into user_infor set ?"
  // 执行sql语句,第二个参数代表sql语句中？的值
  /**
   * 如果增加的字段和数据库中的字段不是一一对应的
   * 将addInfor换成{name: addInfor.name, age: addInfor.age}
   * name代表数据库中的字段，addInfor.name代表他要增加的值
   */
  db.query(sql, addInfor, (err,results)=>{
    // sql语句执行失败
    if(err) {
      return res.send({status: 1, message: err.message})
    }
    // 数据库语句执行成功，但影响的条数不等于1，没有增加，也属于失败
    if(results.affectedRows !== 1) {
      return res.send({status: 1, message: '数据添加失败'})
    }
    // sql语句执行成功，影响条数也等于1
    return res.send({status:0, message: '添加成功', data:results})
  })
})
```
### 改和删：
```js
// 改
app.get("/update", (req, res) => {
  // 修改语句，将user_infor表中id为？的年龄改为？，两个问号的值从前端获取
  const sql = "update user_infor set age=? where id=?";
  // 执行sql语句
  db.query(sql, [req.body.age, req.body.id], (err, results) => {
    // sql语句执行失败
    if (err) {
      return res.send({ status: 1, message: err.message });
    }
    // sql语句执行成功，但影响的条数不等于1，没有修改，也属于失败
    if (results.affectedRows !== 1) {
      return res.send({ status: 1, message: "数据修改失败" });
    }
    // 执行成功
    return res.send({ status: 0, message: "修改成功", data: results });
  });
});
 
// 删
app.get("/delete", (req, res) => {
  // 定义sql语句，从user_infor表中将id为？的那条数据删除
  const sql = "delete from user_infor where id=?";
  db.query(sql, req.body.id, (err, results) => {
    // sql语句执行失败
    if (err) {
      return res.send({ status: 1, message: err.message });
    }
    // sql语句执行成功，但影响的条数不等于1，没有删除，也属于失败
    if (results.affectedRows !== 1) {
      return res.send({ status: 1, message: "删除失败" });
    }
    // 执行成功
    return res.send({ status: 0, message: "删除成功", data: results });
  });
});
```
### 对代码进行优化
一般都会把路由和路由的处理函数都分开,router文件夹下的文件用来创建路由，router_handler文件夹下的文件作为路由的处理函数，使用时将router_handler中的处理函数导入到router路由模块中，然后再将router路由模块导入到app.js文件中。
- app.js
```js
	// 引入express
	const express = require("express");
	// 创建服务器的实例对象
	const app = express();
	// 配置解析表单数据的中间件: express内置中间件
	app.use(express.urlencoded({ extended: false }));
	/**
	 * 还有自定义中间，自定义中间件最后必须加next()方法
	 */
	// 封装res.send() ,必须在路由之前封装
	/**
	 * 不管是输出正确的数据还是错误的信息，每次都需要写这么多东西
	 * res.send({ state: 0, message: "查询成功", data: result })
	 * 封装之后不需要写这么多
	 */
	app.use((req, res, next) => {
	  // 定义一个输出的函数
	  res.output = function(err, status = 1, data) {
	      res.send({
	          status,
	          message: err instanceof Error ? err.message : err,
	          data
	      })
	  }
	  next();
	})
	 
	// 导入并使用路由模块
	const inforRouter = require('./router/userInfor')
	app.use(inforRouter)
	// 启动服务器
	app.listen(3007, () => {
	  console.log("Server running at http://127.0.0.1:3007");
	});
``` 
- 路由模块: router文件夹下的userInfor.js文件:
```js
		// 引入express
		const express = require('express')
		// 创建路由模块
		const router = express.Router()
		 
		// 将处理函数导入
		const infor_handler = require('../router_handler/userInfor')
		// 获取用户的基本信息
		router.get('/infor', infor_handler.getAllInfor)
		// 通过id查找用户name
		router.get('/inforById', infor_handler.getNameById)
		 
		// 向外共享路由对象
		module.exports = router
		/*** 这个文件需要引入express来创建路由，并将路由的处理函数部分再分离出去，导入处理函数的文件，根据函数名匹配路由的处理函数。最后需要将路由对象暴露出去，在app.js文件中使用。
		 ***/
```
- 路由模块: router_handler文件夹下的userInfor.js文件:
```js
		// 导入数据库操作模块
		const db = require("../db/index");
		 
		// 获取用户信息的处理函数
		exports.getAllInfor = (req, res) => {
		  // 定义查询的sql语句
		  const sql = "select * from user_infor";
		  // 执行sql语句
		  db.query(sql, (err, results) => {
		    // 执行sql语句失败
		    if (err) return res.output(err);
		    // 执行成功
		    res.output("查询成功", 0, results);
		  });
		};
		 
		// 通过id查找用户name,处理函数
		exports.getNameById = (req, res) => {
		  // 定义sql语句
		  const sql = "select name from user_infor where id=?";
		  // 执行sql语句，req获取从前端传的值
		  db.query(sql, req.body.id, (err, results) => {
		    // 执行sql语句失败
		    if (err) return res.output(err);
		    // 执行成功，但数据长度为0，执行失败
		    if (results.length !== 1) return res.output("无数据");
		    // 执行成功
		    res.output("执行成功!", 0, results);
		  });
		};
		/**
		 * res.output()这个方法是刚才在app.js文件中封装的res.send()的方法，封装时要在所有路由之前封装，最后必须用next()引出去。
		 * **/
```