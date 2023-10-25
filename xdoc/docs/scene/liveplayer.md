# 直播
> 整体流程: 使用`推流工具`，完成资源采集，推流到`流媒体服务器`(中间载体)。  
> 在前端`拉流`，也就是`播放视频流`。

## 简易搭建直播
### 流媒体服务器
> 可以使用`node-media-server`实现node版流媒体服务器  
> 一个 Node.js 实现的RTMP/HTTP/WebSocket/HLS/DASH流媒体服务器
```js
// app.js
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,  // rtmp端口号
    chunk_size: 60000,  // 单个拆分媒体流的包的大小
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,   //  http端口号
    allow_origin: '*' // 允许跨域
  }
};

var nms = new NodeMediaServer(config)
nms.run();

// 运行node app.js
```
### 推流
> 可以使用ffmpeg, MP4Box 或者 OBS 推流

## 播放直播流(拉流)
> 可以使用`video.js`, `flv.js`等npm包实现直播流播放。
```html
<!-- 以bilibili的flvjs为例: FLV(HTML5 Flash Video)播放器。 -->
<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
   <title>直播</title>
</head>
<body>
  <script src="https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.js" type="application/javascript"></script>
  <video id="videoElement" width="100%" controls></video>
  <script>
       if (flvjs.isSupported()) {
           var videoElement = document.getElementById('videoElement');
           var flvPlayer = flvjs.createPlayer({
               type: 'flv',
               // qfedu 是推流的时候的路径名称
               // dixon 是stream 自定义的名称  
               url: 'http://localhost:8000/qfedu/dixon.flv'
           });
           flvPlayer.attachMediaElement(videoElement);
           flvPlayer.load();
           flvPlayer.play();
       }
  </script>
</body>
</html>
```

## 流媒体传输协议
- 流媒体
> 采用`流式传输`，`边下载边播放`，在网络上播放的媒体格式。

- **顺序**流式传输协议:
> 使用`Http服务器`来实现，比如Nginx、Apache等。  
> 用户只能观看`已下载`的视频内容，`无法快进`到未下载的视频部分

- **实时**流媒体协议:
> 例如RTSP/RTP、RTMP、HLS、HTTP-FLV。可用于`实况`直播，也可传输完整的音视频文件。

### RTSP/RTP协议
> 基于UDP或TCP传输，客户端向服务器发送RTSP命令，由RTP传输视频数据。  
> 视频质量由RTCP控制，视频控制（如播放、暂停等）由RTSP提供。

### RTMP协议 
> 支持推送，或者直播。  
> 将大块的视频帧和音频帧`剁碎`，然后以小数据包的形式进行传输，且支持加密。  
> 特点: TCP长链接，延迟低，高并发不稳定。  
> 适合: PC端

### HLS（HTTP Live Streaming）
> 将视频分成 5-10 秒的视频小分片，然后用 M3U8 索引表进行管理。  
> 视频的流畅性很好，但也同样引入了很大的延迟。   
> 常用于 QQ 和微信朋友圈的 URL 分享。  
> 特点：HTTP短链接，延迟高。
> 适合: PC端、移动端

### HTTP-FLV（Flash Video）
> 格式极其简单，在延迟表现和大规模并发方面都很成熟。  
> 在手机浏览器上的支持非常有限。  
> TCP长链接，延迟低，需要继承SDK才能播放。  
> 适合: PC端

## 直播原理
> 整理过程: 经由
1. 图像`采集`，
2. 图像`处理`(水印，声音，格式编码), 
3. 流媒体封装`分块`，  
4. `推流`至流媒体服务器
5. 服务器`流分发`
6. 播发器`流播放`

- 流程图
<img src="https://img2020.cnblogs.com/blog/1074523/202003/1074523-20200324095029970-205010266.png">

## 客户端直播插件
> 除了原生的`video`标签，支持实时流媒体播放的客户端插件  
> hls.js、video.js、vue-video-player js库

- hls.js
> 基于`video`标签和Media Source ExtensionsAPI。  
> 将MPEG2传输流和AAC/MP3流转换成ISO BMFF (MP4)片段。  
> 优点： 包比较小，很纯净, 可自定扩展功能。
> 缺点： 没有封装好的UI，功能需要自己调API，只支持HLS协议。

- video.js
> 基于h5的网络视频播放器。
> 优点： 支持多种格式,专门有一套针对直播流的UI, 插件机制强大，社区。  
> 缺点： 包比较大，修改UI时需要通过插件实现。

- vue-video-player
> 将video.js集成到了Vue中。

