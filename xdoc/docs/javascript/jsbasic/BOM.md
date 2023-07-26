# BOM
## window
```js
/*
	js的运行环境有两个
     1.浏览器  把js代码运行在浏览器上 全局对象window
     2.node  node也是一个js的运行环境
     在node中全局对象是global, node里面有window吗？
     统一的全局对象 globalThis
*/
// console.log(window);
// console.log(globalThis);
// console.log(window === globalThis);   //true
```
```js
// 打开窗口
win = window.open('https://www.baidu.com/')
// 关闭窗口
win.close()
// outerHeight 浏览器的高度, 包括菜单栏
console.log(window.outerHeight);
// innerHeight 窗口内容区域的高度,不包含菜单栏
```
## location
> window上, 当前连接到的url信息
```js
// url的组成
// https://www.baidu.com/newspage?name="wang"
// https://  协议
// www.baidu.com   host 域名 主机地址 通过这个可以找到ip地址
// :443 端口号 是https默认的端口号 http默认的是80
// /newspage  路径名 path
// ?name="wang" 查询字符串
// #abc hash值  锚点
```
- location 属性和方法
```js
// location 常见的属性 
	// .protocol //http:
	// .host //主机地址
	// .hostname //主机地址，不包含端口号
	// .port //端口号
	// .href //url地址

// href 改变url地址，有记录
location.href =  './03-out页面.html'

// assign 打开一个新页面，有记录
location.assign('https://www.baidu.com/')

// replace 替换为新的页面，无记录
location.replace('https://www.baidu.com/')

// reload 重新加载页面，强制刷新
location.reload(true)
```
## 查询字符串
```js
var queryString = '?name="wang"&age=1'
var searchParams = new URLSearchParams(queryString)
// 获取参数值
console.log(searchParams.get('name'));
// 追加参数值
searchParams.append('address', 'zz')
console.log(searchParams.get('address'));
// 修改参数值
searchParams.set('name', 'zs')
console.log(searchParams.get('name'));
```

## history
```js
// 历史会话记录
console.log(history);
// 根据历史，往前走一个
history.go(1)
// 根据历史，往后走一个
history.go(-1)
// 往后走一个，前进
history.forward()
// 往前走一个，回退
history.back()
```

## screen
```js
// screen 记录的是屏幕的信息
console.log(screen.width);
console.log(screen.height);
console.log(screen);
```

## xxxStorage
> 获取和设置的，均是JSON格式的数据。  
- 普通数据: 直接获取和存储。  
- 引用数据: 
	- 设置：JSON.stringfy(xx) 序列化。 
	- 获取：JSON.parse(xxx) 反序列化。 
```js
// sessionStorage 会话信息存储
// 不能跨窗口访问
// .setItem(键名，键值) 设置/添加数据
sessionStorage.setItem('name', a)
// .getItem(键名) 获取数据
sessionStorage.getItem('name')
// .removeItem(键名) 移出数据
sessionStorage.removeItem('name')
// .clear() 清空数据
sessionStorage.clear()

// localStorage 本地信息存储
// 只能手动清空
localStorage.setItem('name',a);
// xxxxx 其他方法与上面一致
```

## 鼠标的位置
```js
// e.offsetX和e.offsetY 
// 事件对象上的属性
// 事件触发时,盒子内鼠标的位置

// e.clientX 和e.clientY
// 事件对象上的属性
// 事件触发时,body内鼠标的位置
```