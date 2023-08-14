# vue2源码解析
## 模块判断
> 判断`exports`和`module`是否存在(支持), 也就是`commonjs规范`  
> 判断`define`是否存在(支持), 也就是`AMD规范`(异步模块定义)  
> 如果以上都不支持，则表示是`ECMA规范`, 也就是浏览器. 就添加`Vue`属性为`Vue构造函数`
```js
(function (global, factory) {
  // nodejs的模块化开发，exports和module.exports是否存在，也就是commonjs规范。
  // 存在的话，导出工厂函数module.exports = factory()
  // 不存在的话，判断define是否存在，define是js(AMD规范，异步模块定义)中一个特殊的函数，用来定义模块
  /* 
    define(function() { return { name: 'js', age: '3' } }); 
    在上面的示例中,我们使用define函数来创建了一个模块,
    这个模块包含了一个返回对象的函数。
  */
  // define(factory) 
  // 以上两个都是ES Module诞生之前，对于模块化定义的规范。

  // 如果以上两个规范都不满足，则给Window添加Vue属性，属性值为工厂函数。
  // global.Vue = factory()
  // 因此可以直接使用Vue.xxx方法。
  // new Vue 就是 new factory();
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.Vue = factory());
}(this, (function () {
```

## 工具函数
### **_toString**
> 定义一个转`字符串`的方法。   
> 利用`JSON.stringify`的`3`个参数，实现`处理`，`转换`和`美化输出`。
```js
/**
   * Convert a value to a string that is actually rendered.
   * 定义一个_toSting 方法
   * 返回值:
   *  val是null 返回 ''
   *  val是引用类型的 返回 JSON.stringify(val,null,2)的结果
   *    将引用类型的属性系列化为JSON格式,同时缩进2个空格.
   *     JSON.stringify(value, replacer, space) 序列化为JSON格式.
   *      value: 将要序列化成 一个 JSON 字符串的值。
   *      replacer: 
   *            如果传入null或不提供,所有属性都系列化
   *            如果传入函数,序列化时每个属性都经过函数处理
   *            如果传入数组,序列化时属性包含在数组中才处理
   *              
   *     space: 指定输出后的缩进,用于美化输出, 格式更规范.
   *            如果没有传入或null, 默认没有空格.
   *            如果传入数字(1-10), 代表空格的数量来"缩进". 小于1则没有空格.
   *            如果传入字符串, 代表前10个字母占据"缩进"的位置.             
   *  val不是引用类型的, 返回String转换后的字符串.
   */
  function _toString(val) {
    return val == null
      ? ''
      : typeof val === 'object'
        ? JSON.stringify(val, null, 2)
        : String(val)
  }
```

### toNumber
> 用于转换为`浮点型数字类型`，转换`失败`时返回`原值`。
```js
/**
   * Convert a input value to a number for persistence.
   * If the conversion fails, return original string.
   * 定义一个toNumber方法, 
   * 用于转换为数字类型,如果转换失败,返回原值.
   *    使用parseFloat方法,转换为浮点数字类型.
   *       parseFloat(val)  只能接收一个参数, 第二个参数无效.
   *       目前对于parseInt()方法, 第二个参数才表示进制.
   * 
   * 
   * 最新版Vue3源码已经修改为
   * const looseToNumber = (val) => {
   *    const n = parseFloat(val);
   *    return isNaN(n) ? val : n;
   *    //利用isNaN判断是否转换失败,失败就直接返回原值.  
   *  };
   */
  function toNumber(val) {
    var n = parseFloat(val, 10)
    return (n || n === 0) ? n : val
  }
```

