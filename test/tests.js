var BiMap, expect, require, should;

if (typeof require !== "undefined" && require !== null) {
  BiMap = require("../lib/bimap.js");
  should = require("chai").should();
  expect = require("chai").expect;
} else {
  require = function() {};
  should = chai.should();
  expect = chai.expect;
}

describe("BiMap.appendVal()", function() {
  it("should append new values to existing keys", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("a", "b");
    bimap.appendVal("a", "c").should.equal(true);
    bimap.key("a").should.deep.equal(["b", "c"]);
    bimap.val("b").should.equal("a");
    return bimap.val("c").should.equal("a");
  });
  it("should create a new key <-> [value] mapping if the key doesn't already exist", function() {
    var bimap;
    bimap = new BiMap;
    bimap.appendVal("a", "b").should.equal(true);
    bimap.key("a").should.deep.equal(["b"]);
    return bimap.val("b").should.equal("a");
  });
  it("should append the new key to the existing value -> key mapping", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("c", "b");
    bimap.appendVal("a", "b").should.equal(true);
    bimap.key("a").should.deep.equal(["b"]);
    return bimap.val("b").should.deep.equal(["c", "a"]);
  });
  return it("should handle appending multiple values at once", function() {
    var bimap;
    bimap = new BiMap;
    bimap.appendVal("a", ["b", "c"]).should.equal(true);
    bimap.key("a").should.deep.equal(["b", "c"]);
    bimap.val("b").should.equal("a");
    return bimap.val("c").should.equal("a");
  });
});

describe("#push()", function() {
  var array, array2;
  array = [1, 2, 3];
  array2 = [4, 5, 6];
  it("should handle mapping an array of keys to a value", function() {
    var bimap, item, _i, _len, _results;
    bimap = new BiMap;
    bimap.push(array, "a").should.be["true"];
    bimap.val("a").should.deep.equal(array);
    _results = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      _results.push(bimap.key(item).should.equal("a"));
    }
    return _results;
  });
  it("should handle mapping an array of values to a key", function() {
    var bimap, item, _i, _len, _results;
    bimap = new BiMap;
    bimap.push("a", array).should.equal(true);
    bimap.key("a").should.deep.equal(array);
    _results = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      _results.push(bimap.val(item).should.equal("a"));
    }
    return _results;
  });
  it("should handle mapping an array of keys to an array of values", function() {
    var bimap, item, _i, _j, _len, _len1, _results;
    bimap = new BiMap;
    bimap.push(array, array2);
    for (_i = 0, _len = array2.length; _i < _len; _i++) {
      item = array2[_i];
      bimap.val(item).should.deep.equal(array);
    }
    _results = [];
    for (_j = 0, _len1 = array.length; _j < _len1; _j++) {
      item = array[_j];
      _results.push(bimap.key(item).should.deep.equal(array2));
    }
    return _results;
  });
  it("should handle mapping a key to an object", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("a", {
      b: 1,
      c: {
        d: {
          e: 2
        }
      }
    });
    bimap.key("a.b").should.equal(1);
    bimap.val(1).should.equal("a.b");
    bimap.key("a.c.d.e").should.equal(2);
    return bimap.val(2).should.equal("a.c.d.e");
  });
  it("shouldn\"t allow key redefinition", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("a", 1);
    bimap.push("b", 2);
    bimap.push("a", 2).should.equal(false);
    bimap.key("a").should.equal(1);
    return bimap.val(2).should.equal("b");
  });
  it("should throw on key redefinition is ::throwOnError is true", function() {
    var bimap;
    bimap = new BiMap;
    bimap.throwOnError = true;
    bimap.push("a", 1).should.be["true"];
    return should.Throw(bimap.push.bind(bimap, "a", 2), Error);
  });
  it("shouldn\"t allow value redefinition", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("a", 1);
    bimap.push("b", 2);
    bimap.push("b", 1).should.be["false"];
    bimap.key("b").should.equal(2);
    return bimap.val(1).should.equal("a");
  });
  it("should provide Array.push()-like interface for singular value insertion", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("c").should.equal(true);
    bimap.push("d").should.equal(true);
    bimap.push(5, "e").should.equal(true);
    bimap.push("f").should.equal(true);
    bimap.key(0).should.equal("c");
    bimap.val("c").should.equal(0);
    bimap.key(1).should.equal("d");
    bimap.val("d").should.equal(1);
    bimap.key(5).should.equal("e");
    bimap.val("e").should.equal(5);
    bimap.key(6).should.equal("f");
    return bimap.val("f").should.equal(6);
  });
  it("should provide Array.concat()-like interface for insertion of an array of values", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push(["a", "b", "c"]).should.deep.equal([true, true, true]);
    bimap.key(0).should.equal("a");
    bimap.val("a").should.equal(0);
    bimap.key(1).should.equal("b");
    bimap.val("b").should.equal(1);
    bimap.key(2).should.equal("c");
    return bimap.val("c").should.equal(2);
  });
  it("should provide an interface for insertion of an object", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push({
      0: "a",
      1: ["d", "e"],
      2: {
        a: 1,
        b: {
          c: 5
        }
      }
    });
    bimap.key("0").should.equal("a");
    bimap.val("a").should.equal("0");
    bimap.key("1").should.deep.equal(["d", "e"]);
    bimap.val("d").should.equal("1");
    bimap.val("e").should.equal("1");
    bimap.key("2.a").should.equal(1);
    bimap.val(1).should.equal("2.a");
    bimap.key("2.b.c").should.equal(5);
    bimap.val(5).should.equal("2.b.c");
    bimap.push("f").should.equal(true);
    bimap.key(2).should.equal("f");
    return bimap.val("f").should.equal(2);
  });
  it("should not overwrite mapping to undefined", function() {
    var bimap;
    bimap = new BiMap;
    bimap.setNull(0, void 0).should.be["true"];
    bimap.push(0, "a").should.be["false"];
    bimap.vk.should.deep.equal({
      undefined: 0
    });
    bimap.kv.should.deep.equal({
      0: void 0
    });
    return bimap.kindex.should.equal(1);
  });
  return it("should not overwrite mapping to null", function() {
    var bimap;
    bimap = new BiMap;
    bimap.setNull(0, null).should.be["true"];
    bimap.push(0, "a").should.be["false"];
    bimap.vk.should.deep.equal({
      "null": 0
    });
    bimap.kv.should.deep.equal({
      0: null
    });
    return bimap.kindex.should.equal(1);
  });
});

