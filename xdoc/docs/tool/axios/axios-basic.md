# axios
## axios的安装
- 本地安装
```html
<script src="./axios_1.3.6_axios.js">
```
- npm 安装
```sh
npm install axios
```
## axios的基本使用
### axios(config)
```js
// 可以直接将配置对象，传入axios()来发起请求
// 配置对象可以包括： methods, url, data,timeout,baseURL,headers,params,auth
// 例如
axios({
	methods: 'get',
	url: '/user',
	// baseURL 是默认添加在url前面的，除非url是个绝对路径
	baseURL: 'https://some-domain.com/api/',
	// data 是作为请求体被发送的数据
	// 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
	data: {
		firstName: 'Fred'
	},
	//`params` 是与请求一起发送的 URL 参数
	params: {
		ID: 12345
	},
	// 单位是毫秒
	timeout: 1000
})
```
### axios(url)
```js
// 默认为get请求，如果对请求不要要求，可以直接传入一个url
axios('https://some-domain.com/api/user')
```
### axios.get(url)
```js
// axios将get,post请求等，提供了单独的方法
axios.get('https://some-domain.com/api/user').then(response => console.log(response)).catch(error => console.log(error))
```
### axios.create(config)
```js
// 支持创建axios实例，创建出来的实例，可以根据配置请求和响应拦截器给各个页面使用。
const instance = axios.create({
	baseURL: 'https://some-domain.com/api/',
	timeout: 1000
})
// axios实例带有请求拦截器方法： .interceptors.request.use() 和 响应拦截器方法 .interceptors.response.use()
```
### 使用案例：
```html
<script src="./axios_1.3.6_axios.js"></script>
<script>
	axios('https://some-domain.com/api/user').then(response => {
		console.log(response)
	}).catch(error => {
		console.log(error)
	})
</script>
```