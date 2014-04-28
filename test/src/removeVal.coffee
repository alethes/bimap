describe "#removeVal()", ->
  it "should remove a value-key mapping and its key-value counterpart", ->
    bimap = new BiMap
    bimap.push "a", "b"
    bimap.removeVal("b").should.be.true
    should.not.exist bimap.val "a"
    should.not.exist bimap.key "b"
  it "should remove all keys mapped to the removed value", ->
    bimap = new BiMap
    bimap.push ["b", "c", "d"], "a"
    bimap.removeVal("a").should.be.true
    should.not.exist bimap.val "a"
    should.not.exist bimap.key "b"
    should.not.exist bimap.key "c"
    should.not.exist bimap.key "d"
    it "should remove mappings constructed with key-object", ->
    bimap = new BiMap
    bimap.push "a", b: 1, c: 2
    bimap.removeVal(1).should.be.true
    should.not.exist bimap.key "a.b"
    should.not.exist bimap.val 1
    it "should remove mappings constructed with array-array", ->
    bimap = new BiMap
    bimap.push [1, 2, 3], [4, 5, 6]
    bimap.removeVal(4).should.be.true
    should.not.exist bimap.key "a.b"
    should.not.exist bimap.val 1