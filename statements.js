module.exports = {
  let: let,
  lambda: lambda,
  'set!': set,
  if: ifStatement
}

var eval = require('./eval')
var assert = require('assert')

function let(varname, expr){
  assert(varname.type === 'token')
  var result = eval(expr, this)
  this.put(varname.value, result)
}

function set(varname, expr){
  assert(varname.type === 'token')
  var result = eval(expr, this)
  this.update(varname.value, result)
}

function lambda(vars){
  var scope = this
  var bodies = Array.prototype.slice.call(arguments, 1)
  return function(){
    var newScope = scope.new()
    for (var i = 0; i < arguments.length; i++){
      var vardef = vars[i]
      newScope.put(vardef.value, arguments[i])
    }
    var result
    for (var i = 0; i < bodies.length; i++){
      var body = bodies[i]
      result = eval(body, newScope)
    }
    return result
  }
}

function ifStatement(cond, yes, no){
  if (eval(cond, this)){
    return eval(yes, this)
  }else{
    return eval(no, this)
  }
}