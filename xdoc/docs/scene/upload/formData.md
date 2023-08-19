# formData文件上传
> 本章节将完整的演示一个单文件上传案例  
- 功能及内容
- 后台
	- 重命名保存(koa)上传的文件
	- 静态托管,支持请求文件
	- 上传接口定义
- 前台
	- 文件点击上传
	- 随时取消上传请求
	- 随时预览上传进度
	- 文件上传前预览
	- 文件上传后预览
- 可扩展,待增加
	- 文件拖拽上传
	- 多文件可选上传
	- 文件断点续传
	- ...等等功能
## 文章API大纲
- 后台
	- koa: 服务器框架
	- koa/router: koa的官方路由依赖
	- koa-multer: 用于koa的对文件上传处理的依赖
	- @koa/cors: 用于koa的解决跨域资源访问的依赖
	- koa-static: 用于koa的静态资源托管的依赖
- 前台
	- axios: ajax请求库
		- onUploadProgress: 为上传处理原生进度事件e。
			- e.loaded: 表示当前上传了多少。
			- e.total: 表示一共上传文件有多大。
		- AbortController: 用于构造取消请求的`fetch`请求控制器。
			- controller.abort(): 用于取消请求。
			- controller.signal: 用于注册请求控制器。
		- axios.post: 请求库的post请求方法。
	- FormData: 用于携带表单`数据`的`表单容器类`
	- FileList: `input:file`上传文件时，产生的`文件对象`
	- FileReader: 用于读取`file`数据并且显示的`文件读取对象`
		- reader.readAsDataURL(file): 用于读取文件对象，将其转换为`base64`数据
		- reader.result: 表示`reader`中`load`事件的`base64`数据。
## 后台配置(次要)
> 使用koa和koa周边的依赖包，编写一个上传接口`http://localhost:3000/upload`  
> 并且把上传的文件，重命名后保存在`public`文件夹下。
> 开启静态托管。
> 接口类型`post`, 接口参数{`img`: formData}
```js
const Koa = require('koa')
const Router = require('@koa/router')
const multer = require('koa-multer')
// 我们如果想使用文件上传
// 需要引入一个插件 koa-multer
// 静态托管
const static = require('koa-static')
const cors = require('@koa/cors');
const app = new Koa()
const router = new Router()
app.use(static(__dirname, './public'))
app.use(cors())

// 文件重命名
let newName;
// 配置上传的硬盘存储信息
var storage = multer.diskStorage({
    // 配置上传文件的目录
    destination: function (req, file, cb) {
        cb(null, 'public/');//这个路径必须是已经存在的路径
    },
    // 文件上传之后 要重命名
    filename: function (req, file, cb) {
        // console.log(file);//这个file是文件信息
        var fileFormat = file.originalname.split('.')
        fileFormat = fileFormat[fileFormat.length - 1];
        // 现在起一个新的名字
        newName = Date.now() + '.' + fileFormat;
        cb(null, newName)
    }
})

// 加载配置  这里加载了我们上面配置的storage
var upload = multer({ storage });

// upload.single('img')表示我们接口过来的时候 
// 先走了upload.single('img')
// 这个中间件 你上传的文件的属性名需要叫img
router.post('/upload', upload.single('img'), (ctx,next) => {
    ctx.body = {
        msg: "文件上传成功",
        filename: newName,
        url: 'http://localhost:3000/public/'+newName
    }
})

app.use(router.routes())
app.listen(3000,()=>{
    console.log('服务启动在'+'http://localhost:3000')
})
```

