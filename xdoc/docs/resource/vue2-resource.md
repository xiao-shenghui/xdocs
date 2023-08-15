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
}(this, (function () {...}
```

## 工具函数
> 工具函数及作用大纲  

|函数名|中文名|函数意义|重要级别|描述|
|---|---|---|---|---|
|`_toString`|转字符串|||||
|`toNumber`|转浮点数字||||
|`makeMap`|是否包含在内||||
|`remove$1`|移除数组项||
|`hasOwn`|判断私有属性||||
|`isPrimitive`|判断原始简单类型||||
|`cached`|实现缓存|使用闭包函数和对象实现缓存|⭐⭐⭐⭐⭐||
|`camelize`|转小驼峰|实现连字符转小驼峰||使用正则匹配和replace的第二个参数.|
|`capitalize`|首字母大写||||
|`hyphenate`|小驼峰转连字符||||
|`bind$1`|性能更好的bind|||根据参数的数量，调用`call`和`apply`|
|`toArray`|转数组|类数组对象转为数组对象，一般用于JSON格式。|||
|`extend`|搬运扩展对象的属性||||
|`isObject`|判断是否为普通对象||||
|`isPlainObject`|判断是否为纯js对象||||
|`toObject`|数组转类数组对象||||
|`noop`|函数的初始形态定义||||
|`no`|返回false的函数||||
|`genStaticKeys`|获取所有的静态(staticKeys)属性||||
|`looseEqual`|比较对象是否大致相等||||
|`looseIndexOf`|遍历对象中的某个对象项||||
|`isReserved`|判断是否为保留字||||
|`def`|操控定义对象的属性||||
|`parsePath`|解析路径|根据`.`字符，获取对象最深层的值|⭐⭐⭐⭐⭐|配合`Watcher`更新数据变化。用于解析Vue模板中的`表达式`, 设置getter.|
|`isNative`|检测`构造器`是否为`js原生代码`||||
|`nextTick`|渲染后执行的`延迟回调`，支持指定this.|可以拿到页面`完全渲染`后的数据|⭐⭐⭐⭐⭐||

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
   * 定义一个makeMap方法, 用于返回一个用于判断(是否在源字符串中)的函数, 
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

  // vue3中依然保留了这个函数，返回时更加严谨, 加!!双重转换为布尔值。
  function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(',');
      for (let i = 0; i < list.length; i++) {
          map[list[i]] = true;
      }
      return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
  }
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
> 实际是使用`对象`的`键`或者`键值`是否存在实现的,  
> 存在时就不执行函数了，从对象中取。  
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
> `首字母转大写`，并且带缓存。
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

### hyphenate
> 将`驼峰命名`的字符串，转换为`小写且连字符`格式  
> 核心是利用`正则匹配`和`replace()`第二个参数的`$n`匹配
```js
/**
   * Hyphenate a camelCase string.
   * 匹配A-Z的字符，或者A-Z字符前一个别的字符，如A和sA
   * 测试正则的功能：string.match() 
   * 'AdsBaArA'.match(/([^-])([A-Z])/g); 返回['sB', 'aA', 'rA']
   * $1-$2 表示匹配组，-表示连字符，也就是匹配组之间加-
   * BdsaAdsCadsadas ----> 转为 bdsa-ads-cadsadas
   * 没有看懂为何要加两层replace.
   */
var hyphenateRE = /([^-])([A-Z])/g
var hyphenate = cached(function (str) {
  // replace中，第二个参数为字符串的特殊情况，$n
  // $1-$2表示匹配的1组和2组之间，插入-
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
})
```

### bind$1
> 一个号称性能更好的`bind`函数  
> 兼容`老版本浏览器`不支持原生`bind`。  
> 性能优化: 据说参数多时，使用`apply`，参数少时，使用`call`性能更好。  
> 核心是根据参数，函数调用call和apply实现改变this.
```js
/**
* Simple bind, faster than native
* 更简单的bind，比原生更快. 函数的形式调用, 并且能达到call/apply的效果。
* 兼容了老版本浏览器不支持原生的bind函数。
* 用法：bind$1(fn, targetObj)(1,2,3)
* 如果传的参数多于1个，调用fn.apply(ctx, arguments)
* 如果传的参数只有1个，调用fn.call(ctx, a)
* 如果没有传参数，调用fn.call(ctx)
*/
function bind$1(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  // 保存一下原始函数的length属性。
  boundFn._length = fn.length
  return boundFn
}
```

### toArray
> 将一个`类似于数组`的对象, 转为数组。  
> 支持指定`起始索引`。  
> 核心是计算起始索引到最大长度的`差长度`，创建空数组，  
> 遍历`类数组`对象，往空数组塞内容。返回数组。
```js
/** Convert an Array-like object to a real Array. **/
function toArray(list, start) {
  start = start || 0
  var i = list.length - start
  // 用变量接收，总长度 - 指定起始索引
  var ret = new Array(i)
  // 创建一个i长度的空数组
  while (i--) {
    // 循环往数组里追加内容。
    // 从最大索引(i+start) 一路加到start
    ret[i] = list[i + start]
  }
  return ret
}
```

### extend
> `搬运`传入的`源对象`上的所有`键和值`到`新对象`。  
> 也就是对象的`键值对扩展`。  
> 核心是使用`for in`遍历
```js
/* Mix properties into target object. */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key]
  }
  return to
}
```

### isObject
> 粗略的对象类型判断。   
> 主要用于一个已知JSON类型时，判断`JSON对象`还是`JSON字符串`  
> 核心是使用`typeof`判断。
```js
/*
  * Quick object check - this is primarily used to tell
  * Objects from primitive values when we know the value
  * is a JSON-compliant type.
*/
function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}
```

### isPlainObject
> 严格的对象类型判断.  
> 可以用于判断任意变量是否为`纯js对象`。  
> 核心是借用`Object.prototype.toString`, 判断是否为`[object Object]`。
```js
/*
  * Strict object type check. Only returns true
  * for plain JavaScript objects.
*/
var toString = Object.prototype.toString
var OBJECT_STRING = '[object Object]'
function isPlainObject(obj) {
  // 使用toString方法，检测对象经过toString后，是否为'[object Object]'
  // 由于借用了Object.prototype.toString, 所以要用call改变this.
  return toString.call(obj) === OBJECT_STRING
}
```
- vue3中，继续使用了这个方法
```js
/* 
甚至在vue3中，依旧借用了这个方法，
但是没有将变量(OBJECT_STRING)暴露在全局中。
*/
const isPlainObject = (val) => toTypeString(val) === '[object Object]';
/** vue3自己封装了toTypeString方法
 * (目的是为了避免和toString重名)
 * （底层如下： 还是用toString）。
**/
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
```

### toObject
> 和`toArray`方法相反。   
> 将一个`数组`，转换为`类似数组的`对象。
> 核心是给`空对象`遍历使用`extend`方法添加为对象。
```js
/** Merge an Array of Objects into a single Object. **/
function toObject(arr) {
    var res = {}
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i])
      }
    }
    return res
  }
