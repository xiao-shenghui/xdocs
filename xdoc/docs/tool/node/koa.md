# koa
> 一个由express原班人马开发的第三方框架，koa利用了async函数 更好的处理数据
## 快速上手
```js
// 第一步 引入koa
const Koa = require('koa');

// 第二步 创建实例
const app = new Koa();

// 第三步 配置响应
// app.use中间件，接收一个函数作为参数，
// 函数参数: ctx(请求体和响应体的结合)
app.use(ctx => {
    console.log('请求过来了');
    // 响应数据
    ctx.body = 'hello koa'
})

// 第四步 监听端口
app.listen(3000, () => {
    console.log('服务器启动了');
})
```

## 中间件机制
> 符合洋葱模型，先往下游执行，执行完后再往上游执行。
```js
app.use((ctx, next) => {
    // next函数就表示 控制下一个中间件是否执行
    console.log(1);
    next()
    console.log(6);
})

app.use((ctx, next) => {
    // next函数就表示 控制下一个中间件是否执行
    console.log(2);
    next()
    console.log(7);
})

app.use((ctx, next) => {
    // next函数就表示 控制下一个中间件是否执行
    console.log(5);
})

// 1，2，5，7，6
```

## 错误监听
> 防止某个错误导致代码无法执行，影响其他进程。
```js
const Koa = require('koa');
const app = new Koa()

app.use(ctx => {
    console.log(names);
    ctx.body = 'koa中的错误监听'
})

// 做错误监听
app.on('error', err => {
    console.log('--------------');
    // console.log(err);
    // 错误信息 在err.message中
    console.log('错误是', err.message);
})
app.listen(3000)
```

## 错误日志
> 通过第三方插件`koa-logger`和`koa-log4`可以对错误日志进行记录  
> 通过`koa-onerror`可以对错误进行处理，以便于控制台打印
- 1. 新建`logger`文件夹，新建`index.js`
```js
// logger > index.js
const path = require('path')
const log4js = require('koa-log4')

log4js.configure({
    appenders: {
        //   访问级别
        access: {
            type: 'dateFile',
            // 生成文件的规则
            pattern: '-yyyy-MM-dd.log',
            // 文件名始终以日期区分
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            // 生成文件路径和文件名
            filename: path.join(__dirname, 'logs', 'access')
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            filename: path.join(__dirname, 'logs', 'application')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'info'
        },
        access: {
            appenders: ['access'],
            level: 'info'
        },
        application: {
            appenders: ['application'],
            level: 'WARN'
        }
    }
})

module.exports = {
    // 记录所有访问级别的日志
    accessLogger: () => log4js.koaLogger(log4js.getLogger('access')),
    // 记录所有应用级别的日志
    logger: log4js.getLogger('application')
}   
```
- 2. 在主文件`server.js`中引入错误日志的方法。
```js
// server.js
const Koa = require('koa');
const loggers = require('koa-logger');
//在控制台可以把错误输出更详细
const onerror = require('koa-onerror');
//错误处理的中间件

const {
    accessLogger,
    logger
} = require('./logger')

const app = new Koa()

// 配置中间件
app.use(loggers())
app.use(accessLogger())
onerror(app)

app.use(ctx => {
    console.log(abc);
})

// 我们可以去对我们的代码做一个监听
// 做一个错误监听
app.on('error', err => {
    console.log('--------------');
    // console.log(err);
    // 错误信息 在err.message中
    console.log('错误是', err.message);
    // 把错误写入日志
    logger.error(err.message)
})
app.listen(3000)
```

## 路由
> 使用第三方插件`@koa/router`，可以配置路由
```js
// 路由的使用 使用的是第三方模块
const Koa = require('koa');
// 导入路由模块
const Router = require('@koa/router')
// 生成实例
const app = new Koa()
// 生成路由的实例
const router = new Router()


// 定义路由规则
// 路由规则指的就是不同的请求 不同处理
router.get('/', ctx => {
    // 这就表示 接收到get请求的 路由地址什么都没有的请求
    // http://localhost:3000
    ctx.body='hello get router'
})
router.get('/userList', ctx => {
    // 这就表示 接收到get请求的 路由地址是/userList
    // http://localhost:3000/userList
    ctx.body = 'hello userList'
})
router.post('/', ctx => {
    ctx.body='hello post'
})

// 注册路由
app.use(router.routes())

app.listen(3000)
```

