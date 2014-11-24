
module.exports = ScopeChain

var assert = require('assert')
var hasOwnProperty = Object.prototype.hasOwnProperty

function ScopeChain(parent){
  if (!(this instanceof ScopeChain)) return new ScopeChain(parent)
  this.parent = parent
  this.hash = Object.create(parent ? parent.hash : null)
}

ScopeChain.prototype.get = function(key){
  return this.hash[key]
}

ScopeChain.prototype.has = function(key){
  return key in this.hash
}

ScopeChain.prototype.put = function(key, value){
  this.hash[key] = value
}

ScopeChain.prototype.new = function(){
  return ScopeChain(this)
}

ScopeChain.prototype.update = function(key, value){
  if (hasOwnProperty.call(this.hash, key)){
    this.put(key, value)
  }else{
    this.parent.put(key, value)
  }
}

ScopeChain.prototype.toString = function(){
  var hashes = [this.hash]
  var cur = this
  while (cur.parent){
    cur = cur.parent
    hashes.push(cur.hash)
  }
  return hashes.map(function(hash){
    return stringify(hash)
  }).join(' -> ')
}

function stringify(obj){
  var parts = []
  for (var key in obj){
    if (typeof obj[key] === 'function'){
      parts.push(key + ': <lambda>')
    }else{
      parts.push(key + ': ' + obj[key])
    }
  }
  return parts.length === 0 ? '<empty>' : parts.join('\n')
}