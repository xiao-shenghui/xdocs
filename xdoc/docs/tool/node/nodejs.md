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