### 分级路由
> 将不同功能，分别在不同的文件夹内定义，然后共同引入路由，实现功能区分。
- 1. 新建`route`文件夹，新建`goods.js`
```js
// goods.js
const Router = require('@koa/router')

// 生成路由实例
const router = new Router()
router.get('/goods', ctx => {
    ctx.body = 'goodslist'
})
router.post('/goods/add', ctx => {
    ctx.body = 'add goods'
})
router.post('/goods/delete', ctx => {
    ctx.body = 'delete goods'
})
// 此时我们要把路由暴露出去 外面才可以去使用
module.exports = router
```

- 2. `server.js`引入暴露的分级路由
```js
const Koa = require('koa');
const Router = require("@koa/router")
// 引入你的goods模块
const goods = require('./route/goods.js');
const router = new Router()
const app = new Koa()

router.post('/login', ctx => {
    ctx.body = '这是登录请求'
})

// 注册并使用user模块
app.use(goods.routes())
// 该模块允许使用分级路由
goods.allowedMethods()

app.use(router.routes())
app.listen(3000)
```
### 路由简写
> 使用`router.prefix`可以简写相同的路由.
```js
// user.js
const Router = require('@koa/router')
const router = new Router()

router.prefix('/user')
// 写上这个之后 后面的就不需要在加/user
router.get('/', ctx => {
    ctx.body='list'
})
router.post('/add', ctx => {
    ctx.body='add'
})
router.post('/delete', ctx => {
    ctx.body = 'delete'
})

module.exports = router
```
```js
// server.js
const Koa = require('koa')
const user = require('./route/user')
const app = new Koa()
app.use(user.routes())
user.allowedMethods()

app.listen(3000)
```


### 路由参数
- get请求(查询请求/动态路由请求)
```js
// get请求
// 前端传参形式一，查询请求： :3000/?name='wc'&password='123'
// 对于查询请求，使用ctx.query可以获取参数对象。
router.get('/', ctx => {
    console.log(ctx.query);
    ctx.body = 'get请求query传参收到了'
})

// 前端传参形式二，动态路由请求： :3000/wc/123'
// 对于动态路由请求，需要定义好相应的路由 /:name/:password
// 使用ctx.params 可以获取参数对象。
router.get('/:name/:password', ctx => {
    console.log(ctx.params);
    ctx.body = 'get请求params传参收到了'
})
```

- post请求
```js
// post请求
// 对于post请求，需要使用第三方依赖 koa-bodyParser
// 引入同时注册
// 然后可以通过 ctx.request.body 获取请求参数对象

const Koa = require('koa')
const Router = require('@koa/router')
const router = new Router()
const app = new Koa()
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

router.post('/login', ctx => {
    // post请求传递的参数 我们都在ctx.request.body里面接收
    console.log(ctx.request.body);
    // 此时 我们的ctx.request.body就是一个对象 我们的数据就在里面
    ctx.body='这是Post请求'
})

app.use(router.routes())
app.listen(3000)
```

### 实现登录检验功能
```js
const Koa = require("koa");
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const app = new Koa()
const router = new Router()
app.use(bodyParser())
let user = [{ username: "admin", password: "admin"}]
router.post('/login', ctx => {
    console.log(ctx.request.body);
    // 1.拿到前端传递的数据
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    // 2.判定
    let flag = false;
    user.forEach(item => {
        if (item.username == username) {
            flag = true
            if (item.password == password) {
                ctx.body = '登录成功'
            } else {
                ctx.body = '密码错误'
            }
        }
    })
    if (!flag) {
        ctx.body='账号不存在'
    }
})

// 注册接口
router.post('/register', ctx => {
    // 判定账号是否存在
    let { username, password } = ctx.request.body;
    let arr = user.filter(item => item.username == username)
    if (arr.length > 0) {
        // 账号已存在
        ctx.body = '账号已存在，不能重复注册'
    } else {
        // 账号可以使用
        user.push({
            username, password
        })
        ctx.body = '注册成功'
    }
})

app.use(router.routes())
app.listen(3000)
```

