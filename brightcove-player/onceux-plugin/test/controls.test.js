/*! videojs-onceux - v0.0.0 - 2014-6-18
 * Copyright (c) 2014 Brightcove
 * Licensed under the Apache-2.0 license. */
(function(window, videojs, qunit) {
  'use strict';
  var
    originalIsHtmlSupported,
    originalFlashSupported,
    originalError,
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

  module('onceux-controls', {
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
      //mock out the vjs.log.error method to test for proper logging
      originalError = videojs.log.error;
      videojs.log.error = function() {
        return true;
      };

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
      player.ads.startLinearAdMode =  function() {};
      player.ads.stopLinearAdMode = function() {};

      player.overlay = function() {};
      player.seekEvents = function() {};
      player.paused = function() {return false;};

      // initialize the plugin with the default options
      player.onceux(options);
    },
    teardown: function() {
      videojs.Html5.isSupported = originalIsHtmlSupported;
      videojs.Flash.isSupported = originalFlashSupported;
      videojs.log.error = originalError;
      sandbox.restore();
    }
  });


  test('markers array is initialized with correct midroll times with single midroll', function() {
    var
      createMarkerSpy = sandbox.spy(player.onceux.controls, 'createMarkers'),
      markerSpy = sandbox.spy(player.onceux.controls, 'markers'),
      expectedMarkers = [{
        startTime: 30,
        duration: 30.066666600000005
      }];

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    ok(createMarkerSpy.called);
    ok(markerSpy.called);
    ok(markerSpy.returned(expectedMarkers), 'There should be only one marker at 30.');
  });

  test('markers array is initialized with correct midroll times when no midrolls', function() {
    var
      createMarkerSpy = sandbox.spy(player.onceux.controls, 'createMarkers'),
      markerSpy = sandbox.spy(player.onceux.controls, 'markers'),
      expectedMarkers = [];

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validSkipOffsetVMAP]);
    sandbox.server.respond();

    ok(createMarkerSpy.called);
    ok(markerSpy.called);
    ok(markerSpy.returned([]), 'There should be no markers if no midrolls exist.');
  });

  test('markers are hidden on load', function() {
    player.onceux(options);

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    equal(player.el().querySelector('.vjs-marker').style.display, 'none', 'The markers should be hidden by default');
  });

  test('markers are shown when content is playing', function() {
    player.onceux(options);

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.trigger('playing');
    player.currentTime(35);
    sandbox.clock.tick(250);
    equal(player.el().querySelector('.vjs-marker').style.display, 'block', 'The markers should be hidden by default');
  });

  test('display time is correct during an ad', function(){
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.currentTime(10);
    sandbox.clock.tick(250);

    equal(player.onceux.duration(), 30.0666666, 'The duration reported on the controls is incorrect for the ad.');
    equal(player.onceux.currentTime(), 10, 'The currentTime reported on the controls is incorrect for the ad.');
  });

  test('display time is correct during content', function(){
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.currentTime(35);
    sandbox.clock.tick(250);

    equal(player.onceux.duration(), 105.867, 'The duration reported on the controls is incorrect for the ad.');
    equal(player.onceux.currentTime(), 4.933333399999999, 'The currentTime reported on the controls is incorrect for the ad.');
  });

  test('display time is correct if setting currentTime on the controls', function(){
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.markers = function() {
      return [{startTime: 30, duration: 30}];
    };

    //skipping the pre-roll and putting controls into the mid-roll.
    player.onceux.controls.currentTime(35);

    equal(player.currentTime(), 65, 'The player currentTime is incorrect.');
    equal(player.onceux.duration(), 30.066666600000005, 'The duration reported on the controls is incorrect for the ad.');
    equal(player.onceux.currentTime(), 4.933333399999995, 'The currentTime reported on the controls is incorrect for the ad.');

    //skipping pre-roll and the mid-roll and putting controls into the content.
    player.onceux.controls.currentTime(65);

    equal(player.currentTime(), 155.06666660000002, 'The player currentTime is incorrect.');
    equal(player.onceux.duration(), 105.867, 'The duration reported on the controls is incorrect for the content.');
    equal(player.onceux.currentTime(), 94.93333340000001, 'The currentTime reported on the controls is incorrect for the content.');

    //skipping back into the content before the mid-roll and putting controls into the content.
    player.currentTime(95);
    player.onceux.controls.currentTime(29);

    equal(player.currentTime(), 59.13333320000001, 'The player currentTime is incorrect.');
    equal(player.onceux.duration(), 105.867, 'The duration reported on the controls is incorrect for the content.');
    equal(player.onceux.currentTime(), 29.06666660000001, 'The currentTime reported on the controls is incorrect for the content.');
  });

  test('pause on the controls pauses the real player', function(){
    var pauseSpy = sandbox.spy(player, 'pause');

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.pause();

    ok(pauseSpy.called, 'The controls should have paused the contentPlayer');
  });

  test('play on the controls plays the real player', function(){
    var playSpy = sandbox.spy(player, 'play');

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.play();

    ok(playSpy.called, 'The controls should have played the contentPlayer');
  });

  test('isFullscreen on the controls calls isFullscreen the real player', function(){
    var isFullScreenSpy = sandbox.spy(player, 'isFullscreen');

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.isFullscreen();

    ok(isFullScreenSpy.called, 'The controls should have called isFullScreen on the contentPlayer');
  });

  test('requestFullscreen on the controls calls requestFullscreen the real player', function(){
    var requestFullScreenSpy = sandbox.spy(player, 'requestFullscreen');

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.requestFullscreen();

    ok(requestFullScreenSpy.called, 'The controls should have called requestFullscreen on the contentPlayer');
  });

  test('exitFullscreen on the controls calls exitFullscreen the real player', function(){
    var exitFullScreenSpy = sandbox.spy(player, 'exitFullscreen');

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.exitFullscreen();

    ok(exitFullScreenSpy.called, 'The controls should have called exitFullscreen on the contentPlayer');
  });

  test('volume on the controls setts the volume the real player', function(){
    var volumeSpy = sandbox.spy(player, 'volume');

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.volume(0.5);

    ok(volumeSpy.called, 'The controls should have returned the volume');
    ok(volumeSpy.calledWith(0.5), 'The volume should have been set to .5 on the contentPlayer');

    player.onceux.controls.volume();
    ok(volumeSpy.called, 'The controls should have returned the volume');
    ok(volumeSpy.calledWith(), 'The volume should have been called without ags');
  });

  test('muted on the controlsproxy is accurate', function(){
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();

    player.onceux.controls.volume(0);
    ok(player.onceux.controls.muted(), 'The player should be muted.');

    player.onceux.controls.volume(1);
    ok(!player.onceux.controls.muted(), 'The player should notbe muted.');
  });

  test('player shows markers and content duration on load', function(){
    var
      controlProxyDurationData,
      controlProxyDuration,
      markersDisplay;

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validVMAP]);
    sandbox.server.respond();
    player.trigger('loadedmetadata');

    controlProxyDurationData = player.el().querySelector('.vjs-onceux-control-bar .vjs-duration-display').innerHTML.split(' ');
    controlProxyDuration = controlProxyDurationData[controlProxyDurationData.length - 1];
    markersDisplay = player.el().querySelector('.vjs-marker').style.display;

    equal(controlProxyDuration, '1:45', 'The duration should be for the content alone.');
    equal(markersDisplay, 'block', 'Markers should be displayed on load');
  });
})(window, window.videojs, window.QUnit);