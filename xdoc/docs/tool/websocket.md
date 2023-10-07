# WebSocket
> 一种用于`用户`和`浏览器`之间交互式通信会话，  
> 向服务器发送消息并且`实时`接收事件响应，且无需通过轮询的方式。  
> 主要学习`客户端`使用`WebSocket`连接，`服务端`创建`WebSocket`服务。

## 客户端知识
> 原生js的Websocket的API
### 创建连接
```js
const ws = new WebSocket('ws://localhost:3000');
// WebSocket(url) url:必须是ws或者wss协议的，不能是http/https等协议
```

### 监听事件
```js
// 监听ws连接开启事件
ws.onopen = function(){
	console.log('服务器启动了')
}

// 监听接收消息事件。(服务器发送过来的)
ws.onmessage = function(msg){
	// msg 服务器send过来的
	console.log('收到服务器的消息：',msg)
}

// 监听ws连接错误的事件
ws.onerror = function(){
	console.log('连接失败')
}

// 监听ws连接关闭事件
ws.onclose = function(){
	console.log('服务器关闭了')
}
```

### 实例方法
```js
// ws的send方法，发送消息给服务器
ws.send('发送消息')

// ws的close方法，关闭ws连接
ws.close()
```

## 服务端知识
> ws包: 使用nodejs的`ws`npm包，创建WebSocket服务。  
> socket.io: 建议版的

## ws包
> 与原生`ws`一样的API,易于使用  
> 支持原生`Node.js streams`API和`Binary`数据.  

### 安装
```sh
cnpm i ws
```
### 创建服务
```js
// 引入ws
const WebSocket = require('ws');
// 引入其WebSocketServer类， 也就是wss
const WebSocketServer = WebSocket.server;
// 实例化wss类，创建服务，实例化wss对象
const wss = new WebSocketServer({
	// 配置服务端口 port
	port: 3000
})
```

### 监听事件-on原生
```js
// wss监听整体连接
wss.on('connection', (ws)=>{
	// 传入一个ws,表示服务器对象，使用ws监听具体事件
	// ws监听message
	ws.on('message',(msg)=>{
		console.log('收到客户端发送的消息',msg)
	})
	// ws监听open
	ws.on('open',()=>{
		console.log('服务启动了')
		// ws的send方法，发送消息
		ws.send('wss服务器启动了')
	})
	// ws监听error
	ws.on('error',()=>{
		console.log('服务连接失败')
	})
})
```

### 广播消息-clients
> 广播消息给用户(客户端)，`ws`的`clients` 属性，表示所有连接的`用户ws`。  
> 通过遍历，判断`readyState`，给所有的`client`发消息
```js
wss.on('connection', (ws)=>{
	ws.on('open', (msg, isBinary)=>{
		ws.clients.forEach(e => {
			if(e.readyState == WebSocket.OPEN){
				e.send('广播消息给你',{binary: isBinary}) 
				//支持二进制数据
			}
		})
	})
})
```

## Socket.io包
> 简单易用的API实现强大的功能.  
> `ping`与`pong`的组合,`broadcast`功能,函数式编程.

### 安装
```sh
cnpm i socket.io
```
### 服务端使用
### 创建服务
```js
// 利用Nodejs原生http模块，创建服务对象
const server = require('http').createServer;
// 创建io对象
const io = require('socket.io')(server);
```
### 监听事件-on-ping-pong
```js
io.on('connection', (client) => {
	// client 表示连接用户
	// 使用on监听事件
	client.on('message',(msg)=>{ /* ... */})
	client.on('disconnect',()=>{
		console.log('一名用户离开了')
	})

	// 或者使用'ping' 和 'pong'组合
	// ping 监听message, pong发送消息
	client.on('ping',(msg)=>{
		client.emit('pong', msg);
	})
})

server.listen(3000)
```

### 广播消息-emit-broadcast
```js
io.on('connection', (client)=>{
	// 假设广播一个用户的消息给所有人
	// 使用`ping`监听接收消息，
	// 使用io.emit()指定broadcast, 广播消息给所有人
	client.on('ping', (msg)=>{
		io.emit('broadcast',msg)
	})
})
```

### 支持Koa
```js
const app = require('koa')();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

/*
下面内容正常, 与上面一致使用 io.connection ...
*/
```