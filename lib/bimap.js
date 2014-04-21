var BiMap;

BiMap = (function() {
  BiMap.prototype.klength = 0;

  BiMap.prototype.vlength = 0;

  BiMap.prototype.kindex = 0;

  function BiMap(A) {
    var k, v;
    this.kv = {};
    this.vk = {};
    if (A != null) {
      for (k in A) {
        v = A[k];
        this.push(k, v);
      }
    }
  }

  BiMap.prototype.push = function(k, v) {
    return this.insert(k, v, "push");
  };

  BiMap.prototype.appendKey = function(k, v) {
    return this.insert(k, v, "appendKey");
  };

  BiMap.prototype.appendVal = function(k, v) {
    return this.insert(k, v, "appendVal");
  };

  BiMap.prototype.set = function(k, v) {
    return this.insert(k, v, "set");
  };

  BiMap.prototype.type = function(a) {
    var t;
    t = typeof a;
    if (t === "number" && a !== a) {
      return "NaN";
    }
    if (t !== "object") {
      return t;
    }
    t = toString.call(a);
    if (t === "[object Object]") {
      return "object";
    }
    if (t === "[object Array]") {
      return "array";
    }
    if (t === "[object Boolean]") {
      return "boolean";
    }
    if (t === "[object Null]") {
      return "null";
    }
  };

  BiMap.prototype._assign = function(k, v, type, reverse) {
    var dir, i, _i, _len;
    if (type == null) {
      type = "push";
    }
    if (reverse == null) {
      reverse = false;
    }
    if (k > this.kindex) {
      this.kindex++;
    }
    console.log(k, v, type, reverse, this.kindex);
    dir = reverse ? "vk" : "kv";
    if (type === "push") {
      if (this[dir][k] == null) {
        this[dir][k] = v;
        return true;
      } else {
        return this.error("" + dir + " mapping for " + k + " already exists");
      }
    } else if (type === "appendVal") {
      if (reverse) {
        if (this.vk[k] != null) {
          if ("array" !== this.type(this.vk[k])) {
            this.vk[k] = [this.vk[k]];
          }
          this.vk[k][this.type(v) === "array" ? "concat" : "push"](v);
        } else {
          this.vk[k] = v;
        }
        return true;
      }
      if (this.kv[k] == null) {
        this.kv[k] = [];
      } else if ("array" !== this.type(this.kv[k])) {
        this.kv[k] = [this.kv[k]];
      }
      this.kv[k][this.type(v) === "array" ? "concat" : "push"](v);
      if ("array" === this.type(v)) {
        for (_i = 0, _len = v.length; _i < _len; _i++) {
          i = v[_i];
          this.kv[k].push(i);
        }
      }
      return true;
    } else if (type === "set") {
      this[dir][k] = v;
      return true;
    }
  };

  BiMap.prototype.insert = function(k, v, type) {
    var ktype, vtype;
    if (type == null) {
      type = "push";
    }
    console.log("insert", k, v, type);
    if (k == null) {
      return this.error("At least one argument required by insert()");
    }
    ktype = this.type(k);
    if (v == null) {
      if ("array" === this.type(k)) {
        return (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = k.length; _i < _len; _i++) {
            v = k[_i];
            _results.push(this.insert(++this.kindex - 1, v, type));
          }
          return _results;
        }).call(this);
      } else if ("object" === this.type(k)) {
        return this.traverse(k, (function(v, path) {
          return this.insert(path, v, type);
        }).bind(this));
      } else {
        return this.insert(++this.kindex - 1, k, type);
      }
    } else if (this.type(k) === "number" && k > this.kindex) {
      this.kindex = k + 1;
    }
    vtype = this.type(v);
    if (vtype === "object") {
      return this.traverse(v, (function(v, path) {
        console.log("trcb", k, path, v);
        return this.insert("" + k + "." + path, v, type);
      }).bind(this));
    } else if (vtype === "array") {
      if (ktype === "array") {
        this.insertArray(v, k, type, true);
      }
      return this.insertArray(k, v, type);
    } else if (ktype === "array") {
      return this.insertArray(v, k, type, true);
    } else {
      this._assign(v, k, type, true);
      return this._assign(k, v, type);
    }
  };

  BiMap.prototype.insertArray = function(k, array, type, reverse) {
    var i, r, _i, _len;
    if (type == null) {
      type = "push";
    }
    if (reverse == null) {
      reverse = false;
    }
    this._assign(k, array, type, reverse);
    r = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        _results.push(this._assign(i, k, type, !reverse));
      }
      return _results;
    }).call(this);
    for (_i = 0, _len = r.length; _i < _len; _i++) {
      i = r[_i];
      if (!i) {
        return false;
      }
    }
    return true;
  };

  BiMap.prototype.traverse = function(obj, cb) {
    var k, npath, path, v, _results;
    path = arguments[2] || "";
    console.log(obj);
    if ("object" === this.type(obj)) {
      _results = [];
      for (k in obj) {
        v = obj[k];
        console.log("tr", k, v, path);
        npath = path;
        if (path.length > 0) {
          npath += ".";
        }
        npath += k;
        _results.push(this.traverse(v, cb, npath));
      }
      return _results;
    } else {
      return cb(obj, path);
    }
  };

  BiMap.prototype.error = function() {
    return false;
  };

  BiMap.prototype.remove = function(k) {
    delete this.vk[this.kv[k]];
    return delete this.kv[k];
  };

  BiMap.prototype.removeVal = function(v) {
    delete this.kv[this.vk[v]];
    return delete this.vk[v];
  };

  BiMap.prototype.key = function(k) {
    return this.kv[k];
  };

  BiMap.prototype.val = function(v) {
    return this.vk[v];
  };

  return BiMap;

})();

(typeof module === "undefined" || module === null) || (module.exports = BiMap);
