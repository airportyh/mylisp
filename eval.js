
module.exports = eval

var assert = require('assert')
var ScopeChain = require('./scope_chain')
var Statements = require('./statements')
var Functions = require('./functions')

function eval(ast, scope){
  assert(ast, 'ast is required')
  assert(scope instanceof ScopeChain, 'scope is required')

  if (Array.isArray(ast)){
    if (ast[0].type === 'token'){
      var name = ast[0].value
      if (Statements[name]){
        var statement = Statements[name]
        return statement.apply(scope, ast.slice(1))
      }else if (Functions[name]){
        var fn = Functions[name]
        var params = []
        for (var i = 1; i < ast.length; i++){
          params.push(eval(ast[i], scope))
        }
        return fn.apply(scope, params)
      }else if (scope.get(name)){
        var fn = scope.get(name)
        var params = []
        for (var i = 1; i < ast.length; i++){
          params.push(eval(ast[i], scope))
        }
        return fn.apply(scope, params)
      }else{
        throw new Error('Unknown function: ' + name)
      }
    }else{
      var fn = eval(ast[0], scope)
      var params = []
      for (var i = 1; i < ast.length; i++){
        params.push(eval(ast[i], scope))
      }
      return fn.apply(scope, params)
    }
  }else if (ast.type === 'token'){
    if (scope.has(ast.value)){
      return scope.get(ast.value)
    }else{
      throw new Error('Variable ' + ast.value + ' not in scope')
    }
  }else{
    assert('value' in ast)
    return ast.value
  }
}