describe("#removeKey()", function() {
  it("should remove a key-value mapping and its value-key counterpart", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("a", "b");
    bimap.removeKey("a").should.be["true"];
    should.not.exist(bimap.key("a"));
    return should.not.exist(bimap.val("b"));
  });
  return it("should remove all values mapped to the removed key", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("a", ["b", "c", "d"]);
    bimap.removeKey("a").should.be["true"];
    should.not.exist(bimap.key("a"));
    should.not.exist(bimap.val("b"));
    should.not.exist(bimap.val("c"));
    should.not.exist(bimap.val("d"));
    it("should remove mappings constructed with key-object", function() {});
    bimap = new BiMap;
    bimap.push("a", {
      b: 1,
      c: 2
    });
    bimap.removeKey("a.b").should.be["true"];
    should.not.exist(bimap.key("a.b"));
    return should.not.exist(bimap.val(1));
  });
});

describe("#removeVal()", function() {
  it("should remove a value-key mapping and its key-value counterpart", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push("a", "b");
    bimap.removeVal("b").should.be["true"];
    should.not.exist(bimap.val("a"));
    return should.not.exist(bimap.key("b"));
  });
  return it("should remove all keys mapped to the removed value", function() {
    var bimap;
    bimap = new BiMap;
    bimap.push(["b", "c", "d"], "a");
    bimap.removeVal("a").should.be["true"];
    should.not.exist(bimap.val("a"));
    should.not.exist(bimap.key("b"));
    should.not.exist(bimap.key("c"));
    should.not.exist(bimap.key("d"));
    it("should remove mappings constructed with key-object", function() {});
    bimap = new BiMap;
    bimap.push("a", {
      b: 1,
      c: 2
    });
    bimap.removeVal(1).should.be["true"];
    should.not.exist(bimap.key("a.b"));
    should.not.exist(bimap.val(1));
    it("should remove mappings constructed with array-array", function() {});
    bimap = new BiMap;
    bimap.push([1, 2, 3], [4, 5, 6]);
    bimap.removeVal(4).should.be["true"];
    should.not.exist(bimap.key("a.b"));
    return should.not.exist(bimap.val(1));
  });
});

describe("#setNull", function() {
  it("should handle mapping a key to undefined", function() {
    var bimap;
    bimap = new BiMap;
    bimap.setNull(0, void 0).should.be["true"];
    expect(bimap.key(0)).to.be.an("undefined");
    return bimap.val(void 0).should.equal(0);
  });
  it("should handle mapping undefined to a value", function() {
    var bimap;
    bimap = new BiMap;
    bimap.setNull(void 0, 0).should.be["true"];
    expect(bimap.val(0)).to.be.an("undefined");
    return bimap.key(void 0).should.equal(0);
  });
  it("should handle mapping a key to null", function() {
    var bimap;
    bimap = new BiMap;
    bimap.setNull(0, null).should.be["true"];
    expect(bimap.key(0)).to.be.an("null");
    return bimap.val(null).should.equal(0);
  });
  return it("should handle mapping null to a value", function() {
    var bimap;
    bimap = new BiMap;
    bimap.setNull(null, 0).should.be["true"];
    expect(bimap.val(0)).to.be.a("null");
    return bimap.key(null).should.equal(0);
  });
});

describe('BiMap', function() {
  it('should provide bidirectional mapping', function() {
    var bimap;
    bimap = new BiMap;
    bimap.push('a', 1);
    bimap.push('b', 2);
    bimap.key('a').should.equal(1);
    return bimap.val(1).should.equal('a');
  });
  return it('should support object initialization', function() {
    var bimap;
    bimap = new BiMap({
      a: 1,
      b: 2,
      c: [3, 4]
    });
    bimap.key('a').should.equal(1);
    bimap.val(1).should.equal('a');
    bimap.key('b').should.equal(2);
    bimap.val(2).should.equal('b');
    bimap.key('c').should.deep.equal([3, 4]);
    bimap.val(3).should.equal('c');
    return bimap.val(4).should.equal('c');
  });
});

describe('BiMap.type()', function() {
  var bimap;
  bimap = new BiMap;
  it('should recognize an array', function() {
    return bimap.type([]).should.equal('array');
  });
  it('should recognize an object', function() {
    return bimap.type({}).should.equal('object');
  });
  it('should recognize a function', function() {
    return bimap.type(function() {}).should.equal('function');
  });
  it('should recognize a boolean', function() {
    bimap.type(true).should.equal('boolean');
    return bimap.type(false).should.equal('boolean');
  });
  it('should recognize a string', function() {
    return bimap.type("").should.equal('string');
  });
  it('should recognize a number', function() {
    return bimap.type(3).should.equal('number');
  });
  it('should recognize NaN', function() {
    return bimap.type(NaN).should.equal('NaN');
  });
  it('should recognize undefined', function() {
    return bimap.type(void 0).should.equal('undefined');
  });
  return it('should recognize null', function() {
    return bimap.type(null).should.equal('null');
  });
});
