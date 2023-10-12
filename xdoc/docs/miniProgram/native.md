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
#### 事件系统
> 分为`页面级组件`和`组件级组件`, 与`Vue`的写法和思想非常相似。

#### `页面级组件`案例：
- musicList.wxml
```html
<!-- 页面级组件的wxml -->
<!-- 
// 涉及 
// - 响应式数据 
// - 遍历渲染 
// - 事件绑定 
			bindxxx
// - 事件传值 
			data-xxx 和 e.currentTarget.dataset.xxx
 -->

 <!-- 来自某音乐案例  -->
<view class="container">
	<image src="{{musicDetail.coverImgUrl}}" class="coverImg"></image>
	<view class="detail">
		<view class="detail-name">{{musicDetail.name}}</view>
		<view class="detail-description">{{musicDetail.description}}</view>
	</view>
</view>
<block wx:for="{{musicDetail.tracks}}" wx:key="key">
	<view class="song {{selectedId==item.id?'checked':''}}" bind:tap="onSelected" data-id="{{item.id}}" data-index="{{index}}">
		<view class="serial-number">{{index+1}}</view>
		<view class="song-detail">
			<view class="song-name">{{item.name}}</view>
			<view class="song-singer">{{item.ar[0].name}}</view>
		</view>
	</view>
</block>
```

- musicList.js
```js
// 页面级组件的js  - 来自某音乐案例
// 涉及 
// -云函数 
// - 路由及路由参数option 
// - 组件生命周期 
// - storage异步读取 
// - 跳转页面

// // 云函数初始化
// wx.cloud.init({
//   env: 'cloud1-0g174gz063995863',
//   traceUser: true,
// })

// pages/musicList/musicList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
		listId: '',
		musicDetail: {},
		selectedId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
		// console.log(options); 路由传递过来的参数
		// console.log(options.id);
		this.setData({
			listId: options.id
		})
		// 根据id，获取歌曲的细节。
		// 调用云函数
		wx.cloud.callFunction({
			// 要调用的云函数名称
			name: 'getMusicDetail',
			// 传递给云函数的event参数
			data: {
				id: options.id
			}
		}).then(res => {
			// console.log(res.result);
			this.setData({
				musicDetail: res.result
			})
		})
  },
	onSelected(e){
		wx.setStorageSync('musicDetail', this.data.musicDetail)
		this.setData({
			selectedId: e.currentTarget.dataset.id
		})
		// 跳转页面到歌曲播放页
		// 传递id和index
		let url = '/pages/player/player?id='+this.data.selectedId + '&index=' + e.currentTarget.dataset.index
		wx.navigateTo({
			url: url,
		})
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
```

#### `组件级组件`案例
> app为页面级, xmain为某组件级.
#### 父组件
- app.json
```json
{
  "usingComponents": {
		"xheader": "/components/xheader/xheader",
		"xmain": "/components/xmain/xmain"
  }
}
```
- app.wxml
```html
<!-- 以下来自todoList案例 -->
<!-- 
涉及:
- 父->子组件传值 自定义属性传递
- 使用子组件
- 子->父组件传值 bind:提交自定义方法 触发父组件方法
- e.detail接收方法携带的参数
 -->
<view>
	<text class="mian-header">商品购物车</text>
	<xheader bind:handAddF="handAdd"></xheader>
	<xmain dataList="{{dataList}}" bind:handDel='handDel' bind:handUpdate="handUpdate"></xmain>
</view>
```

- app.js
```js
// 只显示相关的dataList和handDel
handAdd(e){
	const data = this.data;
	const dataList = this.data.dataList;
	dataList.push(e.detail);
	this.setData({
		...data,
		dataList
	})
},
```
#### 子组件
- xmain.json
```json
{
  "component": true,
  "usingComponents": {}
}
```
- xmain.wxml
```html
<<view class="goods">
	<view wx:for="{{dataList}}" wx:key="key" class="goods-item">
		<view class="goods-item">
			<text class="goods-text">{{index}}</text>
			<input value="{{item.val}}" disabled="{{item.disabled}}" 	bindinput="handleVal" focus="{{!item.disabled}}"/>
		</view>
		<button size="mini" type="primary" bind:tap="handEdit" data-id="{{item.id}}" data-val="{{editVal}}" data-item="{{item}}">{{item.disabled ? '编辑' : '确认'}}</button>
		<button size="mini" type="warn" bind:tap="handDel" data-id="{{item.id}}">删除</button>
	</view>
</view>
```

- xmain.js
```js
// components/xmain/xmain.js
/*
涉及内容
- 触发提交父组件事件 和 传递数据给父组件
this.triggerEvent('xx',data)
- 接收父组件传递过来的数据
properties
*/
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		dataList:{
			type: Array,
			value: []
		},
  },

  /**
   * 组件的初始数据
   */
  data: {
		editVal: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
		handDel(e){
			// 触发父级的删除
			this.triggerEvent('handDel',e.currentTarget.dataset.id)
			wx.showToast({
				title: '删除成功',
			})
		},
		handEdit(e){
			let item = e.currentTarget.dataset.item
			if(item.disabled){
				// 编辑态回显
				this.setData({
					editVal: e.currentTarget.dataset.item.val
				})
				this.triggerEvent('handUpdate',[e.currentTarget.dataset.id,this.data.editVal])
				return;
			}
			// 更新态
			this.triggerEvent('handUpdate',[e.currentTarget.dataset.id,e.currentTarget.dataset.val])
			wx.showToast({
				title: '更新成功',
			})
			// let [id,val] = e.currentTarget.dataset;
			// 编辑态回显，确认态更新，触发父级的更新
		},
		handleVal(e){
			// console.log(e)
			// console.log(e.detail.value);
			this.setData({
				editVal: e.detail.value
			})
		}
  }
})

```