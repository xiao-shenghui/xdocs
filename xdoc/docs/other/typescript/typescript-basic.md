# typescript 语法
> [原文链接](https://blog.csdn.net/weixin_46185369/article/details/121512287)
## TS类型注解
### 目标
了解类型注解的概念； 能掌握类型注解的使用方式
### 背景
TypeScript 是 JS 的超集，TS 提供了 JS 的所有功能，并且额外的增加了：类型系统
- TS中定义变量(常量)可以指定类型了。
- A类型的变量不能保存B类型的数据  
**可以显示标记出代码中的意外行为，从而降低了发生错误的可能性**

### 类型注解
格式
```ts
let 变量名: 类型 = 初始值
```
示例代码:
```ts
let age: number = 18
```
说明：代码中的 `:number` 就是**类型注解**  
作用：为变量添加类型约束**。  
上述代码中，约定变量 age 的类型为 number 类型，就只能给变量赋值该类型的值，否则，就会报错
```ts
// 错误代码：
// 错误原因：将 string 类型的值赋值给了 number 类型的变量，类型不一致
let age: number = '18'
```
## 类型推论(推断)
### 目标
了解类型推论的场景
#### 类型推论
在 TS 中，某些没有明确指定类型的情况下，**TS的类型推论机制会自动提供类型**。好处：由于类型推论的存在，有些情况下的类型注解可以省略不写

### 发生类型推论的 2 种常见场景
1. 声明变量并初始化时
2. 决定函数返回值时
```ts
// 变量 age 的类型被自动推断为：number
let age = 18
// 函数返回值的类型被自动推断为：number
function add(num1: number, num2: number) {
  return num1 + num2
}
```

## VSCode中的编码技巧
- 如果不知道类型，可以通过鼠标放在变量名称上，利用 VSCode 的提示来查看类型
- 写代码的时候，多看方法、属性的类型，养成写代码看类型的习惯

## TS的类型
### 目标
了解ts中的数据类型

### 常用基础类型
将 TS 中的常用**基础类型**分为两类

1. JS 已有类型
	1. 原始类型：`number/string/boolean/null/undefined/symbol`
	2. 对象类型：`object`（包括，数组、对象、函数等对象）
2. TS 新增类型
	1. 联合类型
	2. 自定义类型(类型别名)
	3. 接口
	4. 元组
	5. 字面量类型
	6. 枚举
	7. void
	8. any 等
- 注意：
	1. 原始类型在 TS 和 JS 中写法一致
	2. 对象类型在 TS 中更加细化，每个具体的对象（比如，数组、对象、函数）都有自己的类型语法
### 原始类型
- 原始类型：number/string/boolean/null/undefined/symbol
- 特点：简单，这些类型，完全按照 JS 中类型的名称来书写
```ts
// 数值类型
let age: number = 18

// 字符串类型
let myName: string = '小花'

// 布尔类型
let isLoading: boolean = false

// undefined
let un: undefined = undefined

// null
let timer:null = null
```

### 联合类型
#### 需求
如何定义一个变量可以是null也可以是 number 类型?

#### 目标
掌握联合类型的用法
```ts
let arr: (number | string)[] = [1, 'a', 3, 'b']
```
#### 联合类型的格式
```ts
let 变量: 类型1 | 类型2 | 类型3 .... = 初始值
```
解释：`|`（竖线）在 TS中叫做**联合类型**，即：由`两个`或`多个`其他类型组成的类型，表示可以是这些类型中的`任意一种`

#### 应用场景
1. 定时器id
```ts
// | 联合类型

// 联合类型1： 变量可以是两种类型之一
let timer:number|null = null
timer = 2

// 联合类型2： 数组元素可以是两种类型之一
let arr: (number|string|boolean)[] = [1,2,3]

arr[0] = '1'
arr[2] = true
```
注意：这是 TS 中联合类型的语法，只有一根竖线，不要与 JS 中的或（|| 或）混淆了

## 数组类型
### 目标
掌握在ts中使用数组的方法。

### 两种写法
格式
```ts
let 变量: 类型[] = [值1，...]
let 变量: Array<类型> = [值1，...]
```

### 基本示例
```ts
// 写法一：
let numbers: number[] = [1, 3, 5] //  numbers必须是数组，每个元素都必须是数字

// 写法二：
let strings: Array<string> = ['a', 'b', 'c'] //  strings必须是数组，每个元素都必须是字符串
```

### 拓展示例
如何定义一个数组，它的元素可能是字符串类型，也可能是数值类型。  
分析: 结合联合类型来使用
```ts
let arr: (number | string) [] = ['1', 1]
```
这里有个有优先级的问题

### 小结
推荐使用`number[]`写法

### 类型别名
### 目标
掌握类型别名的用法，能给类型起别名。

### 格式
定义
```ts
type 别名 = 类型
```
使用
```ts
type s = string // 定义

const str1:s = 'abc'
const str2:string = 'abc'
```
### 作用
1. 给类型起别名
2. 定义了新类型
### 场景
给复杂类型起别名
```ts
// type NewType = string | number

// let a: NewType = 1
// let b: NewType = '1'

// let arr: NewType[] = [1, '1']
    
type MyArr = (number | string) []
const arr:MyArr = [1, '1']
```
别名可以是任意的合法字符串，一般**首字母大写**

## 函数-单个定义
### 目标
对函数中涉及的类型进行约定

### 函数的类型
函数的类型实际上指的是：`函数参数`和`返回值`的类型

### 格式
```txt
// 普通函数
function 函数名(形参1： 类型=默认值， 形参2：类型=默认值): 返回值类型 { }

// 箭头函数
const 函数名（形参1： 类型=默认值， 形参2：类型=默认值):返回值类型 => { }
```

### 示例
```ts
// 函数声明
function add(num1: number, num2: number): number {
  return num1 + num2
}

// 箭头函数
const add = (num1: number=10, num2: number=20): number => {
  return num1 + num2
}

add(1,'1') // 报错
```

## 函数-统一定义
### 问题
定义多个具有相同参数类型和返回值类型的函数时，代码比较累赘
```ts
const add = (a:number,b:number):number =>{
        return a + b
    }

    const sub = (a:number,b:number):number =>{
        return a - b
    }
```
### 分析
把拥有相同形参和实参的函数当做一个整体，来定义
```ts
const add1 : (n1:number,n2:number)=>number  =  (a,b)=>{return a+b }
```

提炼自定义类型
```ts
type Fn = (n1:number,n2:number) =>number 
const add1 : Fn = (a,b)=>{return a+b }
```
### 小结
1. 分别指定参数和返回值的类型
2. 统一指定函数类型(类型别名来优化， 使用于函数表达式)

## 函数返回值是void
### 目标
掌握函数的返回值是void的情况

### void 类型
如果函数没有返回值，那么，函数返回值类型为：`void`
```ts
function greet(name: string): void {
  console.log('Hello', name)
  //
}
```

如果一个函数没有返回值，此时，在 TS 的类型中，应该使用 `void` 类型，有如下三种情况会满足
- 不写return
- 写return ，但是后面不接内容
- 写return undefined
```ts
// 如果什么都不写，此时，add 函数的返回值类型为： void
const add = () => {}
// 这种写法是明确指定函数返回值类型为 void，与上面不指定返回值类型相同
const add = (): void => {}

// 但，如果指定 返回值类型为 undefined，此时，函数体中必须显示的 return undefined 才可以
const add = (): undefined => {
  // 此处，返回的 undefined 是 JS 中的一个值
  return undefined
}
```

### void和undefined的区别
1. 如果函数没有指定返回值，调用结束之后，值是undefined的
2. 当不能直接声明返回值是undefined
```ts
function add(a:number, b:number): undefined { // 这里的会报错
  console.log(a,b)
}
```

## 函数-可选参数
### 目标
掌握可选参数的使用，能用可选参数定义函数

### 场景
使用函数实现某个功能时，参数可以传也可以不传。  
例如：数组的 slice 方法，可以 `slice()` 也可以 `slice(1)` 还可以 `slice(1, 3)`]  
这种情况下，在给函数参数指定类型时，就用到**可选参数**了

