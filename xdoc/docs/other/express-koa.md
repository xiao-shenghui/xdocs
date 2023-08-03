# express-koa
> 本篇是对比koa框架，来详解express的用法
## 快速上手
```js
// 第一步 引入express
const express = require('express')
// 第二步 创建实例
const app = express()

// 第三步 第一个接口
app.get('/', (req,res,next)=>{
	res.send('hello');
	console.log('请求过来了');
})
/*
req: 请求对象
res: 响应对象
next: 中间件机制。
*/

// 第四步 监听端口
app.listen(3000, ()=>{
	console.log('服务器启动了');
})
```
## 中间件机制
> 同步时机制和koa一样，符合洋葱模型。   
> 区别：koa的中间件，回调函数参数ctx, express是req和res分开.  
```js
app.use((req,res, next) => {
    // next函数就表示 控制下一个中间件是否执行
    console.log(1);
    next()
    console.log(6);
})

app.use((req,res, next) => {
    // next函数就表示 控制下一个中间件是否执行
    console.log(2);
    next()
    console.log(7);
})

app.use((req,res, next) => {
    // next函数就表示 控制下一个中间件是否执行
    console.log(5);
})

// 1，2，5，7，6
```
## 路由
> express 自带路由对象构造器，只需要使用即可。
```js
const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req,res)=>{
	res.send({
		code: 1,
		msg: "响应成功"
	})
})

// 注册路由
app.use(router);
// 也可以为特定的根路径，注册路由
// app.use('/index', router)

app.listen(3000)
```
## 分级路由
> 将不同功能，分别在不同文件夹定义，然后引入路由，和koa一样。
- 1. 新建`route`文件夹，新建`good.js`
```js
const express = require('express');
const router = express.Router();
router.get('/', (req,res)=>{
	res.send({
		code: 1,
		msg: "商品列表"
	})
})
router.post('/add', (req,res)=>{
	res.send({
		code: 1,
		msg: "商品列表添加成功"
	})
})
// 将路由对象暴露出去
module.exports = router;
```
- 2. `server.js`引入暴露的分级路由
```js
const express = require('express');
const goods = require('./route/goods.js');
const app = express();

app.use('/goods',goods);
// 这样，所有goods下的路由，都以/goods为根路径
app.listen(3000)
```

## 路由简写
> 和koa一样，支持`router.prefix()`路由简写和同路由链式调用。  
```js
const express = require('express');
const app = express();
const router = express.Router();
router.prefix('/user');
router.post('/add', (req,res) => {
    res.send('add')
});

app.use(router);
app.listen(3000);
```
## 路由参数
> 基本和koa一样，get分为查询请求和动态路由请求，post请求
- get请求(查询请求/动态路由请求, req.query和req.params获取)
- post请求(直接使用req.body获取)
```js
// get请求
// http://xxx.com/api/123123?q=123
// 接口：'/'
req.query.q = 123
// http://xx.com/api/p/243654646467
// 接口：'/p/:id'
req.params.id = 243654646467

// post请求
// 普通键值对和复杂json
// 接口：'/'
req.body
```
## 实现登录检验功能
> 和koa实现中，逻辑基本一样。
```js
// 基本逻辑： 拿到前端请求时，传递的数据(例如form表单用name传数据) 和 本地保存的数据做对比。
// 根据对比结果，响应相应的数据。
```

## 路由重定向
> 使用`res.redirect([status,] path)`可以实现路由重定向
```js
router.get('/user', (req,res) => {
    // 重定向
    res.redirect('/user/list')
})
```

## 服务器静态资源托管
> express自带静态资源托管方法，`express.static((root, [options])`  
> 一般配合path模块一起使用
```js
// 假设托管public文件夹
const path = require('path')
const express = require('express')
const app = express()

express.static(path.join(__dirname, './public'))
// ...
app.listen(3000)
```
## 文件上传功能
> 借助第三方依赖包: `multer`  
- (1)新建public文件夹。
- (2)用postman测试上传: 
	- post上传，body下，选择`form-data`上传文件，参数为约定的名称。
- (3)引入multer, 配置存储文件，multer对象中
	- 使用配置形成中间件，
- (4)在路由接口塞入该中间件。
```js
const express = require('express');
const multer = require('multer');
const app = express();
let uniqueSuffix; //定义变量，接收文件名。

// 配置存储的文件
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	// 存储路径
    cb(null, __dirname+'/public')
  },
  filename: function (req, file, cb) {
  	// 存储文件名 : file.originalname
  	let filenameArr = file.originalname.split('.'); 
  	//将文件名以'.'分割为数组，便于取后缀。
  	// 拼接文件名
    uniqueSuffix = Date.now() + '.' + filenameArr[filenameArr.length-1];
    // 存储文件
    cb(null, uniqueSuffix)
  }
})

// 上传中间件, multer使用存储配置
const upload = multer({ storage: storage })

// 创建接口， 塞入上传中间件，upload.single('avatar')， avatar是和前端约定的name,键值。
app.post('/upload', upload.single('avatar'),function(req,res,next){
	console.log(req.file);//req.file 是文件名，此处为avatar
	console.log(req.body);
	res.send({
		img: uniqueSuffix
	})
})

app.listen(3030);
```

## 图形验证码功能
> 和koa基本一致，使用第三方依赖`trek-captcha`;
```js
const express = require('express')
const captcha = require('trek-captcha')
const app = express();

app.get('/captcha', (req,res)=>{
	// 使用验证码插件，它是一个promise对象
	// 传入配置对象，size表示验证码长度
	let data = await captcha({ size: 4 });
	// 返回的data由两部分组成
		// data.buffer 
		// 验证码图形，前端浏览器自带解码
		// data.token
		// 验证码字符串，用于校验
	res.send(data.buffer)
})

app.listen(3000)
```

## 鉴权
> 常见的鉴权方式：cookies鉴权，session鉴权(基于cookies)，jwt+token鉴权。
### cookies鉴权
> 访问请求时，给前端设置一个cookies, 并且可以读取前端的cookies.  
> 和koa类似，只不过express中，中间件参数`req`和`res`都有cookies, 一个`获取`，一个`设置`。  
> `req.cookies.xxx`用于`获取`前端的cookies  
> `res.cookie(name, value [, options])`用于`设置`前端的cookies
```js
// 请求时, 响应对象res 设置cookies
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })

// 请求时, 请求对象req 获取cookies
req.cookies.name //tobi
```

### session鉴权
> 和koa的session鉴权非常类似，包不一样`express-session`
```js
//创建服务器
const express = require('express')
const app = express()
 
//导入express-session
const session = require('express-session')

//使用express-session中间件, 调用session方法，配置加密
app.use(session({
	// secret 自定义密钥
    secret:'express_session',
    resave:false,
    saveUninitialized:true
}))
 
// 使用session鉴权
//登录
app.post('/api/login',(req,res)=>{
    if(req.body.username !== 'admin'|| req.body.password !== '123456'){
        return res.send({status:1,msg:'err!!!'})
    }  
	//登录成功将用户信息保存到session中
	 
	req.session.user = req.body
	req.session.islogin = true
	res.send({status:0,msg:'success!!!'})
 
})

app.listen(80,()=>{
    console.log('127.0.0.1:80')
})
```

### jwt+token鉴权