## 前台配置
### 点击上传
> 利用`label`的`for`属性和`input`绑定,实现点击.  
> 也可以设置`input`的宽高为`100%`, 同时设置`透明度`为`0`
```html
<div class="container">
	<!-- 用label占满的for和id绑定，实现label点击触发input。 -->
	<label for="upload" id="preview"></label>
	<!-- 定义一个盒子，用来预览上传进度，并且覆盖在上面 -->
	<div id="previewBox">
		<input type='range' min="0" max="100" value="0">
		<p><span id="ps">0</span>%</p>
		<button id="cancel">取消</button>
	</div>
	<input type="file" id='upload' accept="image/png,image/jpg,image.gif " value="请上传文件...">
</div>
上传前预览
<div class="beforeUpload">
	<img src="" id="beforeImg">	
</div>
```
### axios请求和取消请求
```js
// 创建取消请求控制器
const controller =  new AbortController();
axios.post(url, formData, {
	// 这里写配置对象
	// 例如，传文件要配置请求头,header
	header: {'Content-Type': 'multipart/form-data'},
	// 例如，配置请求取消控制器,signal
	signal: controller.signal
	// 例如配置上传进度事件
	onUploadProgress: (event)=>{
		// event.loaded表示上传了多少
		// event.total表示文件总大小
	}
})
.then(sucess=>{

})
.catch()

// 如点击按钮btn立即取消请求
btn.onclick = fucntion(){
	// 用控制器对象取消请求
	controller.abort();
	// 。。。做别的操作
}
```

### 上传前预览
```js
// 利用FileReader()构造器,读取file文件，
let reader = new FileReader();
reader.readAsDataURL(file);
// 将file格式，转换为base64保存在reader.result上面。
// 监听reader在加载完了以后，将其的result属性值显示在页面上
reader.addEventListener('load',function(){
	img.src = this.result;
})
```

### 上传后预览
```js
// 上传后预览，就是在上传成功以后，拿到返回的url数据
// 在.then内部将其绑定在页面上
// 同时做一些别的操作
.then(sucess=>{
	img.src = suceess.data.url;
})
```

### 预览文件上传进度
```js
// 利用onUploadProgress配置项中,
// e.loaded 和e.total属性求百分比
axios.post(url, formData, {
	headers: {'Content-Type': 'multipart/form-data'},
	signal: controller.signal,
	onUploadProgress: function(e){
		let precent = Math.floor(e.loaded / e.total) * 100;
		// ...显示在页面上
	}
})

```

### 完整案例
```js
// 1. 实现上传功能
// 2. 实现监控上传进度
// 3. 实现上传后预览(就是再次发起请求,因为返回了url)
// 4. 实现上传前预览(利用FileReader)
let container = document.querySelector('.container');
let range = document.querySelector('input[type="range"]');
// console.dir(range);

// axios中，取消请求的一种方式，支持类似于fetch方式取消-- 
// 1. 创建AbortController 构造实例，取消请求。
// let controller = new AbortController();
let controller = new AbortController();

upload.onchange = function (eve) {
	// console.dir(eve);
	let formData = new FormData();
	let progress = 0; //表示上传进度。
	formData.append('img', eve.target.files[0]);
	// 上传前预览
	const file=this.files[0];
	if(file){
			// 创建reader对象
	        const reader=new FileReader();
	        // 读取文件数据: 由于load是异步的,所以这步可以写在load事件之前.
	        reader.readAsDataURL(file);
	        // 监听是否有文件正在上传
	        reader.addEventListener('load',function(){
	        	// 打印这个reader对象
	            console.log(this);
	            // 这个reader对象的result属性,就是base64格式的图片信息.
	            beforeImg.setAttribute('src',this.result);
	        });

	}
	else{
		beforeImg.setAttribute('src',"");
	}

	// 准备上传了，让进度条显示出来
	previewBox.style.display = 'flex';
	axios.post('http://localhost:3000/upload', 
		// 参数二：传递文本对象
		formData,
		{	
			// 2. 请求头使用signal,注册取消控制器
			// 3. 则可以在任意地方，使用controller.abort()取消请求。
			signal: controller.signal,
			headers: { 'Content-Type': 'multipart/form-data' },
			// 使用onUploadProgress配置
			// 为上传处理原生进度事件(原生ajax有一个xhr.upload.onprogress事件)
			onUploadProgress: function (progressEvent) {
				// 我们要借用它的loaded 和 total属性
				// 就可以计算出上传百分比
				// 而它的event下，有个timeStamp，表示时间。
				let precent = Math.floor((progressEvent.loaded / progressEvent.total)*100);
				// 调慢网速测试
				console.log("上传百分比"+precent);
				// 然后根据百分比，修改页面上的进度长度。
				range.value = precent
				ps.innerHTML = precent
					},
		}
	).then(val => {
		// console.log(val.data.url);
		// 上传结束，关闭进度条显示
		previewBox.style.display = 'none';
		preview.style.backgroundImage = `url(${val.data.url}`;
		preview.style.backgroundSize = 'cover';
		preview.style.backgroundPosition = 'center center';
		preview.style.backgroundRepeat = 'no-repeat';
	}).catch(val => {
		console.log(val);
	})
}

range.oninput = function(){
	ps.innerHTML = this.value
}

// 如果中途取消请求
cancel.addEventListener('click', function(){
	controller.abort();
	// 我们点击取消请求后，AbortController中的aborted属性由false --> true，并始终保持为true(基于promise设计，一旦abort()取消以后会变为失败态。)
	// 因此取消后需要重新创建一个新的controller，来替代旧的。
	// 但是如果有controller要先置为空,再替代.
	//取消后需要重新创建一个新的controller，来替代旧的。
	// 但是如果有controller要先置为空,再替代.
	if(controller){
	    controller = null;
	} 
	// 新的controller,pendding 态,直到上传.
	controller = new AbortController();
	// 恢复不显示
	range.value = '0';
	ps.innerHTML = range.value;
	previewBox.style.display = 'none';
	preview.style.background = `#fff`;
})
```
- html
```html
<div class="container">
	<!-- 用label占满的for和id绑定，实现label点击触发input。 -->
	<label for="upload" id="preview"></label>
	<!-- 定义一个盒子，用来预览上传进度，并且覆盖在上面 -->
	<div id="previewBox">
		<input type='range' min="0" max="100" value="0">
		<p><span id="ps">0</span>%</p>
		<button id="cancel">取消</button>
	</div>
	<input type="file" id='upload' accept="image/png,image/jpg,image.gif " value="请上传文件...">
