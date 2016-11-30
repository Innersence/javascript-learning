  /*
  *prtototype的赋值注意事项
  */
  
  function Foo() {
        this.value = 42;
    }

    Foo.prototype = {
        method: function() {
        	console.log("This is method from Foo.");
        }
    };

	var Bar = function(){};
	Bar.prototype = new Foo();
	Bar.prototype.constructor =  new Bar();
	Bar.prototype.value = { name: "proto value" };//不能将基本类型如1,"abc"等直接赋值给 prototype，如
                                                       //Bar.prototype =1 是不被允许的
        var bar = new Bar();

	console.log(bar.value);//proto value  --必须是new 出来的Bar才有value属性，Prototype中的新属性只能在new出的对象中才有
 // console.logBar.value);//这样会报错
  
	Bar.value = {name:"raw value"};
	console.log(Bar.value);// raw value
  
  //source : http://bonsaiden.github.io/JavaScript-Garden/zh/
