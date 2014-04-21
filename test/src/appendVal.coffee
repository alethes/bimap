describe "BiMap.appendVal()", ->
  it "should append new values to existing keys", ->
    bimap = new BiMap
    bimap.push("a", "b")
    bimap.appendVal("a", "c").should.equal true
    bimap.key("a").should.deep.equal ["b", "c"]
    bimap.val("b").should.equal "a"
    bimap.val("c").should.equal "a"
  it "should create a new key <-> [value] mapping if the key doesn't already exist", ->
    bimap = new BiMap
    bimap.appendVal("a", "b").should.equal true
    bimap.key("a").should.deep.equal ["b"]
    bimap.val("b").should.equal "a"
  it "should append the new key to the existing value -> key mapping", ->
    bimap = new BiMap
    bimap.push("c", "b")
    bimap.appendVal("a", "b").should.equal true
    bimap.key("a").should.deep.equal ["b"]
    bimap.val("b").should.deep.equal ["c", "a"]
  it "should handle appending multiple values at once", ->
    bimap = new BiMap
    bimap.appendVal("a", ["b", "c"]).should.equal true
    bimap.key("a").should.deep.equal ["b", "c"]
    bimap.val("b").should.equal "a"
    bimap.val("c").should.equal "a"