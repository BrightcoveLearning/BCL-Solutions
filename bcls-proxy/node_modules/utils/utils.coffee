fs = require 'fs'
crypto = require 'crypto'

utils =
  processObject: (ob, handle) ->
    keys = Object.keys(ob)
    if keys.length
      process.nextTick run = () ->
        k = keys.shift()
        handle ob[k], k
        process.nextTick run if keys.length
  isObject: (ob) ->
    typeof ob is 'object' and not Array.isArray(ob) and ob isnt null
  isNumber: (n) ->
    not isNaN(parseFloat(n)) and isFinite n
  # elements in object
  elInOb: (ob, e) ->
    c = 0
    for el of ob when el is e
      c++
    c
  # number of elements
  noe: (ob) ->
    Object.keys(ob).length
  firstEl: (ob) ->
    for k of ob
      return ob[k]
  clone: (ob) ->
    copy = {}
    for k of ob
      if @isObject ob[k]
        copy[k] = @clone ob[k]
      else
        copy[k] = ob[k]
    copy
  randomString: (len) ->
    chars = '0123456789
              ABCDEFGHIJKLMNOPQRSTUVWXTZ
              abcdefghiklmnopqrstuvwxyz'

    generated = ''
    while len--
      rand = Math.floor(Math.random() * chars.length)
      generated += chars[rand]
    generated
  # string equals '', ' ', '  ', ...
  empty: (str) ->
    str.replace(' ', '') is ''
  exportAllFrom: (dir, skipIndex = true) ->
    files = fs.readdirSync(dir)
    delete files[files.indexOf 'index'] if skipIndex
    modules = {}
    for file in files
      name = file.split('.')[0]
      modules[name] = require dir + '/' + name
    modules
  md5: (str) ->
    md5sum = crypto.createHash 'md5'
    md5sum.update str
    md5sum.digest 'hex'
  hash: (str, salt, i = 10) ->
    salt ?= @md5 str
    hash = @md5 salt + str
    while i--
      hash = @md5 hash
    hash

module.exports = utils