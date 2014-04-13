// Filename: accumasync.spec.js  
// Timestamp: 2014.04.13-11:55:12 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

var accumasync = require('../accumasync');


describe("accumasync.arr", function () {

  it("should iterate through an array", function (done) {  
    var testarr = [{
      type : 'val1'
    }, {
      type : 'val2'
    }];

    accumasync.arr(testarr, [], function (elem, arr, next) {
      arr.push(elem.type);
      next();
    }, function (err, res) {
      expect( res[0] === 'val2' &&
              res[1] === 'val1' ).toBe( true );      
      done();
    });
  });

});

describe("accumasync.arrf", function () {

  it("should iterate forward through an array", function (done) {  
    var testarr = [{
      type : 'val1'
    }, {
      type : 'val2'
    }];

    accumasync.arrf(testarr, [], function (elem, arr, next, done) {
      arr.push(elem.type);
      next();
    }, function (err, res) {
      expect( res[0] === 'val1' &&
              res[1] === 'val2' ).toBe( true );      
      done();
    });
  });
});

describe("accumasync.obj", function () {

  it("should iterate through properties of an object", function (done) {  
    var testobj = {
      type2 : 'val1',
      type1 : 'val2'
    };

    accumasync.obj(testobj, [], function (key, arr, next) {
      arr.push(testobj[key]);
      next();
    }, function (err, res) {
      expect( res[0] === 'val2' &&
              res[1] === 'val1' ).toBe( true );      
      done();
    });
  });

});

describe("accumasync.objf", function () {

  it("should iterate through properties of an object", function (done) {  
    var testobj = {
      type2 : 'val2',
      type1 : 'val1'
    };

    accumasync.objf(testobj, [], function (key, arr, next) {
      arr.push(testobj[key]);
      next();
    }, function (err, res) {
      expect( res[0] === 'val1' &&
              res[1] === 'val2' ).toBe( true );      
      done();
    });
  });

});


describe("accumasync.num", function () {

  it("should iterate through length of number", function (done) {  

    accumasync.num(9, [], function (num, arr, next) {
      arr.push(num);
      next();
    }, function (err, res) {
      expect( res[0] === 8 &&
              res[1] === 7 ).toBe( true );      
      done();
    });
  });

});


describe("accumasync.numf", function () {

  it("should iterate through length of number", function (done) {  

    accumasync.numf(9, [], function (num, arr, next) {
      arr.push(num);
      next();
    }, function (err, res) {
      expect( res[0] === 0 &&
              res[1] === 1 ).toBe( true );      
      done();
    });
  });

});