### 格式
可选参数：在可选参数名的后面添加 `?`（问号）
```ts
function mySlice(start?: number, end?: number): void {
  console.log('起始索引：', start, '结束索引：', end)
}
```

注意：**可选参数只能出现在参数列表的最后**，也就是说可选参数后面不能再出现必选参数

### 可选和默认值的区别
- 相同点： 调用函数时，可以少传参数
- 区别：设置了默认值之后，就是可选的了，不写就会使用默认值； 可选的并一定有值。
- 注意：它们不能一起使用。优先使用默认值

## 对象类型-单独使用
### 目标
掌握给对象指定类型的描述

### 格式
```ts
const 对象名: {
	属性名1：类型1，
  属性名2：类型2，
  方法名1(形参1: 类型1，形参2: 类型2)： 返回值类型,
  方法名2:(形参1: 类型1，形参2: 类型2)=>返回值类型
} = { 属性名1: 值1，属性名2：值2  }
```
可选属性用 ?
```ts
const 对象名: {属性名1？：类型1，属性名2：类型2 } = { 属性名2：值2 } 
``` 

### 示例
```ts
const goodItem:{name: string, price: number, func: ()=>string }  = {
    name: '手机', 
    price: 2000, 
    func:function(){ return '打电话' }
}
```
说明:
1. 使用 `{}` 来描述对象结构
2. 属性采用`属性名: 类型`的形式，如果是多行，可以省略,
3. 方法采用`方法名(): 返回值类型`的形式
4. 可选属性，使用`?`

## 对象类型-类型别名
### 目标
用类型别名来简化定义对象的类型的方式

