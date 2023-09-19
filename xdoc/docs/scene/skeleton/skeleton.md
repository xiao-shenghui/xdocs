# 认识骨架屏-skeleton
> 相对于传统的`loading加载`, 骨架屏`skeleton`告知用户当前页面处于`加载态`,  
> 提前`预知`页面`结构`,缓解等待的焦虑,从而提升用户体验。

## 初步认识骨架屏
> 实际上，微信朋友圈，小红书，饿了么，淘宝等等应用，已经普遍应用了骨架屏。
> `vue2`的`element-ui`组件库，也有`skeleton组件`。[Skeleton 骨架屏](https://element.eleme.cn/#/zh-CN/component/skeleton)

## 实现方式
> 方式1: 设计类似真实数据的骨架屏dom, 请求完成前显示骨架屏dom.  
> 方式2: 对于图片节点的骨架屏，更好的方式是设置`背景为灰色`,当请求到内容时，赋值src.  
> 方式3: 使用组件库, 例如`element-plus`的`skeleton组件`。或者`vue-skeleton-webpack-plugin`插件。

## 常规思路
- css
```css
div {
    width: 240px;
    height: 240px;
	/*  1. 骨架屏背景  */
    background-color: #ccc;
    cursor: pointer;
    /* border: 1px solid #ddd; */
}

p {
    width: 100%;
    height: 100%;
	/*  2. 骨架屏动画容器，渐变背景+动画  */
    /* linear-gradient(deg, 浅，深，浅) */
    background: linear-gradient(90deg, #f2f2f2 25%, 
        #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: anima 1.4s linear infinite;
    /* 以上三句是骨架屏动画的核心代码，渐变色动画 */
    display: flex;
    justify-content: center;
    align-items: center;
}

p svg {
    width: 22%;
    height: 22%;
	/*  2.1 如果有图片  */
    fill: #dcdde0;
    /* fill的好处，可以填充颜色，并且受父盒子的背景色影响 */
}

img {
	/* 真实dom	*/
    width: 100%;
    height: 100%;
}

@keyframes anima {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
```

- html
```html
<!-- 骨架屏 -->
<p id="p">
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M64 896V128h896v768H64z 
            m64-128l192-192 116.352 116.352L640 
            448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 
            192.064A96 96 0 0 1 352 288z" />
    </svg>
</p>
<!-- 真实dom -->
<img src="xxx"
    id="img" hidden>
```

- js事件
```js
let show = false;
// 控制显示与隐藏
btn.onclick = handleLoad;
function handleLoad() {
    show = !show;
    if (show) {
        // i用于模拟请求进度，
        // 实际开发中，
        // axios: 
            // onUploadProgress 上传进度事件，onDownloadProgress 下载进度事件
        // ajax: onprogress 原生进度事件
        let i = 0;
        let timer = setInterval(() => {
            if (i >= 100) {
                i = 0;
                // 隐藏骨架屏
                p.style.display = 'none';
                // 显示真实dom，真实开发中要将请求成功回来的数据给其src属性。
                img.style.display = 'inline';
                // 清除定时器
                clearInterval(timer);
                return;
            }
            i++;
            progress.textContent = `${i < 10 ? '0' + i : i}%`
        }, 10);
    }
    else {
    	// 显示骨架屏
        p.style.display = 'flex';
        // 隐藏真实dom, 真实开发中要将src属性置空，同时隐藏。
        img.style.display = 'none';
        progress.textContent = `00%`
    }

}

window.onload = function () {
    handleLoad();
}
```

## 图片骨架屏
- html
```html
<img class="aImg">
```
- css
```css
.aImg{
	display: block;
	width: 240px;
    height: 240px;
    background: linear-gradient(90deg, #f2f2f2 25%, 
        #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: anima 1.4s linear infinite;
}
@keyframes anima{
	0%{
		background-position: 100% 50%;
	}
	100%{
		background-position: 0% 50%;
	}
}
```
- js
```js
window.onload = function () {
    setTimeout(()=>{
        img.src = 'xxx'
    },3000)
}
```