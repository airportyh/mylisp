var ScopeChain = require('./scope_chain')
var assert = require('assert')

test('one level', function(){
  var s = ScopeChain()
  assert.equal(s.get('name'), null)
  s.put('name', 'Bob')
  assert.equal(s.get('name'), 'Bob')
})

test('two level', function(){
  var s = ScopeChain()
  s.put('name', 'Bob')
  var ss = s.new()
  ss.put('age', 14)
  assert(ss.has('name') === true)
  assert(ss.has('age') === true)
  assert.equal(ss.get('name'), 'Bob')
  assert.equal(ss.get('age'), 14)
  
  assert(s.has('name') === true)
  assert(s.has('age') === false)
  assert.equal(s.get('age'), null)
  assert.equal(s.get('name'), 'Bob')
})

test('update should update the parent if hit in parent', function(){
  var s = ScopeChain()
  s.put('name', 'Bob')
  var ss = s.new()
  ss.update('name', 'Dan')
  assert.equal(s.get('name'), 'Dan')
})