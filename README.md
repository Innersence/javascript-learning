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