### 思路
把类型注解封装一下，定义类型

### 示例
```ts
// 创建类型别名
type Person = {
  name: string，
  age: number
  sayHi(): void
}

// 使用类型别名作为对象的类型：
let person: Person = {
  name: '小花',
  age: 18
  sayHi() {}
}

function f1 (p: Persion) :void {
  
}
```

## 对象类型-接口
### 目标
掌握接口的使用

### 场景
当一个对象类型被多次使用时，可以有两种方式来来描述对象的类型，达到复用的目的。
1. 类型别名， Type
2. 接口, interface

### 格式
```ts
interface 接口名  {
    属性1: 类型1, 属性2: 类型2,
}
```

### 示例
```ts
interface IGoodItem  {
    name: string, price: number, func: ()=>string
}


const good1: IGoodItem = {
    name: '手表',
    price: 200,
    func: function() {
        return '看时间'
    }
}

const good2: IGoodItem = {
    name: '手机',
    price: 2000,
    func: function() {
        return '打电话'
    }
}
```

解释：
1. 使用 `interface` 关键字来声明接口
2. 接口名称(比如，此处的 IPerson)，可以是任意合法的变量名称，推荐以 `I` 开头
3. 声明接口后，直接使用接口名称作为变量的类型
### 接口和类型的区别
interface（接口）和 type（类型别名）的对比：
- 相同点：都可以给对象指定类型
- 不同点:
	- 接口，只能为对象指定类型。它可以继承。
	- 类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名
推荐：**能使用 type 就是用 type**
```ts
// 接口的写法-------------
interface IPerson {
	name: string,
	age: number
}

const user1：IPerson = {
	name: 'a',
	age: 20
}

// type的写法-------------
type Person  = {
	name: string,
	age: number
}
const user2：Person = {
	name: 'b',
	age: 20
}
```

## 接口继承
### 目标
掌握接口的继承

### 背景
比如，这两个接口都有 x、y 两个属性，重复写两次，可以，但很繁琐
```ts
interface Point2D { x: number; y: number }
interface Point3D { x: number; y: number; z: number }
```

### 分析
如果两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用

### 继承格式
```ts
interface 接口2 extends 接口1 {
    属性1： 类型1， // 接口2中特有的类型
    ... 
}
```

### 接口继承的示例
```ts
interface Point2D { x: number; y: number }
// 继承 Point2D
interface Point3D extends Point2D {
  z: number
}
```

解释：
1. 使用 `extends`(继承)关键字实现了接口 Point3D 继承 Point2D
2. 继承后，Point3D 就有了 Point2D 的所有属性和方法(此时，Point3D 同时有 x、y、z 三个属性)

## 元组
### 目标
掌握元组类型的使用

### 场景
固定结构的数据， 例如
- 使用经纬度坐标来标记位置信息
- 使用x,y来记录鼠标的位置
可以使用数组来记录坐标
```ts
let position: number[] = [116.2317, 39.5427] // 数组的元素都是数值类型
```
### 问题
使用 `number[]` 的缺点：不严谨，因为该类型的数组中可以出现任意多个数字，而类似于经纬度只能有两个数字。

### 元组 Tuple
**元组**是另一种特殊的**数组**：
- 它确切地包含多少个元素
- 特定索引对应的类型
```ts
let position: [number, number] = [39.5427, 116.2317]
```
解释：
1. 元组类型可以确切地标记出有多少个元素，以及每个元素的类型
2. 该示例中，元素有两个元素，每个元素的类型都是 number
### 示例
模拟定义useState。  
useState的返回值是一个数组，第一个元素是number，第二个是修改number的函数。
```ts
function useState(n: number): [number, (number)=>void] {
        const setN = (n1) => {
            n = n1
        }
        return [n, setN]
    }

const [num ,setNum] = useState(10)
```

## 字面量类型
### 思考
```ts
let str1 = 'hello 武汉'
const str2 = 'hello 武汉'
```
问： str1是什么类型？ str2是什么类型？  
通过 TS 类型推论机制，可以得到答案：  
1. 变量 str1 的类型为：string
2. 变量 str2 的类型为：‘Hello TS’
### 解释
1. str1 是一个变量(let)，它的值可以是任意字符串，所以类型为:string
2. str2 是一个常量(const)，它的**值不能变化**只能是 ‘hello 武汉’，所以，它的类型为:‘hello 武汉’
注意：此处的 ‘Hello TS’，就是一个**字面量类型**，也就是说某个特定的字符串也可以作为 TS 中的类型
### 字面量类型
任意的 JS 字面量（比如，对象、数字等）都可以作为类型使用
```ts
let a:'abc' = 'abc'
a = '1233' //不能将类型1233分配给类型'abc'
```
说明：
1. 上面的let a等价于const
2. 简写为 const a = ‘abc’
字面量：`{ name: 'jack' }` `[]` `18` `20` `'abc'` `false` `function() {}`

