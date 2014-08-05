
var AMF_CONTENT_TYPE, Amf, BCError, BufferTools, Domain, Http, Iconv, NODE_ENCODING, ORIGIN_ENCODING, OriginProxy, Q, Results, StandardErrors, Util;
Iconv = require('iconv').Iconv;
Util = require('util');
BufferTools = require('buffertools');
Amf = require('amflib/node-amf/amf.js');
Http = require('http');
Q = require('q');
Domain = require('domain');
BCError = require('./bc_error');
Results = require('./results');
StandardErrors = require('./standard_errors');
AMF_CONTENT_TYPE = 'application/x-amf';
ORIGIN_ENCODING = 'ISO-8859-1';
NODE_ENCODING = 'UTF-8';
module.exports = OriginProxy = (function() {
  function OriginProxy(config) {
    this.config = config;
    this.iconv = new Iconv(ORIGIN_ENCODING, NODE_ENCODING);
    this.httpAgent = new Http.Agent();
    this.httpAgent.maxSockets = this.config.originConnection.maxSockets;
  }
  OriginProxy.prototype.call = function(method, args, options) {
    var argStr, deferred, headers, hname, hval, packet, req, requestUri, responseUri, routeAccountId, token, _ref;
    if (options == null) {
      options = {};
    }
    deferred = new Q.defer();
    argStr = Util.inspect(args, {
      depth: 1,
      colors: true
    });
    console.log("calling Facade: " + method + "(" + argStr + ")");
    token = options.token;
    packet = Amf.packet();
    requestUri = "" + method;
    responseUri = '/1';
    packet.addMessage(args, requestUri, responseUri);
    headers = {
      'host': this.config.originHost,
      'content-type': AMF_CONTENT_TYPE,
      'cookie': "" + this.config.bcTokenCookieName + "=" + token,
      'accept': AMF_CONTENT_TYPE
    };
    if (options.headers != null) {
      _ref = options.headers;
      for (hname in _ref) {
        hval = _ref[hname];
        if (hname.indexOf('x-') === 0) {
          if (headers[hname] == null) {
            headers[hname] = hval;
          }
        }
      }
    }
    routeAccountId = options.accountId || '';
    req = Http.request({
      host: this.config.originHost,
      port: this.config.originAmfPort,
      method: 'POST',
      path: "" + this.config.originAmfGatewayPath + "?x-bc-route=" + routeAccountId,
      headers: headers,
      agent: this.httpAgent
    });
    req.setTimeout(this.config.originConnection.timeout, function() {
      console.log("Got a timeout for request.  Aborting request.  " + (Util.inspect(req)));
      return req.abort();
    });
    req.end(packet.serialize(), 'binary');
    req.on('response', (function(_this) {
      return function(res) {
        var body;
        if (res.statusCode !== 200) {
          console.log("Origin response code " + res.statusCode);
        }
        body = new Buffer(0);
        res.on('data', function(chunk) {
          var e;
          try {
            return body = BufferTools.concat(body, chunk);
          } catch (_error) {
            e = _error;
            return deferred.reject(StandardErrors.unknownOriginError(e));
          }
        });
        res.on('close', function() {
          return deferred.reject(StandardErrors.unknownOriginError("Connection closed.  Problem receiving response data."));
        });
        return res.on('end', function() {
          var e, value, _ref1;
          if (res.statusCode !== 200) {
            return deferred.reject(StandardErrors.unknownOriginError("Problem fetching from origin.  Origin response code: " + res.statusCode + ", body: " + res.body));
          } else {
            try {
              packet = Amf.packet(_this.iconv.convert(body).toString());
              if ((packet.messages == null) || packet.messages.length === 0) {
                return deferred.reject(StandardErrors.unknownOriginError(packet));
              }
              value = packet.messages[0].value;
              switch (false) {
                case !(value != null ? value.rootCause : void 0):
                  return deferred.reject(_this.convertError(value.rootCause));
                case !((value != null ? value.hasOwnProperty('faultString') : void 0) || (value != null ? value.hasOwnProperty('faultDetail') : void 0) || (value != null ? value.hasOwnProperty('rootCause') : void 0)):
                  console.log("FIXME:Abrod found error " + (Util.inspect(value)));
                  return deferred.reject(_this.convertError(value));
                default:
                  headers = {};
                  _ref1 = res.headers;
                  for (hname in _ref1) {
                    hval = _ref1[hname];
                    if (hname.indexOf('x-') === 0) {
                      headers[hname] = hval;
                    }
                  }
                  return deferred.resolve(new Results(value, headers));
              }
            } catch (_error) {
              e = _error;
              console.log("Caught error: " + (Util.inspect(e)));
              return deferred.reject(StandardErrors.unknownOriginError(e));
            }
          }
        });
      };
    })(this));
    return deferred.promise;
  };
  OriginProxy.prototype.convertError = function(error) {
    var authError, _i, _len, _ref;
    if (!error.errorCode) {
      if (error.message) {
        if (error.message.indexOf('Token is already expired') > -1) {
          return StandardErrors.expiredToken(error);
        }
        _ref = ['InvalidPermissionsException', 'AuthenticationException'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          authError = _ref[_i];
          if (error.message.indexOf(authError) > -1) {
            return StandardErrors.unauthorized(error);
          }
        }
      }
      return StandardErrors.unknownOriginError(error);
    } else {
      switch (error.errorCode) {
        case 'TOKEN_EXPIRED':
          return StandardErrors.unauthorized(error);
        case 'INVALID_PERMISSIONS':
          return StandardErrors.unauthorized(error);
        default:
          return StandardErrors.unknownOriginError(error);
      }
    }
  };
  return OriginProxy;
})();
No results found for 'frameset'Finding with Options: Case Insensitive
frameset

no results
Find PrevFind Next
.*Aa"
fieldset

Replace PrevReplace Next
Replace All
Send Feedback
/Users/rcrooks/git/BCL-Solutions/tests/origin_proxy.coffee
