# 地图和位置
> 与用户经常打交道的便是`地图`和`位置`了。  
> 本章主要记录`WX小程序`，`uniapp`中获取地理位置，以及腾讯地图API的使用。 
## WebView-位置
> web端使用HTML5的 [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) API, 可以获取地理位置。  
```js
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function successCallback(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  return [].push(latitude, longitude)
}

function errorCallback(error) {
  console.log("Error: " + error.message);
  return error.message
}

```
> 提示： 谷歌浏览器是向谷歌API获取位置，所以会获取失败。  
> 解决方案：换成火狐，IE等其他浏览器。

## WX小程序-位置
> 小程序中，可以使用[`getLocation`](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html)获取地理位置，
1. `app.json`中, 添加以下字段配置
```json
"permission" : {
    "scope.userLocation" : {
        "desc" : "为了您更好的体验，请确认获取您的位置"
    }
},
"requiredPrivateInfos" : [ "getLocation" ],
```
2. 使用`getLocation`
```js
wx.getLocation({
	 type: 'wgs84',
	 isHighAccuracy: true, //开启高精度定位
	 highAccuracyExpireTime: 3000, //超时时间
	 success (res) {
	   const latitude = res.latitude  //纬度
	   const longitude = res.longitude //经度
	   const speed = res.speed  //速度
	   const accuracy = res.accuracy
	 },
	 fail: function (res) {
        console.log('获取定位失败：' + res.errMsg);
    }
})
```

