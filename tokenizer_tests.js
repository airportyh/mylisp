var tokenizer = require('./tokenizer')
var assert = require('assert')

test('parans', function(){
  var t = tokenizer('()')
  assert.equal(t.next().value, '(')
  assert.equal(t.next().value, ')')
})

test('ignore whitespaces', function(){
  var t = tokenizer(' (\t\n) ')
  assert.equal(t.next().value, '(')
  assert.equal(t.next().value, ')')
})

test('takes tokens', function(){
  var t = tokenizer('(add)')
  assert.equal(t.next().value, '(')
  assert.equal(t.next().value, 'add')
  assert.equal(t.next().value, ')')
})

test('takes tokens 2', function(){
  var t = tokenizer('(add ())')
  assert.equal(t.next().value, '(')
  assert.equal(t.next().value, 'add')
  assert.equal(t.next().value, '(')
})

test('takes tokens 3', function(){
  var t = tokenizer('add that thing')
  assert.equal(t.next().value, 'add')
  assert.equal(t.next().value, 'that')
  assert.equal(t.next().value, 'thing')
})

test('takes numbers', function(){
  var t = tokenizer('1 2')
  assert.equal(t.next().value, 1)
  assert.equal(t.next().value, 2)
})

test('takes booleans', function(){
  var t = tokenizer('true false')
  assert.deepEqual(t.next(), {type: 'boolean', value: true})
  assert.deepEqual(t.next(), {type: 'boolean', value: false})
})

test('takes strings', function(){
  var t = tokenizer('"abc"')
  assert.deepEqual(t.next(), {type: 'string', value: 'abc'})
})