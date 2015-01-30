/*! videojs-onceux - v0.0.0 - 2014-6-18
 * Copyright (c) 2014 Brightcove
 * Licensed under the Apache-2.0 license. */
(function(window, videojs, qunit) {
  'use strict';

  var
    originalIsHtmlSupported,
    originalFlashSupported,
    originalError,
    originalXDR,
    player,
    setCurrentTime,
    currentTime,
    createElement,
    requests = [],
    sandbox,
    progress,
    seek,

    options = {
      metadataUri : 'http://onceux.unicornmedia.com/now/ads/vmap/od/auto/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/9b118b95-38df-4b99-bb50-8f53d62f6ef8??umtp=0',
      timeout: 45000
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
    },

    // modify createElement() so img src changes are captured in the
    // requests variable
    spyImg = function() {
      // save the original createElement
      createElement = document.createElement;
      // observe the img src attribute
      document.createElement = function(tag) {
        var elem;
        if (tag.toLowerCase() !== 'img') {
          return createElement.call(document, tag);
        }
        elem = createElement.call(document, 'div');
        Object.defineProperty(elem, 'src', {
          set: function(value){
            requests.push(value);
          }
        });
        return elem;
      };
    },

    // restore createElement() after calling spyImg()
    unspyImg = function() {
      document.createElement = createElement;
    };

  module('ad-tracking', {
    setup: function() {
      sandbox = sinon.sandbox.create();
      sandbox.useFakeServer();
      sandbox.useFakeTimers();
      spyImg();
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
      //mock out the vjs.log.error method to test for proper logging
      originalError = videojs.log.error;
      videojs.log.error = function() {
        return true;
      };

      originalXDR = window.XDomainRequest;

      // create a video element
      var video = document.createElement('video');
      document.querySelector('#qunit-fixture').appendChild(video);

      // create a video.js player
      player = videojs(video);
      player.currentTime = function() {
        return 0;
      };
      player.buffered = function() {
        return videojs.createTimeRange(0, 2);
      };
      player.duration = function() {
        return 60;
      };
      player.volume = function() {
        return 0.5;
      };

      currentTime = 0;
      player.currentTime = function(ctime) {
        if (ctime >= 0) {
          currentTime = ctime;
        }
        return currentTime;
      };

      player.ads = function() {};
      player.ads.state = 'content-playback';
      player.ads.startLinearAdMode =  function() {
        player.ads.state = 'ad-playback';
        player.trigger('adstart');
      };
      player.ads.endLinearAdMode = function() {
        player.ads.state ='content-playback';
        player.trigger('adend');
      };

      player.overlay = function() {};
      player.seekEvents = function() {};
      player.seekEvents.stable = true;
      player.seekEvents.all = function(){return [];};


      progress = function(toSecond) {
        var i = player.currentTime();
        while (i <= toSecond) {
          player.currentTime(i);
          player.trigger('timeupdate');
          i++;
        }
      };

      seek = function(from, to) {
        player.seekEvents.last = function() {
          return {
            'seekStart': from,
            'seekEnd': to,
            'seekInterval': to - from
          };
        };
        player.currentTime(to);
        player.trigger('timeupdate');
        player.trigger('seek');
        player.trigger('unstable');
        player.seekEvents.stable = false;
        player.currentTime(to + 0.25);
        player.trigger('timeupdate');
        player.currentTime(to + 0.50);
        player.trigger('timeupdate');
        player.currentTime(to + 0.75);
        player.trigger('timeupdate');
        player.trigger('stable');
        player.seekEvents.stable = true;
      };

      // initialize the plugin with the default options
      player.onceux(options);
    },
    teardown: function() {
      unspyImg();
      videojs.Html5.isSupported = originalIsHtmlSupported;
      videojs.Flash.isSupported = originalFlashSupported;
      videojs.log.error = originalError;
      window.XDomainRequest = originalXDR;
      sandbox.restore();
    }
  });

  test('test onceux ad quartile tracking events', function() {
    var
      vmapXML = validVMAP,
      adImpressionFired = 0,
      adStartQuartileFired = 0,
      adFirstQuartileFired = 0,
      adMidPointFired = 0,
      adThirdQuartileFired = 0,
      adCompleteFired = 0,
      adRollStartFired = 0,
      adRollCompleteFired = 0,
      companionAdCreativeFired = 0;

    player.on('onceux-adroll-start', function(event) {
      adRollStartFired++;
    });

    player.on('onceux-adroll-complete', function(event) {
      adRollCompleteFired++;
    });

    player.on('onceux-linearad-start', function(event) {
      adStartQuartileFired++;
    });

    player.on('onceux-linearad-impression', function(event) {
      adImpressionFired++;
    });

    player.on('onceux-linearad-firstQuartile', function(event) {
      adFirstQuartileFired++;
    });

    player.on('onceux-linearad-midpoint', function(event) {
      adMidPointFired++;
    });

    player.on('onceux-linearad-thirdQuartile', function(event) {
      adThirdQuartileFired++;
    });

    player.on('onceux-linearad-complete', function(event) {
      adCompleteFired++;
    });

    player.on('onceux-companionad-creativeView', function(event) {
      companionAdCreativeFired++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    for (var i = 0; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }

    //Explicitely call out the last timeupdate so that we don't blindly
    //tick past the end of the video.
    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');

    strictEqual(adImpressionFired, 3, 'onceux linear ad impression event should have fired.');
    strictEqual(adStartQuartileFired, 3, 'onceux linear ad start quartile event should have fired.');
    strictEqual(adFirstQuartileFired, 3, 'onceux linear ad first quartile event should have fired.');
    strictEqual(adMidPointFired, 3, 'onceux linear ad mid point event should have fired.');
    strictEqual(adThirdQuartileFired, 3, 'onceux linear ad third quartile event should have fired.');
    strictEqual(adCompleteFired, 3, 'onceux linear ad complete event should have fired.');
    strictEqual(adRollStartFired, 3, 'onceux ad roll start event should have fired.');
    strictEqual(adRollCompleteFired, 3, 'onceux ad roll complete event should have fired.');
    strictEqual(companionAdCreativeFired, 3, 'onceux companionAd creativeView event should have fired 3 times.');
    //5 tracking quartile urls, 1 impression url for each ad, and 1 companionAd tracking event.
    //There are 3 ads.
    strictEqual(requests.length, 21, 'server request array length should contain 21 urls');
  });

  test('test onceux companionAd tracking event', function() {
    var
      vmapXML = validVMAP,
      companionAdCreativeFired = 0;

    player.on('onceux-companionad-creativeView', function(event) {
      companionAdCreativeFired++;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();
    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    for (var i = 0; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }

    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');
    strictEqual(companionAdCreativeFired, 3, 'onceux companionAd creativeView event should have fired 3 times.');
  });

  test('test onceux adroll start events', function() {
    var
      vmapXML = validAdRollVMAP,
      adRollStartFired = 0;

    player.on('onceux-adroll-start', function(event) {
      adRollStartFired++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    for (var i = 0; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }
    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');
    strictEqual(adRollStartFired, 4, 'onceux ad roll start should fire for once for every adRoll encoutnered (4).');
  });

  test('test onceux adroll complete events', function() {
    var
      vmapXML = validAdRollVMAP,
      adRollCompleteFired = 0;

    player.on('onceux-adroll-complete', function(event) {
      adRollCompleteFired++;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    for (var i = 0; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }
    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');
    strictEqual(adRollCompleteFired, 4, 'onceux ad roll complete should fire for once for every adRoll encoutnered (4).');
  });

  test('test onceux-linearad-start and onceux-linearad-impression events', function() {
    var
      vmapXML = validAdRollVMAP,
      linearAdStartFired = 0,
      impressionAdFired = 0;

    player.on('onceux-linearad-start', function(event) {
      linearAdStartFired++;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    player.on('onceux-linearad-impression', function(event) {
      impressionAdFired++;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    for (var i = 0; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }
    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');
    strictEqual(linearAdStartFired, 9, 'onceux-linearad-start should fire nine times when playing through the entire duration.');
    strictEqual(impressionAdFired, 9, 'onceux-linearad-impression should fire 9 times when playing through the entire duration.');
  });

  test('test onceux-linearad-complete events', function() {
    var
      vmapXML = validAdRollVMAP,
      linearAdCompleteFired = 0;

    player.on('onceux-linearad-complete', function(event) {
      linearAdCompleteFired++;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    for (var i = 0; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }
    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');
    strictEqual(linearAdCompleteFired, 9, 'onceux-linearads-complete should fire nine times when playing through the entire duration.');
  });

  test('test onceux-ads-complete events', function() {
    var
      vmapXML = validAdRollVMAP,
      adsCompleteFired = 0;

    player.on('onceux-ads-complete', function(event) {
      adsCompleteFired++;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    for (var i = 0; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }
    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');
    strictEqual(adsCompleteFired, 1, 'onceux-ads-complete should fire once when playing through the entire duration.');
  });

  test('test onceux-ads-complete does not fire if an ad is skipped.', function() {
    var
      vmapXML = validAdRollVMAP,
      adsCompleteFired = 0;

    player.on('onceux-ads-complete', function(event) {
      adsCompleteFired++;
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    player.currentTime(0);
    player.trigger('timeupdate');

    //This will start playback after the preroll.
    for (var i = 125; i < player.onceux.timeline.absoluteDuration; i++) {
      player.currentTime(i);
      player.trigger('timeupdate');
    }
    player.currentTime(player.onceux.timeline.absoluteDuration);
    player.trigger('timeupdate');
    strictEqual(adsCompleteFired, 0, 'onceux-ads-complete should not fire if an ad is skipped.');
  });

  test('test onceux ad pause/play interaction events', function() {
    var
      vmapXML = validVMAP,
      adPauseFired = false,
      adResumeFired = false;

    player.on('onceux-linearad-pause', function(event) {
      adPauseFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    player.on('onceux-linearad-resume', function(event) {
      adResumeFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    player.currentTime(1);
    player.trigger('timeupdate');

    player.trigger('pause');
    ok(adPauseFired, 'onceux ad pause should have fired.');

    player.trigger('play');
    ok(adResumeFired, 'onceux ad resume should have fired.');

    adPauseFired = false;
    adResumeFired = false;
    // Trigger the adend. we are in the content. Set the player current time to 33s.
    player.currentTime(33);
    player.trigger('timeupdate');

    //triggering pause in the content will not fire the event.
    player.trigger('pause');
    ok(!adPauseFired, 'onceux ad pause should not have fired.');

    //triggering play in the content will not fire the event.
    player.trigger('play');
    ok(!adResumeFired, 'onceux ad resume should not have fired.');
  });

  test('test onceux ad tracking pause/play event when seeked into ad', function() {
    var
      vmapXML = validVMAP,
      adPauseFired = false,
      adResumeFired = false;

    player.on('onceux-linearad-pause', function(event) {
      adPauseFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    player.on('onceux-linearad-resume', function(event) {
      adResumeFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    player.currentTime(0);
    player.trigger('timeupdate');
    player.currentTime(32);
    player.trigger('timeupdate');
    //seek into the midRoll
    player.currentTime(65);
    player.trigger('timeupdate');
    //seeks will put the player in an 'unstable' state
    player.trigger('unstable');
    player.seekEvents.stable = false;
    player.seekEvents.last = function(){
      return {
        seekStart: 32,
        seekEnd: 65,
        seekInterval: 33
      };
    };

    //if pause/play are triggered while the player is unstable
    player.trigger('pause');
    player.trigger('play');
    //we should not trigger tracking events.
    ok(!adPauseFired, 'onceux ad pause should not have fired.');
    ok(!adResumeFired, 'onceux ad resume should not have fired.');

    //once the player is stable again, after the seek
    player.trigger('stable');
    player.seekEvents.stable = true;

    player.trigger('pause');
    player.trigger('play');
    //play/pause should trigger tracking events
    ok(adPauseFired, 'onceux ad pause should have fired.');
    ok(adResumeFired, 'onceux ad resume should have fired.');
  });

  test('test onceux ad mute/unmute interaction events', function() {
    var
      vmapXML = validVMAP,
      adMuteFired = false,
      adUnmuteFired = false;

    player.on('onceux-linearad-mute', function(event) {
      adMuteFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    player.on('onceux-linearad-unmute', function(event) {
      adUnmuteFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    player.currentTime(1);
    player.trigger('timeupdate');

    //changing the volume to 0 will fire ad mute
    player.volume = function() {
      return 0;
    };
    player.trigger('volumechange');

    ok(adMuteFired, 'onceux ad mute should have fired.');

    //changing the volume from 0 to 0.3 will fire ad unmute
    player.volume = function() {
      return 0.3;
    };
    player.trigger('volumechange');

    ok(adUnmuteFired, 'onceux ad unmute should have fired.');

    // changing the volume from 0.3 to 0.2 will not fire ad mute and ad unmute
    adMuteFired = false;
    adUnmuteFired = false;
    player.volume = function() {
      return 0.2;
    };
    player.trigger('volumechange');

    ok(!adMuteFired, 'onceux ad unmute should not have fired.');
    ok(!adUnmuteFired, 'onceux ad unmute should not have fired.');

    //set the player time in the content.
    player.currentTime(31);
    player.trigger('timeupdate');
    player.volume = function() {
      return 0;
    };
    player.trigger('volumechange');
    ok(!adMuteFired, 'onceux ad mute should not have fired.');
    player.volume = function() {
      return 1;
    };
    player.trigger('volumechange');
    ok(!adUnmuteFired, 'onceux ad unmute should not have fired.');
  });

  test('test onceux ad tracking pause/play event when seeked into ad', function() {
    var
      vmapXML = validVMAP,
      adPauseFired = false,
      adResumeFired = false;

    player.on('onceux-linearad-pause', function(event) {
      adPauseFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    player.on('onceux-linearad-resume', function(event) {
      adResumeFired = true;
      ok(event.linearAd.breakId, 'The event should contain a linearAd object.');
      ok(event.adRoll.absoluteEndTime, 'The event should contain an adRoll object.');
    });

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    player.currentTime(0);
    player.trigger('timeupdate');
    player.currentTime(32);
    player.trigger('timeupdate');
    //seek into the midRoll
    player.currentTime(65);
    player.trigger('timeupdate');
    //seeks will put the player in an 'unstable' state
    player.trigger('unstable');
    player.seekEvents.stable = false;
    player.seekEvents.last = function(){
      return {
        seekStart: 32,
        seekEnd: 65,
        seekInterval: 33
      };
    };

    //if pause/play are triggered while the player is unstable
    player.trigger('pause');
    player.trigger('play');
    //we should not trigger tracking events.
    ok(!adPauseFired, 'onceux ad pause should not have fired.');
    ok(!adResumeFired, 'onceux ad resume should not have fired.');

    //once the player is stable again, after the seek
    player.trigger('stable');
    player.seekEvents.stable = true;

    player.trigger('pause');
    player.trigger('play');
    //play/pause should trigger tracking events
    ok(adPauseFired, 'onceux ad pause should have fired.');
    ok(adResumeFired, 'onceux ad resume should have fired.');
  });

  test('test onceux ad tracking events when seeked backward into ad', function() {
    var
      vmapXML = validVMAP,
      adImpressionFired = 0,
      adStartQuartileFired = 0,
      adFirstQuartileFired = 0,
      adMidPointFired = 0,
      adThirdQuartileFired = 0,
      adCompleteFired = 0,
      adRollStartFired = 0,
      adRollCompleteFired = 0,
      companionAdCreativeFired = 0,
      i;

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');

    //to begin with get progress to 32s
    progress(32);

    player.on('onceux-adroll-start', function(event) {
      adRollStartFired++;
    });

    player.on('onceux-adroll-complete', function(event) {
      adRollCompleteFired++;
    });

    player.on('onceux-linearad-start', function(event) {
      adStartQuartileFired++;
    });

    player.on('onceux-linearad-impression', function(event) {
      adImpressionFired++;
    });

    player.on('onceux-linearad-firstQuartile', function(event) {
      adFirstQuartileFired++;
    });

    player.on('onceux-linearad-midpoint', function(event) {
      adMidPointFired++;
    });

    player.on('onceux-linearad-thirdQuartile', function(event) {
      adThirdQuartileFired++;
    });

    player.on('onceux-linearad-complete', function(event) {
      adCompleteFired++;
    });

    player.on('onceux-companionad-creativeView', function(event) {
      companionAdCreativeFired++;
    });

    //seek backward into the 8 seconds of preRoll
    seek(32, 8);

    //set the progress from 8 sec to 31 sec (end of preRoll)
    progress(31);

    ok(!adRollStartFired, 'onceux ad roll start event should not have fired.');
    ok(!adImpressionFired, 'onceux linear ad impression event should not have fired.');
    ok(!adStartQuartileFired, 'onceux linear ad start quartile event should not have fired.');
    ok(!adFirstQuartileFired, 'onceux linear ad first quartile event should not have fired.');
    strictEqual(adMidPointFired, 1, 'onceux linear ad mid point event should have fired.');
    strictEqual(adThirdQuartileFired, 1, 'onceux linear ad third quartile event should have fired.');
    strictEqual(adCompleteFired, 1, 'onceux linear ad complete event should have fired.');
    strictEqual(adRollCompleteFired, 1, 'onceux ad roll complete event should have fired.');
    strictEqual(companionAdCreativeFired, 1, 'onceux companionAd creativeView event should have fired.');
  });

  test('clickthrough behavior on player when an ad is playing', function() {
    var
      evt,
      el,
      eventfired,
      pauseCalled,
      clickThroughUrl;

    player.on('onceux-linearad-start', function() {
      eventfired = true;
    });

    player.pause = function() {
      pauseCalled = true;
    };

    window.open = function () {
      clickThroughUrl = true;
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    player.trigger('timeupdate');
    ok(eventfired, 'linearad start should have fired');

    // dispatch click event.
    try {
      // Chrome, Safari, Firefox
      evt = new MouseEvent('click');
    } catch (e) {
      // PhantomJS
      evt = document.createEvent('MouseEvent');
      evt.initEvent('click', true, false);
    }

    el = player.el().querySelector('.vjs-onceux-ad-container');
    el.dispatchEvent(evt);

    ok(pauseCalled, 'player pause should have been called');
    ok(clickThroughUrl, 'clickthrough url should have been called out ');
  });
})(window, window.videojs, window.QUnit);