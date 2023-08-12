# Ajax
> `异步`通讯协议, Asynchronout javascript and xml  
> 异步的js和xml, 开创了`不刷新页面`也能加载数据的先河。
## 通讯背景
> 请求的方式: `ajax`(异步通讯协议), `websocket`(同步通讯协议),   
> 浏览器地址栏(get请求), a标签的href, link标签href, img标签里面的src, script标签src, 表单, postman/apifox 工具。  
- 跨域: `不同源`的情况下会产生跨域，协议+端口号+域名(ip地址)。
- 同源策略：`服务器`和`客户端`之间发送或接收数据的安全保护措施。
- 解决跨域：
	- 后端配置
	- 前端配置代理服务器
		- 客户端 向自己配置的服务器发送请求 (同源),
		- 再由前端服务器向后端服务器发送请求(不存在跨域问题)
	- nginx反向代理 
	- jsonp跨域:利用`src href...`不会产生跨域问题的特性。 

## 原生Ajax
> 使用XHLHttpRequest创建网络请求
- 请求四步走
1. 创建网络请求实例
2. 监听网络请求状态变化
3. 配置网络请求
4. 发送请求
- 案例
```js
// 1.创建网络请求实例
let xhr = new XMLHttpRequest();
// 2.监听这个实例对象的变化
xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
    // 当我们的readyState的状态变成4的时候
    // 就表示请求完成了
    if (xhr.readyState == 4) {
        console.log('请求完成了');
        console.log(xhr);
        console.log('响应的数据', xhr.response);
    }
}
// 2.2 一般使用onload代替onreadystatechange
xhr.onload = function () {
    // onload事件 就会在你的请求调用完成之后,自动执行
    console.log(xhr.readyState);
    console.log(JSON.parse(xhr.response));
}
// 3.配置网络请求信息
xhr.open('get', 'http://localhost:3000/login')

// 4.发送
xhr.send()
```

### 浏览器解析后端响应的数据
- 响应`json`数据
```js
xhr.responseType = 'json'
// json会自动的解析成对象
```
- 响应`xml`数据
```js
// xml默认解析为字符串
box.innerHTML = xhr.response
```
### 请求传参
#### get请求传参
> 对应`koa`后端服务器的`ctx.query和ctx.params`
1. 查询字符串数据拼接(`?`和`&`)
2. 动态路由的路径写法传参(/id/)
```js
xhr.open('get', 'http://localhost:3000/tologin?username=zhangsan')
xhr.open('get','http://localhost:3000/tologins/zhangsan')
```
#### post请求传参
> post请求需要先设置`请求头`，然后`发送数据`
> post请求支持发送`formData`容器的数据
```js
// 第一种 发送post请求的参数的时候 需要设置请求头
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.send(`username=${usernameVal} && password=${passwordVal}`)

// 第二种 直接发送一个对象 告诉服务器 你发送的数据的类型是json类型
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({ username: usernameVal, password: passwordVal }))

// 可以创建一个form容器
let formdata = new FormData();
// 往formdata容器里面塞数据
formdata.append('username', 'zhangsan')
formdata.append('password', '123')
// 这个时候我们发送请求的时候 就可以把这个formdata容器发过去
xhr.send(formdata)
```

### 设置延迟时间
- `timeout`属性设置延迟时间，
- `abort`属性取消请求
```js
xhr.timeout = 3000
xhr.abort()
```

