// Filename: accumasync.js  
// Timestamp: 2016.08.01-02:36:06 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)  

var accumasync = module.exports = {

  accum : function (length, accum, exitfn, cb, getfn) {
    (function next(x, elem) {
      if (!x--) return exitfn(null, accum);
      cb(getfn(x), accum, function (err, res) {
        if (err) return exitfn(err);
        accum = res;
        next(x);
      }, exitfn);
    }(length));
  },

  accumf : function (length, accum, exitfn, cb, getfn) {
    (function next(x) {
      if (x >= length) return exitfn(null, accum);
      cb(getfn(x), accum, function (err, res) {
        if (err) return exitfn(err);
        accum = res;
        next(++x);
      }, exitfn);
    }(0));
  },

  getarr : function (arr) {
    if (!Array.isArray(arr)) {
      throw new Error('[!!!] arr must be an array');
    }
    return arr;
  },

  getobj : function (obj) {
    if (typeof obj !== 'object' || obj == null) {
      throw new Error('[!!!] obj must be an object');
    }
    return obj;
  },

  getnum : function (num) {
    if (typeof num !== 'number') {
      throw new Error('[!!!] obj must be an object');
    }
    return num;
  },

  arr : function (arr, accum, cb, exitfn) {
    this.getarr(arr);
    this.accum(arr.length, accum, exitfn, cb, function (x) {
      return arr[x];
    });
  },

  arrf : function (arr, accum, cb, exitfn) {
    this.getarr(arr);
    this.accumf(arr.length, accum, exitfn, cb, function (x) {
      return arr[x];
    });
  },

  obj : function (obj, accum, cb, exitfn) {
    var keys = Object.keys(this.getobj(obj));

    this.accum(keys.length, accum, exitfn, cb, function (x) {
      return keys[x];
    });
  },

  objf : function (obj, accum, cb, exitfn) {
    var keys = Object.keys(this.getobj(obj)).sort();

    this.accumf(keys.length, accum, exitfn, cb, function (x) {
      return keys[x];
    });
  },

  num : function (num, accum, cb, exitfn) {
    this.accum(this.getnum(num), accum, exitfn, cb, function (x) {
      return x;
    });
  },

  numf : function (num, accum, cb, exitfn) {
    this.accumf(this.getnum(num), accum, exitfn, cb, function (x) {
      return x;
    });
  }

};
