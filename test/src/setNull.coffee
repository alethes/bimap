describe "#setNull", ->
  it "should handle mapping a key to undefined", ->
    bimap = new BiMap
    bimap.setNull(0, undefined).should.be.true
    expect(bimap.key 0).to.be.an "undefined"
    bimap.val(undefined).should.equal 0
  it "should handle mapping undefined to a value", ->
    bimap = new BiMap
    bimap.setNull(undefined, 0).should.be.true
    expect(bimap.val 0).to.be.an "undefined"
    bimap.key(undefined).should.equal 0
  it "should handle mapping a key to null", ->
    bimap = new BiMap
    bimap.setNull(0, null).should.be.true
    expect(bimap.key 0).to.be.an "null"
    bimap.val(null).should.equal 0
  it "should handle mapping null to a value", ->
    bimap = new BiMap
    bimap.setNull(null, 0).should.be.true
    expect(bimap.val 0).to.be.a "null"
    bimap.key(null).should.equal 0
