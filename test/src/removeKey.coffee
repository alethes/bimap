describe "#removeKey()", ->
  it "should remove a key-value mapping and its value-key counterpart", ->
    bimap = new BiMap
    bimap.push "a", "b"
    bimap.removeKey("a").should.be.true
    should.not.exist bimap.key "a"
    should.not.exist bimap.val "b"
  it "should remove all values mapped to the removed key", ->
    bimap = new BiMap
    bimap.push "a", ["b", "c", "d"]
    bimap.removeKey("a").should.be.true
    should.not.exist bimap.key "a"
    should.not.exist bimap.val "b"
    should.not.exist bimap.val "c"
    should.not.exist bimap.val "d"
    it "should remove mappings constructed with key-object", ->
    bimap = new BiMap
    bimap.push "a", b: 1, c: 2
    bimap.removeKey("a.b").should.be.true
    should.not.exist bimap.key "a.b"
    should.not.exist bimap.val 1