### 字面量的作用
单个字面量没有什么用处，它一般**和联合类型一起使用** ， 用来表示一组明确的可选值列表

### 示例1
比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个
```ts
// 使用自定义类型:
type Direction = 'up' | 'down' | 'left' | 'right'

function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，写上''，就会有类型提示：
changeDirection('up')
```

解释：参数 direction 的值只能是 up/down/left/right 中的任意一个

优势：相比于 string 类型，使用字面量类型更加精确、严谨

### 示例2
redux 中的actiontype
```ts
type ActionType = 'ADD_TODO' | 'DEL_TODO'
function reducer(type:ActionType) {
  if(type === 'ADD_TODO')
}
```

### 示例3
性别取值只能有两个
```ts
let gender: 'girl' | 'boy' = 'boy'
    gender = 'abc' // 报错
```
### 小结
字面量类型约定：只能取**某些个**特定的值。一般和联合类型一起使用。

## 枚举-基本使用
### 目标
掌握枚举类型的使用

### 定义
enum，枚举。它用来描述一个值，该值只能是 一组命名常量 中的一个
> 没有type之前，用枚举比较多，现在用的少了。枚举的功能类似于**字面量类型+联合类型**组合的功能，也可以表示一组明确的可选值

### 格式
定义格式
```txt
enum 枚举名 { 可取值1,可取值2,.. }
```
说明：
1. 使用 `enum` 关键字定义枚举
2. 一般约定首字符大写
使用格式
```txt
枚举名.可取值
```

### 示例
```ts
// 定义枚举类型
enum Direction { Up, Down, Left, Right }

// 使用枚举类型
function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
changeDirection(Direction.Up)
```

解释:
1. 约定枚举名称以大写字母开头
2. 枚举中的多个值之间通过 ,（逗号）分隔
3. 定义好枚举后，直接使用枚举名称作为类型注解

## 枚举-枚举的值
### 目标
掌握枚举类型的值

### 枚举的值
枚举类型和ts中其他的类型不一样，枚举类型不仅仅是类型，还是一个值。  

type定义的类型是没有值的
```ts
type NewType = number | string
console.log(NewType)  // 输出类型是没有意义的
```

枚举定义的类型是有值的。
```ts
// 创建枚举
enum Direction { Up, Down, Left, Right }

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
console.log(Direction.Up)
```

也可以使用tsc给编译一下来做对比

### 数字枚举
默认情况下，枚举的值是数值。默认为：从 0 开始自增的数值  
当然，也可以给枚举中的成员初始化值

```ts
// Down -> 11、Left -> 12、Right -> 13
enum Direction { Up = 10, Down, Left, Right }
enum Direction { Up = 2, Down = 4, Left = 8, Right = 16 }
```
### 字符串枚举
字符串枚举：枚举成员的值是字符串
```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```

注意：字符串枚举没有自增长行为，因此，**字符串枚举的每个成员必须有初始值**

### 小结
枚举与前面讲到的字面量类型+联合类型组合的功能类似，都用来表示一组明确的可选值列表
一般情况下，**推荐使用字面量类型+联合类型组合的方式，**因为相比枚举，这种方式更加直观、简洁、高效
### 枚举类型的应用
用后端用0,1来标识性别，但是0，1在代码中不好读。
```ts
enum Gender {
    girl,
    boy
}
type User = {
    name: string,
    gender: Gender
}

const u1: User = {
    name: '小花',
    gender: Gender.girl
}

console.log(u1)
```

## any 类型
### 目标
掌握any类型的使用

### 定义及作用
any: 任意的。当类型设置为 any 时，就取消了类型的限制。
```ts
let obj: any = { x: 0 }
obj.bar = 100
obj()
const n: number = obj
```
解释: 以上操作都不会有任何类型错误提示，即使可能存在错误（编译时不报错，可是运行时会报错）

### 使用any的场景
- 函数就是不挑类型。 例如，`console.log() `； 定义一个函数，输入任意类型的数据，返回该数据类型
- **临时使用** any 来“避免”书写很长、很复杂的类型
### 隐式 any
1. 声明变量不提供类型也不提供默认值
2. 定义函数时，参数不给类型
### 小结
**原则:不推荐使用 any!**这会让 TypeScript 变为 “AnyScript”(失去 TS 类型保护的优势)

## 类型断言
### 问题导入
假设我们明确知道页面上有一个img，它的id是img。
```ts
const box = document.getElementById('img')
console.log(box.src) // ts报错
```
注意：该方法返回值的类型是 HTMLElement，该类型只包含所有标签公共的属性或方法，不包含 img 标签特有的 src等属性，无法操作 src 等 img标签特有的属性或方法。

### 类型断言的作用和应用场景
作用： 手动指定值的类型  
场景：有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定**更具体**的类型。

