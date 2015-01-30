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
    originalXDR,
    player,
    currentTime,
    sandbox,

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
    };



  module('videojs-default-overlays', {
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
      player.ads.state = 'content-playback';
      player.ads.startLinearAdMode =  function() {
        player.trigger('adstart');
        player.ads.state = 'ad-playback';
      };
      player.ads.endLinearAdMode = function() {
        player.trigger('adend');
        player.ads.state = 'content-playback';
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

  test('overlay plugin test', function() {
    var options = {
      metadataUri : 'http://onceux.unicornmedia.com/now/ads/vmap/od/auto/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/9b118b95-38df-4b99-bb50-8f53d62f6ef8??umtp=0',
      timeout: 45000
    };
    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validAdRollVMAP]);
    sandbox.server.respond();

    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    player.currentTime(1);
    player.trigger('timeupdate');

    equal(player.el().querySelectorAll('.vjs-overlay-onceux-countdown').length, 1, 'There should be one and only one onceux-countdown overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad').length, 1, 'There should be one and only one onceux-skipad overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad-text').length, 0, 'The skipad text should not be present.');
  });

  test('skip ads overlay plugin test', function (){
    var
      i,
      options = {
        metadataUri : 'http://onceux-qa.unicornmedia.com/now/ads/vmap/od/auto/96c78eda-0f69-4904-a312-74178d053a73/6e1a0239-596c-4e9b-b697-ab390ff3c364/f556a122-2e69-467e-aef2-fe97c7ed215b',
        timeout: 45000
      },
      progress = function(toSecond) {
        i = player.currentTime();
        while (i <= toSecond) {
          player.currentTime(i);
          player.trigger('timeupdate');
          i++;
        }
      };
    player.onceux(options);
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validSkipOffsetVMAP]);
    sandbox.server.respond();

    //Put the player in the countdown timer, skip ad timer state
    player.trigger('readyforpreroll');
    player.trigger('loadedmetadata');
    progress(2);
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-countdown').length, 1, 'There should be one and only one onceux-countdown overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad').length, 1, 'There should be one and only one onceux-skipad overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad-text').length, 1, 'The skipad text should be visible.');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad')[0].style.cursor, 'default', 'style.cursor should be "default".');

    //put the player in the skippable ad state (skipoffset is 5 seconds)
    progress(6);
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-countdown').length, 1, 'There should be one and only one onceux-countdown overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad').length, 1, 'There should be one and only one onceux-skipad overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad-text').length, 1, 'The skipad text should be visible.');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad')[0].style.cursor, 'pointer', 'style.cursor should be "pointer".');

    //put the player into content state (preroll is 15 seconds)
    progress(16);
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-countdown').length, 0, 'There should be one and only one onceux-countdown overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad').length, 0, 'There should be one and only one onceux-skipad overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad-text').length, 0, 'The skipad text should be visible.');

    //Post roll started: Put the player in the countdown timer, skip ad timer state
    progress(139);
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-countdown').length, 1, 'There should be one and only one onceux-countdown overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad').length, 1, 'There should be one and only one onceux-skipad overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad-text').length, 1, 'The skipad text should be visible.');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad')[0].style.cursor, 'default', 'style.cursor should be "default".');

    //put the player in the skippable ad state (skipoffset is 33% of 15 seconds)
    progress(146);
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-countdown').length, 1, 'There should be one and only one onceux-countdown overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad').length, 1, 'There should be one and only one onceux-skipad overlay');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad-text').length, 1, 'The skipad text should be visible.');
    equal(player.el().querySelectorAll('.vjs-overlay-onceux-skipad')[0].style.cursor, 'pointer', 'style.cursor should be "pointer".');
  });
})(window, window.videojs, window.QUnit);