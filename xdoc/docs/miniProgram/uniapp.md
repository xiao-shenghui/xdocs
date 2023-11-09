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
> 参考我的(作者)模板项目 [uniapp-template](https://github.com/xiao-shenghui/uniapp-template)(一个集成了地图，uView, 自定义TabBar, Store 和 常用uView组件 的uniapp 模板项目。)


## 使用uView
## 起步
### 下载
1. 下载插件市场的`uView.zip`  
2. 重命名为`uview-ui`, 将整个文件放到根目录下。
### 引入
1. 引入js库
```js
// main.js
import uView from "uview-ui";
Vue.use(uView);
```
2. 引入全局scss主题文件
```css
/* uni.scss */
@import 'uview-ui/theme.scss';
```
3. 引入uView基础样式
```html
<!-- App.vue -->
<style lang="scss">
	/* 注意要写在第一行，
	同时给style标签加入 lang="scss" 属性 */
	@import "uview-ui/index.scss";
</style>
```
### 配置easycom组件模式
> 注意：修改easycom 规则`不会实时生效`，配置完后，您需要`重启`HX或者重新编译项目
```json
// pages.json
{
	"easycom": {
		"^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
	},
}
```

## 组件测试
### Tabbar底部导航栏
```html
<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
```
```js
export default {
		data() {
			return {
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 2,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '放映厅',
						customIcon: false,
					},
					{
						iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '发布',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "play-right",
						selectedIconPath: "play-right-fill",
						text: '直播',
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 23,
						isDot: false,
						customIcon: false,
					},
				],
				current: 0
			}
		},
	}
```

### Swiper 轮播图
> 注意: 必须给`u-swiper`设置宽度，不然内容会不显示。
```html
<u-swiper :list="listitem"></u-swiper>
```
```js
listitem: [{
		image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
		title: '昨夜星辰昨夜风，画楼西畔桂堂东'
	},
	{
		image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
		title: '身无彩凤双飞翼，心有灵犀一点通'
	},
	{
		image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
		title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
	}
]
```