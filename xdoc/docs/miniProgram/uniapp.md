# uniapp
## 多端兼容
### 条件编译 - #ifdef
> C语言中，通过`#ifdef`、`#ifndef`的方式，(`if defined`和 `if not defined`)  
> 可以适配windows、mac等不同os编译不同的代码。  
> uniapp借鉴了这个，使用`注释`+`#ifdef`+`平台`指定编译平台  
> 使用`注释`+`#endif`表示该结束。  
- js示例：
```js
let a;
// #ifdef MP-WEIXIN 
a = '微信小程序平台';
// #endif

// #ifdef MP-ALIPAY
a = '支付宝小程序平台';
// #endif 

// #ifdef MP-TOUTIAO
a = '抖音小程序平台';
// #endif
```
- css示例：
```css
/* #ifdef MP-WEIXIN */
.active{
	color: red;
}
/* #endif */

/* #ifdef MP-TOUTIAO  */
.active{
	color: #333;
}
/* #endif */
```
- 组件示例：
```html
<view>
	<!-- #ifdef MP-WEIXIN -->
	<wx-component></wx-component>
	<!-- #endif -->
	<!-- #ifdef MP-TOUTIAO -->
	<tt-component></tt-component>
	<!-- #endif -->
</view>
```
> 条件编译不仅可以用于`js`文件，也可以用于`.vue`,`.css`,`组件`等**任何被编译**的地方。  

### 跨平台事件系统
#### 页面跳转事件
> 使用`uni.navigateTo`, `uni.redirectTo`, `uni.switchTab`   
> `uni.navigateBack`等事件，可以实现页面跳转。  
> 在不同平台均兼兼容。  

#### 请求
> 使用`uni.request`可以代替`axios`的请求。  
```js
uni.showLoading({
    title: "请求中..."
})
uni.request({
	url: xxx,
	method: xxx,
	data: xxx,
	header: xxx,
	timeout: xxx,
	success(res){

	},
	fail(err){

	},
	complete() {
       uni.hideLoading()
    },
})
```
#### 上传文件
> 使用`uni.chooseImage`可以拿到用户上传的文件。  
> 使用`uni.uploadFile`可以将文件上传到服务器。
```js
uni.chooseImage({
	count: 1,
	sizeType: ['compressed'],
	sourceType: ['album'],
	success: (res) => {
		var imageSrc = res.tempFilePaths[0]
		uni.showLoading({
			title: '上传中'
		})
		uni.uploadFile({
			url: 'https://unidemo.dcloud.net.cn/upload', //仅为示例，非真实的接口地址
			filePath: imageSrc,
			name: 'file',
			formData: {
				'user': 'test'
			},
			success: (res) => {
				uni.showToast({
						title: '上传成功',
						icon: 'success',
						duration: 1000
				})
				this.imageSrc = imageSrc
			},
			fail: (err) => {
				uni.showModal({
				content: err.errMsg,
				showCancel: false
			});
			},
			complete(){
				uni.hideLoading();
			}
		});
	},
	fail: (err) => {
		console.log('chooseImage fail', err)
	}
})
```

### 其他注意点
> 组件和API的选择  
> 样式的适配  
> 图片资源的适配  
> 功能的兼容性  
> 调试和测试

## 地图组件和API
> 参考至[`uniapp官网-地图组件控制`](https://uniapp.dcloud.net.cn/api/location/map.html#createmapcontext)