### makeMap
> 用于返回一个函数, 用于`判断`某个`字符`(是否在`源字符串中`).支持转小写再判断。   
> 核心是使用`Object.create(null)`创建纯净的空对象`map`，  
> 将`源字符串`转数组，每项作为`键`添加到`map`内, `键值`为`true`, 根据参数决定是否转小写。  
> 早期实现的类似于`map类型功能`的方法，`map对象`。
```js
/**
   * Make a map and return a function for checking if a key
   * is in that map.
   * 定义一个makeMap方法, 用于返回一个用于判断(是否在源字符串中)的匿名函数, 
   * 该函数传参个字符后, 可以判断参数是否在源字符串中.
   * (支持转小写再判断)
   * 用法: 
   * makeMap('a,b,c,d',true).('A') === makeMap('a,b,c,d').('a') === true
   * str为字符串格式,用于判断的源字符串
   * expectsLowerCase 为布尔格式 (true,false),用于是否要切换小写再判断.
   */
  function makeMap(
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null)
    // 创建一个变量名为map的对象, map的__proto__指向null,
    // 也就是创建一个纯净的空对象,没有继承任何东西
    // 防止继承了别的键名,导致判断的时候出现bug.
    var list = str.split(',')
    // 将str以"逗号"分割为一个数组
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true
      // 给map添加键名为list项,键值为true的键值对.
      // 全部添加上.
    }
    // 是否有期望转小写
    // 如果期望,则返回一个匿名函数, 函数的返回值是
    // map[val.toLowerCase()] 也就是返回的函数, 
    // 调用后,传参一个字符, 可以用于该字符判断是否在map中.
    // 例如: makeMap('a,b,c,d',true).('a')
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
    /* 为何不用 in 关键字判断? ES6 ---- 2015年出的 */
  }

  /**
   * Check if a tag is a built-in tag.
   * vue2官方用来举例的方法.
   * 用它可以创建了一个字符(标签)用于判断是否为源字符串的方法(自己规定的内置标签).
   * 传入大量vue2自己的内置标签.
   */
  var isBuiltInTag = makeMap('slot,component', true)
  // isBuiltInTag('slot') ==== true
```

### remove$1
> 用于移除数组中，选定项的方法，影响原数组。  
> 核心是使用`indexOf`和`splice`
```js
/**
   * Remove an item from an array
   * 移除一个数组规定项的方法,影响原数组. remove$1
   * arr: 目标数组
   * item: 规定项
   */
  function remove$1(arr, item) {
    // 排除空数组
    if (arr.length) {
      var index = arr.indexOf(item)
      if (index > -1) {
        // 找到该项,返回截取后的源数组.(splice影响原数组)
        return arr.splice(index, 1)
      }
    }
  }
```

### hasOwn
> 判断一个`key`是否为对象的`私有属性`。  
> 核心是借用`Object.prototype.hasOwnProperty`方法，调用`call`改变this, 实现判断。  
> 为何要`借用`? 自己也有。 因为自己的容易被修改。
```js
/**
   * Check whether the object has the property.
   * 判断key是否为obj的私有属性.
   * hasOwnProperty.call(obj, key),
   *   调用 Object.prototype.hasOwnProperty(key) 
   *   利用call改变this, 也就是调用的Object的原型对象上的方法, this指回自己.
   *   并不等价于 obj.hasOwnProperty(key); 
   *   一个是共享方法(不易被修改),一个是私有属性.
   * 这样转弯写?? 
   *   目的是防止: 后面修改了或者已经定义了obj自己的hasOwnProperty方法.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
  }
```

