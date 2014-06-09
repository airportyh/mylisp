var parser = require('./parser')
var tokenizer = require('./tokenizer')
var assert = require('assert')


test('nested', function(){
  var ast = parse('(multiply (+ 1 2) 8)')
  assert.deepEqual(ast, 
    [
      {type: 'token', value: 'multiply'}, 
      [
        {type: 'token', value: '+'}, 
        {type: 'number', value: 1}, 
        {type: 'number', value: 2}
      ], 
      {type: 'number', value: 8}
    ])
})

test('one value', function(){
  assert.deepEqual(parse('1'), {type: 'number', value: 1})
  assert.deepEqual(parse('true'), {type: 'boolean', value: true})
})

test('too many tokens', function(){
  try{
    parse('1 2')
    throw new Error('Parse should throw')
  }catch(e){
    assert(e.message.match(/Unexpected token/))
  }
})

test('too many tokens 2', function(){
  try{
    parse('(abc))')
    throw new Error('Parse should throw')
  }catch(e){
    assert(e.message.match(/Unexpected token/))
  }
})

function parse(str){
  var t = tokenizer(str)
  return parser(t).parse()
}