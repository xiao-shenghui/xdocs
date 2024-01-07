# 踩坑日记
> 希望把坑坑洼洼填成广阔平原，种满鲜花。

## 2024.01.07 - this.$refs获取dom元素失败？ 
最近在写uniapp多端app，需要获取页面中的dom元素。  
我心想：这不难，不就是`this.$refs`进行获取吗？   
在调试时我想打印组件实例，没想到发现竟然无效。   
于是我查看文档发现: `非H5端不能用于获取内置组件实例`。  
随即，我又想起了微信小程序的一个API：`SelectorQuery`, 便在uniapp官网搜寻了一番。     
果然，uniapp中有类似的方法`uni.createSelectorQuery()`[节点信息](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#createselectorquery)。 按照官网的解释，`返回一个 SelectorQuery 对象实例`

- 用法：
```js
uni.createSelectorQuery().selectViewport().scrollOffset(res => {
  console.log("竖直滚动位置" + res.scrollTop);
}).exec();

let view = uni.createSelectorQuery().in(this).select(".test");

view.fields({
  size: true,
  scrollOffset: true
}, data => {
  console.log("得到节点信息" + JSON.stringify(data));
  console.log("节点的宽为" + data.width);
}).exec();

view.boundingClientRect(data => {
  console.log("得到布局位置信息" + JSON.stringify(data));
  console.log("节点离页面顶部的距离为" + data.top);
}).exec();

```
- 提示：
	- 需要在生命周期 mounted 后进行调用。
	- 默认需要使用到 selectorQuery.in 方法。
	- 支付宝小程序不支持in(component)，使用无效果
