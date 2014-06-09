
module.exports = Parser

function Parser(tokenizer){
  if (!(this instanceof Parser)) return new Parser(tokenizer)
  this.tokenizer = tokenizer
}

Parser.prototype.parse = function(){
  var stack = []
  var idx = 0
  var token = null
  var ret = null
  while (token = this.tokenizer.next()){
    if (ret) throw new Error('Unexpected token ' + JSON.stringify(token))
    switch (token.type){
      case 'open_paran':
        var current = stack[idx]
        var newList = []
        if (Array.isArray(current)){
          current.push(newList)
        }
        stack.push(newList)
        idx = stack.length - 1
        break
      case 'close_paran':
        if (stack.length === 1){
          ret = stack.pop()
          idx = stack.length - 1
        }else{
          stack.pop()
          idx = stack.length - 1
        }
        break
      case 'token':
      case 'number':
      case 'boolean':
      case 'string':
        var current = stack[idx]
        if (current){
          current.push(token)
        }else{
          ret = token
        }
        break
      default:
        throw new Error('Unknown token ' + JSON.stringify(token))
    }
  }
  return ret
}