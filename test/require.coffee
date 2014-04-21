if require?
  BiMap = require "../lib/bimap.js"
  should = require("chai").should()
  expect = require("chai").expect
else
  require = ->
  should = chai.should()
  expect = chai.expect