# jQuery
## 认识jQuery
> jq中，基本所有的事件，动画，选择器，属性，位置，索引等都是`函数调用`的形式。  
> [中文文档](http://www.17bigdata.com/book/jquery2/index.html)
### 为什么要学习jQuery？
> jQuery是一个`简化js操作`的库，有很多封装好的api，可以直接拿来用。  
> 由于jQuery较难拼，后续以`jq`表示。
**主要学习内容**
- 1. html元素的获取
- 2. html元素的操作
- 3. 元素css的操作
- 4. 元素事件的操作
- 5. 封装好的动画
- 6. 自动遍历节点的特性
### jq的安装
```html
<!-- cdn引入 -->
<!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script> -->
<!-- 本地引入 -->
<script src="../jsc/jquery-3.5.1/jquery-3.5.1.min.js"></script>
```
```js
// 测试使用
console.log(document.querySelector('div'));
console.log($('div'));
```
## jq的选择器
> 选择器就是选择节点的工具
### 基本选择器
> jq通过`$('选择器')`选中节点。  
> jq并且不用考虑`多个还是单个`，都是`伪数组`。  
> 获取的元素，`自带遍历特性`，绑定事件等操作，一次性完成。
```js
console.log($('div'));  //所有div元素
console.log($('.box')); //所有类名为box的元素
console.log($('#box')); //id名为box的元素伪数组, 只匹配第一个
console.log($('*')); //通配符
```
### 组合选择器
- 交集选择器
- 并集选择器
- 后代选择器
- 子代选择器
```js
// 交集选择器
console.log($('li.first'));
// 并集选择器
console.log($('.box,.first'));
// 后代选择器  不管是子代还是孙子代都可以被选中
console.log($('ul .first'));
// 子代选择器 只能选 亲儿子
console.log($('ul>.first'));
```
### 基本过滤选择器
- `:eq(n)`索引选择器
- `:first`第一个符合条件的标签
- `:last`最后一个符合条件的标签
- `:even`选中索引为偶数的标签
- `:odd`选中索引为奇数的标签
- `:lt(索引)`小于该索引的标签，不包含该索引
- `:gt(索引))`大于该索引的标签，不包含该索引
- `:header`选中所有h系列的标签
```js
// :eq(索引)  从0开始
console.log($('li:eq(0)'));  //选择第一个li
console.log($('.box :eq(0)'));  //选择box的第一个子元素
// :first  只能获取第一个符合条件的元素
console.log($('.box:first'));  //选择第一个类名为box的盒子
console.log($('.box :first'));  //选中第一个box的第一个子元素
// :last
console.log($('.box:last'));  //选中最后一个box
console.log($('.box :last'));  // 选中最后一个box 的最后一个子元素
// :even 选中索引为偶数的元素
console.log($('li:even'));
// :odd 选中索引为奇数的元素
console.log($('li:odd'));
// :lt(索引) 选中小于这个索引的元素  不包含 可以理解为选中前几个
console.log($('li:lt(3)'));
// :gt(索引) 选中大于这个索引的元素 
console.log($('li:gt(3)'));
// :header 选中所有h系列的标签
console.log($(':header'));
```

### 位置过滤选择器
- `:root`选中根节点的html
- `:nth-child(第几个)` 父节点下的第几个该类型标签
- `:first-child` 父节点下的第1个该类型标签
- `:last-child` 父节点下的最后1个该类型标签
```js
// :root 选中根节点 html
console.log($(':root'));
// :nth-child(第几个) 相对于html结构中的第几个标签
console.log($('div:nth-child(2)'));
// :first-child 相对于结构中的第一个
console.log($('div:first-child'));
// :last-child 相对于结构中的最后一个 
console.log($('div:last-child'));
```

### 属性选择器
- `$('h1[title]')`带属性的标签
- `$('h1[title!=hello]')`选中属性值不是xxx的标签
- `$('h1[title^=h]')`类似正则，选中属性值`以h开头`的标签
- `$('h1[title$=y]')`类似正则，选中属性值`以y结束`的标签
- `$('h1[title*=hello]')`类似正则，选中属性值`包含hello`的标签

### 内容过滤选择器
- `:contains(内容)` 选中`文本中`有该内容的标签
- `:empty`选中`文本为空`的标签
- `:parent`选中`带有内容`的标签
- `:has`选择`内容中`,`包含某个选择器`的标签
```js
// :contains(内容)
console.log($('h1:contains(三)'));  //选择h1中文本有三的h1
// :empty  选择文本为空的
console.log($('p:empty'));
// :parent 选择有内容的
console.log($('p:parent'));
// :has 选择内容中包含某个选择器的标签
console.log($('p:has(.add)'));
console.log($('p:has(#a)'));
```

### 可见性选择器
- `:visible`获取可见的，`hidden`值为`false`的
- `:hidden`获取不可见的，`hidden`值为`true`的
```js
// :visible  获取hidden值为false的
console.log($('p:visible'));
// :hidden  获取hidden值为true的
console.log($('p:hidden'));
```

### 表单选择器
- `:input` 选择`所有的`表单元素
- `:text` 选择所有的`文本框`，type值为text
- `:password` 选择所有的`密码框`，type值为password
- `:radio` 选择所有的`单选框`, type值为radio
- `:checkbox` 选择所有的`复选框`,type值为checkbox
- `:selected`, 选择所有的`下拉列表框`。type值为selected
- `:submmit`,`提交框`。 `:reset`,`重置框`。
- `:disabled`,`禁用框`。 `:enabled`,`可用框`。
```js
// 选择所有的表单元素  :input
console.log($(':input'));
// :text 选择所有的文本框 type值为text
// :password type值为password
// :radio type值为radio
// :checkbox type值为checkbox
// :submmit   :reset  :disabled  :enabled  :selected
```

### window选择器
- `$(window)`获取window
- `$(document)`获取文档document
- `$('html')`获取文档 html
- `$(':root')`获取根节点
```js
console.log($(window).height());  //获取视口高度
console.log($(window).width());  //获取视口宽度
console.log($(document).height());  //获取的是html内容的真实高度
console.log($('html').height());  //获取的是offsetHeight 是html的高度
console.log($(':root').height());
```

## jq的事件
> jq获取的节点都是伪数组 不需要自己循环
### 事件绑定
- 事件绑定
	- 绑定方式一`使用bind`： .click(fn)
	- 绑定方式二`使用on`: .on('click',function(){})
- 事件解绑
	- 用`bind`绑定的事件，使用`unbind`解绑: .unbind('click')
	- 用`on`绑定的事件，使用`off`解绑: .off('click')
	- 解绑具体事件，传入`第二个参数`,解绑的函数名。
```js
 // jq获取的节点都是伪数组 不需要自己循环
// 绑定方式一
$('div').click(fn)
function fn() {
    console.log('被点击了');
}
// 绑定方式二
$('div').on('click', function () {
    console.log(666);
})

// jq事件解绑
// $('div').off('click')
// 解绑具体的事件
$('div').off('click', fn)   //解绑点击事件中叫fn的函数事件
```
### 链式调用
> 由于jq大部分时候，选择器返回的都是jq节点，因此可以`链式调用`
```js
$('div').click(function () {
            console.log('被点击');
        }).mousemove(function () {
            console.log('鼠标在div里面动');
        }).mouseout(function () {
            console.log('鼠标移出');
        })
```

### 事件源
> 自带遍历，配合`$(this)`十分利于做排它法
> 注意区分`this`和`$this`的区别。 this是`dom节点`，$this是`jq节点`。
```js
$('div').click(function () {
    $('div').css('width', '100px')
    $(this).css('width', '200px')
})
```

### 具体事件
> 事件冒泡: 触发子盒子事件会触发父盒子相同的事件, 会由内向外传播
- mouseenter: 鼠标移入,没有冒泡
- mouseover: 鼠标移入，有冒泡
- mouseleave: 鼠标离开，不会冒泡
- mouseout: 鼠标离开，会冒泡
- hover: 相当于 mouseover + mouseout, 两个参数(参数一：`鼠标移入`时触发的函数。 参数二：`鼠标移出`时触发的函数)
- input的事件(focus:获取焦点。 blur:失去焦点)
```js
// .mouseenter 鼠标移入没有冒泡
// $('.father').mouseenter(function () {
//     console.log('鼠标移入了父');
// })
// $('.son').mouseenter(function () {
//     console.log('鼠标移入了子');
// })

// .mouseover 鼠标移入有冒泡
$('.father').mouseover(function () {
    console.log('鼠标移入了父');
})
$('.son').mouseover(function () {
    console.log('鼠标移入了子');
})

// mouseleave 鼠标离开 不会冒泡
// $('.father').mouseleave(function () {
//     console.log('离开了父盒子');
// })

// $('.son').mouseleave(function () {
//     console.log('离开了子盒子');
// })

// mouseout 鼠标离开 会冒泡
$('.father').mouseout(function () {
    console.log('离开了父盒子');
})

$('.son').mouseout(function () {
    console.log('离开了子盒子');
})

// hover 事件 相当于 mouseover + mouseout
// hover有两个参数
// 第一个参数 鼠标移入时触发的函数
// 第二个参数 鼠标移出时触发的函数

// hover没有冒泡
$('.father').hover(function () {
    console.log('鼠标移入了');
}, function () {
    console.log('鼠标移出了');
})

$('.son').hover(function () {
    console.log('子移入');
}, function () {
    console.log('子移移出');

})

// input事件
// focus 获取焦点   blur 失去焦点
$('input').focus(function () {
    console.log('获取了焦点', this.value);
}).blur(function () {
    console.log('失去了焦点', this.value);
})
```

### 事件委托
> jq的事件委托非常简单，在正常绑定事件时，多传一个参数，作为实际对象。
- $('ul').on('click','li',function(){})
```js
// 给所有的li添加点击事件  
// jq写法
// 第一个参数时事件类型 第二个是选择器 第三个事件驱动程序
$('ul').on('click', 'li', function () {
    console.log(this);
    console.log($(this));
})

// 原生写法
// document.querySelector('ul').onclick = function (e) {
//     console.log(e.target);
// }
```

### 事件手动触发
- 使用`.trigger('事件类型')`手动触发事件。
```js
$('button').click(function () {
            console.log('被点击了');
        })
// .trigger('事件类型')
// $('button').trigger('click')

// setInterval(function () {
//     $('button').trigger('click')
// })
```

### 入口(加载)函数
- 原生DOM使用`load`事件
- jq中使用`ready`事件,或者将所有代码放在`$(...)`里面。
```js
// 入口函数 的意思 就是通过这个入口去执行里面的代码
// 原生DOM
window.onload = function () {
            console.log('加载完毕以后才会打印');
        }
// 方式一
$(function () {
    // 当dom加载完毕以后才会执行
    console.log('加载完毕以后才会打印');
})
// 方式二
// ready  当某一个节点加载完毕后才会执行
$('html').ready(function () {
    // 当我的根节点加载完毕以后再执行
    console.log(123);
})
```

## jq的动画
> 基本按`动画时间`，`动画速率`，`回调函数`的顺序，接收参数。
### show/hide-显示和隐藏
> 改变的是元素的`display属性`, 来实现`展示或隐藏`
```js
// show(): 参数一表示动画时间，参数二表示执行的回调函数
$('div').show(1000,function(){
	alert('展示成功');
})
// hide(): 参数一样。
$('div').show(1000,function(){
	alert('隐藏成功');
})
```
### toggle-切换显示和隐藏
> 当元素展示时就隐藏，隐藏时就展示。
> 相比`show/hide`函数多了一个参数，动画速率。  
- toggle(动画时长，动画速率，回调函数)
```js
$('.btn').click(function () {
    $('div').toggle(1000, 'linear', function () {
        console.log('切换完毕');
    })
})
````
### slide系列-滑动动画
- `slideUp`上滑动画
- `slideDown`下滑动画
- `slideToggle`切换，取反
- 接收三个参数(时间，速率，回调函数)
```js
// slideUp() 上滑
$('.up').click(function () {
    $('div').slideUp(1000, 'linear', function () {
        console.log('滑完了');
    })
})

// slideDown()   下滑
$('.down').click(function () {
    $('div').slideDown(1000, 'linear', function () {
        console.log('滑完了');
    })
})

//  slideToggle()  切换  取反
$('.change').click(function () {
    $('div').slideToggle(1000, 'linear', function () {
        console.log('滑完了');
    })
})
```
### fade系列-淡入/出动画
- `fadeIn`淡入动画
- `fadeOut`淡出动画
- `fadeToggle`切换，取反
- 接收1个参数，表示动画时间。
```js
$('button:eq(0)').click(function () {
    $('div').fadeOut(1000)
})

$('button:eq(1)').click(function () {
    $('div').fadeIn(1000)
})

$('button:eq(2)').click(function () {
    $('div').fadeToggle(1000)
})
```

### animate css动画
> 改变属性值时,可以通过animate过渡
- animate(), 接收4个参数：动画属性和属性值对象，过渡时间，速率，回调函数。
```js
// 1、你要改变的样式  以对象的形式写入 {width：'400',height:'400'}
// 2、时间  切换样式时的过渡时间
// 3、速率
// 4、回调函数

$('div').animate({width: '100px',height: '200px'},1000,'linear',function(){
	console.log('我是第4个参数，回调函数');
});
```
### 返回顶部
- jq中，通过`$(window)`可以获取window, 通过`$('html').scrollTop()`可以`返回`一个滚动`高度和宽度`组成的`对象`。  
- 通过给`scrollTop(0)`传参，可以修改滚动高度。
```js
// 原生获取滚动高度
// console.log(document.documentElement.scrollTop);
// 滚动事件 如果是窗口在滚动 事件赋给window
$(window).scroll(function () {
    // scrollTop()  jq获取滚动高度
    console.log($('html').scrollTop().top);

    // $(window).height() 获取窗口(视口) 高度
    if ($('html').scrollTop().top > $(window).height()) {
        $('.btn').fadeIn(500)
        setTimeout(function () {
            $('.btn').css('bottom', '50px')
        })
    } else {
        $('.btn').fadeOut(500)
    }
})

$('.btn').click(function () {
    $(this).animate({ bottom: '300' }, 1000)
    $('html').animate({ scrollTop: '0' }, 1000)
})
```

### stop 动画立即暂停
> 思考：当上一个jq动画没有执行完毕，如何立即停止，开启新的动画？
> stop()可以将`之前的的动画`停止，执行新动画。(写在新动画的前面)
```js
$('button:eq(0)').click(function () {
    $('div').stop().slideUp(2000)
})

$('button:eq(1)').click(function () {
    $('div').stop().slideDown(2000)
})
```

## jq对节点的操作
### 增删改
- 创建节点：`$('<p>hello</p>')`, 将节点放入到`$()`结构里面。  
- 删除节点：使用`remove()`方法，`$('li').remove()`。或者`empty()`以`清空子节点`。  
- 替换节点：方法一：`旧节点.replaceWith(新节点)`。方法二	：使用`新节点.replaceAll(旧节点)`
- 挂载节点1：子节点挂载:`append(子节点)和prepend(子节点)`。
- 挂载节点2：兄弟节点挂载: `before(new节点)和after(new节点)` 或者 `新元素.inserAfter(目标节点)` 和 `新元素.inserBefore(目标节点)`。
- 挂载节点3：父节点挂载(不常用)：`.wrap(父节点)`和`.warpAll(父节点)`和`.wrapInner(父节点)`
```js
// 创建节点
// DOM创建节点
// var li = document.createElement('li')
// li.innerHTML = 'xxx';
// jq创建节点
var a = 10
// jq创建节点
var p = $(`<p>${a}</p>`)
$('div').append(p)

// 删除节点
$('li:eq(1)').remove()
// .empty()  将节点里面的内容置为空 不删自己
$('.num1').empty()

// 替换节点
var newli = $('<li>newli</li>')
// 方式一: 旧节点.replaceWith(新节点)
$('li:eq(0)').replaceWith(newli)
// 方式二: 新节点.replaceAll(旧节点)
newli.replaceAll('li:eq(0)')

// 挂载节点
// 子级节点的挂载
$('ul').append(newli)
$('ul').prepend(newli)
// 兄弟节点的挂载
$('ul').before(newli)
$('ul').after(newli)
// 父级节点的挂载(不常用)
// .wrap(节点)  将wrap里面的节点作为父节点 去包裹前面的元素
var div = $('<div></div>')
$('.num1').wrap(div) //div当父节点
$('.num1,.num2').wrap(div)  //div当每个num的父节点。并集选择器，会分别包裹
// .warpAll(父节点)  多个节点时，会一次性全部包裹起来
$('.num1,.num2').wrapAll(div)
// .wrapInner(节点) 包裹选择器的子元素
$('.num1').wrapInner(div) // 等于认.num1做父节点，认.num1的子节点做div自己的子节点。
```

### 查
> 获取内容和设置。  
> 原生DOM: `.textContent` 和 `.innerHTML`  
> jq: `text()`和`html()`, 与原生非常像。
> jq中，input获取内容和设置内容`$('input').val()`。
```js
// 获取
console.log($('div').text());
console.log($('div').html()); 
// 设置
$('div').text('新的文本')
$('div').html('<span>新的span标签</span>')
// 获取和设置input的value
console.log($('input').val());
console.log($('input').val('10'));
```

## jq中节点的关系
### 祖先级别
- `.parent()`拿到`亲代`父元素
- `.parents()`拿到`所有代`父元素
- `.parents('')`拿到所有代里面，`符合条件的`父元素
- `.parentsUntil('')`拿到`自己`及`符合条件父元素`的，`两者之间`的元素。
```js
// .parent() 亲代父元素
console.log($('.spanEle').parent());
// .parents() 获取所有代父子关系的元素
console.log($('.spanEle').parents());
// .parents(元素选择器)  拿到所有代里面，符合条件的父元素
console.log($('.spanEle').parents('.son'));
// .parentsUntil('元素选择器') 自己及符合条件父元素的，两者之间的元素。
console.log($('.spanEle').parentsUntil('.father'));
```

### 后代级别
- `children()`拿到`亲代`子元素
- `find()`所有的后代中，`查找`到`符合条件`的元素。
```js
//  children(元素选择器) 拿到符合条件的直接子元素
console.log($('.father').children('.newSon'));
// .find(元素选择器) 在后代元素中查找符合选择器的元素
console.log($('.father').find('.spanEle'));
```

### 同级元素
- `next()`  `下一个`兄弟节点
- `nextAll()`  `下面的所有`兄弟节点
- `nextUntil()`  自己和该兄弟节点`之间的`节点。
- `prev()`  `上一个`兄弟节点
- `prevAll()`  `上面的所有`兄弟节点
- `prevUntil`  该兄弟节点和自己`之间的`节点。
- `siblings()`  `所有的`兄弟节点
- 兄弟节点的`排它法`: `$(this).addClass('active').siblings().removeClass('active')`
```js
//  .next() 下一个兄弟节点
console.log($('.div2').next());

// nextAll() 拿到下面所有的兄弟节点
console.log($('.div2').nextAll());

// nextUntil(元素选择器) 从前面元素开始找兄弟节点直到后面的兄第节点结束 不包含自己
console.log($('.div2').nextUntil('.div5'));

// .prev()   拿到上一个兄弟节点
console.log($('.div2').prev());

// prevAll() 拿到下面所有的兄弟节点
console.log($('.div4').prevAll());


// prevUntil(元素选择器)
console.log($('.div5').prevUntil('.div1'));

// siblings()  拿到所有的兄弟节点 但不包含自己(适合做排它法)
console.log($('.div3').siblings());

// 排它法：
$(this).addClass('active').siblings().removeClass('active')
```

## jq对属性和样式的修改
### css函数
- 方式一：单个属性：`css('background', 'yellow')`
- 方式二：多个属性：`css({ background: 'blue', height: '300px' })`
```js
// 改变单个属性
$('div').css('background', 'yellow')

// 改变多个属性 写出对象的形式
$('div').css({ background: 'blue', height: '300px' })
```
### class系列函数
- 添加类名：`addClass()`,与原生一样，支持一次性添加多个。
- 删除类名：`removeClass()`
- 切换类名：`toggleClass()`
```js
$('div').click(function () {
// 元素.addClass(类名) 可以添加多个 用空格隔开
// $(this).addClass('font ftcolor ')

// removeClass(类名) 删除类名 可以删除多个 用空格隔开
// $(this).removeClass('br ftcolor font')

// toggleClass(类名) 取反 有就删 没有就加
$(this).toggleClass('br ftcolor font')
})
```

### jq操控盒子
- `width()` 和 `height()`  获取宽高(不含padding或border)
- `innerWidth()` 和 `innerHeight()` 获取宽高，且夹带padding
- `outerWidth()` 和 `outerHeight()` 获取宽高，夹带padding且border
```js
// 获取元素的宽高 传参可以设置
// console.log($('div').width());
// console.log($('div').height());
// $('div').width('500px')

// 获取盒子宽+padding
console.log($('div').innerWidth());

// 获取盒子的高+padding
console.log($('div').innerHeight());

// 获取盒子内容+padding+boder
console.log($('div').outerWidth());
console.log($('div').outerHeight());
```

### jq操控位置
- `offset()`距离。返回含`left`和`top`的对象。意义和原生DOM一样，参考点的距离。
- `scroll()`滚动事件，`scrollTop()`返回滚动距离。意义和原生DOM一样，`.scrollTop`。
```js
// offset() 返回的是一个对象 对象里面有left和top
console.log($('div').offset().top);
console.log($('div').offset().left);

// scroll事件 可以在滚动时获取最新的scrollTop值
$('div').scroll(function () {
    // 在jq中scrollTop() 是一个方法
    console.log($(this).scrollTop());
})
$('div').click(function () {
    // 直接给scrollTop() 传参就可以设置scrollTop值
    $(this).scrollTop(0)
})
```

### jq操控标签属性
- `attr()`获取属性(第1个参数)和设置属性(第2个参数), 适用于`任何`属性。
- `prop()`获取属性(第1个参数)和设置属性(第2个参数),仅适用于`标准默认`属性。
```js
// attr(属性名) 获取
console.log($('p').attr('score'));
// 传两个参数 是修改
$('p').attr('score', '200');
// 获取一个不存在属性 值是und
console.log($('p').attr('name')); //undefined
console.log($('p').attr('age')); //undefined

// prop()  只能获取和修改默认属性(标准属性)
console.log($('p').prop('id'));
// 自定义属性获取是und
console.log($('p').prop('score'));  //undefined 
$('p').prop('id', 'name')
// 获取input属性
console.log($('input').prop('checked')); //false
```

### jq获取节点的索引
- 方法一： `$(this).index()`，前提是`this`在伪数组里面。
- 方法二： `$('li').index($(this))`,前面写伪数组，后面写具体元素。
```js
// 获取点击的li的具体索引
// 方法一： $(this).index() 前提是this再伪数组里面。
// 方法二：$('li').index($(this)) 前面写伪数组，后面写当前元素
$('li').click(function(){
    // 方法1
    console.log($(this).index());
    // 方法2
    console.log($('li').index($(this)))
})
```

### 具体案例
- 导航栏吸顶效果
```js
// 假设p为导航栏
var pH = $('li p').offset().top;
$(window).scroll(function () {
    var topH = $(this).scrollTop();
    console.log(topH);
    console.log(pH);
    if (topH > pH) {
        $('li p').addClass('fixed');
    }
    else {
        $('li p').removeClass('fixed');
    }
});
```

- 鼠标跟随效果
```html
<style>
        body {
            position: relative;
        }
        div {
            position: absolute;
            left: 0;
            top: 0;
        }
</style>
<ul>
    <li>
        <img src="./img/1.png" alt="">
    </li>
    <li>
        <img src="./img/2.png" alt="">
    </li>
    <li>
        <img src="./img/3.png" alt="">
    </li>
</ul>
<div>
    <img src="./img/1.png" alt="" style="transform: scale(2); display: none;">
</div>
```
```js
// 跟随鼠标
$('li img').hover(function (e) {
    $('div img').fadeIn(100);
    $('div img').attr('src', $(this).attr('src'));
}, function () {
    $('div img').fadeOut(100);
});

$('li img').mousemove(function (e) {
    $('div img').offset({
    	//添加20像素偏移，防止div挡住底下的li，触发hoverOff的fadeOut
        left: e.pageX + 20, 
        //添加20像素偏移，....
        top: e.pageY + 20,
    });
})
```