### 路由重定向
> 使用`ctx.redirect()`可以实现路由重定向
```js
router.get('/user', ctx => {
    // 重定向
    ctx.redirect('/user/list')
})
```
## 解决跨域问题
> 引入第三方依赖`@koa/cors`, 亲身经历使用别的依赖都报错，例如`cors, koa-cors`等等  
> 引入之前可以看`npm官网`的下载量，确定是否官方。
```js
const cors = require('@koa/cors');
app.use(cors())
```
## 服务器静态资源托管
> 实现访问服务器的静态资源，例如访问图片，访问主页查看API  
> 引入第三方依赖`koa-static`, 注册依赖，同时新建`public`文件夹。
```js
const Koa = require('koa')
const static = require('koa-static');
const app = new Koa()

// console.log(__dirname);
// E:\work\maluEdu05\0802-Node\代码\06-服务器托管静态资源
app.use(static(__dirname, './public'))
// 这一行代码的作用 就是托管文件夹
app.listen(3000)
```

## 文件上传功能
> 实现文件上传到服务器静态资源文件夹，并且更名保存  
> 引入第三方依赖`koa-multer`,注册依赖。
```js
const Koa = require('koa')
const Router = require('@koa/router')
const multer = require('koa-multer')
const static = require('koa-static')
const app = new Koa()
const router = new Router()
app.use(static(__dirname, './public'))
// 配置上传的硬盘信息
let newName;
var storage = multer.diskStorage({
    // 配置上传文件的目录
    destination: function (req, file, cb) {
        cb(null, 'public/');//这个路径必须是已经存在的路径
    },
    // 文件上传之后 要重命名
    filename: function (req, file, cb) {
        console.log(file);//这个file是文件信息
        var fileFormat = file.originalname.split('.')
        fileFormat = fileFormat[fileFormat.length - 1];
        // 现在起一个新的名字
        newName = Date.now() + '.' + fileFormat;
        cb(null, newName)
    }
})

// 加载配置  这里加载了我们上面配置的storage
var upload = multer({ storage });
// upload.single('touxiang')表示我们接口过来的时候 先走了upload.single('touxiang')
// 这个中间件 你上传的文件的属性名需要叫touxiang
router.post('/upload', upload.single('touxiang'), ctx => {
    ctx.body = {
        msg: "文件上传成功",
        filename: newName
    }
})
app.use(router.routes())
app.listen(3000)
```

## 图形验证码功能
> 实现生成图形验证码，以供前端访问  
> 引入第三方依赖`trek-captcha`
```js
const Koa = require('koa');
const Router = require('@koa/router');
// 如果你想用图形验证码功能 需要引入插件 trek-captcha
const captcha = require('trek-captcha');
const app = new Koa()
const router = new Router();

router.get('/captcha', async ctx => {
    // 生成一个验证码
    // captcha返回的是一个promise对象 所以我们这里要用到await
    let data = await captcha({ size: 4 });
    console.log(data);
    // 这里面的buffer是指buffer字符串, 前端图片src请求的话，直接显示图片(验证码)。
    // token指的就是 秘钥(验证码)
    // 现在只需要把我的buffer发过去
    ctx.body = data.buffer
})
app.use(router.routes())
app.listen(3000)
```