### 格式
关键字： as
```ts
const 变量 = 值 as 类型
```
解释:
1. 使用 `as` 关键字实现类型断言
关键字 as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）
### 示例1
```ts
const box = document.getElementById('img') as HTMLImageElement
box.src
```
技巧：如何得知dom的类型
1. 在浏览器控制台，通过 __proto__ 获取 DOM 元素的类型;
2. document.createElement(‘a’)，然后看代码提示
### 示例2
知道后端的结果会是一个类型，但这个结果是用ajax拿到的，不好直接给初始值，又希望得到输出提示的效果
```ts
type User = {
  name: string,
  age: number
}
const u1 = {} as User
console.log(u1.name) // 这里就会有提示
```

## typeof
### 问题导入
res表示一个复杂的对象，我们把它传给一个函数fn，但是目前没有办法从形参obj中获取提示信息
```ts
const res = { name: '小花', city: '武汉',  skills: ['js', 'css'] }

function fn(obj) {
  // 这里写obj.没有提示
  // obj.
}

fn(res)
```
怎么解决？
### typeof
JS 中提供了 typeof 操作符，用来在 JS 中获取数据的类型
```ts
console.log(typeof 'Hello world') // ?
```
TS 也提供了 typeof 操作符：可以在类型上下文中引用变量或属性的类型（类型查询）

### 使用场景
根据已有变量的值，反向推断出获取该值的类型，来简化类型书写

### 格式
```txt
type 类型 = typeof 常量
```
### 示例
```ts
const res = { name: '小花', city: '武汉',  skills: ['js', 'css'] }

type Stu = typeof res
function fn(obj:Stu) {
    // 这里写 obj. 就会有提示
    obj.skills
}
fn(res)
```

解释:
1. 使用 `typeof`操作符来获取变量 p 的类型，结果与第一种（对象字面量形式的类型）相同
2. typeof 出现在**类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文**(区别于 JS 代码)
3. 注意：typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）

## 泛型-基本介绍
### 需求
创建一个 fn 函数，它的特点是： 传入什么类型的数据就返回什么类型的数据。 也就是说，参数和返回值类型相同。  

例如：
```ts
function fn(value: number): number { return value }
```
比如，fn(10) 调用以上函数就会直接返回 10 本身。但是，该函数声明只接收数值类型，无法用于其他类型  
思考：any 能做到么？
```ts
function fn(value: any): any { return value }
```
不能。它没有了类型保护，也没有严格限制返回值的类型和输入值的类型一致。

### 泛型
泛型，顾名思义，就是可以适用于多个类型，使用类型变量比如T帮助我们捕获传入的类型，之后我们就可以继续使用这个类型。

本质是参数化类型，通俗的将就是所操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和函数的创建中，分别成为**泛型类，泛型接口、泛型函数**

## 泛型-泛型函数
### 创建泛型函数的格式
```ts
function fn<Type>(value: Type): Type { return value }
// 上面的Type只是一个名字而已，可以改成其他的

function fn<T>(value: T): T { return value }
```
语法：
1. 在函数名称的后面写 <>(尖括号)，**尖括号中添加类型变量，**比如此处的 Type。
2. **类型变量 Type，是一种特殊类型的变量，它处理类型而不是值**
3. **该类型变量相当于一个类型容器，**能够捕获用户提供的类型(具体是什么类型由用户调用该函数时指定)
4. 因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型
5. 类型变量 Type，可以是任意合法的变量名称
### 调用泛型函数的格式
```ts
const num = fn<number>(10)
const str = fn<string>('a')
```
1. 语法：在函数名称的后面添加 <>(尖括号)，尖括号中指定具体的类型，比如，此处的 number
2. 当传入类型 number 后，这个类型就会被函数声明时指定的类型变量 Type 捕获到
3. 此时，Type 的类型就是 number，所以，函数fn参数和返回值的类型也都是 number
- 同样，如果传入类型 string，函数 id 参数和返回值的类型就都是 string
- 这样，通过泛型就做到了让 id 函数与多种不同的类型一起工作，**实现了复用的同时保证了类型安全**
### 小结
1. 泛型的格式？
2. 泛型的作用？

## 泛型-类型推断
> 简化函数调用
```ts
function fn<T>(value: T): T { return value }
// 省略 <number> 调用函数
let num = fn(10)
let str = fn('a')
```

1. 在调用泛型函数时，**可以省略 `<类型>` 来简化泛型函数的调用**
2. 此时，TS 内部会采用一种叫做**类型参数推断**的机制，来根据传入的实参自动推断出类型变量 Type 的类型
3. 比如，传入实参 10，TS 会自动推断出变量 num 的类型 number，并作为 Type 的类型
- 推荐：使用这种简化的方式调用泛型函数，使代码更短，更易于阅读
- 说明：**当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数**
### 案例
下面的react代码对我们理解泛型有帮助
```ts
// js
const [num, setNum] = useState(10)

// ts, 用泛型指定类型
const [num, setNum] = useState<number>(10)
```
```ts
cont inputRef = useRef(null)
const onClick = () => {
  console.log(inputRef.current.value) // ts在这里会报错
}

<input type="text" ref={inputRef} />

改正
cont inputRef = useRef<HTMLInputElement>(null)
const onClick = () => {
  console.log(inputRef.current.value) // 正确
}
```

