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