## jQuery-Ajax
> jQuery封装了一系列方法，用于网络请求。  
> jQuery自动将返回的数据进行解析为对象使用。
- `$.ajax`是请求函数，通过`配置项`的形式，可以进行网络请求
- `$.get`是get请求函数，通过`url`,`data对象`,`callback`三个参数，实现请求。
- `$.post`是post请求函数，通过`url`,`data对象`,`callback`三个参数，实现请求。
```js
// $.ajax方法
$.ajax({
    type: 'GET',
    // type 类型 请求类型 字母要大写
    url: "http://localhost:3000/login",
    // url指的是请求的地址
    success: function (result) {
        console.log('请求成功了');
        console.log(result);
    },
    // success的属性值是一个函数 表示成功时回调 这个函数的参数 就是成功时服务器响应的结果
    // 这个成功表示请求成功
    error: function (error) {
        console.log('请求没有成功的回调');
        console.log('失败的原因', error);
    }
})

// $.get方法
// 第一个参数是请求的地址
// 第二个参数是请求的数据
// 第三个参数是请求的成功回调
$.get('http://localhost:3000/login', { username: 'admin' }, function (result) {
    console.log(result);
})

// $.post方法
// 第一个参数是请求的地址
// 第二个参数是请求的数据
// 第三个参数是请求的成功回调
$.post('http://localhost:3000/login', { username: 'admin' }, result => {
    console.log(result);
})
```

### 使用promise处理ajax请求
> 由于网络请求是异步的，默认`返回promise`对象。  
> 如果要处理请求的数据，往往需要使用`promise.then`方法。
```js
$.ajax({
    type: 'GET',
    url: 'http://localhost:3000/login',
}).then(result => {
    console.log(result);
})

async function main(){
	let res = await getData({username: 'admin'});
	console.log(res); //拿到请求成功的数据
}

function getData(data){
	return $.post('http://localhost:3000',data);
}

main();
```

## axios
### 基本使用
> 使用`axios.request`函数发送请求  
> 使用`axios.get`和`axios.post`函数发送请求。
> 使用`axios`请求的`响应数据`中，包括默认的`status, config, headers`等。
```js
// 使用request
axios.request({
    url: "http://localhost:3000/login",
    // url是地址
    method: 'get'
    // method指的是类型 小写
}).then(result => {
    console.log(result);
    console.log(result.data);
})

// 单纯的发送一个get/post请求
axios.get('http://localhost:3000/login')
.then(res=>{
    console.log(res);
})
```
### 路由传参
- get请求传参
```js
// 1.拼接传参
axios.get('http://localhost:3000/logins?id=1')
.then(res => {
    console.log(res);
})
// 2.动态路由传参
axios.get('http://localhost:3000/loginss/123')
.then(res => {
    console.log(res);
})
// 3.前端使用params对象传参
axios.get('http://localhost:3000/logins',
    {params:{username:1,password:123}}
)
.then(res => {
    console.log(res);
})
```
- post请求传参
```js
// post请求传参
// 1.json格式传参
axios.post(
    'http://localhost:3000/logins', 
    { names: "zhangsan" }
)
.then(res => {
    console.log(res);
})
// 2.x-www-form
// https://cdn.bootcss.com/qs/6.1.0/qs.min.js 引入qs
// 转换数据和设置请求头
axios.post('http://localhost:3000/logins', 
Qs.stringify({ name: "张三" }), 
{
    headers: {
        'Content-type': "application/x-www-form-urlencoded"
    }
}
).then(result => {
    console.log(result);
})
```

### 请求拦截器
```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('请求发出去了');
    // config请求设置

    // 我们一般情况下会在请求拦截器里面添加token

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
```

### 响应拦截器
```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('响应回来了');
    // response就是你的响应体

    if (response.status == 200) {
        return response.data
    } else {
        return response;
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

## jsonp跨域
> `script标签`中`src`属性会发送`get请求`,并且不会受`跨域影响`。  
> 并且`响应数据时`，会默认`执行`请求回来的数据。
```js
// 利用响应数据执行的特性，返回一个函数给前端，
// 前端往函数里面，传入数据，就是jsonp跨域。
function jsonp() {
// 桥梁函数
let callBackName = 'malu';
// 给window上加了一个malu属性
window[callBackName] = function (data) {
    console.log(data);
}
// window['malu']=function(data){
//     console.log(data);
// }

// 这是给window上加了一个callBackName属性
// 
let url = 'http://localhost:3000/jsonp' + '?callBackName=' + callBackName
// http://localhost:3000/jsonp?callBackName=malu
let scriptEle = document.createElement('script');
scriptEle.src = url;
document.body.append(scriptEle)
}
```