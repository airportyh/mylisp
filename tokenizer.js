module.exports = Tokenizer

var assert = require('assert')

function Tokenizer(str){
  if (!(this instanceof Tokenizer)) return new Tokenizer(str)
  this.str = str
  this.idx = 0
  this.lineNo = 0
}

Tokenizer.prototype.next = function(){
  var state = 'open'
  var token = ''
  var numberStr = ''
  var string = ''
  var self = this

  while (this.str.length > this.idx){
    var chr = this.str.charAt(this.idx)
    if (chr === '('){
      if (state === 'open'){
        this.idx++
        return {type: 'open_paran', value: '('}
      }else if (state === 'collect_token'){
        return endToken()
      }else if (state === 'collect_number'){
        return endNumber()
      }
    }else if (chr === ')'){
      if (state === 'open'){
        this.idx++
        return {
          lineNo: self.lineNo,
          type: 'close_paran', 
          value: ')'
        }
      }else if (state === 'collect_token'){
        return endToken()
      }else if (state === 'collect_number'){
        return endNumber()
      }else{
        throw new Error('Illegal state')
      }
    }else if (chr.match(/[0-9]/)){
      this.idx++
      if (state === 'open'){
        state = 'collect_number'
        numberStr += chr
      }else if (state === 'collect_number'){
        numberStr += chr
      }else if (state === 'collect_string'){
        string += chr
      }else{
        throw new Error('Illegal state')
      }
    }else if (chr.match(/\s/)){
      if (chr === '\n'){
        self.lineNo++
      }
      if (state === 'open'){
        this.idx++
      }else if (state === 'collect_token'){
        this.idx++
        return endToken()
      }else if (state === 'collect_number'){
        this.idx++
        return endNumber()
      }else if (state === 'collect_string'){
        this.idx++
        string += chr
      }else{
        throw new Error('Illegal state')
      }
    }else if (chr.match(/[a-zA-Z-_\+\/\*\!\=\>\<\,]/)){
      this.idx++
      if (state === 'open'){
        state = 'collect_token'
        token += chr
      }else if (state === 'collect_string'){
        string += chr
      }else if (state === 'collect_token'){
        token += chr
      }else{
        throw new Error('Illegal state')
      }
    }else if (chr === '"'){
      this.idx++
      if (state === 'open'){
        state = 'collect_string'
      }else if (state === 'collect_string'){
        state = 'open'
        var value = string
        string = ''
        return {
          lineNo: self.lineNo,
          type: 'string',
          value: value
        }
      }
    }else{
      throw new Error('Invalid character: ' + chr)
    }
  }

  if (state === 'collect_token'){
    return endToken()
  }else if (state === 'collect_number'){
    return endNumber()
  }

  function endToken(){
    state = 'open'
    if (token === 'true'){
      return {
        lineNo: self.lineNo,
        type: 'boolean',
        value: true
      }
    }
    if (token === 'false'){
      return {
        lineNo: self.lineNo,
        type: 'boolean',
        value: false
      }
    }
    var value = token
    token = ''
    return {
      lineNo: self.lineNo,
      type: 'token',
      value: value
    }
  }

  function endNumber(){
    state = 'open'
    assert(!isNaN(numberStr))
    var ret = {
      type: 'number',
      value: Number(numberStr)
    }
    numberStr = ''
    return ret
  }
}