# 数据结构
> 本章主要学习`基础算法`,`数据结构`和`复杂度`.  
> 参考至[web全栈体系](https://senior-frontend.pages.dev/)

## 复杂度
> 衡量算法的优劣，一般通过`耗费`的`时间资源`和`空间(内存)资源`.  
> 复杂度分为`时间`复杂度和`空间`复杂度。  
> 复杂度一般由`O()`表示，内部的值越大，表示复杂度越高。

### 时间复杂度
> 表示运行算法所`花费的时间`，因`变量`的变化而增加的`复杂度规律`(数量级)。   

### O(1)
> `常数级别`的时间复杂度
```js
const a = 1;
console.log(a);
// 表示当变量没有变化
```
### O(n)
> `自然数级别`的时间复杂度
```js
const n = 20;
for(let i=0; i<n; i++){
	// ...
}
// n的变化，会导致程序执行时间一起变化，呈自然数变化的规律。
```

### O(n^2)
> `指数级别`的时间复杂度  
```js
const n = 20;
for(let i=0; i<n; i++){
	for(let j=0; j<n; j++){
		// ...
	}
}

// 嵌套了2层循环，
// n的变化，会导致执行时间呈指数级别递增，
// 呈现指数级变化的规律。
```

### O(log2n)
> `对数级别`的时间复杂度  
> 在`O(n)`和`O(n2)`案例上，都是变量`i++`执行循环。  
> 当`基本变化规律`不是`增减`, 而是`乘数`变化时, 就是`对数级别数量级`
```js
for(let i=0; i<n; i *= 2){
	// ...
}
// 由于i++ 变为了 i*=2
// 其总的时间复杂度由 O(n) 缩减为了 O(log2n)
```

### 计算步骤
- 计算时间复杂度的步骤：
1. 找到`执行次数最多`的语句 
2. 计算语句执行次数的`数量级`
3. 用`大O`来表示结果
```js
let num = 0, num2 = 0;
for(let i=0; i<n; i *= 2){
	num +=1;
	for(let j=0; j<n; j++){
		// ...
		num2 +=1
	}
}

// 执行最多的是内部的num2 +=1
// 执行的数量级为 nlog2n
// 时间复杂度为 O(nlog2n)
```

### 计算规则
1. 当`n`无限趋近于无穷时，`1/n`趋向于0.
2. 加法规则: 当两个时间复杂度处于`同级`，相加时取`较大值`
3. 乘法规则: 当两个时间复杂度处于`嵌套级`，量级相乘
4. 只有`可运行`的语句，才会增加时间复杂度。
```js
for (let i=1; i<=n; i++){
	for (let j=1; j<=n; j++){
		console.log(1);
	}
}
// 以上的时间复杂度为  O(n2)

for(let x=1; x<n; x++){
	console.log(1);
}
// 以上的时间复杂度为O(n)

// 因此，总的时间复杂度为 O(n+n2) =>O(max(n,n2)) => O(n2)
```
### 空间复杂度
> 表示运行算法所`占用的空间`，因`变量`的变化而增加的`复杂度规律(数量级)`。

### O(1)
> `常数级别`，即`变量变化`并`没有导致`程序`占用的空间`发生变化。
```js
const a =10;
for(let i=0; i<n; i++){
	console.log(n)
}
for(let i=0; i<n; i++){
	for(let j=0; j<n; j++){
		console.log(n)
	}
}
// 以上3个, 空间复杂度均未为O(1)
```

### O(n)
> `自然数级别`，即`变量变化`会`导致`程序`占用的空间`递增。  
> 内存占用变化的规则呈`自然数级`现象。
```js
const arr = []
for(let i=0; i<n; i++){
	arr.push(i);
}
// 当i发生变化时，arr占用不断增大，并且与i的自然递增，有强相关。
```

### O(n^2)
> `指数级别`, 内存占用变化的规则呈`指数级`现象。
```js
const arr = []
for(let i=0; i<n; i++){
	arr[i] = i;
	for(let j=0; j<n; j++){
		arr[i][j] = i + j;
	}
}

// 当嵌套到j层时，外部的arr[i] = i; 呈n级别递增，
// 内部的arr[i][j] = i + j; 也呈n级别递增
// 因此一共是 n * n, 也就是O(n2)
```

### O(log2n)
> `对数级别`, 与`时间复杂度`的`O(log2n)`一样  
> 当`基本变化规律`不是`增减`, 而是`乘数`变化时,
```js
const arr = []
for(let i=0; i<n;i*=2){
	arr[i] = i
}
```

### 额外补充
> 时间和空间复杂度往往是`相互影响`的, 当一味的追究`时间复杂度`  
> 可能消耗更多的内存.


## 数据结构
### 栈
> 栈是指: 按一种`先进后出`的原则存储数据.   
> 想象一个`瓶子`装石头,往往先装入的,只有最后才能取出.  
> `栈`和`队列`在js中,经常用`数组模拟`

```js
// 用数组模拟栈
class Stack{
	constructor(){
		this.arr = []
	}
	addData(...data){
		this.arr.push(...data)
	}
	delData(){
		this.arr.pop()
	}
}

const stack = new Stack()
stack.addData(1,2,3,4,5)  //按 顺序挤入, 5最后挤入
stack.delData() //5被删除
console.log(stack.arr); //1,2,3,4
```

### 队列
> 队列是指: 按一种`先进先出`的原则存储数据.  
> 想象一个`漏斗`, 往里面倒入石头, 先倒入的先流出.  
```js
// 用数组模拟队列
class Queue{
	constructor(){
		this.arr = []
	}
	addData(...data){
		this.arr.push(...data)
	}
	delData(){
		this.arr.shift()
	}
}
const queue = new Queue()
queue.addData(1,2,3,4,5);  //1最先挤入
queue.delData(); //1被删除了
console.log(queue.arr);  //2,3,4,5
```

### 链表
> 链表由一系列`节点`和指向`下一个`节点的`指针`组成。   
> 优点：可以`动态`且`快速`的增加和删除节点。  
> 缺点：由于链表的顺序由指针决定，是`非连续的`。  
> 因此`访问`第i个元素需要`遍历`整个链表，效率较低。
```js
// 用原生js实现链表
// 定义链表的节点类
class Node {
  constructor(value) {
    this.value = value;  //值
    this.next = null;  //指向下一个节点的指针(引用)
  }
}

// 定义链表类
class LinkedList {
  constructor() {
    this.head = null; //头部指针
    this.tail = null;  //尾部指针
    this.length = 0;  //链表长度
  }

  // 在链表尾部添加节点 就是更改指针/引用即可。
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // 在链表指定位置插入节点, 时间复杂度为O(1)
  insert(position, value) {
    if (position < 0 || position > this.length) {
      return false;
    }
    const newNode = new Node(value);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      if (!this.tail) {
        this.tail = newNode;
      }
    } else if (position === this.length) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      previous.next = newNode;
      newNode.next = current;
    }
    this.length++;
    return true;
  }

  // 根据值查找节点位置, 时间复杂度为O(n)
  indexOf(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // 根据位置删除节点, 时间复杂度为O(1)
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let current = this.head;
    if (position === 0) {
      this.head = current.next;
      if (this.length === 1) {
        this.tail = null;
      }
    } else {
      let previous = null;
      let index = 0;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      previous.next = current.next;
      if (position === this.length - 1) {
        this.tail = previous;
      }
    }
    this.length--;
    return current.value;
  }

  // 根据值删除节点
  remove(value) {
    const position = this.indexOf(value);
    return this.removeAt(position);
  }

  // 判断链表是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 返回链表长度
  size() {
    return this.length;
  }

  // 返回链表头部节点的值
  getHead() {
    return this.head ? this.head.value : null;
  }

  // 返回链表尾部节点的值
  getTail() {
    return this.tail ? this.tail.value : null;
  }

  // 将链表转换为数组
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  // 将链表转换为字符串
  toString() {
    return this.toArray().toString();
  }
}

// 测试代码
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.insert(1, 4);
console.log(list.toArray()); // [1, 4, 2, 3]
console.log(list.indexOf(2)); // 2
console.log(list.remove(4)); // 4
console.log(list.toArray()); // [1, 2, 3]
console.log(list.size()); // 3
console.log(list.getHead()); // 1
console.log(list.getTail()); // 3
console.log(list.toString()); // 1,2,3
```

### 链表 VS 数组
> 链表中数据指定位置的`添加`和`删除`, 只需要更改`指针引用`即可。  
> 因此这两种操作的时间复杂度为`O(1)`.  
> 但是链表的`查询`需要遍历找指针，因此时间复杂时间复杂度为`O(n)`.  
```js
// 以添加为例：
append(value) {
	const newNode = new Node(value);
	if (!this.head) {
	  this.head = newNode;
	  this.tail = newNode;
	} else {
	  this.tail.next = newNode;
	  this.tail = newNode;
	}
	this.length++;
}
```
> 数组的`查询`有时候非常简单，时间复杂度为`O(1)`  
> 但是数组指定位置的`添加`和`删除`，需要遍历，时间复杂度为`O(n)`   
> 并且需要重新为数组分配空间，空间复杂度增加.

- 总结:
- 链表适用于需要`频繁`动态的`添加`、`删除`的操作。  
- 数组适用于需要`频繁`的`查询`操作。

### 链表应用场景
1. 实现`栈和队列`：与数组一样，链表也是有顺序的数据结构
2. 实现`哈希表`：可以用链表解决`哈希冲突`的问题。
3. 实现`图`: 链表的`指针`特点，非常适合用于实现图。

```js
/*
哈希冲突：两个或多个数据集之间有某种关联性，
不符合使用哈希实现均匀散布的目的。
*/
```

## 算法
### 常见算法思想
#### 回溯算法
> 一种`按优尝试性`的算法思想。
> 当问题解有`多种可能`, 优先按`优`尝试求解。  
> 当`某种`可能求解失败，`重头再来`，替换第二个求解方式。

#### 贪心算法
> 一种`按当前最优`求解的算法思想。  
> 当问题解`目前`有一个`最优选择`, 就按目前的方式求解。  
> 不从整体看考虑，考虑`局部最优解`。

#### 分治法
> 一种`规模分解`求解的算法思想。  
> 当一个规模为`n`的问题短期难以求解，则分解为多个`子规模`  
> 必要时通过`递归`，`组合`等方式，`合并`问题的解得到最终解。

#### 动态规划
> 一种`规模分解`的算法思想，和分治法很像。  
> 其注意`子问题解决`的顺序，`先求解`易解决的子问题。  
> 并且保存`前面的解`, 以便后续可以`重复利用`。
> 后续阶段通过`前面的解`+`决策`得到问题最优解。

- 动态规划和分治法的区别
- 目标不同: 
	- 分治法: 为了问题`能被解决`，而分解为子问题，并一一求解。
	- 动态规划: 为了求得问题的`最优解`, 而分解子问题，并以易求解优先。
- 子问题重复利用:
	- 分治法: 不会保存子问题的解。
	- 动态规划: 保存`前面的解`, 以便后续可以`重复利用`。
- 子问题规模:
	- 分治法: 分解为多个一样的规模。
	- 动态规划: 分解为较小的子问题。
- 时间复杂度和空间复杂度:
	- 分支法: 不产生额外空间，但是时间复杂度较高。
	- 动态规划: 需要额外空间保存子问题解，但是时间复杂度较低。

### 排序算法
#### 冒泡排序
> 小气泡不断往上冒泡，直到变大。   
> 两个元素不断比较，较小的排序在前，直到排序完成。

#### 插入排序
> 和打扑克抓牌一样，根据抓到的牌，插入到手上。
> 先把第2个元素`额外存`起来，  
> 根据后续元素的大小，插入到`额外数组`里面。

#### 选择排序
> 宏观的排序思想，每次把`最小的`选出来, 放置到最左边。  
> 然后选除了`该元素外`，`最小的`选出来, 递归排序。

#### 快速排序
> 采用`分治法`配合`基准值`的算法思想，将数组分为`两个子数组`。  
> 基准值: 计算数组的平均值，作为基准值。
> 分治规定: `左边`数组的元素`小于`基准值，`右边`元素`大于`基准值。  
> 然后根据`与基准值比较`, 继续划分，`递归快排`直到划分完整。  
> 快速排序是数组`sort`排序方式的实现原理。

