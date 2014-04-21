describe 'BiMap.type()', ->
  #return true
  bimap = new BiMap
  it 'should recognize an array', ->
    bimap.type([]).should.equal 'array'
  it 'should recognize an object', ->
    bimap.type({}).should.equal 'object'
  it 'should recognize a function', ->
    bimap.type(->).should.equal 'function'
  it 'should recognize a boolean', ->
    bimap.type(true).should.equal 'boolean'
    bimap.type(false).should.equal 'boolean'
  it 'should recognize a string', ->
    bimap.type("").should.equal 'string'
  it 'should recognize a number', ->
    bimap.type(3).should.equal 'number'
  it 'should recognize NaN', ->
    bimap.type(NaN).should.equal 'NaN'
  it 'should recognize undefined', ->
    bimap.type(undefined).should.equal 'undefined'
  it 'should recognize null', ->
    bimap.type(null).should.equal 'null'