# javascript-learning
This is just the learning note for myself

The target is to note the knowledge.
####构造函数与instanceof

构造函数是类的公共标识，但原型是唯一标识。尽管instanceof运算符的右操作符是构造函数，但计算过程实际上是检测了对象的继承关系，而不是检测创建对象的构造函数。
《javascript 权威指南》--page212
</br>

[Foo.prototype.method.call](https://segmentfault.com/q/1010000005778821)

```javascript
Foo1.prototype.method = function(a, b, c) {
   	var that = this;
   	log(" Foo1.prototype.method ")
    console.log( a, b, c);
};

// 创建一个解绑定的 "method"
// 输入参数为: this, arg1, arg2...argN
Foo1.method = function() {
    // 结果: Foo1.prototype.method.call(this, arg1, arg2... argN)
    Function.call.apply(Foo1.prototype.method, arguments);
    /*
    *相当于Foo1.prototype.method.call(arguments);
    *相当于Foo1.prototype.method(arg0,arg1,arg2);
    *arg0是context.
    */
};

Foo1.method("a","b","c");//输出结果b,c
```
####获取对象类型的方法

通常typeof和instanceof都是不可靠的，但是可以通过以下方式获取。
JavaScript 标准文档只给出了一种获取 [[Class]] 值的方法，那就是使用 Object.prototype.toString。
```javascript
function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

is('String', 'test'); // true
is('String', new String('test')); // true

```

[秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)

####字符串转数字
+'10' === 10; // true
使用一元的加号操作符，可以把字符串转换为数字

字符串转换为数字的常用方法：
```javascript
+'010' === 10
Number('010') === 10
parseInt('010', 10) === 10  // 用来转换为整数

+'010.2' === 10.2
Number('010.2') === 10.2
parseInt('010.2', 10) === 10
```

[秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)

####转换为布尔型
```javascript
!!'foo';   // true
!!'';      // false
!!'0';     // true
!!'1';     // true
!!'-1'     // true
!!{};      // true
!!true;    // true
```
[秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)


####为什么不要使用 eval

eval 函数会在当前作用域中执行一段 JavaScript 代码字符串

```javascript
var foo = 1;
function test() {
    var foo = 2;
    eval('foo = 3');
    return foo;
}
test(); // 3
foo; // 1
```
但是 eval 只在被直接调用并且调用函数就是 eval 本身时，才在当前作用域中执行。

```javascript
var foo = 1;
function test() {
    var foo = 2;
    var bar = eval;
    bar('foo = 3');
    return foo;
}
test(); // 2
foo; // 3
```
上面的代码等价于在全局作用域中调用 eval.
[秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)

在任何情况下我们都应该避免使用 eval 函数。99.9% 使用 eval 的场景都有不使用 eval 的解决方案。

####setTimeout 和 setInterval作用域

作为第一个参数的函数将会在全局作用域中执行，因此函数内的 this 将会指向这个全局对象。
```javascript
function Foo() {
    this.value = 42;
    this.method = function() {
        // this 指向全局对象
        console.log(this.value); // 输出：undefined
    };
    setTimeout(this.method, 500);
}

new Foo();
```

setTimeout 只会执行回调函数一次，不过 setInterval - 正如名字建议的 - 会每隔 X 毫秒执行函数一次。 但是却不鼓励使用这个函数。

当回调函数的执行被阻塞时，setInterval 仍然会发布更多的回调指令。在很小的定时间隔情况下，这会导致回调函数被堆积起来。
应该避免使用 setInterval，因为它的定时执行不会被 JavaScript 阻塞。但是里面的函数却有可能阻塞，所以定时任务有可能并不是按间隔来的。
#####解决阻塞的方式
最简单也是最容易控制的方案，是在回调函数内部使用 setTimeout 函数。
```javascript
function foo(){
    // 阻塞执行 1 秒
    setTimeout(foo, 100);
}
foo();
```

这样不仅封装了 setTimeout 回调函数，而且阻止了调用指令的堆积，可以有更多的控制。 foo 函数现在可以控制是否继续执行还是终止执行。
