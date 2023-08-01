# NodeJs
## NodeJs学习路径
- JavaScript 基础語法 + 
- Nodejs内置APl模块(s、path,http等）
- 第三方API模块(express.mysql 等）

## fs文件系统模块
- 文件写入内容
> `fs.writeFile()` 示例代码  
> 参数1：文件路径  
> 参数2：写入内容  
> 参数3：编码格式  
> 参数4：回调函数(可携带`err参数`,错误对象)  
> function writeFile(path, data, options,callback)

- 读取文件内容
> `fs.readFile()` 示例代码  
> 参数1：文件路径  
> 参数2：编码格式  
> 参数3：回调函数(可携带`err和data参数`,错误对象和数据)  
> function readFile(path, options, callback)

- 删除文件
> `fs.unlink` 示例代码  
> 参数1：文件路径  
> 参数2：回调函数(err) 

- 文件读取失败？
> 如果`xxx.txt`位于当前`js`文件目录之下，使用相对路径会读取失败。  
> 解决: 修改为绝对路径。  
> `__dirname`可以获取当前文件所在目录，所以`./`可以写作`__dirname`, 避免读取失败。
> `__filename`可以获取当前文件绝对路径。  

### 示例
- 引入
```js
const fs = require('fs');
```
- 写入文件
```js
fs.writeFile('./index.txt', '测试1','utf-8', (err)=>{
    if(err){
        console.log('写入失败', err);
    }
    console.log('文件写入成功');
})
```
- 读取内容
```js
fs.readFile('./index.txt','utf-8', (err,data) => {
    if(err) console.log('文件读取失败',err);
    console.log('文件内容为:' + data)
})
```
- 删除文件
```js
fs.unlink('./index.txt',err => {
    if(err){
        console.log('文件删除失败', err)
    }
    console.log('文件删除成功！')
})
```

## Nodejs模块化
### 导出方式
> 核心: `moulde.exports` 指向的对象可以暴露出去,   
> `exports`默认和moulde.exports指向一样，  
> exports其实不具有暴露功能，只是借用了正主的功能。
- 方式一: exports.name = name
- 方式二: module.exports = {}

### 引入方式
> 核心: require()函数, 将每一个文件看作一个模块，引入导出的对象。  
> 引入查找顺序: 
- 加了文件后缀，以后缀为准。
- 未加文件后缀: 
    - 查找当前目录下文件
        - 1，直接查找文件X
        - 2，查找X.js文件
        - 3，查找X.json文件
        - 4，查找X.node文件
    - 如果当前文件未找到，将X作为一个**目录**
        - 1，查找X/index.js文件
        - 2，查找X/index.json文件
        - 3，查找X/index.node文件
    - 如果没有找到，那么报错：not found

```js
// nodejs 导出 a.js
let name = 'wc'
exports.name = name //module.exports == exports
module.exports = {
    name
}

// nodejs 引入 main.js
let a = require('./a');
console.log(a.name)
```

## ESModule模块化
### 导出方式
> 核心: exports关键字, ES6增强型写法，不是对象字面量的意思。
- 方式一: 在语句声明前，直接加exports
- 方式二: 将所有要导出的，放到exports的{}中, as起别名
- 方式三: default export，默认导出一个对象

### 引入方式
> 核心: import 关键字
- 方式一：import {标识符列表} from '模块'，
    - 这里的{}也不是一个对象，里面只是存放导入的标识符列表内容
- 方式二：导入时，通过as关键字给标识符起别名
- 方式三：通过 * 将模块功能放到一个模块功能对象（a module object）上
- 方式四：import()异步函数，返回的是一个promise对象，需要使用async，await, try和catch，实现按需加载。
```js
// ESModule 导出 a.js
let name = 'wc'
exports {
    name
}
exports default name

// ESModule 引入 main.js
import {name} from './a'
import {nameA as name} from './a'
import * from './a'

console.log(name)
console.log(nameA)
console.log(*)


// ESModule 按需引入， main.js
let flag = true;
if(flag){
    try{
        let res = await import('./a.js');
        console.log(res);
    }
    catch(err){
        // err为拒因
        console.log(err)
    }
}
```

## path模块
> 内置模块，对于路径进行处理的。
- path.join()
    - 用于将多个路径拼接为1个完整路径
    - `path.join('路径1','路径2')`
- path.basename()
    - 用于解析文件的`文件名`，从一个路径中
    - `path.basename('路径','文件后缀')`
- path.extname()
    - 用于获取文件的`扩展名` (`extend-name`)，从一个路径中
    - `path.extname('路径')`

- 完整案例
```js
let path = require('path');
console.log(path.join('/a','/b',__dirname));
// 路径拼接：\a\b\C:\Users\Administrator\Desktop\nodejs
console.log(path.basename('/a/b/index.js'));
// index
console.log(path.extname('/a/b/index.js'));
// js
```

## http模块
> 内置模块，用于创建web服务器  
> 缺点：繁琐，回调函数形式，处理复杂逻辑困难。
- 1. `http.createServer(处理响应的回调函数)`
- 2. `server.on('request',回调函数)` 监听类型触发回调
- 3. `server.listen(端口号, 回调函数)` 监听端口号
> ①导入http模块  
> ②创建 web 服务器实例  
> ③为服务器实例绑定request事件，监听客户端的请求  
> ④启动服务器
```js
let Http = require('http');
let server = Http.createServer((req,res)=>{
    // req 请求对象，res响应对象
    // 对请求和响应的数据做处理
    res.write('响应数据');
    res.end();
});

// 监听响应类型，触发回调函数
server.on('request', (req,res)=>{
    console.log('服务请求了');
    // 解决中文乱码，设置Header
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
});
server.listen(3000,()=>{
    console.log('服务器启动成功')
});
```

## express
> 一个用于快速构建web应用服务器的框架  
### 快速启动
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    console.log(req); //请求对象
    console.log(res); //响应对象
    // res.send() 发送响应内容
    res.send('hello world')
});