```
### noop
> 一个函数的`初始形态`,常用于赋值初始值。
```js
function noop() { }
// 489行，给config对象的getTagNamespace赋值为空函数。
{
  getTagNamespace: noop
}
```

### no
> 一个一经`调用`就`返回false`的函数
```js
/* Always return false. */
var no = function () { return false; }
```

### genStaticKeys
> 获取`编译模块`(数组格式)的`静态(staticKeys)属性`的方法.  
> 返回其组成的字符串。  
> 核心是使用数组的`reduce`方法，返回`xx.staticKeys`并且用`concat`连接为数组，最后用`,`连接为字符串。
```js
/* Generate a static keys string from compiler modules. */
function genStaticKeys(modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}
```

### looseEqual
> 比较两个`基本类型`或`js对象`是否`大致相等`。  
> 也就是比较`数据`是否相等，不比较`地址`。  
> 核心是使用`JSON.stringify`序列化为JSON格式，再`===`比较。  
> 比较之前，使用`isObject()`判断均为对象.
```js
function looseEqual(a, b) {
  /* eslint-disable eqeqeq */
  /* JSON.stringify({name: '123'}) === JSON.stringify({name: '123'});  返回true */
  return a == b || (
    isObject(a) && isObject(b)
      ? JSON.stringify(a) === JSON.stringify(b)
      : false
  )
  /* eslint-enable eqeqeq */
}
/*
  测试使用: console.log(looseEqual({name: '123'}, {name: '123'}))
*/
```

### looseIndexOf
> 借用`looseEqual`，遍历检索`数组中`是否有对应的某一个`对象`作为项。  
> 有则返回索引，没有就返回-1

```js
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}
```

### isReserved
> 检索是否为Vue官方的`保留字符`。  
> 检索`字符/变量`是否以`$`或者`_`开头。  
> 核心是使用`charCodeAt(0)`判断开头索引的的`UTF-16 字符`,详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)。
```js
function isReserved(str) {
  var c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}
