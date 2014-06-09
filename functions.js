module.exports = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
  '!': not,
  'and': and,
  '=': equal,
  '>': greaterThan,
  '<': lessThan,
  'print': print
}

function add(x, y){
  var sum = x
  for (var i = 1; i < arguments.length; i++){
    sum += arguments[i]
  }
  return sum
}
function subtract(x, y){ return x - y }
function multiply(x, y){ return x * y }
function divide(x, y){ return x / y }
function not(bool){ return !bool }
function and(a, b){ return a && b }
function equal(a, b){ return a === b }
function greaterThan(x, y){ return x > y }
function lessThan(x, y){ return x < y }
function print(){
  console.log.apply(console, arguments)
}