### 泛型-练习
模拟实现useState的声明
```ts
// useState它接收一个任意类似的数据，返回一个数组。数组的第一个元素的类型与入参一致； 数组的第二个元素是一个函数，函数的入参类型和返回值类型与useState的入参一致

function useState() {

}
const arr1 = useState('123')
const arr2 = useState(123)
```

要求： 鼠标放上函数调用的实参时，有对应的提示


参考
```ts
function useState<T>(p:T): [T,(p:T)=>T] {
  const t = (p: T):T => {
    return p
  }
  return [p, t]
}
```
## 泛型-泛型约束
默认情况下，泛型函数的类型变量 T 可以代表多个类型，这导致无法访问任何属性
- 比如，fn(‘a’) 调用函数时获取参数的长度：
```ts
function fn<T>(value: T): T {
  // 这里value. 不会有提示
  console.log(value.length)// 这里会报错
  return value
}

fn('a')
```
- 解释：Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length
- 此时，就需要**为泛型添加约束来**`收缩类型`**(缩窄类型取值范围)**
### 添加泛型约束
添加泛型约束收缩类型，主要有以下两种方式：
1. 指定更加具体的类型
2. 添加约束
### 指定更加具体的类型
比如，：可以接收任意类型的数组。  
将类型修改为 `Type[]`(Type 类型的数组)，因为只要是数组就一定存在 length 属性，因此就可以访问了
```ts
function fn<Type>(value: Type[]): Type[] {
  console.log(value.length)
  return value
}
```
### 添加约束
比如，要求传入T类型必须要有length属性。
```ts
// 创建一个接口
interface ILength { length: number }

// T extends ILength 添加泛型约束
function fn<T extends ILength>(value: T): T {
  console.log(value.length)
  return value
}

fn('abc') // Ok
fn([1,2,3]) // Ok
````

解释:
1. 创建描述约束的接口 ILength，该接口要求提供 length 属性
2. 通过 `extends` 关键字使用该接口，为泛型(类型变量)添加约束
3. 该约束表示：**传入的类型必须具有 length 属性**
- 注意:传入的实参(比如，数组)只要有 length 属性即可（类型兼容性)
示例
```ts
function setElement<Type extends HTMLElement>(element:Type):Type {
  console.log(element.innerText) // 这里的.会有语法提示
  return element
}
```
## 多个类型变量
泛型的类型变量可以有多个，并且**类型变量之间还可以约束**(比如，第二个类型变量受第一个类型变量约束)  
比如，创建一个函数来获取对象中属性的值：
```ts
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
let person = { name: 'jack', age: 18 }
getProp(person, 'name')
```
- 解释:
1. 添加了第二个类型变量 Key，两个类型变量之间使用 , 逗号分隔。
2. **keyof 关键字接收一个对象类型，生成其键名称(可能是字符串或数字)的联合类型。**
3. 本示例中 `keyof Type `实际上获取的是 person 对象所有键的联合类型，也就是：`'name' | 'age'`
4. 类型变量 Key 受 Type 约束，可以理解为：Key 只能是 Type 所有键中的任意一个，或者说只能访问对象中存在的属性
```ts
// Type extends object 表示： Type 应该是一个对象类型，如果不是 对象 类型，就会报错
// 如果要用到 对象 类型，应该用 object ，而不是 Object
function getProperty<Type extends object, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}

getProperty({a:1, b:2}, 'a')
```

## 泛型接口
### 目标
掌握泛型接口的使用

### 泛型接口
在接口中使用泛型来使用，以增加其灵活性，增强其复用性
```ts
interface MyArray {
  length: number,
  push(n: number):void,
  pop():number,
  reverse():number[]
}

let obj: MyArray = {
  id(value) { return value },
  ids() { return [1, 3, 5] }
}
```

### 定义
```ts
interface 接口名<类型变量> {
  
}
```
1. 在接口名称的后面添加`<类型变量>`，那么，这个接口就变成了泛型接口。
2. 接口的类型变量，对接口中所有其他成员可见，也就是**接口中所有成员都可以使用类型变量。**
3. 使用泛型接口时，需要**显式指定具体的类型**
### 拓展
实际上，JS 中的数组在 TS 中就是一个泛型接口。
```ts
const strs = ['a', 'b', 'c']
// 鼠标放在 forEach 上查看类型
strs.forEach

