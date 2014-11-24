var fs = require('fs')
var eval = require('./eval')
var tokenizer = require('./tokenizer')
var parser = require('./parser')
var ScopeChain = require('./scope_chain')
var indent = require('indent')

var filename = process.argv[2]

var code = '(' + fs.readFileSync(filename) + ')'
var ast = parser(tokenizer(code)).parse()
var scope = ScopeChain()
var codeLines = code.split('\n')

ast.forEach(function(node, i){
  var lineRange = getLineRange(node)
  console.log('scope:')
  console.log(indent(scope + ''))
  var currentCode = codeLines.slice(lineRange.min, lineRange.max + 1).join('\n')
  console.log('line ' + lineRange.min + '-' + lineRange.max + ': ')
  console.log(indent(currentCode))
  eval(node, scope)
})

function getLineRange(node){
  if (Array.isArray(node)){
    var min
    var max
    node.forEach(function(node){
      var r = getLineRange(node)
      if (min == null || r.min < min){
        min = r.min
      }
      if (max == null || r.max > max){
        max = r.max
      }
    })
    return {min: min, max: max}
  }else{
    return {min: node.lineNo, max: node.lineNo}
  }
}