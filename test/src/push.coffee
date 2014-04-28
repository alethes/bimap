describe "#push()", ->
  array = [1, 2, 3]
  array2 = [4, 5, 6]
  it "should handle mapping an array of keys to a value", ->
    bimap = new BiMap
    bimap.push(array, "a").should.be.true
    bimap.val("a").should.deep.equal array
    for item in array
      bimap.key(item).should.equal "a"
  it "should handle mapping an array of values to a key", ->
    bimap = new BiMap
    bimap.push("a", array).should.equal true
    bimap.key("a").should.deep.equal array
    for item in array
      bimap.val(item).should.equal "a"
  it "should handle mapping an array of keys to an array of values", ->
    bimap = new BiMap
    bimap.push array, array2
    for item in array2
      bimap.val(item).should.deep.equal array
    for item in array
      bimap.key(item).should.deep.equal array2
  it "should handle mapping a key to an object", ->
    bimap = new BiMap
    bimap.push("a",
      b: 1
      c:
        d:
          e: 2
    )#.should.deep.equal [true, true]
    bimap.key("a.b").should.equal 1
    bimap.val(1).should.equal "a.b"
    bimap.key("a.c.d.e").should.equal 2
    bimap.val(2).should.equal "a.c.d.e"
  it "shouldn\"t allow key redefinition", ->
    bimap = new BiMap
    bimap.push "a", 1
    bimap.push "b", 2
    bimap.push("a", 2).should.equal false
    bimap.key("a").should.equal 1
    bimap.val(2).should.equal "b"
  it "should throw on key redefinition is ::throwOnError is true", ->
    bimap = new BiMap
    bimap.throwOnError = true
    bimap.push("a", 1).should.be.true
    should.Throw(bimap.push.bind(bimap, "a", 2), Error)
  it "shouldn\"t allow value redefinition", ->
    bimap = new BiMap
    bimap.push "a", 1
    bimap.push "b", 2
    bimap.push("b", 1).should.be.false
    bimap.key("b").should.equal 2
    bimap.val(1).should.equal "a"
  it "should provide Array.push()-like interface for singular value insertion", ->
    bimap = new BiMap
    bimap.push("c").should.equal true
    bimap.push("d").should.equal true
    bimap.push(5, "e").should.equal true
    bimap.push("f").should.equal true
    bimap.key(0).should.equal "c"
    bimap.val("c").should.equal 0
    bimap.key(1).should.equal "d"
    bimap.val("d").should.equal 1
    bimap.key(5).should.equal "e"
    bimap.val("e").should.equal 5
    bimap.key(6).should.equal "f"
    bimap.val("f").should.equal 6
  it "should provide Array.concat()-like interface for insertion of an array of values", ->
    bimap = new BiMap
    bimap.push(["a", "b", "c"]).should.deep.equal [true, true, true]
    bimap.key(0).should.equal "a"
    bimap.val("a").should.equal 0
    bimap.key(1).should.equal "b"
    bimap.val("b").should.equal 1
    bimap.key(2).should.equal "c"
    bimap.val("c").should.equal 2
  it "should provide an interface for insertion of an object", ->
    bimap = new BiMap
    bimap.push
      0: "a"
      1: ["d", "e"]
      2:
        a: 1
        b:
          c: 5
    bimap.key("0").should.equal "a"
    bimap.val("a").should.equal "0"
    bimap.key("1").should.deep.equal ["d", "e"]
    bimap.val("d").should.equal "1"
    bimap.val("e").should.equal "1"
    bimap.key("2.a").should.equal 1
    bimap.val(1).should.equal "2.a"
    bimap.key("2.b.c").should.equal 5
    bimap.val(5).should.equal "2.b.c"
    bimap.push("f").should.equal true
    bimap.key(2).should.equal "f"
    bimap.val("f").should.equal 2
  it "should not overwrite mapping to undefined", ->
    bimap = new BiMap
    bimap.setNull(0, undefined).should.be.true
    bimap.push(0, "a").should.be.false
    bimap.vk.should.deep.equal {undefined: 0}
    bimap.kv.should.deep.equal {0: undefined}
    bimap.kindex.should.equal 1
  it "should not overwrite mapping to null", ->
    bimap = new BiMap
    bimap.setNull(0, null).should.be.true
    bimap.push(0, "a").should.be.false
    bimap.vk.should.deep.equal {null: 0}
    bimap.kv.should.deep.equal {0: null}
    bimap.kindex.should.equal 1