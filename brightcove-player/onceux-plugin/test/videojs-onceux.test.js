/*! videojs-onceux - v0.0.0 - 2014-6-18
 * Copyright (c) 2014 Brightcove
 * Licensed under the Apache-2.0 license. */
(function(window, videojs, qunit) {
  'use strict';

  // define the skip test functionality
  // http://stackoverflow.com/questions/13748129/skipping-a-test-in-qunit
  qunit.testSkip = function() {
   qunit.test(arguments[0] + ' (SKIPPED)', function() {
     qunit.expect(0);//dont expect any tests
     var li = document.getElementById(qunit.config.current.id);
     qunit.done(function() {
         li.style.background = '#FFFF99';
     });
   });
  };

  var
    originalIsHtmlSupported,
    originalFlashSupported,
    originalHlsSupported,
    originalXDR,
    player,
    currentTime,
    sandbox,

    options = {
      metadataUri : 'http://onceux.unicornmedia.com/now/ads/vmap/od/auto/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/9b118b95-38df-4b99-bb50-8f53d62f6ef8??umtp=0',
      timeout: 45000,
      contentHeaders: true
    },
    // local QUnit aliases
    // http://api.qunitjs.com/

    // module(name, {[setup][ ,teardown]})
    module = qunit.module,
    // test(name, callback)
    test = qunit.test,
    testSkip = qunit.testSkip,
    // ok(value, [message])
    ok = qunit.ok,
    // equal(actual, expected, [message])
    equal = qunit.equal,
    // strictEqual(actual, expected, [message])
    strictEqual = qunit.strictEqual,
    // deepEqual(actual, expected, [message])
    deepEqual = qunit.deepEqual,
    // notEqual(actual, expected, [message])
    notEqual = qunit.notEqual,
    // throws(block, [expected], [message])
    throws = qunit.throws,
    extend = function() {
      for (var i=1; i<arguments.length; i++) {
        for (var key in arguments[i]) {
          if(arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
      return arguments[0];
    };



  module('videojs-onceux', {
    setup: function() {
      sandbox = sinon.sandbox.create();
      sandbox.useFakeServer();
      sandbox.useFakeTimers();
      // force HTML support so the tests run in a reasonable
      // environment under phantomjs
      originalIsHtmlSupported = videojs.Html5.isSupported;
      videojs.Html5.isSupported = function() {
        return true;
      };
      // mock out Flash features for phantomjs
      originalFlashSupported = videojs.Flash.isSupported;
      videojs.Flash.isSupported = function() {
        return true;
      };
      // mock out Flash features for phantomjs
      videojs.Hls.isSupported = function() {
        return true;
      };

      originalXDR = window.XDomainRequest;
      // create a video element
      var video = document.createElement('video');
      document.querySelector('#qunit-fixture').appendChild(video);

      // create a video.js player
      player = videojs(video);
      currentTime = 0;
      player.currentTime = function(ctime) {
        if (ctime) {
          currentTime = ctime;
        }
        return currentTime;
      };
      player.buffered = function() {
        return videojs.createTimeRange(0, 2);
      };
      player.duration = function() {
        return 60;
      };

      //mock out the ads plugin
      player.ads = function() {};
      player.ads.startLinearAdMode =  function() {
        player.trigger('adstart');
      };
      player.ads.endLinearAdMode = function() {
        player.trigger('adend');
      };

      player.overlay = function() {
        var
          onceuxCountdown = document.createElement('div'),
          onceuxSkipad = document.createElement('div');

        onceuxCountdown.className = 'vjs-overlay-onceux-countdown';
        player.el().appendChild(onceuxCountdown);

        onceuxSkipad.className = 'vjs-overlay-onceux-skipad';
        player.el().appendChild(onceuxSkipad);
      };

      player.seekEvents = function() {};
      player.seekEvents.all = function(){return [];};

      // initialize the plugin with the default options
      player.onceux(options);
    },
    teardown: function() {
      videojs.Html5.isSupported = originalIsHtmlSupported;
      videojs.Flash.isSupported = originalFlashSupported;
      window.XDomainRequest = originalXDR;
      sandbox.restore();
    }
  });

  test('registers itself', function() {
    ok(player.onceux, 'registered the plugin');
  });

  test('make xhr request to respond with error and check if player error gets triggered', function() {
    var numberofErrors = 0;

    player.on('error', function(){
      numberofErrors++;
    });

    sandbox.server.respondWith(options.metadataUri, [500, { 'Content-Type': 'text/xml' }, 'Internal Server Error']);
    sandbox.server.respond();
    equal(numberofErrors, 1);
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'Request for OnceUX vmap failed', 'XHR request should have triggered an error.');
  });

  test('make xdr request to respond with error and check if player error gets triggered', function() {
    var numberofErrors = 0;

    window.XDomainRequest = function() {
      return {
        open: function(method, url) {},
        send: function() {
          this.onerror();
        },
        abort: function() {},
        responseText: ''
      };
    };

    player.on('error', function(){
      numberofErrors++;
    });

    player.onceux(options);
    equal(numberofErrors, 1);
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'Request for OnceUX vmap failed', 'XHR request should have triggered an error.');
  });

  test('make xhr request to respond with success and verify player current source ', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contenturi="'+ contentURL + '" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters />'  +
         '</vmap:Extensions>' +
      '</vmap:VMAP>';

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    equal(player.currentSrc(), contentURL, 'The currentSrc of the player did not match the expected URI.');
  });

  test('make xdr request to respond with success and verify player current source ', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contenturi="'+ contentURL + '" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters />'  +
         '</vmap:Extensions>' +
      '</vmap:VMAP>';

    window.XDomainRequest = function() {
      return {
        open: function(method, url) {},
        send: function() {
          this.onload();
        },
        abort: function() {},
        responseText: vmapXML
      };
    };
    player.onceux(options);
    equal(player.currentSrc(), contentURL, 'The currentSrc of the player did not match the expected URI.');
  });

  test('make xhr request to respond with success and empty xml', function() {
    var numberofErrors = 0;

    player.on('error', function(){
      numberofErrors++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, '']);
    sandbox.server.respond();

    equal(numberofErrors, 1);
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'Request for OnceUX vmap failed', 'XHR request should have triggered an error.');
  });

  test('make xdr request to respond with success and empty xml', function() {
    var numberofErrors = 0;

    window.XDomainRequest = function() {
      return {
        open: function(method, url) {},
        send: function() {
          this.onload();
        },
        abort: function() {},
        responseText: ''
      };
    };

    player.on('error', function(){
      numberofErrors++;
    });

    player.onceux(options);

    equal(numberofErrors, 1);
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'Request for OnceUX vmap failed', 'XHR request should have triggered an error.');
  });

  test('error thrown when empty vmap element received in xhr response', function() {
    var
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
      '</vmap:VMAP>',
      numberofErrors = 0;

    player.on('error', function(){
      numberofErrors++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'OnceUX VMAP parser error: Empty VMAP object', 'error in VMAP parsing: empty VMAP object');
  });

  test('error thrown when empty vmap element received in xdr response', function() {
    var
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
      '</vmap:VMAP>',
      numberofErrors = 0;

    window.XDomainRequest = function() {
      return {
        open: function(method, url) {},
        send: function() {
          this.onload();
        },
        abort: function() {},
        responseText: vmapXML
      };
    };

    player.on('error', function(){
      numberofErrors++;
    });

    player.onceux(options);

    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'OnceUX VMAP parser error: Empty VMAP object', 'error in VMAP parsing: empty VMAP object');
  });

  test('error thrown when contenturi not found in xhr response', function() {
    var
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters /> ' +
         '</vmap:Extensions>' +
      '</vmap:VMAP>',
      numberofErrors = 0;

    player.on('error', function(){
      numberofErrors++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'OnceUX VMAP parser error: VMAP Extensions ContentURI not found', 'error in VMAP parsing: content-uri not found');
  });

  test('error thrown when contenturi not found in xdr response', function() {
    var
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters /> ' +
         '</vmap:Extensions>' +
      '</vmap:VMAP>',
      numberofErrors = 0;

    window.XDomainRequest = function() {
      return {
        open: function(method, url) {},
        send: function() {
          this.onload();
        },
        abort: function() {},
        responseText: vmapXML
      };
    };

    player.on('error', function(){
      numberofErrors++;
    });

    player.onceux(options);

    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(player.error().code, 0, 'error code is 0');
    strictEqual(player.error().message, 'OnceUX VMAP parser error: VMAP Extensions ContentURI not found', 'error in VMAP parsing: content-uri not found');
  });

  test('make xhr request to timeout and validate there is an error', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contenturi="'+ contentURL + '" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters />'  +
         '</vmap:Extensions>' +
      '</vmap:VMAP>';

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.clock.tick(options.timeout-1);
    strictEqual(player.error(), null, 'No error should be emitted until timeout is reached.');
    sandbox.clock.tick(1);
    strictEqual(player.error().code, 0, 'An error code of 0 should be emitted after timeout is reached.');
    strictEqual(player.error().message, 'Request for OnceUX vmap failed', 'Error message was not as expected.');
    equal(player.currentSrc(), '', 'The currentSrc of the player did not match the expected URI.');
  });

  test('make xdr request to timeout and validate there is an error', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contenturi="'+ contentURL + '" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters />'  +
         '</vmap:Extensions>' +
      '</vmap:VMAP>';

    window.XDomainRequest = function() {
      return {
        open: function(method, url) {},
        send: function() {},
        abort: function() {},
        responseText: vmapXML
      };
    };

    player.onceux(options);

    sandbox.clock.tick(options.timeout-1);
    strictEqual(player.error(), null, 'No error should be emitted until timeout is reached.');
    sandbox.clock.tick(1);
    strictEqual(player.error().code, 0, 'An error code of 0 should be emitted after timeout is reached.');
    strictEqual(player.error().message, 'Request for OnceUX vmap failed', 'Error message was not as expected.');
    equal(player.currentSrc(), '', 'The currentSrc of the player did not match the expected URI.');
  });

  test('set invalid vmap object (no content uri) to plugin and validate there is an error ', function() {
    var
      extendedOptions = extend({}, options),
      numberofErrors = 0;

    extendedOptions.vmap = invalidVMAPJson;
    player.on('error', function(){
      numberofErrors++;
    });
    player.onceux(extendedOptions);
    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(player.error().code, 0, 'An error code of 0 should be emitted when there is an invalid vmap xml.');
    strictEqual(player.error().message, 'OnceUX VMAP parser error: VMAP Extensions ContentURI not found', 'Error message for invalid vmap object.');
  });

  test('invalid vmap xml in xhr response', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contenturi="'+ contentURL + '" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters />'  +
         '</vmap:Extensions>',
      numberofErrors = 0;

    player.on('error', function(){
      numberofErrors++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();
    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(player.error().code, 0, 'An error code of 0 should be emitted when there is an invalid vmap xml.');
  });

  test('invalid vmap xml in xdr response', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      vmapXML = {},
      numberofErrors = 0;

    player.on('error', function(){
      numberofErrors++;
    });

    window.XDomainRequest = function() {
      return {
        open: function(method, url) {},
        send: function() {
          this.onload();
        },
        abort: function() {},
        responseText: vmapXML
      };
    };

    player.onceux(options);

    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(player.error().code, 0, 'An error code of 0 should be emitted when there is an invalid vmap xml.');
  });

  test('set valid vmap object to plugin and verify player current source ', function() {
    var
      contentURL = 'http://api212-phx.unicornmedia.com/now/stitched/mp4/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/3a41c6e4-93a3-4108-8995-64ffca7b9106/9b118b95-38df-4b99-bb50-8f53d62f6ef8/content.mp4?oasid=5708ae58-ef88-4954-b5bb-0d1815d65132&umtp=0',
      extendedOptions = extend({}, options);

    extendedOptions.vmap = validVMAPJson;
    player.onceux(extendedOptions);
    equal(player.currentSrc(), contentURL, 'The currentSrc of the player did not match the expected URI.');
    equal(player.onceux.timeline.adRolls.length, 3);
    equal(player.onceux.timeline.adRolls[0].linearAds.length, 1);
    equal(player.onceux.timeline.adRolls[1].linearAds.length, 1);
    equal(player.onceux.timeline.adRolls[2].linearAds.length, 1);
  });

  test('contentupdate triggers adsready', function() {
    var adsreadyFired = false;
    player.on('adsready', function() {
      adsreadyFired = true;
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    player.trigger('contentupdate');
    ok(adsreadyFired, 'adsready should fire when contentupdate does.');
  });

  test('should enter linear ad mode if readyforpreroll fires and there is an adBreak at 0', function() {
    var adStartFired = false;
    player.on('adstart', function() {
      adStartFired = true;
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    ok(adStartFired, 'adstart should fire when there is a preroll and readyforpreroll fires.');
  });

  test('should not enter linear ad mode if readyforpreroll fires and there is not an adBreak at 0', function() {
    var adStartFired = false;
    player.on('adstart', function() {
      adStartFired = true;
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    player.onceux.timeline.pathAtAbsoluteTime = function(){return {};};
    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    ok(!adStartFired, 'adstart should not fire when there is no preroll and readyforpreroll fires.');
  });

  test('should exit linear ad mode if timeupdate/ended fires and there was a postroll', function() {
    var
      adendFired = false,
      adendCount = 0;

    player.on('adend', function() {
      adendFired = true;
      adendCount++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.ads.state = 'ad-playback';

    //this timeupdate marks the end of post roll ad
    player.currentTime = function() {
      return 196.067;
    };

    //triggering of the timeupdate should put the player's ad state to 'content-playback'
    player.trigger('timeupdate');

    ok(adendFired, 'adended should fire when there is a postroll and ended fires.');
    equal(adendCount, 1, 'adend should fire once for the post roll ad');

    adendFired = false;
    adendCount = 0;

    player.ads.state = 'content-playback';

    //trigger 'ended' at this time should not fire the adend event.
    player.trigger('ended');

    ok(!adendFired, 'adended should not have fired.');
    equal(adendCount, 0, 'adend should not have fired');
  });

  test('should not exit linear ad mode if ended fires and there was not a postroll', function() {
    var adendFired = false;
    player.on('adend', function() {
      adendFired = true;
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    player.onceux.timeline.adRolls = [{timeOffset: 'start'},{timeOffset: 60}];
    player.trigger('ended');
    ok(!adendFired, 'adend should not fire when ended fires and there is no post-roll.');
  });

  test('timeupdate event when there is a state change from content to ads triggers adstart', function() {
    var adStartFired = false;
    player.on('adstart', function() {
      adStartFired = true;
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    //there is a pre-roll at time 1 by default
    player.currentTime = function() {
      return 1;
    };
    player.ads.state = 'content-playback';
    player.trigger('timeupdate');
    ok(adStartFired, 'adstart should fire when timeupdate fires and there is an ad');
  });

  test('timeupdate event when there is a state change from ads to content triggers adend', function() {
    var adendFired = false;
    player.on('adend', function() {
      adendFired = true;
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //this timeupdate should start an ad
    player.currentTime = function() {
      return 1;
    };
    player.trigger('timeupdate');

    //this timeupdate should end the ad
    player.currentTime = function() {
      return 31;
    };
    player.ads.state = 'ad-playback';
    player.trigger('timeupdate');
    ok(adendFired, 'adend should fire when timeupdate fires and there is no longer an ad');
  });

  test('ads should not be stopped or started if the adstate has not changed', function() {
    var
      adStartFired = false,
      adEndFired = false;

    player.on('adstart', function() {
      adStartFired = true;
    });
    player.on('adend', function() {
      adEndFired = true;
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //timeupdate twice in the content
    player.currentTime = function() {
      return 31;
    };
    player.trigger('timeupdate');
    player.currentTime = function() {
      return 32;
    };
    player.trigger('timeupdate');

    ok(!adStartFired, 'adstart should not fire when the playback mode does not change between timeupdates.');
    ok(!adEndFired, 'adend should not fire when the playback mode not change between timeupdates.');

    //timeupdate twice during the midroll ad content
    player.currentTime = function() {
      return 61;
    };
    player.trigger('timeupdate');
    //need to reset adStart since it should have fired here
    //because the playback mode changed.
    adStartFired = false;
    player.currentTime = function() {
      return 62;
    };
    player.trigger('timeupdate');

    ok(!adStartFired, 'adstart should not fire when the playback mode does not change between timeupdates.');
    ok(!adEndFired, 'adend should not fire when the playback mode not change between timeupdates.');
  });

  test('should seek to seekEnd if seeking backwards', function() {
    //1st adRoll in validVMAP begins at 0 and ends at 30.066
    //player current time is set to 1s in the test setup.
    //we seek from current time (1s) to 32s (past the ad)
    player.currentTime(30);
    player.seekEvents.last = function() {
      return {
        'seekStart': 30,
        'seekEnd': 1,
        'seekInterval': -29
      };
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    strictEqual(player.currentTime(), 30, 'seek start time is not 30');

    player.trigger('seek');
    player.on('timeupdate', function(){
      strictEqual(player.currentTime(), 1, 'player currentTime after seek is not 1');
    });
  });

  test('should not leave ad if seeked during ad', function() {
    //1st adRoll in validVMAP begins at 0 and ends at 30.066
    //player current time is set to 1s in the test setup.
    //we seek from current time (1s) to 32s (past the ad)
    player.currentTime(1);
    player.seekEvents.last = function() {
      return {
          'seekStart': 1,
          'seekEnd': 32,
          'seekInterval': 31
        };
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    strictEqual(player.currentTime(), 1, 'seek start time is not 1');

    player.trigger('seek');
    strictEqual(player.currentTime(), 1, 'player currentTime after seek is not 1');
  });

  test('should play from start of adRoll if seek into adRoll', function() {
    //2nd adRoll (midRoll) in validVMAP begins at 60.066 and ends at 90.12
    //set the currentTime to 32s, we are in the content.
    player.currentTime(32);
    //seek into the midRoll
    player.seekEvents.last = function() {
      return {
        'seekStart': 32,
        'seekEnd': 65,
        'seekInterval': 33
      };
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.trigger('seek');
    strictEqual(player.currentTime(), 60.1, 'player currentTime after seek is not correct');
    strictEqual(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd.index, 0, 'linearAdRoll index is not 0');
    ok(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd);
  });

  test('should directly seek to seekEnd if seeking within the content', function() {
    //1st adRoll in validVMAP begins at 0 and ends at 30.066
    //player current time is set to 1s in the test setup.
    //we seek from current time (31s) to 35s (within content)
    player.currentTime(35);
    player.seekEvents.last = function() {
      return {
        'seekStart': 31,
        'seekEnd': 35,
        'seekInterval': 4
      };
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    player.trigger('seek');
    strictEqual(player.currentTime(), 35, 'player currentTime after seek is not 35');
  });

  test('should not add a seek listener until the player is stable', function() {
    //1st adRoll in validVMAP begins at 0 and ends at 30.066
    //player current time is set to 1s in the test setup.
    //we seek from within content (31s to 35s)
    var
      seekListenerAdded = 0,
      origPlayerOne = player.one;

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.seekEvents.last = function() {
      return {
        'seekStart': 31,
        'seekEnd': 35,
        'seekInterval': 4
      };
    };
    player.currentTime(35);

    //This seek should be honored
    player.trigger('seek');
    strictEqual(player.currentTime(), 35, 'player currentTime after seek is not 35');

    //This seek should be ignored when seek triggers before the stable event
    //And then honored when a second seek fires after the stable event.
    //we seek from within content (35s) into an Ad (65s)
    player.seekEvents.last = function() {
      return {
        'seekStart': 35,
        'seekEnd': 65,
        'seekInterval': 30
      };
    };

    //Ignored
    player.trigger('seek');
    strictEqual(player.currentTime(), 35, 'player currentTime should remain 35 until stable event fires.');

    //Not Ignored, currentTime should be set to beginning of second adRoll
    player.trigger('stable');
    player.trigger('seek');
    strictEqual(player.currentTime(), 60.1, 'player currentTime should update to 39 after stable event fires.');
  });

  test('content headers correct when only hls supported', function() {
    videojs.Hls.isSupported = function() {
      return true;
    };
    videojs.Html5.isSupported = function() {
      return false;
    };
    videojs.Flash.isSupported = function() {
      return false;
    };
    videojs.Hls.supportsNativeHls = false;

    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //The 0 request is from the initial invoke in the setup. Ignore that, and look and the second
    //request which we trigged by calling player.onceux(options); above.
    deepEqual(sandbox.server.requests[1].requestHeaders, {'BCOV-Once-Accept': 'application/vnd.apple.mpegurl'}, 'The request header was incorrect.');
  });

    test('content headers correct when html or flash and hls is supported', function() {
    videojs.Hls.isSupported = function() {
      return true;
    };
    videojs.Html5.isSupported = function() {
      return true;
    };
    videojs.Flash.isSupported = function() {
      return false;
    };
    videojs.Hls.supportsNativeHls = false;

    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //The 0 request is from the initial invoke in the setup. Ignore that, and look and the second
    //request which we trigged by calling player.onceux(options); above.
    deepEqual(sandbox.server.requests[1].requestHeaders, {'BCOV-Once-Accept': 'application/vnd.apple.mpegurl,video/mp4'}, 'The request header was incorrect.');

    videojs.Hls.isSupported = function() {
      return true;
    };
    videojs.Html5.isSupported = function() {
      return false;
    };
    videojs.Flash.isSupported = function() {
      return true;
    };
    videojs.Hls.supportsNativeHls = false;

    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    deepEqual(sandbox.server.requests[2].requestHeaders, {'BCOV-Once-Accept': 'application/vnd.apple.mpegurl,video/mp4'}, 'The request header was incorrect.');
  });

  test('content headers correct when nothing supported', function() {
    videojs.Hls.isSupported = function() {
      return false;
    };
    videojs.Html5.isSupported = function() {
      return false;
    };
    videojs.Flash.isSupported = function() {
      return false;
    };
    videojs.Hls.supportsNativeHls = false;

    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //The 0 request is from the initial invoke in the setup. Ignore that, and look and the second
    //request which we trigged by calling player.onceux(options); above.
    deepEqual(sandbox.server.requests[1].requestHeaders, {}, 'The request header was incorrect.');
  });

  test('content headers correct when only flash supported', function() {
    videojs.Hls.isSupported = function() {
      return false;
    };
    videojs.Html5.isSupported = function() {
      return false;
    };
    videojs.Flash.isSupported = function() {
      return true;
    };
    videojs.Hls.supportsNativeHls = false;

    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //The 0 request is from the initial invoke in the setup. Ignore that, and look and the second
    //request which we trigged by calling player.onceux(options); above.
    deepEqual(sandbox.server.requests[1].requestHeaders, {'BCOV-Once-Accept': 'video/mp4'}, 'The request header was incorrect.');
  });

  test('content headers correct when only html5 supported', function() {
    videojs.Hls.isSupported = function() {
      return false;
    };
    videojs.Html5.isSupported = function() {
      return true;
    };
    videojs.Flash.isSupported = function() {
      return false;
    };
    videojs.Hls.supportsNativeHls = false;

    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //The 0 request is from the initial invoke in the setup. Ignore that, and look and the second
    //request which we trigged by calling player.onceux(options); above.
    deepEqual(sandbox.server.requests[1].requestHeaders, {'BCOV-Once-Accept': 'video/mp4'}, 'The request header was incorrect.');
  });

  test('content headers correct when native hls is supported', function() {
    videojs.Hls.isSupported = function() {
      return false;
    };
    videojs.Html5.isSupported = function() {
      return false;
    };
    videojs.Flash.isSupported = function() {
      return false;
    };
    videojs.Hls.supportsNativeHls = true;

    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    //The 0 request is from the initial invoke in the setup. Ignore that, and look and the second
    //request which we trigged by calling player.onceux(options); above.
    deepEqual(sandbox.server.requests[1].requestHeaders, {'BCOV-Once-Accept': 'application/vnd.apple.mpegurl'}, 'The request header was incorrect.');
  });

  test('should play from start of adRoll if seek over adRoll', function() {
    //2nd adRoll (midRoll) in validVMAP begins at 60.066 and ends at 90.12
    //set the currentTime to 32s, we are in the content.
    var skippedAd = false;
    player.on('onceux-linearad-skipped', function() {
      skippedAd = true;
    });

    //seek over the midRoll
    player.currentTime(32);
    player.seekEvents.last = function() {
      return {
        'seekStart': 32,
        'seekEnd': 91,
        'seekInterval': 59
      };
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.trigger('seek');
    strictEqual(player.currentTime(), 60.1, 'player currentTime after seek is not correct');
    strictEqual(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd.index, 0, 'linearAdRoll index is not 0');
    ok(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd);
    ok(!skippedAd, 'No ads should have been skipped.');
  });

  test('should skip first midRoll and play from start of second if seeking over two midRolls', function() {
    //Pre-Roll
    //absoluteBeginTime: 0
    //absoluteEndTime: 124.1333332

    //First Midroll
    //absoluteBeginTime: 184.13333319999998
    //absoluteEndTime: 246.13333319999998

    //Second Midroll:
    //absoluteBeginTime: 306.0993332
    //absoluteEndTime: 338.0993332

    //Post-Roll
    //absoluteBeginTime: 341.26633319999996
    //absoluteEndTime: 523.3996663999999

    var
      skippedAdCount = 0,
      skippedLinearAds = [],
      skippedAdRolls = {};

    player.on('onceux-linearad-skipped', function(event) {
      skippedLinearAds[skippedAdCount] = event.linearAd;
      skippedAdCount++;
      skippedAdRolls[event.adRoll.index] = skippedAdCount;
    });

    //put the player in the first content segment after the preroll.
    player.currentTime(135);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validAdRollVMAP]);
    sandbox.server.respond();

    //mimic a seek past both midrolls
    player.seekEvents.last = function() {
      return {
        'seekStart': 135,
        'seekEnd': 340,
        'seekInterval': 205
      };
    };
    player.trigger('seek');

    strictEqual(player.currentTime(), 306.1, 'player currentTime after seek is not correct');
    strictEqual(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).adRoll.index, 2, 'adRoll index is not 2');
    ok(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd);
    strictEqual(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd.index, 0, 'linearAdRoll index is not 0');
    ok(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd);
    ok(skippedAdRolls[1] === 2, 'The first and second linear ads in the first midroll should have been skipped');
    ok(skippedLinearAds[0].index === 0, 'The linearAd index of the first linearAd skipped should be 0');
    ok(skippedLinearAds[1].index === 1, 'The linearAd index of the second linearAd skipped should be 1');
  });

  test('seekAds skips a midroll.', function() {
    //2nd adRoll (midRoll) in validVMAP begins at 60.066 and ends at 90.12
    //set the currentTime to 32s, we are in the content.
    var
      skippedAd = false,
      linearAd,
      adRoll;
    player.on('onceux-linearad-skipped', function(event) {
      skippedAd = true;
      linearAd = event.linearAd;
      adRoll = event.adRoll;
    });
    player.currentTime(32);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.seekAds(91);
    strictEqual(player.currentTime(), 91, 'player currentTime after seek is not correct');
    ok(!player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd, 'There should be no linearad after the seek.');
    ok(skippedAd, 'One ad should have been skipped.');
    ok(linearAd.index === 0, 'The ad that was skipped should have the index 0');
    ok(adRoll.index, 1, 'The adRoll that was skipped should have the index 1');
  });

  test('seekAds while playing the second ad in a two ad midroll', function() {
    //Pre-Roll
    //absoluteBeginTime: 0
    //absoluteEndTime: 124.1333332

    //First Midroll
    //absoluteBeginTime: 184.13333319999998
    //absoluteEndTime: 246.13333319999998
    //linearAd 0:
    //absoluteBeginTime: 184.13333319999998
    //absoluteEndTime: 216.13333319999998
    //linearAd 1:
    //absoluteBeginTime: 216.13333319999998
    //absoluteEndTime: 246.13333319999998

    //Second Midroll:
    //absoluteBeginTime: 306.0993332
    //absoluteEndTime: 338.0993332

    //Post-Roll
    //absoluteBeginTime: 341.26633319999996
    //absoluteEndTime: 523.3996663999999
    var
      skippedAdCount = 0,
      linearAd,
      adRoll;

    player.on('onceux-linearad-skipped', function(event) {
      skippedAdCount++;
      linearAd = event.linearAd;
      adRoll = event.adRoll;
    });
    //set the current time/start time for the seek to be at the beginning of the second linear
    //ad in the first midroll.
    player.currentTime(217);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validAdRollVMAP]);
    sandbox.server.respond();

    player.onceux.seekAds(250);
    //mimic a seek past both midrolls
    player.seekEvents.last = function() {
      return {
        'seekStart': 217,
        'seekEnd': 250,
        'seekInterval': 33
      };
    };
    player.trigger('seek');
    player.trigger('stable');
    strictEqual(player.currentTime(), 250, 'player currentTime after seek is not correct');
    ok(!player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd, 'There should be no linearad after the seek.');
    ok(linearAd.index === 1, 'The ad that was skipped should have the index 1');
    ok(adRoll.index, 1, 'The adRoll that was skipped should have the index 1');
    ok(skippedAdCount === 1, 'Only one ad should have been skipped.');
  });

  test('should re-add seek listener after seekAds', function() {
    //Pre-Roll
    //absoluteBeginTime: 0
    //absoluteEndTime: 124.1333332

    //First Midroll
    //absoluteBeginTime: 184.13333319999998
    //absoluteEndTime: 246.13333319999998
    //linearAd 0:
    //absoluteBeginTime: 184.13333319999998
    //absoluteEndTime: 216.13333319999998
    //linearAd 1:
    //absoluteBeginTime: 216.13333319999998
    //absoluteEndTime: 246.13333319999998

    //Second Midroll:
    //absoluteBeginTime: 306.0993332
    //absoluteEndTime: 338.0993332

    //Post-Roll
    //absoluteBeginTime: 341.26633319999996
    //absoluteEndTime: 523.3996663999999
    var
      linearAd,
      adRoll;

    //set the current time/start time for the seek to be at the beginning of the second linear
    //ad in the first midroll.
    player.currentTime(0);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validAdRollVMAP]);
    sandbox.server.respond();

    player.onceux.seekAds(125);
    //mimic a seek past the preroll
    player.seekEvents.last = function() {
      return {
        'seekStart': 0,
        'seekEnd': 125,
        'seekInterval': 125
      };
    };
    player.trigger('seek');
    player.trigger('stable');
    strictEqual(player.currentTime(), 125, 'player currentTime after seek is not correct');

    //mimic a seek past the midroll
    player.seekEvents.last = function() {
      return {
        'seekStart': 126,
        'seekEnd': 186,
        'seekInterval': 60
      };
    };
    player.trigger('seek');

    linearAd = player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd;
    adRoll =  player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).adRoll;
    strictEqual(player.currentTime(), 184.1, 'player currentTime after seek is not correct');
  });

  test('onceux-timeline-ready triggers', function() {
    player.on('onceux-timeline-ready', function() {
      ok(true);
    });
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validNoAdsVMAP]);
    sandbox.server.respond();
  });

  test('objectAtPath returns false when an object does not exist', function() {
    var testObj = {
      foo: {
        bar: [
          'hi'
        ],
        barbar: [
          'hello',
          'goodbye'
        ]
      }
    };
    ok(!player.onceux.objectAtPath(testObj,'bar'));
    ok(!player.onceux.objectAtPath(testObj,'foo.foo'));
    ok(!player.onceux.objectAtPath(testObj,'foo.bar.1'));
    ok(!player.onceux.objectAtPath(testObj,'foo.barbar.foo'));
    ok(!player.onceux.objectAtPath(testObj,'foo.barbar.2'));
  });

  test('pathExists returns true when an object does exist', function() {
    var testObj = {
      foo: {
        bar: [
          'hi'
        ],
        barbar: [
          'hello',
          'goodbye'
        ]
      }
    };
    ok(player.onceux.objectAtPath(testObj));
    ok(player.onceux.objectAtPath(testObj,'foo'));
    ok(player.onceux.objectAtPath(testObj,'foo.bar'));
    ok(player.onceux.objectAtPath(testObj,'foo.bar.0'));
    ok(player.onceux.objectAtPath(testObj,'foo.barbar.0'));
    ok(player.onceux.objectAtPath(testObj,'foo.barbar.1'));
  });

  test('test toSeconds', function() {
    //Positive
    strictEqual(player.onceux.toSeconds('00:00:30.0666666+00:00'), 30.0666666);
    strictEqual(player.onceux.toSeconds('00:00:30.000'), 30.000);
    strictEqual(player.onceux.toSeconds('00:01:00'), 60);
    strictEqual(player.onceux.toSeconds('01:00:00'), 3600);

    //Negative
    strictEqual(player.onceux.toSeconds('00:30.000'), 0);
    strictEqual(player.onceux.toSeconds('00:30:00:00'), 0);
    strictEqual(player.onceux.toSeconds(null), 0);
  });
})(window, window.videojs, window.QUnit);