# JS基础
## 认识js
### 写入方式
```html
<!-- js javascript js是前端的核心编程语言 js -->    
<!-- js的写入方式 -->
<!-- 1、行内 -->
<!-- on 前缀 click 点击事件 -->
<!-- 2、内嵌式 -->
<!-- 把js写到脚本标签script里面 -->
<!-- 3、外链式 -->
<!-- 引入外部js文件，需要我们手动创建xxx.js -->
<!-- js的组成： ECMAScript 语法 DOM 文档模型 BOM 浏览器模型 -->
```
### 注释
```js
// 单行注释 ctrl +/
/* alt + shift + a 多行注释,
可以嵌套单行注释，
但是不能嵌套多行注释*/
// 用着不方便，可以改成ctrl+shift+/ 设置，键盘快捷方式，alt+shift+a
```
### 输入与输出
```js
// 输出语句
// 弹出框 alert() 参数只有一个, 用于输出字符串的提示信息
// 确认框 confirm()
// 控制台输出 console.log()
// 输入语句
var pas = prompt("请输入你的银行卡密码");
console.log(pas);
prompt("111", "我是input默认值");
```

## js变量
### 认识变量
```js
// 变量：存放数值的容器，一种保存数据信息的方法
// 内存空间的别名，操作变量本质是对内存空间数据的操作
// 声明一个变量 var (variable 多变的) 
// 除了var 还可以使用let const (es6)
// var username 声明 'myname' 初始化，赋值
// 注意：起名：见名知意
```
### 变量提升
```js
console.log(str); //undefined 未定义
var str = 100;
var age = 18, username = '111';
console.log(age, username);
```
### 变量命名规范
[关键字和保留字](https://developer.mozilla.org/zh-CN/docs/web/javascript/reference/lexical_grammar)
```js
// 语法规则：
// 首字母为字母（a-z A-Z _ $）。
// (不能以数字，特殊字符（+ - /）开头。)
// 避免使用js关键字和保留字。
// 严格区分大小写
// 命名规范-建议遵守-语义化
// 多个单词使用驼峰标识；
// 赋值 = 两边都加上一个空格；
```

## 数据类型
### 认识数据类型
- 数据类型
	- 基本数据类型
	- 引用数据类型
```js
// 为什么需要数据类型?
// 内存空间是有限的，便于合理的使用内存空间。
// 不同类型的数据，分配不同内存空间。
/*
1. 基本数据类型：
    Number 数字类型
    String 字符串类型
    Boolean 布尔类型 true,false
    Undefined 未定义
    Null 空
    Symbol 唯一，ES6新增
    BigInt 大整数
2. 复杂数据类型：
    Object 对象
    Array 数组
    Function 函数
*/
```
### 基本数据类型
```js
// 1.number
// 数值，数学运算，整数，小数，负数，特殊数值，NaN
// 2.string 字符串 记录一段文字 "",''
// 外层"",里面只能''
// 外层'',里面只能""
// 字符串拼接
var str4 = '吴亦凡', name = "姓名：";
console.log(name + str4);

// 反引号 `` 嵌入变量或者表达式 ${}
var name1 = `${str4}`;
document.write(`<h1>${name1}</h1>`);

// boolean 布尔类型 true 和 false
var con = confirm("我能不能拿24k");
console.log(con);

// undefined 未定义
var num;

// null 空,空对象
```

### 复合数据类型
- Array
```js
// Array 数组 [] 里面可以存储多个数据,任何数据类型。
var arr = ['李易峰', '吴亦凡', 12];
// 索引 arr[index] 0-n
arr[4] = 10;
```
- Object
```js
// {} 对象
var obj = {
    // 键值对key value，属性：属性值
    // 属性是字符串类型。
    // ,号隔开，最后一个不用加
    name: 'xxx',
    age: 18,
    tel: 1234567890
};
// .key 获取对应的value 或者[key]获取
// .自动把key转换为字符串
```
### typeof 检测
```js
// typeof 基本类型变量 返回基本类型；
// typeof null 返回object (官方承认的错误，返回空对象)
// typeof 复杂类型变量 返回object；
// typeof 函数 返回function
var num = 10;
console.log(typeof num); //number

var str = 'aaa';
console.log(typeof str); //string

var bool = true;
console.log(typeof bool); //boolean

var un;
console.log(typeof un); //undefined

var a = null;
console.log(typeof a); //object 空对象

var arr = [4, 5, 'eww'], obj = {};
console.log(typeof arr, typeof obj, typeof function () { }); 
//object,object,function
```

### 数值类型
- Infinity 无穷
- NaN: not a number
- `Number.MIN_VALUE` 和 `Number.MAX_VALUE`
```js
// 特殊数值 Infinity无穷(例如1/0), 无穷大和无穷小
var number1 = Infinity; //无穷大
var number2 = -Infinity; //无穷小
var num = 1 / 0; //Infinity

// NaN not a number 非数字,运算后非确切的值
var total = 10 * "122"; //NaN
// isNaN(xxx) 判断是否为NaN，返回布尔值
console.log(isNaN(total));

// 分界线：支持的最大值和最小值
var min = Number.MIN_VALUE;
var max = Number.MAX_VALUE;
console.log(min); 
//5e-324 科学计数法 5x10的-324次方
console.log(max); 
//1.7976931348623157e+308；

// 对小数运算
var aa = 0.7;
var b = 1 - 0.3;
console.log(b); //0.7

var j = 0.3;
var i = 1 - 0.7;
console.log(i); 
//0.3000004 js底层无法将三分之一值转为二进制存储

// xxx..toFixed(n) n指定小数点位数，返回字符串
console.log(i.toFixed(2)); //0.30
console.log(typeof i.toFixed(2)); //string
```

### 类型转换
- 其他 `=>` 转 `string`
```js
//其他类型转string 
// 1. xxx.toString()
// 2. String(xxx)
// 3. + 空字符 / 字符串拼接
```
- 其他 `=>` 转 `number`
```js
// 其他类型转换为Number类型
/* 
（1）纯数字或者单个数字(数组)，转为数字。
（2）不纯的或者多个数字，转为NaN。
（3）null或'' 转为 0
（4）布尔类型 0 或 1
*/

/*
1. Number() 构造器 Number(null) === 0
2. 参与运算, 隐式转换 + - * / % **(求幂) > < ==
3. parseInt 和 parseFloat 从头检查，并转换。
parseInt("11aaa") === 11, 
parseFloat("11.11aaa") === 11.11  
parseFloat("11aaa") === 11
parseInt("aa11a") === NaN
*/
```
- 其他 `=>` 转 `boolean`
```js
// Boolean() 构造器
// 非正常的数字，0 都会转为false
// 所有类型，只要带值且不为0的，都会转为1

//空串/0/-0/NaN/und/null 会转化成false，
//其它的都会转化成true
```

## 运算符
### 算数运算符
```js
//算数运算符隐式转换，+ - * / % **
//除+外其余运算均会直接转换。
//一个+拼接字符串，两个+转换。
console.log(123 + null + undefined + '12' + NaN)
//  NaN12NaN
```
### 赋值运算符
```js
// 赋值运算符
/*
简单赋值运算符： =
复杂赋值运算符：+= -= *= /= %= **=
*/
```

### 递增递减运算符
```js
// a++ 
// 先出结果，再自增
// 对于console.log() alert(a) 以及其他任何表达式。 
var a = 1;
console.log(a++); //1
alert(a++); //2
```

### 比较运算符
```js
// 比较运算符：关系运算符
/*
总结：
1. 比较时，如果不是数字，会隐式转换
2. 任何数据和NaN比较都是false
3. undefined 会隐式转换为NaN
4. null 会隐式转换为0
*/
```

### 逻辑运算符
```js
// 逻辑运算符 && || !
// && 且 一假全假
// || 或 一真则真
// ! 取反
// 0 空字符串 null NaN undefined 转化为false

// 逻辑中断：从左往右逻辑判断。
// && 一直判断到最后，一旦出行假值，返回假值，若无假值返回最后一个值。
// || 一直判断，一旦判断到一个真值，返回该真值。

// 逻辑中断应用
// && :   0 && ... 返回0   1&&2&&3 返回3
// ||:  1 || a++  返回 1  0||a++ 返回 a++
/*
应用：某些框架会用||, 
let option = ... || {} 
如果第一个是假，则返回空{}，如果是真，则返回...)
如果传入了参数..., 则option = ..., 否则为{}。
*/

var b = 100;
console.log(false || b++); //100
console.log(b); //101
```

### 三目运算符
```js
// 三目运算符 三元运算符 ? :
/*
    三元表达式(条件)?三元表达式(结果A):三元表达式(结果B)。
    结果A: 条件为真时，三目运算符返回的值
    结果B: 条件为假时，三目运算符返回的值
*/
```

## 分支语句
```js
// 三大流程控制
// 1. 顺序结构
// 2. 分支结构 if 三元 switch
// 3. 循环结构 for while do...while
// 有选择性的执行我们想要的代码

// if 注意细节
/* 
if语句中的条件，不管是什么表达式，都会转化成布尔类型
if语句中对 是否相等 来判断时，最好将常量写在前面
if语句后面的{}可以不写，如果不写，只有if后面第1条语句，相当于是{}中的
if语句可以嵌套
*/

// Switch语句 分支语句 
// switch: 切换
// key: 键，数据
// case: value 表示条件/值(带类型)
// case下面是执行的代码块
// break 打断 (一般必须有，不继续执行下列其他case的代码块）
// 无break时：也不判断其他case，但是继续执行下列所有case的代码块, 直到遇到第一个break。)
// default 默认 当上面都不满足时，执行的代码
```

## 循环语句
```js
/*
    循环的三要素：
    1. 变量起始值
    2. 循环条件
    3. 变量的变化量，让其循环和终止。循环体
    var aa = ...  //循环变量
    while (condition) {  condition 循环条件（转化为布尔值）
        循环体
    }
    死循环：循环条件一直满足，没有终止条件。
*/

// do..while循环语句:
// 至少执行一次。 不管条件成不成立，do循环体都会先执行一次
var pass = "123456";
do {
    inp = prompt("请输入密码");
} while (pass !== inp);

// for 循环
/* 
for 循环的语法
	初始化变量;
	条件表达式;
	操作表达式(变量变化量 递增递减(或者变化表达式))
	{ 只有符合条件才执行。循环体，可以重复执行的代码 }
*/

/*
break: 直接跳出循环 循环到此结束
continue: 跳出本次循环，执行下次循环。
*/

// 循环嵌套的概念：从外到内，外面每执行一次，内部都执行所有循环。
// 双重for循环 在内层使用break，continue 都
// 只打断内层循环。（只打断当前作用域。当前层循环）

for (let x = 0; x < 10; x++) {
    console.log("x" + x);
    for (let y = 0; y < 10; y++) {
        if (x == 3) {
            break;
        }
        console.log("x" + x + "y" + y);
    }
}
```

## 函数
### 认识函数
```js
//关键字 function 函数名 name
// function name(params){函数体}
// a,b,c形参，函数的局部变量，默认undefined
function f1(a, b, c) {
    console.log(a, b, c);
}
f1(20, 30);  
//实参 20 30 不传undefined
```

### 全局变量和局部变量
```js
var a = 1;
function fn() {
    var b = 2;
    console.log(a); //1
    console.log(b); //2
}
fn();
console.log(b); //b is not defined
```

### 返回值
```js
// return  返回函数结果，数值。
// 一般写在最后，不是必须的。
// 三个细节：
	// 1. return会终止执行。
	// 2. 没有返回值，接收到的是undefined 
	// 3. 使用return语句，但是没有跟数值，返回undefined。
```

### 具名函数和匿名函数
```js
// 具名函数
function fn() {
    console.log("具名函数");
}
fn();

// 匿名函数： 用变量接收
var a = function () {
    console.log("匿名函数");
}

a(); //变量() 匿名函数调用
```

## 对象
### 认识对象
```js
// Object {} 对象/容器, 数组和对象都是容器
// {}字面量 或者 new Object()创建对象
// 对象是一组数据的无序集合
// {key: value} 
	// key 是属性名，键(string类型)  
	// value 是属性值，值(任意类型)。

// 访问属性值
// 打点 访问 
// 会默认把 属性值当作字符串处理
// .name === ['name'] 的原因

// [] 加键名或者值或者字符串访问
// obj['name']
// var u = 'name', obj[u]
// obj[0], obj[true] 传实际值，当键为值的时候
```
### 对象操作
```js
// 增删改查
// 查 
// 1. 打点 
// 2. ['key'] 
// 3. ('key' in obj) 查询对象中是否有key键名
// 4. for...in 遍历

// 增和改
// 重新赋值

// 删
// delete
```

## 数组
### 认识数组
```js
// Array： 一组数据的有序集合
// 数组是一个容器，可以放置多个类型的数据。
// [] 代表数组
// 数组中的每个数据，称之为数组的元素。el
// .length 数组的长度
// 索引从0开始，最后一个索引 length-1
// 创建数组：字面量，new Array(n,c,i); new Array(length) 只有一个参数时，表示长度，内容为empty;
// (new 出来的都是对象，用typeof 检测均为object)

// 操作数组 增删改查
var arr = ['a', 'b'];
// 查
// 用索引查
console.log(arr[1]);
console.log(arr[2]); //undeined
// indexOf()  查找元素的索引
arr.indexOf(4); //-1 找不到值，-1
// includes()  查找元素是否在数组中
arr.includes('a'); //true

// 修改
arr[1] = 'c'

// 添加元素
arr[3] = '2'
```

### 遍历数组
```js
// for遍历 for..in 遍历 for of 遍历
// for..in 遍历索引，也可取值。
// for..of 遍历值，无法拿到对应的索引。
```
### 数组自己的方法
```js
// push 末尾添加, 支持添加多个(逗号隔开)，返回新数组的长度。
// pop 末尾删除, 返回删除的元素。
// unshift 开头添加, ...，返回新数组的长度。
// shift 开头删除, ...，返回删除的元素。
// splice 截取函数（截取索引，截取长度(不写截到结尾),添加的元素）
	// 1. 如果第二个参数没写，则从该索引截到结尾。
	// 2. 如果第一个参数索引是负数，从结尾后往前找索引截取。
	// 3. 从第三个参数开始，都作为元素添加到数组中. 
	// (添加的元素会依次放到被删除的位置上。)
// slice 截取元素, 返回截取的内容(不影响原数组)
	// 1. 第一个参数,截取的起始索引
    // 2. 第二个参数,截取的结束索引(不包含)
    // 3. 第二个参数不传时,则从该索引截到结尾。
// arr.concat(arrNew, arrNew2); 拼接数组(不影响原数组), 
	// 支持拼接多个.
	// 返回拼接后的新数组
// arr.join(); 数组的元素 连接 为字符串.(参数作为连接符)
// str.split(); 将字符串 分割 为数组的元素 .(参数作为分割符)
```

### 数组的高级方法
```js
// .forEach() 遍历 利用回调函数, 
// 带2个参数, item元素和index索引
// 不影响原数组
arr2.forEach((item, index) => {
    console.log(item);
    console.log(index);
})

// .map() 遍历 和forEach类似, 
// 区别是返回一个和原数组一样长度的新数组.
// 指定return, 根据return的值用来返回一个新数组的元素.
var arr3 = arr2.map((item, index) => {
    console.log(item);
    console.log(index);
    return item;
});
console.log(arr3); // [3, 4, 5, 6, 7]

// .filter() 遍历过滤, 和map类似带一个返回值. 
// 区别是只返回 所有符合return条件的元素. 因此长度与原数组不一样.
var arr4 = arr2.filter((item, index) => {
    return item % 2 == 0
});
console.log(arr4);

// .find(); 遍历数组,
// 返回(符合 return 条件的)的第一个元素.
// 区别于filter, 只返回第一个元素
var aa = arr3.find((item, index) => {
    return item % 3 == 0
});
console.log(aa); //3 找到3就停止了.

// .findIndex(); 
// 遍历数组,返回(符合 return 条件的)的第一个索引. 

// .reduce(); 遍历数组, 
// 接收一个函数作为累加器, 
// 函数: 
	// 第一个参数为每次计算的返回值,
	// 第二个参数为当前遍历的item, 
	// 第三个为下标
	// 数组中的每个值从左到右开始累加,最终计算一个最终值.
// 第二个参数为默认初始值(不提供初始值时,默认从索引1开始遍历)
var arr7 = [1, 2, 3, 3, 4, 5];
var arr8 = arr7.reduce((total, item, index) => {
    return total + item
    // 计算的条件,每次计算后,都会作为初始值,传入total再参与计算
}, 0)
console.log(arr8); // 1+2+3+4+5的值

// sort() 数组的排序
var arr = [3, 5, 0, 1, 2, 3];
arr.reverse(); //翻转, 影响原数组
arr.sort(); //默认升序
// 如果按照自定义的条件排序
arr.sort((a, b) => {
    return a - b
});
```

## 字符串
### 创建和遍历字符串
```js
// 字面量形式
var str = '2212'
console.log(str.length); 
//当访问length时，会把str包装成对象使用。

// charAt(n)
// 类似于索引查找，找不到返回''

// 构造器String, str对象
// var str2 = new String('fftftft');

// 遍历字符串，for...in 和for...of, 带数组的方法。
```

### 修改字符串
```js
// 无法使用索引或者任何方法，修改字符串本身。
// 只能访问值或者重新赋值

// 转大写toUpperCase(),返回大写字符串
str.toUpperCase();
// 转小写toLowerCase(),返回小写字符串
str.toLowerCase();
```

### 操作字符串
```js
// 查
// 可以使用数组： indexOf() includes()

// startsWith() 判断以什么字符开头 
	// starts 开头 With 以/用...
//endsWith() 判断以什么结尾 
	// ends 结尾 With 以/用...

// replace(old,new); 返回新字符

// trim() 去除前后空格。
```

## Math和Data
### Math数学对象
```js
// Math 数学对象
// 圆周率（派） 
Math.PI
// 派: 3.14159....
Math.pow(x, y)
// 返回x的y次幂
// 对小数向下取整 
Math.floor(1.1)
// 1 不要小数，直接取整。类似于parseInt()
Math.ceil(1.1)
// 2 向上取整，小数位进一
Math.round(1.4)
// 1 四舍五入取整
// 求最大值
Math.max(1, 2, 3, 44, 2); //44
// 求最小值
Math.min(4, 5, 3, 52, 1) //1

// 随机最大值到最小值之间的数
Math.floor(Math.random() * (max - min + 1)) + min
```
### 随机数
```js
Math.random()
// 0-1随机数（包含0，不包含1）

// 随机1-10,包含1，也包含10
Math.ceil(Math.random() * 10)

// 随机取值 0-a.length 随机
var a = [2, 3, 4, 5, 14, 42, 5, 6, 7, 4, 5, 3, 4];
console.log(a[Math.floor(Math.random() * a.length)]);
```

### Date日期
```js
// Date 日期
var date = new Date();
// 得到最新的时间。
Date.now(); //得到一个时间戳（毫秒）
// 从1970年1.1 到现在，过去了多少毫秒
var date1 = new Date('2022-02-01');
// 补全日期，-，/等格式
var date2 = new Date(2022, 02, 01);
// 参数形式
```
### 时间戳
```js
// 获取时间戳
Date.now(); //当前时间转时间戳
date.getTime(); //日期转时间戳
date.valueOf(); //日期转时间戳
+date; //常用，隐式转换,+号转时间戳
var date3 = new Date().getTime();

// 将时间戳转回标准格式
new Date(date3);
```

### 日期对象的方法
```js
var date = new Date();
date.getTime(); //获取时间戳
date.toDateString(); //只要年月日
date.getFullYear(); //获取年份
date.getMonth() + 1; //获取月份，从0开始计算的，需要加1
date.getDate(); //获取1-31日期
date.getHours(); //获取小时
date.getMinutes(); //获取分钟
date.getSeconds(); //获取秒
date.getMilliseconds();//获取毫秒
date.Day(); //获取周
```