## uniapp-位置
> uniapp中，可以使用[`getLocation`](https://uniapp.dcloud.net.cn/api/location/location.html)获取地理位置，需要经过如下步骤:
1. `manifast.json`中, `mp-weixin`(小程序配置) 添加以下字段配置
```json
"permission" : {
    "scope.userLocation" : {
        "desc" : "为了您更好的体验，请确认获取您的位置"
    }
},
"requiredPrivateInfos" : [ "getLocation" ],
```
2. 使用`getLocation`获取地理位置  
```js
uni.getLocation({
    type: 'gcj02', // 坐标系类型
    success: function (res) {
        var latitude = res.latitude; // 维度
        var longitude = res.longitude; // 经度
        console.log('经度：' + longitude + '，纬度：' + latitude);
    },
    fail: function (res) {
        console.log('获取定位失败：' + res.errMsg);
    }
});
```
3. 其他`API`见`uniapp`, 例如`onLocationChange`位置更新时触发。

## 腾讯地图  
> 致力于做**更简洁**的API示例记录，方便参考和记忆。  
> 参考至[`腾讯位置服务文档`](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview)  
> 推荐使用[`腾讯位置JS-API-GL`](https://lbs.qq.com/webDemoCenter/glAPI/glMap)练习API, 内置代码引擎,控制台和免登录。   
> 学习地图API后，更轻松学会`微信`/`uniapp`小程序中的`地图组件map`和[`createMapContext`](./uniapp)  
### 前期准备
1. [腾讯位置服务](https://lbs.qq.com/) 注册成为开发者。
2. 创建`应用`，添加`key`
### 地图操作
#### 创建地图-map
```html
<script charset="utf-8" src="https://map.qq.com
/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"></script>
<body onload="initMap()">
    <!-- 地图容器 -->
    <div id="container"></div>
    <script type="text/javascript">
        function initMap() {
            //初始化地图
            var map = new TMap.Map("container", {
                rotation: 20,//设置地图旋转角度
                pitch:30, //设置俯仰角度（0~80）
                zoom:12,//设置地图缩放级别
                center: new TMap.LatLng(39.984104, 116.307503),  //lat, lng
                //设置地图中心点坐标
            });
        }
    </script>
</body>
```
#### 地图加载完成事件-tilesloaded
```js
//监听地图瓦片加载完成事件
map.on("tilesloaded", function () {
    console.log("地图瓦片已加载完成")
})
```
#### 隐藏文字-baseMap
```js
// 实例化时，添加baseMap
var map = new TMap.Map("container", {
    // ...
    baseMap: {          
    //底图设置（参数为：VectorBaseMap对象）
      type: 'vector',   //类型：失量底图
      features: ['base', 'building2d']  
      //仅渲染：道路及底面(base) + 2d建筑物(building2d)，以达到隐藏文字的效果
    }
});
```
#### get和set地图中心-getCenter/setCenter
```js
// 获取地图中心，map.getCenter()
var mapCenter = map.getCenter();
console.log(mapCenter); //object，39.984104, 116.307503
console.log(mapCenter.getLat().toFixed(6)); //39.984104
console.log(mapCenter.getLng().toFixed(6)); //116.307503

// 设置地图中心，使用new TMap.LatLng()设置
map.setCenter(new TMap.LatLng(39.908802,116.397502));
```
#### 地图平移事件-pan
```js
//监听地图开始平移
map.on("panstart", function () {
    txt.innerHTML = "地图开始平移"
})
//监听地图平移
map.on("pan",function(){
    txt.innerHTML = "地图正在平移";
    console.log(map.getCenter().toString())//获取地图中心点
})
//监听地图平移结束
map.on("panend",function(){
    txt.innerHTML = "地图结束平移";
})
```
#### 地图旋转和俯仰事件-rotate/pitch
```js
map.on("rotate",function(){
    console.log('地图旋转了')
}

map.on("pitch",function(){
    console.log('地图俯仰角度变化了')
}
```
#### get和fit地图视野-getBounds/fitBounds
```js
// 获取视野范围
var mapBounds = map.getBounds(); //获取当前地图的视野范围
if(mapBounds){
    // 东北/右上经纬度
    let northEast = mapBounds.getNorthEast();
    console.log('东北/右上:['+ northEast.getLat().toFixed(6), + "," 
            + northEast.getLng().toFixed(6)+"];")
    // 西南/左下经纬度
    let southWest = mapBounds.getSouthWest();    
    console.log('西南/左下:['+ southWest.getLat().toFixed(6), + "," 
            + southWest.getLng().toFixed(6)+"];")
}  

// 设置视野范围
let sw = new TMap.LatLng(39.96693, 116.49369)
let ne = new TMap.LatLng(39.86000, 116.28666)
// new TMap.LatLngBounds() 中传入两个位置以计算和创建范围。
// 然后用map的fitBounds方法调整地图范围。
map.fitBounds(new TMap.LatLngBounds(sw, ne));
```
#### get和set地图视角-getRotation和getPitch
```js
// 接着上面地图旋转和俯仰事件
// 获取视角和旋转角
map.on("rotate",function(){
    console.log('地图旋转了')
    console.log(map.getRotation())
}

map.on("pitch",function(){
    console.log('地图俯仰角度变化了')
    console.log(map.getPitch())
}

// 设置视角和俯仰角
map.setRotation(90)
map.setPitch(30)
```
#### 设置缩放控件位置及样式-control
- 缩放控件位置及增删
```js
// 获取缩放控件的实例
let zoomControl = map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);

// 设置缩放控件位置
// setPosition()  TMap.constants.CONTROL_POSITION.方位值
// 设置为右上角 TOP_RIGHT
zoomControl.setPosition(TMap.constants.CONTROL_POSITION.TOP_RIGHT);
// 设置为右下角 BOTTOM_RIGHT
zoomControl.setPosition(TMap.constants.CONTROL_POSITION.BOTTOM_RIGHT);
// 设置为左下角 BOTTOM_LEFT
// 设置为左上角 TOP_LEFT

// 移除/添加缩放控件 
// 移除缩放控件 removeControl
function removeControl() {
    //如果获取不到缩放控件实例，则直接返回
    if (!map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)) { // 
        return;
    }
    // 否则调用removeControl移除实例
    map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
}
// 添加缩放控件同理，使用 map.addControl(zoomControl)
```
- 缩放控件样式
```js
// 显示缩放级别
zoomControl.setNumVisible(true);
// 隐藏缩放级别
zoomControl.setNumVisible(false);

// 添加class样式
control.setClassName('active');
// 移除所有class样式
control.setClassName('');
```
#### 销毁地图-destroy
```js
// 销毁地图
map.destroy();
```
### 地图动画
#### 2D/3D模式切换-map.setViewMode
```js
map.setViewMode('2D');
// 2D模式表示禁用旋转和俯仰
map.setViewMode('3D');
// 3D模式开启，

// 设置俯仰为80, 设置旋转为80
// map.setPitch(80);
// map.setRotation(80);

// 或者设置如下平滑动画
map.easeTo({zoom:17,pitch:80, rotation:80},{duration: 2000});
```
#### 地图平滑动画-map.easeTo
```js
map.easeTo({zoom:17,pitch:80, rotation:90},{duration: 2000});
//平滑缩放和旋转至该状态，
// 持续时间2秒
```
### 点标记
#### 初始化和获取-marker
#### 添加和移除marker-marker.add
#### 点击地图事件添加marker-map.on('click')
#### 自定义marker样式-marker.setStyles
#### marker轨迹回放-全局
#### marker轨迹回放-跟随
#### marker拖动

### 文本标记
#### 初始化和获取文本标记-label
#### 添加和移除label标记-label.add
#### label标记点击事件-label.on('click')
#### label标记样式自定义-label.setStyles

### 信息窗口
#### 初始化和简单信息-infoWindow
#### 图文信息-content
#### 点击弹出/关闭信息-close()
#### 窗口信息修改-setContent