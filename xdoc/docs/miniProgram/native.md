# 原生微信小程序
> 参考自[官方开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
## 配置项说明
> 由`app.json`决定配置
- 以下是常用的一些配置
```json
{
	// entryPagePath 定义默认启动路径，默认为index，一般不改。
   // "entryPagePath": "pages/index/index",
   // pages 定义页面和路由
  "pages": [
    "pages/index/index", 
    "pages/logs/index"
  ],
  // window 定义状态栏、导航条、标题、窗口背景色。
  "window": {
    "navigationBarTitleText": "Demo", //导航条标题文本
    "navigationBarTextStyle":"white", //导航条标题颜色，只支持白色和黑色
    "navigationBarBackgroundColor": "#000000", //导航条背景颜色
    "backgroundColor": "#ffffff", //窗口背景色
    "backgroundTextStyle":"dark", //下拉 loading 的样式，仅支持 dark / light
  },
  // 定义页面底部的 tab 栏的页面和文本
  "tabBar": {
  	"color": "#000000", //tab 上的文字默认颜色
  	"selectedColor": "#000000", //tab 上的文字被选中的颜色
  	"backgroundColor":"#fff", //tab的背景颜色
  	"borderStyle": "black", //tabbar上边框的颜色，black/white
  	"position":"bottom", //仅支持bottom / top
  	// list 接受一个数组，只能配置最少 2 个、最多 5 个 tab。
    "list": [{
      "pagePath": "pages/index/index",  //必须在pages中先定义
      "text": "首页",
      "iconPath": "./xxx", //图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。
      "selectedIconPath":"./xxx" //选中时的图片路径
    }, {
      "pagePath": "pages/logs/index",
      "text": "日志"
    }]
  },
  "networkTimeout": {
  	// 各类网络请求的超时时间，单位均为毫秒。
  	// request请求
    "request": 10000,  //默认60000  wx.request 的超时时间
    "downloadFile": 10000,
    "connectSocket": 10000,
    "uploadFile": 10000,
    "downloadFile": 10000
  },
  "debug": true, //在开发者工具中开启 debug 模式
  // 小程序获取权限时，展示的接口用途说明。
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  }
}
```

## 原生框架
> 由逻辑层`(App Service)`和 视图层`(View)`组成。  
### 响应的数据绑定
> 小程序中，逻辑层通过`this.setData()`函数，和`data`对象，实现对数据的操控和通知视图层更新。  
> 视图层通过`{{name}}`绑定响应式数据。
```html
<view> Hello {{name}}! </view>
<!-- bindtap 给button绑定的点击事件 -->
<button bindtap="changeName"> Click me! </button>
```
```js
// 注册页面
Page({
	// 响应式数据来源
	data: {
		name: 'Weixin'
	},
	// 事件
	changeName: function(e){
		// 修改数据，通知视图层改变数据
		this.setData({
			name: 'MINA'
		})
	}
})
````
> 框架管理了小程序的页面路由，提供了基础组件和丰富的API, 开发者只要将`页面`的`数据`、`方法`、`生命周期函数`注册到`框架`中.

### 视图层WXML
- 数据绑定
- 列表渲染
- 条件渲染
- 模板
```html
<template name="staffName">
  <view>
  	<view wx:for="{{array}}">{{item}}</view>
  	<view wx:if="{{view == 'WEBVIEW'}}">WEBVIEW </view>
  	<view wx:elseif="{{view == 'APP'}}">APP </view>
  	<view wx:else="{{view == 'MINA'}}">MINA </view>
  	<button bindtab="handleSwitch">切换显示</button>
  </view>
</template>
```
```js
// page构建页面实例
Page({
	data:{
		array: [1,2,3,4],
		view: 'APP',
	},
	handleSwitch(event){
		this.setData({
			view: "MINA"
		})
	}
})
```

### 视图层WXSS
- 尺寸单位: 
	- rpx(responsive pixel): 可以根据屏幕宽度进行自适应。
- 样式导入:
	- @import导入外界样式
- 内联样式:
	- 组件上支持style和class来控制样式和类名。
- 选择器:
	- 支持`.class`, `#id`, `组件名`, 
	- `组件1, 组件2`和`::before`和`::after`选择器。
- 全局样式和局部样式
	- 位于`app.wxss`的是全局样式
	- 位于每一个`page`内的是局部样式
	- 优先级和css一致。

```html
<!-- <view style="color:{{color}};" class="small"></view> -->
```

```css
/*
@import 'common.wxss'
*/
.small{
	padding: 5rpx;
}
```
```js
Page({
	data:{
		color: "red"
	}
})
```

### 视图层WXS
> 某种程度上，`wxs`可以理解为有限制的`javascript`  
> 一般用于做复杂数据的抽象，逻辑处理等等。
```html
<wxs module="ml">
var msg = 'hello'
module.exports.message = msg
</wxs>

<view>{{m1.message}}</view>
```
- 事件系统