const nums = [1, 3, 5]
// 鼠标放在 forEach 上查看类型
nums.forEach
```
- 解释:当我们在使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型
- 技巧:可以通过 Ctrl + 鼠标左键(Mac：Command + 鼠标左键)来查看具体的类型信息
## 泛型工具类型
泛型工具类型:TS 内置了一些常用的工具类型，来简化 TS 中的一些常见操作  
说明:它们都是基于泛型实现的(泛型适用于多种类型，更加通用)，并且是内置的，可以直接在代码中使用。 这些工具类型有很多，先来学习以下3个:

1. `Partial<Type>`
2. `Readonly<Type>`
3. `Pick<Type, Keys>`

### Partial
Partial用来基于某个Type来创建一个新类型，新类型中所有的属性是可选的。  
格式
```ts
type OldType = {}
type newType = Partial(OldType)
```
示例  
用来构造(创建)一个类型，将 Type 的所有属性设置为可选。
```ts
type Props =  {
  id: string
  children: number[]
}

type PartialProps = Partial<Props>
```
解释:构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为可选的。

### Readonly
- Readonly 用来构造一个类型，将 Type 的所有属性都设置为 readonly(只读)。
```ts
type Props =  {
  id: string
  children: number[]
}

type ReadonlyProps = Readonly<Props>
```
- 解释:构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的。
```ts
let props: ReadonlyProps = { id: '1', children: [] }
// 错误演示
props.id = '2'
```
- 当我们想重新给 id 属性赋值时，就会报错:无法分配到 “id” ，因为它是只读属性。
### Pick
- `Pick<Type, Keys>`从 Type 中选择一组属性来构造新类型。
```ts
type Props = {
  id: string
  title: string
  children: number[]
}
type PickProps = Pick<Props, 'id' | 'title'>
```
- 解释:
1. Pick 工具类型有两个类型变量:1 表示选择谁的属性 2 表示选择哪几个属性。 2. 其中第二个类型变量，如果只选择一个则只传入该属性名即可。
2. 第二个类型变量传入的属性只能是第一个类型变量中存在的属性。
3. 构造出来的新类型 PickProps，只有 id 和 title 两个属性类型。

## React-配合TS-创建新项目
### 目标
在react项目中使用ts

### 命令
`npx create-react-app my-app --template typescript`  
说明：在命令行中，添加`--template typescript `表示创建支持 TS 的项目

### 项目目录的变化
1. 多了一个文件：`tsconfig.json`。在项目根目录下可以看到它，它就是TS 的配置文件
2. 后缀名有变化。在 src 目录中，文件的后缀有变化，由原来的 .js 变为 `.ts` 或 `.tsx`
    - `.ts` ts 文件的后缀名
    - `.tsx` 是在 TS 中使用 React 组件时，需要使用该后缀，只要文件中使用了jsx模板，后缀名必须叫tsx
3. 在 src 目录中，多了`react-app-env.d.ts`文件
    - `.d.ts` 类型声明文件，用来指定类型
```txt
// ts

.ts

.tsx

