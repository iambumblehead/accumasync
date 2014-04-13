accumasync
==========
**(c)[Bumblehead][0], 2014** [MIT-license](#license)  

### Overview:

Accumulate values asynchronously. 

When looping through values in an array to perform async operations, you may be using boilerplate like this:
```
function collectAsync (arr, fn) {
  var newarr = [];
  (function next (x) {
    if (!x--) return fn(null, newarr);
    requestDataForElem(arr[x], function (err, res) {
      if (err) return fn(err);
      newarr.push(res);
      next(x);
    });
  }(arr.length));
}
```

But usually more boilerplate is necessary. The function is called frequently and to avoid exeeding stack limits a `setTimeout`. Some logic is added to throw an error when the given array is invalid. The order of array traversal is changed. With more boilerplate the role of the function is harder to understand.

With `accumasync` some of the boilerplate is removed traversal order is easily changed and an error is thrown for an invalid array. The function above becomes this:
```
function collectAsync (arr, fn) {
  accumasync.arr(arr, [], function (elem, index, accumarr, next) {
    requestDataForElem(elem, function (err, res) {
      if (err) return fn(err);
      accumarr.push(res);
      next();
    });    
  }, fn);
}
```

`accumasync` traverses array elements, object keys and number sequences.


[0]: http://www.bumblehead.com                            "bumblehead"

---------------------------------------------------------
#### <a id="methods">Methods:

`accumasync` methods share the same implementation and interface details. The following parameters are passed to accumulator methods:

 * **startvals= _Array | Object | Number_**
   target element for the animation
   
 * **accumvals= _*_**
   the reference to this value is passed to each callback function
   it may be redefined with the accumulated values
   
 * **fn= _Function_**
   function is called for each item and the body of it may perform an async operation to obtain new values

   the fn function is called like this:
   ```
   fn(elem, index, accumvals, nextfn)
   ```

 * **exitfn= _Function_**  
   function is called at the end of traversal and may be called to prematurely end traversal

   the exitfn function is called like this:
   ```
   exitfn(err, accumvals)
   ```
   
------------------------------------------------------

**accumasync.arr( _arr_, _accum_, _fn_, _exitfn_ )**
  
  traverse array elements in reverse order
    ```
    accumasync.arr(arr, [], function (elem, index, accumarr, next) {
      requestDataForElem(elem, function (err, res) {
        if (err) return fn(err);
        accumarr.push(res);
        next();
      });    
    }, exitfn);
    ```
    
**accumasync.arrf( _arr_, _accum_, _fn_, _exitfn_ )**

  traverse array elements in forward order
    ```
    accumasync.arrf(arr, [], function (elem, index, accumarr, next) {
      requestDataForElem(elem, function (err, res) {
        if (err) return fn(err);
        accumarr.push(res);
        next();
      });    
    }, exitfn);
    ```
    
**accumasync.obj( _arr_, _accum_, _fn_, _exitfn_ )**
  
  traverse object keys in reverse order
    ```
    accumasync.obj(obj, [], function (elem, index, accumarr, next) {
      requestDataForElem(obj[elem], function (err, res) {
        if (err) return fn(err);
        accumarr.push(res);
        next();
      });    
    }, exitfn);
    ```

**accumasync.objf( _arr_, _accum_, _fn_, _exitfn_ )**
  
  traverse object keys in forward order
    ```
    accumasync.obj(obj, [], function (elem, index, accumarr, next) {
      requestDataForElem(obj[elem], function (err, res) {
        if (err) return fn(err);
        accumarr.push(res);
        next();
      });    
    }, exitfn);
    ```

**accumasync.num( _arr_, _accum_, _fn_, _exitfn_ )**
  
  traverse numbers in reverse order
    ```
    accumasync.num(num, [], function (elem, index, accumarr, next) {
      requestDataForElem(num, function (err, res) {
        if (err) return fn(err);
        accumarr.push(res);
        next();
      });    
    }, exitfn);
    ```
    
**accumasync.numf( _arr_, _accum_, _fn_, _exitfn_ )**
  
  traverse numbers in forward order
    ```
    accumasync.numf(num, [], function (elem, index, accumarr, next) {
      requestDataForElem(num, function (err, res) {
        if (err) return fn(err);
        accumarr.push(res);
        next();
      });    
    }, exitfn);
    ```

---------------------------------------------------------
#### <a id="install"></a>Install:

`accumasync` may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install accumasync
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/accumasync.git
 ```

---------------------------------------------------------
#### <a id="test"></a>Test:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```

---------------------------------------------------------
#### <a id="license">License:

 ![scrounge](http://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2014 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