</div>
上传前预览
<div class="beforeUpload">
	<img src="" id="beforeImg">	
</div>
```
- css
```css
.container,
.beforeUpload{
	border: 2px dashed rgb(27, 110, 243);
	width: 300px;
	height: 300px;
	border-radius: 10px;
	position: relative;
	overflow: hidden;
}
label{
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
	background: #fff;
}
.container input[type="file"]{
	display: none;
}

#previewBox{
	position: absolute;
	width: 100%;
	height: 300px;
	background: #333;
	z-index: 10;
	display: none;
	/*display: flex;*/
	justify-content: center;
	align-items: center;
}
.beforeUpload img{
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center center;
}
```

## 扩展功能
### 拖拽及多选上传
> 实际上,`input`本身支持`拖拽上传`, 但是大部分情况下,会把`input`隐藏.  
> 因此,使用`dragover`和`dragenter`事件,阻止默认事件.  
> 同时利用`drop`事件中的`e.dataTransfer`对象拿到放下的`数据`.
> `e.dataTransfer.files`可以拿到`放下的文件组FileList`.
> `FileList`中的`type`可以得到`文件类型`.
```js
// 例如创建一个测试div.test标签
// 关闭dragover,dragenter和dragdrop的默认事件 (默认禁止)
test.ondragover = function(e){
	e.preventDefault();
}
test.ondragenter = function(e){
	e.preventDefault();
}
// 打印e.dataTransfer.files
test.ondrop = function(e){
	e.preventDefault();
	console.dir(e.dataTransfer.files);
	// 类型
	let arr = Array.from(e.dataTransfer.files);
	let isAllImg = arr.every (e => e.type == "image/png");
	!isAllImg ? alert('只允许上传图片') : console.log('可以上传');
	// 长度
	e.dataTransfer.files.length > 3 ? 
	alert('只允许一次性上传3张图片') : console.log('可以上传');
}
```

### 拖拽后预览
> 如果通过`type`判断类型符合,
> 可以继续使用`上传前预览`的`FileReader`构建`reader`对象.
> 利用`reader.result`拿到`reader.readAsDataURL(file)`的
> `base64`数据，赋值给`src请求`实现拖拽预览.
```js
test.ondrop = function(e){
	let file = e.dataTransfer.files[0];
	if(file.type == "image/png"){
		// 创建reader对象
		let reader = new FileReader();
		// 读取文件对象
		reader.readAsDataURL(file);
		// 监控load事件，e.result表示读取的base64数据，
		// 将其显示在页面
		reader.addEventListener('load', ()=>{
			testImg.src = reader.result;
		})
	}
	else{
		alert('类型不一致')
	}
}
```