app.listen(port, ()=>{
    console.log('服务已经启动在' + 'http://localhost:' + port)
})
```
### 详解方法
> 详情见官网[Express-Api](http://expressjs.com/en/4x/api.html#res)
- app.get('路径', 回调函数)
    - 回调函数之req, 请求对象
    - 回调函数之res, 响应对象
    - 注意，res和req的方法，支持链式调用。
- res,response 设置响应对象的方法
|方法/属性名|描述|
|---|---|
|res.send(data)|响应数据|
|res.cookie(name, value [, options])|设置响应的cookie信息|
|res.clearCookie(name [, options])|清除响应的cookie信息|
|res.download(path [, filename] [, options] [, fn])|以 "附件 "形式传输路径中的文件。|
|res.status(200)|设置响应状态码|
|res.json()|响应一个JSON类型的数据|
|res.jsonp()|响应一个JSONP支持的JSON响应|
|res.end()|请求完毕，关闭响应|
```js
app.get('/login',(req,res)=>{
    res.send('登录成功');
    res.json({name: 'wc'});
    res.jsonp({name: 'wc'});
    res.cookie('cart', { items: [1, 2, 3] }, { maxAge: 900000 });

    // 提示用户下载文件。
    res.download('/report-12345.pdf',function(err){
        if(err){
            console.log('下载失败')
        }
        else{
            console.log('用户下载')
        }
    });

    res.status(200); //设置响应状态码
    res.end(); //请求完毕，关闭响应

})
```

- req,request 获取请求对象的方法
|方法/属性名|描述|
|req.baseUrl|根路径|
|req.body|请求的内容|
|req.cookies|请求的cookies|
|req.hostname|请求的主机名|
|req.ip|请求的ip|
|req.method|请求的method, 请求的方式|
|req.params|请求的params, 请求的参数对象|
|req.xhr|是否通过AJAX发起的请求|
|req.param(name [, defaultValue])|通过请求的参数对象的属性，返回请求的属性值|
```js
app.get('/:id',(req,res){
    // 处理请求
    console.log(req.xhr)
    console.log(req.ip)
    console.log(req.hostname)
    console.log(req.method)
    console.log(req.params)
    console.log(req.param('id'))

    // 处理响应
    // ...
})
```

### 路由正则匹配
- `'/ab?cd'`: `?`表示可有可无.
    - 匹配`acd` 和 `abcd.` 
- `'/ab+cd'`: `+`表示一个或多个.
    - 匹配`abcd`, `abbcd`, `abbbcd`
- `'/ab*cd'`: `*`表示中间任意，不做要求.
    - 匹配`abcd`, `abbddcd`, `abACDMcd`
- `/.*fly$/`: 支持正则表达式,以`fly`结尾的
    - 匹配`dadafly`,`dragonfly`,`sadfly`

## Router对象(分级路由)
- app.route(): 创建可链式路由处理程序
```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```
- Router对象: 
- 分级路由文件-`birds.js`
```js
// rotue > birds.js
const express = require('express')
const router = express.Router()

// 使用use注册中间件
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// get方法
router.get('/', (req, res) => {
  res.send('Birds home page')
})

router.get('/about', (req, res) => {
  res.send('About birds')
})


// 分级路由依旧支持链式调用
// router.route('/about').get().post()....

// 将路由对象导出
module.exports = router
```
- 主要文件-`server.js`, 
```js
const birds = require('./birds')

// ...
// app.use('路径名', 路由对象)注册路由
app.use('/birds', birds)
```