### isPrimitive
> 检查变量是否为`原始简单`类型。(string和number)
> 核心是使用`typeof`
```js
/**
   * Check if value is primitive
   * 检查值是否为原始简单类型。(string和number)
   */
  function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number'
  }
````

### cached
> 一个使用`函数闭包`实现`缓存`的方法。   
> 实际是使用`对象`的`键`或者`键值`是否存在实现的,存在时就不执行函数了，从对象中取。  
- 核心是创建纯净对象`cache`。
	- 支持传入`fn`作为回调函数，`str`作为回调函数的实参。
- 根据`实参`判断是否为对象内的键，决定是否存入作为缓存。 
	- 不存在键值: 将`str`做键，`fn`函数调用的结果作为键值，缓存到对象中，返回键值。 
	- 存在键值: 返回对象中的键值，`不再执行函数`。
- 始终都会创建对象，因此使用时，外界一般会用变量接收保存起来。
- 扩展: 可以添加`dirty`标记，默认`false`。
- 一旦`值`被修改了，改`dirty`为true, 根据`dirty`布尔值调用缓存方法。
- 也可以用`Map`数据类型实现`缓存`。
```js
/**
   * Create a cached version of a pure function.
   * 创建一个缓存版本使用纯函数方法(实际是利用对象的键值对)。
   * 缓存回调函数的结果.
   */
  function cached(fn) {
    var cache = Object.create(null)
    // 创建一个纯净的对象cache
    // 返回一个函数，用于调用回调函数(回调函数中可以定义一个字符串作为形参)，
    // 该返回的函数来接收实参
    // 并且根据判断，存入对象cache作为缓存。
    // (该字符串作为键名，函数调用的结果作为键值。)
    // 再次调用时,如果对象内有该值,就返回该值.
    return function cachedFn(str) {
      var hit = cache[str]
      // 传入一个字符串，判断对象（cache）里有没有，
      // 如果没有则调用回调函数，
      // 把结果作为键值保存在cache对象里面。键名就是传入的字符串。
      // 返回键值.cache[str]
      // 如果有则返回键值.
      return hit || (cache[str] = fn(str))
    }
  }

  // 简单的使用
  // var cacheObj = cached(function (str) {
  //   return str+'wc'
  // });
  // console.log(cacheObj('name'));
  // 这样的话, 第一次调用会返回 (cache[str] = fn(str)) 的结果,
  // 也就是cache[str] 'namewc'
  // 用变量接收形式调用也可以
  // var cFn = cached(function (str) {
  //   return str+'wc'
  // });
  // cFn('name');  //返回'namewc'
  // 第二次调用时
  // 对象(缓存)里面有，就直接返回'namewc',
  // 而不用执行函数了。
```

### camelize
> 将`连字符`形式的字符串转为`驼峰命名`形式  
> 同时调用`cached()`将结果缓存起来。
> 核心是`正则匹配`和`str.replace()`的第`2`个参数的功能。
- 第`2`个参数(replacement) 接收字符串或函数
	- 字符串: 替换的字符串
	- 特殊匹配模式: `$n`, $表示正则匹配的次数，插入第n个捕获组(n<100)
	- 函数: 为每个匹配项，调用该函数进行`处理`，并将`返回值`用作替换文本。
		- 该函数接收多个参数，具体见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#%E8%AF%AD%E6%B3%95)
		- 第1个参数: 表示`整个字符`。
			- `_`下划线一般用作`占位符`, MDN中约定写作`match`。
		- 第2个参数`c`: 表示每个匹配项的`形参`。
		- 注意: 该函数`不能`写成`箭头函数`, 结果会不一样。
```js
/**
* Camelize a hyphen-delmited string.
* 将连字符形字符串转为驼峰命名Camellize。
* name-wc ---> nameWc   (-w 转为W)
*/
// 正则表达式 \w:表示 [0-9a-zA-Z_] 任何单词字符。
// 全局匹配 -后面的[0-9a-zA-Z_] 的字符，也就是-1或者-a 这样的1和a
var camelizeRE = /-(\w)/g
var camelize = cached(function (str) {
// replace(old,new/fn); 第二个参数传入函数，处理完以后再返回作为替换文本
// replace(pattern, replacement)
// replacement：接收字符串或函数，
    // 如果是字符串: 替换对应的字符串
    // 特殊替换模式：如果是$n, 则$表示正则匹配的次数，
	    // 插入第 n（索引从 1 开始）个捕获组(n<100)
    // 如果是函数: 将为每个匹配调用该函数，并将其返回值用作替换文本。
  	// 函数形参(match, p1, p2, …, pN, 等等)

/* 'abc'.replace('a', function(_,a){
      return a+'1';
    });
    //a1bc
    'abc'.replace('a', function(match,a){
      return a+'1';
    });
    //a1bc
*/
// 匹配'-a'，符合的处理一遍，转为大写(A)作为new，再替换。
// _表示匹配的子字符串，
return str.replace(camelizeRE, 
	function (_, c) { return c ? c.toUpperCase() : ''; })
})
```

### capitalize
> 首字母转大写，并且带缓存。
```js
/**
* Capitalize a string.
* 把一个字符转换为首字母大写。
* 取第1个转大写，其余截出来，拼接即可。
*/
var capitalize = cached(function (str) {
return str.charAt(0).toUpperCase() + str.slice(1)
})
```