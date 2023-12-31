## axios拦截器
### axios实例
```js
// axios可以使用.create()方法创建axios实例。
const instance = axios.create({
	baseURL: "https://some-domain.com/api",
	timeout: 1000
})
```
### axios请求/响应拦截器
> 在请求或响应被 then 或 catch 处理前拦截它们。  
> 便于将重复的代码集中处理.  
> 例如每次响应结果都需要取data里的数据,可以提前将response处理为data,外界多次响应时,无需多次重复处理.
```js
// 每个axios实例，包括axios自己，都有拦截器属性，
// 拦截器属性可以针对request和response, 使用use方法配置拦截器.
// use方法内部,传入两个回调函数作为参数
// 对于request: 分别处理  发送请求之前 需要对请求配置做啥, 请求错误 需要做啥.
// 对于response: 分别处理 响应到then之前,对响应数据 需要做啥, 响应错误该做啥.

// 全局拦截器
// 请求 axios.interceptors.request.use(...)
axios.interceptors.request.use(function(config){
	// config 表示 用户设置的请求配置
	return config
},function(error){
	// 此处使用Promise.reject, 便于catch 处理
	return Promise.reject(error);
});
// 响应 axios.interceptors.response.use(..)
axios.interceptors.respons.use(function(response){
	return response
},function(error){
	return Promise.reject(error)
})

// 创建实例的请求拦截器
// 例如在api.js
const api = axios.create({
	baseURL: "https://some-domain.com/api",
	timeout: 1000
})

api.interceptors.request.use(function(config){
	// 添加默认的data为'Fred'
	config.data.firstName = config.data.firstName || 'Fred'
	// 记得将结果返回出去
	return config;
},function(error){
	return Promise.reject(error);
})
api.interceptors.response.use(function(response){
	// 对响应数据做处理,让外界使用的时候更加方便
	// 如果有data,直接给response, 如果没有,给一个空消息
	response = response.data || {message: []}
	// 记得将结果返回出去
	return response;
},function(error){
	return Promise.reject(error);
})
```
#### 拦截器案例：
```html
<script src="./axios_1.3.6_axios.js"></script>
<body>
	<button onclick="" id="btn">发送请求</button>	
	<script type="text/javascript">
		// 创建响应拦截器
		// 创建实例
		const api = axios.create({
			baseURL: "http://ajax-api.itheima.net/api",
			timeout: 1000
		})

		// 利用实例的拦截器属性，响应属性和use方法，创建响应拦截器
		api.interceptors.response.use(function(response){
			var responseT;
			for(let key in response){
				if(key=='data'){
					responseT = response[key];
					console.log("浅拷贝成功");
				}
			}
			return responseT;
		});

		btn.onclick = function(){
			// 点击发送请求，如果请求成功，打印请求数据
			// axios.get('http://ajax-api.itheima.net/api/news').then(response=>{
			// 	console.log(response)
			// }).catch(error => {
			// 	console.log("请求失败" + error);
			// })

			// 使用axios实例，配合响应拦截器使用。
			api.get('/news').then(response=>{
				// 这样这个response就只是含data和message数据的对象了。
				console.log(response)
			}).catch(error => {
				console.log("请求失败" + error);
			})
		}
	</script>
</body>
```