```

### def
> 定义一个对象的`属性`(property)  
> 使用`Object.definePorperty`, 只是用于`定义`,并不涉及响应式。
```js
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
```

### parsePath
> 逐级获取传入对象最深层(最后项)的属性值。  
> 核心是使用`split(.)`和返回闭包函数，函数内使用遍历获取最深层的属性值。  
> Vue中的核心函数之一，用于`Watcher()函数`依赖收集时，设置`this.getter`的。  
> 用于解析Vue模板中的`表达式`，例如元素绑定或计算属性中用的表达式。  
> 用于监听对象属性的变化，一旦属性值发生变化时触发相应的更新操作。
```js
// Parse simple path.
/*
* 如果不含`.`, 直接返回
* 如果含有，则返回一个函数(支持传对象)，用于遍历,直到取出最终的值。
* 函数内根据`.`分割为数组，遍历数组，逐级获取传入对象的值，
* 直到最深层(最后项的值)
*/
var bailRE = /[^\w\.\$]/
function parsePath(path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.')
    // ['\dsadas\dasdas']
    // 假设obj 传入{}
    // obj = obj[segments[i]]
    // obj = undefined
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]]
      }
      return obj
    }
  }
}

/*
* 测试使用
* parsePath('a.b.c')({a:{b:{c:'value'}}})
* 可以返回c的属性值'value'
* 如果属性c的值变为'name'
* parsePath('a.b.c')({a:{b:{c:'name'}}})
* 可以立即拿到值'name'。
*/

// 一点点Watcher的源码
if (typeof expOrFn === 'function') {
  this.getter = expOrFn
} 
else {
  this.getter = parsePath(expOrFn)
  if (!this.getter) {
    ...
  }
}
```

### isNative
> 检测`构造器`是否为`原生代码`,  
> 使用`/native code/`和`代码的toString()`正则匹配。
```js
/* istanbul ignore next */
  function isNative(Ctor) {
    return /native code/.test(Ctor.toString())
  }
  // Array.toString()
  // 'function Array() { [native code] }'
```

### nextTick
> 在vue中，这个函数表示`渲染后执行的延迟回调`，可以拿到`渲染后`的数据。  
> 常说vue的任务渲染是异步的，那么其原理就在里面。
#### 用法
```js
Vue.nextTick( [callback, context] )
/*
  {Function} [callback]
  {Object} [context]
  在下次 DOM 更新循环结束之后执行延迟回调。
*/
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})
```
#### 原理
> nextTick接收`立即执行函数`的结果，返回`queueNextTick函数`  
> 它接收2个参数，一个是`函数cb`，一个是`可指定对象ctx`。  
- `ctx`用于指定函数的`this`, 
  - 如果传了ctx的话,`cb函数`会再`用函数包裹`,
  - 并且内部用`cb.call(ctx)`改变this, 才推入任务队列.
- 由于借用了`promise.then()`, 因此所有的任务都是`异步的`。
- 因此后面使用`nextTick(cb)`传入的`任务cb`，要`等`所有的任务执行完才走。
```js
// 由于借用了promise.then(), 因此后面推入的任务都是在所有任务执行完才执行.   
// 也就是Vue.nextTick()函数的作用原理.

