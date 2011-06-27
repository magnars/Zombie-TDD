(function(es5) {

function assertObject(o) {
  if (typeof(o) == 'object' || typeof(o) == 'function') {
    return o;
  } else {
    throw new TypeError();
  }
}

function assertCallable(o) {
  if (typeof(o) == 'function') {
    return o;
  } else {
    throw new TypeError();
  }
}

function stub(o) {
  return assertObject(o);
}

es5.Object = {
  getPrototypeOf: function(o) {
    return assertObject(o).__proto__;
  },
  getOwnPropertyDescriptor: function(o, p) {
    assertObject(o);
    return {
      value: o[p],
      writeable: true,
      enumerable: true, // possibly improved, but expensive
      configurable: true
    };
  },
  getOwnPropertyNames: function(o) {
    assertObject(o);
    var array = [];
    for (var i in o) { 
      if (o.hasOwnProperty(i)) {
        array.push(i);
      }
    }
    return array;
  },
  create: function(o, properties) {
    if (o) {
      function F() {};
      F.prototype = assertObject(o);
      return es5.Object.defineProperties(new F(), properties);
    } else {
      return es5.Object.defineProperties({}, properties);
    }
  },
  defineProperty: function(o, p, attributes) {
    assertObject(o);
    o[p] = attributes && attributes.value;
    return o;
  },
  defineProperties: function(o, properties) {
    assertObject(o);
    for (var i in properties) { 
      if (properties.hasOwnProperty(i)) {
        o[i] = properties[i] && properties[i].value;
      }
    }
    return o;
  },
  seal: stub,
  freeze: stub,
  preventExtensions: stub,
  isSealed: function(o) {assertObject(o); return false;},
  isFrozen: function(o) {assertObject(o); return false;},
  isExtensible: function(o) {assertObject(o); return true;},
  keys: function(o) {
    assertObject(o);
    var array = [];
    for (var i in o) { 
      array.push(i);
    }
    return array;
  }
};

if (!Object.__proto__) {
  delete es5.Object.getPrototypeOf;
}

es5.Function = {
  prototype: {
    bind: function(thisArg) {
      var target = assertCallable(this);
      var boundArgs = Array.prototype.slice.call(arguments, 1);
      var n = Math.min(5, Math.max(0, (target.length - boundArgs.length)));
      // ugly, but length isn't writeable, so it's this or eval
      return [
        function() {
          return target.apply(thisArg,
            Array.prototype.concat.apply(boundArgs, arguments));
        },
        function(a) {
          return target.apply(thisArg,
            Array.prototype.concat.apply(boundArgs, arguments));
        },
        function(a, b) {
          return target.apply(thisArg,
            Array.prototype.concat.apply(boundArgs, arguments));
        },
        function(a, b, c) {
          return target.apply(thisArg,
            Array.prototype.concat.apply(boundArgs, arguments));
        },
        function(a, b, c, d) {
          return target.apply(thisArg,
            Array.prototype.concat.apply(boundArgs, arguments));
        },
        function(a, b, c, d, e) {
          return target.apply(thisArg,
            Array.prototype.concat.apply(boundArgs, arguments));
        }
      ][n];
    }
  }
};

es5.Array = {
  isArray: function(arg) {
    return arg && // null is an object...
      typeof(arg) == 'object' && 
      'constructor' in arg &&
      arg.constructor === Array;
  },
  // following from Mozilla array extras substitues
  // e.g. https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/indexOf
  prototype: {
    indexOf: function(elt /*, from*/) {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0)
           ? Math.ceil(from)
           : Math.floor(from);
      if (from < 0) {
        from += len;
      }

      for (; from < len; from++) {
        if (from in this && this[from] === elt) {
          return from;
        }
      }
      return -1;
    },
    lastIndexOf: function(elt /*, from*/) {
      var len = this.length;

      var from = Number(arguments[1]);
      if (isNaN(from)) {
        from = len - 1;
      } else {
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0) {
          from += len;
        } else if (from >= len) {
          from = len - 1;
        }
      }

      for (; from > -1; from--) {
        if (from in this && this[from] === elt) {
          return from;
        }
      }
      return -1;
    },
    every: function(fun /*, thisp*/) {
      var len = this.length >>> 0;
      assertCallable(fun);

      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this && !fun.call(thisp, this[i], i, this)) {
          return false;
        }
      }

      return true;
    },
    some: function(fun /*, thisp*/) {
      var i = 0;
      var len = this.length >>> 0;
      assertCallable(fun);

      var thisp = arguments[1];
      for (; i < len; i++) {
        if (i in this && fun.call(thisp, this[i], i, this)) {
          return true;
        }
      }

      return false;
    },
    forEach: function(fun /*, thisp*/) {
      var len = this.length >>> 0;
      assertCallable(fun);

      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this) {
          fun.call(thisp, this[i], i, this);
        }
      }
    },
    map: function(fun /*, thisp*/) {
      var len = this.length >>> 0;
      assertCallable(fun);

      var thisp = arguments[1];
      var res = new Array(len);
      for (var i = 0; i < len; i++) {
        if (i in this) {
          res[i] = fun.call(thisp, this[i], i, this);
        }
      }

      return res;
    },
    filter: function(fun /*, thisp*/) {
      var len = this.length >>> 0;
      assertCallable(fun);

      var res = new Array();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this) {
          var val = this[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, this)) {
            res.push(val);
          }
        }
      }

      return res;
    },
    reduce: function(fun /*, initial*/) {
      var len = this.length >>> 0;
      assertCallable(fun);

      // no value to return if no initial value and an empty array
      if (len == 0 && arguments.length == 1) {
        throw new TypeError();
      }

      var i = 0;
      if (arguments.length >= 2) {
        var rv = arguments[1];
      } else {
        do {
          if (i in this) {
            rv = this[i++];
            break;
          }

          // if array contains no values, no initial value to return
          if (++i >= len) {
            throw new TypeError();
          }
        }
        while (true);
      }

      for (; i < len; i++) {
        if (i in this) {
          rv = fun.call(null, rv, this[i], i, this);
        }
      }

      return rv;
    },
    reduceRight: function(fun /*, initial*/) {
      var len = this.length >>> 0;
      assertCallable(fun);

      // no value to return if no initial value and an empty array
      if (len == 0 && arguments.length == 1) {
        throw new TypeError();
      }

      var i = len - 1;
      if (arguments.length >= 2) {
        var rv = arguments[1];
      } else {
        do {
          if (i in this) {
            rv = this[i--];
            break;
          }

          // if array contains no values, no initial value to return
          if (--i < 0) {
            throw new TypeError();
          }
        }
        while (true);
      }

      for (; i >= 0; i--) {
        if (i in this) {
          rv = fun.call(null, rv, this[i], i, this);
        }
      }

      return rv;
    }
  }
};