.d.ts
```

### tsconfig的介绍
### 目标
了解tsconfig文件的作用
- tsconfig.json是typescript项目的配置文件，用于配置typescript
- tsconfig.json配置文件可以通过`tsc --init`生成
- 说明：所有的配置项都可以通过鼠标移入的方式，来查看配置项的解释说明。
- [tsconfig 文档链接](https://www.typescriptlang.org/tsconfig)
```json
{
  // 编译选项
  "compilerOptions": {
    // 生成代码的语言版本：将我们写的 TS 代码编译成哪个版本的 JS 代码
    // 命令行： tsc --target es5 11-测试TS配置文件.ts
    "target": "es5",
    // 指定要包含在编译中的 library
    "lib": ["dom", "dom.iterable", "esnext"],
    // 允许 ts 编译器编译 js 文件
    "allowJs": true,
    // 跳过类型声明文件的类型检查
    "skipLibCheck": true,
    // es 模块 互操作，屏蔽 ESModule 和 CommonJS 之间的差异
    "esModuleInterop": true,
    // 允许通过 import x from 'y' 即使模块没有显式指定 default 导出
    "allowSyntheticDefaultImports": true,
    // 开启严格模式
    "strict": true,
    // 对文件名称强制区分大小写  Demo.ts  
    "forceConsistentCasingInFileNames": true,
    // 为 switch 语句启用错误报告
    "noFallthroughCasesInSwitch": true,
    // 生成代码的模块化标准
    "module": "esnext",
    // 模块解析（查找）策略
    "moduleResolution": "node",
    // 允许导入扩展名为.json的模块
    "resolveJsonModule": true,
    // 是否将没有 import/export 的文件视为旧（全局而非模块化）脚本文件
    "isolatedModules": true,
    // 编译时不生成任何文件（只进行类型检查）
    "noEmit": true,
    // 指定将 JSX 编译成什么形式
    "jsx": "react-jsx"
  },
  // 指定允许 ts 处理的目录
  "include": ["src"]
}
```
## 类型声明文件
> 使用说明
### 目标
掌握类型声明文件。

### 作用
类型声明文件：用来为已存在的 JS 库提供类型信息  

要点：
- .d.ts中只能出现类型声明
- .ts中可以有执行代码 + 类型声明

### 使用场景
1. 第三方库
例如：  
以 axios为例，为啥axios.get()有提示呢？  
在package.json中有一个配置：
```ts
typings: "./index.d.ts"
```
这里有一个类型声明文件：  

2. **给现有的.js编写，从而获得代码提示功能**

## 类型声明-内置类型声明文件
- TS 为 JS 运行时可用的所有标准化内置 API 都提供了声明文件
- 比如，在使用数组时，数组所有方法都会有相应的代码提示以及类型信息:
```ts
const strs = ['a', 'b', 'c']
// 鼠标放在 forEach 上查看类型
strs.forEach
```
- 实际上这都是 TS 提供的内置类型声明文件
- 可以通过 Ctrl + 鼠标左键(Mac：Command + 鼠标左键)来查看内置类型声明文件内容
- 比如，查看 forEach 方法的类型声明，在 VSCode 中会自动跳转到 lib.es5.d.ts 类型声明文件中
- 当然，像 window、document 等 BOM、DOM API 也都有相应的类型声明(lib.dom.d.ts)
## 类型声明-第三方库的类型声明文件
### 目标
了解第三方库没有类型声明文件的情况

### 自带类型声明的
axios

### 不带类型声明的
jquery, react…  
做法：在https://www.typescriptlang.org/dt/search?search=中搜索  
并在项目中安装。

### 小结
安装的

## 类型声明-自定义的文件
如下两种场景需要提供类型声明文件
1. 项目内共享类型
2. 为已有 JS 文件提供类型声明
##### 项目内共享类型
文件目录：
```txt
a.ts
b.ts
```
改进：
```txt
index.d.ts
a.ts
b.ts
```
index.d.ts
```ts
export interface Token {
  token: string
  refresh_token: string
}
```
a.js
```ts
import { Token } from './index' // 必须省略.d.ts
function showToken(token: )
```
如果多个 .ts 文件中都用到同一个类型，此时可以创建 .d.ts 文件提供该类型，实现类型共享。

- 操作步骤:
    1. 创建 index.d.ts 类型声明文件。
    2. 创建需要共享的类型，并使用 export 导出(TS 中的类型也可以使用 import/export 实现模块化功能)。
    3. 在需要使用共享类型的 .ts 文件中，通过 import 导入即可(.d.ts 后缀导入时，直接省略)。
## 类型声明-自定义的文件
> -为已有 JS 文件提供类型声明
有一个ts项目，用到了.js文件。

### 项目中ts和js同时存在，且不想将.js改成.ts
```txt
demo.ts
utils/index.js
```
```ts
utils/index.js
let count = 10
let songName = '痴心绝对'
let position = {
  x: 0,
  y: 0
}

function add(x, y) {
  return x + y
}

function changeDirection(direction) {
  console.log(direction)
}

const fomartPoint = point => {
  console.log('当前坐标：', point)
}

export { count, songName, position, add, changeDirection, fomartPoint }
```
demo.ts
```ts
import { add } from './utils'  // 这里可以使用，但是，没有提示。
```
这里可以使用，但是，没有提示
### 如何基于现有的.js提供声明文件?
```txt
demo.ts
utils/index.js
utils/index.d.ts
```
1. 在将 JS 项目迁移到 TS 项目时，为了让已有的 .js 文件有类型声明。
2. 成为库作者，创建库给其他人使用。
- 注意:类型声明文件的编写与模块化方式相关，不同的模块化方式有不同的写法。但由于历史原因，JS 模块化的发展 经历过多种变化(AMD、CommonJS、UMD、ESModule 等)，而 TS 支持各种模块化形式的类型声明。这就导致 ，类型声明文件相关内容又多又杂。
- 演示:基于最新的 ESModule(import/export)来为已有 .js 文件，创建类型声明文件。
### 类型声明文件的使用说明
- 说明:TS 项目中也可以使用 .js 文件。
- 说明:在导入 .js 文件时，TS 会自动加载与 .js 同名的 .d.ts 文件，以提供类型声明。
定义类型声明文件

```ts
declare let count:number

declare let songName: string

interface Position {
  x: number,
  y: number
}

declare let position: Position

declare function add (x :number, y: number) : number

type Direction = 'left' | 'right' | 'top' | 'bottom'

declare function changeDirection (direction: Direction): void

type FomartPoint = (point: Position) => void

declare const fomartPoint: FomartPoint

export {
  count, songName, position, add, changeDirection, FomartPoint, fomartPoint
}
```

declare 关键字:用于类型声明，为其他地方(比如，.js 文件)已存在的变量声明类型，而不是创建一个新的变量。
1. 对于 type、interface 等这些明确就是 TS 类型的(只能在 TS 中使用的)，可以省略 declare 关键字。
2. 对于 let、function 等具有双重含义(在 JS、TS 中都能用)，应该使用 declare 关键字，明确指定此处用于类型声明。

