Iconv = require('iconv').Iconv
Util = require 'util'
BufferTools = require 'buffertools'
Amf = require 'amflib/node-amf/amf.js'
Http = require 'http'
Q = require 'q'
Domain = require 'domain'
BCError = require './bc_error'
Results = require './results'
StandardErrors = require './standard_errors'

AMF_CONTENT_TYPE = 'application/x-amf'
ORIGIN_ENCODING = 'ISO-8859-1'
NODE_ENCODING = 'UTF-8'

module.exports =
class OriginProxy
  constructor: (@config) ->
    # set up encoding converter so node can speak with origin
    @iconv = new Iconv(ORIGIN_ENCODING, NODE_ENCODING)
    @httpAgent = new Http.Agent()
    @httpAgent.maxSockets = @config.originConnection.maxSockets

  call: (method, args, options={}) ->

    deferred = new Q.defer()

    argStr = Util.inspect args, {depth:1, colors:true}
    console.log "calling Facade: #{method}(#{argStr})"
    token = options.token
    packet = Amf.packet()
    requestUri = "#{method}"
    responseUri = '/1'
    packet.addMessage args, requestUri, responseUri

    headers = {
      'host': @config.originHost,
      'content-type': AMF_CONTENT_TYPE,
      'cookie': "#{@config.bcTokenCookieName}=#{token}",
      'accept': AMF_CONTENT_TYPE
    }

    # copy any 'x-' headers passed in from options (such as X-Forwarded-For)
    if options.headers?
      for hname, hval of options.headers when hname.indexOf('x-') is 0
        #don't overwrite existing values
        unless headers[hname]?
          headers[hname] = hval

    routeAccountId = options.accountId||''
    req = Http.request
      host: @config.originHost
      port: @config.originAmfPort
      method: 'POST'
      path: "#{@config.originAmfGatewayPath}?x-bc-route=#{routeAccountId}" # x-bc-route is used by netscaler to shard reqs and improve near cache
      headers: headers,
      agent: @httpAgent
    req.setTimeout @config.originConnection.timeout, () ->
      console.log "Got a timeout for request.  Aborting request.  #{Util.inspect req}"
      req.abort()

    req.end packet.serialize(), 'binary'

    req.on 'response', (res) =>
      console.log "Origin response code #{res.statusCode}" if res.statusCode!=200

      body = new Buffer(0)
      res.on 'data', (chunk) =>
        try
          body = BufferTools.concat(body, chunk)
        catch e
          deferred.reject StandardErrors.unknownOriginError e
      res.on 'close', () =>
          deferred.reject StandardErrors.unknownOriginError "Connection closed.  Problem receiving response data."
      res.on 'end', =>
        if res.statusCode != 200
          deferred.reject StandardErrors.unknownOriginError "Problem fetching from origin.  Origin response code: #{res.statusCode}, body: #{res.body}"
        else
          try
            packet = Amf.packet(@iconv.convert(body).toString())
            if !packet.messages? or packet.messages.length == 0
              return deferred.reject StandardErrors.unknownOriginError packet

            value = packet.messages[0].value

            switch
              when value?.rootCause
                # origin returned an error
                deferred.reject @convertError value.rootCause
              when value?.hasOwnProperty('faultString') || value?.hasOwnProperty('faultDetail') || value?.hasOwnProperty('rootCause')
                # origin returned an error - seen with Blaze issue - especially if Chilmark sends bad data
                console.log "FIXME:Abrod found error #{Util.inspect value}"
                deferred.reject @convertError value
              else
                # THIS IS THE NORMAL/POSITIVE FLOW
                headers = {}
                # pass-back the 'x-' headers, but nothing else since content-type, etc is not correct for
                # chilmark api clients
                for hname, hval of res.headers when hname.indexOf('x-') is 0
                  headers[hname] = hval

                deferred.resolve new Results value, headers
          catch e
            console.log "Caught error: #{Util.inspect e}"
            deferred.reject StandardErrors.unknownOriginError e

    deferred.promise

  # basic error handling for standard origin error responses
  convertError: (error) ->
    if !error.errorCode
      if error.message
        if error.message.indexOf('Token is already expired') > -1
          return StandardErrors.expiredToken error
        for authError in ['InvalidPermissionsException', 'AuthenticationException']
          if error.message.indexOf(authError) > -1
            return StandardErrors.unauthorized error
      StandardErrors.unknownOriginError error
    else
      switch error.errorCode
        when 'TOKEN_EXPIRED'
          StandardErrors.unauthorized error
        when 'INVALID_PERMISSIONS'
          StandardErrors.unauthorized error
        else
          StandardErrors.unknownOriginError error
