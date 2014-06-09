
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