es5.String = {
  prototype: {
    trim: function() {
      return this.replace(/^\s*(\S+)\s*$/, "$1");
    }
  }
};

function two(n) {
  var s = n.toString();
  return s.length < 2 ? '0'+s : s;
}

function three(n) {
  var s = two(n);
  return s.length < 3 ? '0'+s : s;
}

es5.Date = {
  now: function() {return new Date().getTime();},
  prototype: {
    toISOString: function() {
      return this.getUTCFullYear()+'-'+
         two(this.getUTCMonth()+1)+'-'+
         two(this.getUTCDate())   +'T'+
         two(this.getUTCHours())  +':'+
         two(this.getUTCMinutes())+':'+
         two(this.getUTCSeconds())+'.'+
       three(this.getUTCMilliseconds())+'Z';
    },
    toJSON: function(key) {
      if (!isFinite(this.valueOf())) {
        return null;
      }
      if (this.toISOString) {
        return this.toISOString();
      } else {
        return es5.Date.prototype.toISOString.call(this);
      }
    }
  }
};

function infect(host, virus) {
  for (var stat in virus) {
    if (virus.hasOwnProperty(stat) && stat != 'prototype' && !(stat in host)) {
      host[stat] = virus[stat];
    }
  }
}

function cure(host, virus) {
  for (var stat in virus) {
    if (host[stat] == virus[stat]) {
      delete host[stat];
    }
  }
}

es5.use = {
  constructorMethods: function() {
    infect(Function, es5.Function);
    infect(Array, es5.Array);
    infect(String, es5.String);
    infect(Date, es5.Date);
    return this;
  },
  imperfectMethods: function() {
    infect(Object, es5.Object);
    return this;
  },
  prototypeMethods: function() {
    infect(Function.prototype, es5.Function.prototype);
    infect(Array.prototype, es5.Array.prototype);
    infect(String.prototype, es5.String.prototype);
    infect(Date.prototype, es5.Date.prototype);
    return this;
  }
};

// dirty:
es5.use.constructorMethods().imperfectMethods().prototypeMethods();

})(this.exports = this.exports || {});
