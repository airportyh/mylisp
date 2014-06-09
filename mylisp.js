var fs = require('fs')
var eval = require('./eval')
var tokenizer = require('./tokenizer')
var parser = require('./parser')
var ScopeChain = require('./scope_chain')

var filename = process.argv[2]

var code = '(' + fs.readFileSync(filename) + ')'
var ast = parser(tokenizer(code)).parse()
var scope = ScopeChain()

ast.forEach(function(node, i){
  eval(node, scope)
})
