describe 'BiMap', ->
  #return true
  it 'should provide bidirectional mapping', ->
    bimap = new BiMap
    bimap.push 'a', 1
    bimap.push 'b', 2
    bimap.key('a').should.equal 1
    bimap.val(1).should.equal 'a'
  it 'should support object initialization', ->
    bimap = new BiMap
      a: 1
      b: 2
      c: [3, 4]
    bimap.key('a').should.equal 1
    bimap.val(1).should.equal 'a'
    bimap.key('b').should.equal 2
    bimap.val(2).should.equal 'b'
    bimap.key('c').should.deep.equal [3, 4]
    bimap.val(3).should.equal 'c'
    bimap.val(4).should.equal 'c'