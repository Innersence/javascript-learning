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