## 鉴权
> 常见的鉴权方式：cookies鉴权，session鉴权(基于cookies)，jwt+token鉴权。
### cookies鉴权
> 访问请求时，给前端设置一个cookies, 并且可以读取前端的cookies.
```js
const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const router = new Router()
// 设置cookies的路由
router.get('/login', ctx => {
    // cookie鉴权
    // 第一个参数是属性名 第二个是属性值 第三个参数是配置信息
    ctx.cookies.set('username', 'malu', {
        maxAge: 10000,//存活时间 以毫秒为单位
    })
    ctx.body = '登录成功'
})

// 鉴权cookies的路由
router.get('/detail', ctx => {
    if (ctx.cookies.get('username')) {
        ctx.body = {
            msg: "这是具体信息"
        }
    } else {
        ctx.body = {
            msg: "请登录"
        }
    }
})
app.use(router.routes())
app.listen(3000)
```
- 统计网站访问次数
```js
const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const router = new Router()
router.get('/login', ctx => {
    let times = 0;
    if (ctx.cookies.get('times')) {
        times = ctx.cookies.get('times')
    }
    times++

    let lastTime = ctx.cookies.get('lastTime')
    ctx.cookies.set('lastTime', new Date().toLocaleString(), {
        maxAge: 60000 * 24 * 24,//存活时间 以毫秒为单位
    })
    ctx.cookies.set('times', times, {
        maxAge: 60000 * 24 * 24,//存活时间 以毫秒为单位
    })
    if (!lastTime) {
        ctx.body = '这是你今天第一次访问'
    } else {
        ctx.body = `登录成功，这是你今天第${times}访问，上一次的访问时间是${lastTime}`;
    }
})
app.use(router.routes())
app.listen(3000)
```
### session鉴权
> 引入插件，`koa-session`,  
> 使用`session()`方法，将cookies加密一下，再返回给前端的cookies.

```js
const Koa = require('koa')
const Router = require('@koa/router')
const session = require('koa-session')
const app = new Koa()
const router = new Router()


// 添加加密签名
app.keys = ['some secret hurr'];
// 定义加密配置项
const CONFIG = {
    key: 'koa.sess', //相当于你要存储到cookie里面的属性名
    maxAge: 86400000,//有效期
    httpOnly: true, //表示只有服务器可以修改
    signed: true, //签名cookie
};

// 设置中间件，所有请求过来的内容，都会被session加密一下。
app.use(session(CONFIG, app));
// 将上面的配置信息和加密签名与session组件 产生联系

router.get('/login', ctx => {
    // 现在你的真实数据 存在服务器
    console.log(ctx.session.count);
    if (ctx.session.count) {
        ctx.session.count++
    } else {
        ctx.session.count = 1
    }
    ctx.body = `这是你第${ctx.session.count}次访问`
})
app.use(router.routes())
app.listen(3000)
```

### JWT+Token鉴权
> 使用第三方插件`jsonwebtoken(JWT)`加密生成Token, 并且使用`koa-jwt`加息Token  
> 更加安全，并且不会保存到cookies中
```js
const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken');//加密
const jwtAuth = require('koa-jwt')//解密
const app = new Koa()
const router = new Router()
app.use(bodyParser())


//添加秘钥(非常重要)
const secret = 'some secret hurr';

// 使用jsonwebtoken包 的 jwt.sign生成加密密钥
router.post('/login', ctx => {
    // 此时我们要根据信息和秘钥生成一个加密字符串
    let { body } = ctx.request;
    // 生成加密字符串 也就是我们的token
    let token = jwt.sign({
        data: body,//加密数据 这里最好不要放敏感数据,
        // 设置一个过期时间 是指具体的时间 不是时间段 这里面的单位是秒
        exp: Math.floor(Date.now() / 1000) + 60 * 60
        // 这就表示 这个token有效期是一小时
    }, secret)
    ctx.body = {
        code: 1,//实际上就是前端用于区分情况的一个编码
        msg: "登录成功",
        token
    }
})

// 使用koa-jwt包 的 jwtAuth解析加密密钥
router.get('/list', jwtAuth({ secret }), ctx => {
    ctx.body = {
        // 加密的数据都在这里
        detail: ctx.state.user.data
    }
})
app.use(router.routes())
app.listen(3000)
```