## 实际案例
### 技术选型：

传输协议——由于后端支持同时返回HLS协议和RTMP协议的直播流，结合考虑HLS协议的高延时问题和RTMP协议的兼容性问题，本项目决定采用向下兼容的方式实现，默认使用RTMP协议直播，当浏览器不支持时降级使用HLS协议播放。
直播插件——本项目基于Vue实现，并且业务逻辑为常规直播操作，无特殊需求，从开发效率、稳定性及兼容性出发，决定采用vue-video-player插件实现。

### vue-video-player安装与引入：
```html
<link rel="stylesheet" href="path/to/video.js/dist/video-js.css"/>
<script type="text/javascript" src="path/to/video.min.js"></script>
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="path/to/dist/vue-video-player.js"></script>
<script type="text/javascript">
  Vue.use(window.VueVideoPlayer)
</script>
```
- NPM（支持全局/按需引入）：
```sh
npm install vue-video-player --save
```

- 全局引入
```js
import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'

// 引入videojs样式
import 'video.js/dist/video-js.css'
// 自定义样式引入，并为<video-player>添加对应类名即可，例如vjs-custom-skin
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer, /* {
  options: 全局默认配置,
  events: 全局videojs事件
} */)
```

- 或按需引入
```js
// 引入videojs样式
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  }
}
```
- video.js插件扩展：
```js
import videojs from 'video.js'

// videojs plugin
const Plugin = videojs.getPlugin('plugin')
class ExamplePlugin extends Plugin {
  // something...
}
videojs.registerPlugin('examplePlugin', ExamplePlugin)

// videojs language
videojs.addLanguage('es', {
  Pause: 'Pausa',
  // something...
})

// more videojs api...

// vue component...
```

- 视频直播关键代码：
```html
<template>
<video-player
    class="video-player-box"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @statechanged="playerStateChanged($event)"
    @ready="playerReadied">
</video-player>
</template>
```
```js
export default {
	data() {
	  return {
	    playerOptions: {
	      // 是否关闭音频
	      muted: true,
	      // 初始语言，默认为英语，code参见：https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
	      language: 'zh-CN',
	      // 播放速度，指定后Video.js将显示一个控件(vjs-playback-rate类的控件)，允许用户从选项数组中选择播放速度
	      playbackRates: [0.5, 1.0, 1.5, 2.0],
	      // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值，表示长宽比例
	      aspectRatio: '4:3',
	      // 等同于原生<video>标签中的一组<source>子标签，可实现优雅降级；type 属性规定媒体资源的 MIME 类型，标准类型可参见：https://www.iana.org/assignments/media-types/media-types.xhtml；
	      sources: [{
	        type: "rtmp/flv",
	        src: "rtmp://58.200.131.2:1935/livetv/hunantv"
	      }, {
	        type: "application/x-mpegURL",
	        src: "http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8"
	      }],
	      // 兼容顺序，默认值是['html5']，这意味着html5技术是首选，其他已注册的技术将按其注册的顺序在该技术之后添加。
	      techOrder: ['flash'],
	      // 在视频开始播放之前显示的图像的URL（封面），这通常是一个视频帧或自定义标题屏幕，一旦用户点击“播放”，图像就会消失。
	      poster: require('../assets/test.jpg'),
	    }
	  }
	},
	mounted() {
	  console.log('this is current player instance object', this.player)
	},
	computed: {
	  player() {
	    return this.$refs.videoPlayer.player
	  }
	},
	methods: {
	  // 各个事件监听
	  onPlayerPlay(player) {
	    // console.log('播放器播放!', player)
	  },
	  onPlayerPause(player) {
	    // console.log('播放器暂停!', player)
	  },
	  // ...（此处省略多个事件监听函数）

	  // 状态监听
	  playerStateChanged(playerCurrentState) {
	    // console.log('播放器当前状态更新', playerCurrentState)
	  },

	  // 监听播放器是否就绪
	  playerReadied(player) {
	    console.log('播放器已就绪', player)
	    // 就绪后就可以调用播放器的一些方法
	  }
	}
}
```
**踩坑小tips**：
播放 HLS 协议流，需要`videojs-contrib-hls`插件，但是直接引用即可，  
因为在安装`vue-video-player`插件时，`videojs-contrib-hls`是一并安装的；  
如果需要播放RTMP协议流，需要videojs-flash插件，也是直接引用就可以了  
（flash插件需要在hls之前引用）
```sh
import 'videojs-flash'
import 'videojs-contrib-hls'
```