// nextTick立即执行函数里面，设计的就像一个微任务队列一样。
// 有数组保存任务队列，
// 有标识符pending表示当前是否正在执行任务，
// 有清空任务的函数nextTickHandler
// 有借用promise.then,实现异步执行.
var nextTick = (function () {
  var callbacks = []
  // 回调函数组成的数组
  var pending = false
  // 设置一个标识符用于表示是否等待
  var timerFunc
  // 定义一个时间函数。

  // 用来清空callbacks任务队列的函数。
  function nextTickHandler() {
    // 定义pending为不等待
    pending = false
    // 将所有回调函数（任务）截取出来。
    var copies = callbacks.slice(0)
    // 清空原来用于保存回调函数的数组
    callbacks.length = 0
    // 循环遍历执行所有的回调函数。(也就是清空任务)
    for (var i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  if (typeof Promise !== 'undefined' && isNative(Promise)) {
        // 如果可以使用Promise
        var p = Promise.resolve()
        // 创建一个成功的promise对象p
        timerFunc = function () {
          // 产生微任务队列 执行 nextTickHandler
          // 也就是使用promise.then来清空事件。(异步)
          p.then(nextTickHandler)
          if (isIOS) { setTimeout(noop) }
        }
  }
    // 最终返回一个函数queueNextTick，接收cb和ctx
    // 创建一个变量func，表示单个回调函数(单个任务)
    // 如果传了ctx,则创建一个函数包裹，
    // 包裹里面执行让this指向ctx，
    // 没传则依旧是cb
    // 然后把该任务推入callbacks任务队列里面。
    return function queueNextTick(cb, ctx) {
      var func = ctx
        ? function () { cb.call(ctx) }
        : cb
      callbacks.push(func)
      // 如果pendding为false,
      // 改为true, 同时调用nextTickHandler，清空任务。
      if (!pending) {
        pending = true
        timerFunc(nextTickHandler, 0)
      }
    }
})()
```
#### 总结
- nextTick立即执行函数里面，设计的就像一个`微任务队列`一样。
- 有数组`callbacks`保存任务队列，
- 有标识符`pending`表示当前是否正在执行任务，
- 有清空任务的函数`nextTickHandler`
- 有借用`promise.then`,实现`callbacks`的所有任务都`异步`执行.
```js
// the nextTick behavior leverages the microtask queue, 
// which can be accessed 
// via either native Promise.then
```

## 变量及表达式
> vue源码的表达式大全  

|变量名|中文名|描述|
|---|---|---|
|`hasProto`|能否用隐式原型对象||
|`inBrowser`|检测浏览器环境||
|`devtools`|检测是否有浏览器插件`devtools`||


### hasProto
> 判断能否使用`__proto__`隐式原型对象。
```js
var hasProto = '__proto__' in {}
```

### inBrowser
> 判断`window`对象是否可用。  
> 核心是借用`Object.prototype.toString()`, 转换后看是否为`[object Object]`.
```js
var inBrowser = typeof window !== 'undefined' &&
    Object.prototype.toString.call(window) !== '[object Object]'

// 判断环境
var UA = inBrowser && window.navigator.userAgent.toLowerCase()
var isIE = UA && /msie|trident/.test(UA)
var isIE9 = UA && UA.indexOf('msie 9.0') > 0
var isEdge = UA && UA.indexOf('edge/') > 0
var isAndroid = UA && UA.indexOf('android') > 0
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
```

### devtools
> 检测是否有浏览器插件`devtools`
```js
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
```

- vue2.0，721行---20230815 待更新
