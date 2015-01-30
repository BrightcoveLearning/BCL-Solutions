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
    originalError,
    player,
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

  module('absolute-timeline', {
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
      player.currentTime = function() {
        return 1;
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

  test('test basic timeline object', function() {
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

    ok(player.onceux.timeline, 'The timeline does not exist.');
    strictEqual(player.onceux.timeline.absoluteDuration, 61, 'absolute duration did not match payload in vmap.');
    strictEqual(player.onceux.timeline.contenturi, contentURL, 'The contenturi is empty');
  });


  test('remove invalid adbreaks from parsed vmap', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      vmapXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<vmap:VMAP xmlns:vmap="http://www.iab.net/vmap-1.0" xmlns:uo="uo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0"> ' +
         '<vmap:Extensions>' +
            '<uo:unicornOnce ttl="600" contenturi="'+ contentURL + '" contentlength="61" payloadlength="61" contextid="e6d25397-9305-4d35-9587-d3cde449a633" />' +
            '<uo:contentImpressions />' +
            '<uo:requestParameters />'  +
         '</vmap:Extensions>' +
      '<vmap:AdBreak breakId="PreRoll_0_0" breakType="linear" timeOffset="start">' +
      '</vmap:AdBreak>' +
      '<vmap:AdBreak breakId="PreRoll_0_0" breakType="linear" timeOffset="start">' +
      '<vmap:AdSource allowMultipleAds="true" followRedirects="true" id="0">' +
      '</vmap:AdSource>' +
      '</vmap:AdBreak>' +
      '</vmap:VMAP>',
      message = '',
      numberofErrors = 0;

    videojs.log.error = function(errorText) {
      message = errorText;
      return numberofErrors++;
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml'}, vmapXML]);
    sandbox.server.respond();

    strictEqual(numberofErrors, 2, 'emitted an error');
    strictEqual(message, 'OnceUX VMAP parser error: Expected Ad Properties on linear ad not found.  Removing linear Ad.', 'Error messaging was not as expected.');
    equal(player.currentSrc(), contentURL, 'The currentSrc of the player did not match the expected URI.');
  });

  test('parse with invalid ad breaks (no duration)', function() {
    var
      numberofErrors = 0,
      message = '';

    videojs.log.error = function(errorText) {
      message = errorText;
      return numberofErrors++;
    };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, invalidVMAP]);
    sandbox.server.respond();
    strictEqual(numberofErrors, 1, 'emitted an error');
    strictEqual(message, 'OnceUX VMAP parser error: Expected Ad Properties on linear ad not found.  Removing linear Ad.', 'Error messaging was not as expected.');
  });

  test('test adRoll timeline object', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      // vmapData, validPreRollJson, validMidRollJson, validPostRollJson
      // are all imported from a javascript file in index.html
      vmapXML = validVMAP,
      expectedPreRollJson = extend({}, validPreRollJson),
      expectedMidRollJson = extend({}, validMidRollJson),
      expectedPostRollJson = extend({}, validPostRollJson),
      expectedAdRolls;

    expectedPreRollJson.companionAd = {
      'CompanionClickThrough': 'http://www.starbucks.com/static/images/global/logo.png',
      'TrackingEvents': {
        'Tracking': [
          {
            'event': 'creativeView',
            'url': 'http://companiontrack.demo.url.com/companion/starbuckstwo'
          }
        ]
      },
      'StaticResource': {
        'creativeType': 'image/jpeg',
        'url': 'http://demo.umedia.com/jes/ads/starbuckstwo300.jpg'
      },
      'height': '250',
      'id': '54061052904921234300x250',
      'width': '300'
    };
    expectedMidRollJson.companionAd = {
      'CompanionClickThrough': 'http://www.starbucks.com/static/images/global/logo.png',
      'TrackingEvents': {
        'Tracking': [
          {
            'event': 'creativeView',
            'url': 'http://companiontrack.demo.url.com/companion/starbuckstwo'
          }
        ]
      },
      'StaticResource': {
        'creativeType': 'image/jpeg',
        'url': 'http://demo.umedia.com/jes/ads/starbuckstwo300.jpg'
      },
      'height': '250',
      'id': '54061052904921234300x250',
      'width': '300'
    };
    expectedPostRollJson.companionAd = {
      'CompanionClickThrough': 'http://www.starbucks.com/static/images/global/logo.png',
      'TrackingEvents': {
        'Tracking': [
          {
            'event': 'creativeView',
            'url': 'http://companiontrack.demo.url.com/companion/starbuckstwo'
          }
        ]
      },
      'StaticResource': {
        'creativeType': 'image/jpeg',
        'url': 'http://demo.umedia.com/jes/ads/starbuckstwo300.jpg'
      },
      'height': '250',
      'id': '54061052904921234300x250',
      'width': '300'
    };

    expectedPreRollJson.index = 0;
    expectedPreRollJson.playCount = 0;
    expectedPreRollJson.skipoffset = 0;
    expectedMidRollJson.index = 0;
    expectedMidRollJson.playCount = 0;
    expectedMidRollJson.skipoffset = 0;
    expectedPostRollJson.index = 0;
    expectedPostRollJson.playCount = 0;
    expectedPostRollJson.skipoffset = 0;

    expectedAdRolls = [{
        absoluteBeginTime: 0,
        absoluteEndTime: 30.0666666,
        linearAds: [expectedPreRollJson],
        timeOffset: 'start',
        playCount: 0,
        index: 0
      }, {
        absoluteBeginTime: 60.066666600000005,
        absoluteEndTime: 90.13333320000001,
        linearAds: [expectedMidRollJson],
        timeOffset: '00:00:30.000',
        playCount: 0,
        index: 1
      }, {
        absoluteBeginTime: 166.0003332,
        absoluteEndTime: 196.0669998,
        linearAds: [expectedPostRollJson],
        timeOffset: 'end',
        playCount: 0,
        index: 2
      }];
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    ok(player.onceux.timeline, 'The timeline does not exist.');
    strictEqual(player.onceux.timeline.absoluteDuration, 196.067, 'absolute duration did not match payload in vmap.');
    deepEqual(player.onceux.timeline.adRolls, expectedAdRolls, 'The adRoll on timeline does not match expectedAdRoll.');
    ok(player.onceux.timeline.pathAtAbsoluteTime instanceof Function, 'pathAtAbsoluteTime was not a function.');
  });

  test('test pathAtAbsoluteTime for single ad in adRolls', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      //vmapData, validPreRollJson, validMidRollJson, validPostRollJson
      //are all imported from a javascript file in index.html we don't want
      //to modify them directly since they could be used in other tests.
      vmapXML = validVMAP,
      expectedAd = function(type, expectedAbsoluteTime, expectedContentTime, expectedAdRollIndex, expectedLinearAdIndex, expectedRollBegin, expectedRollEnd, expectedRollLinearAdCount, expectedBreakBegin, expectedBreakEnd) {
        var
          adRoll = null,
          adRollIndex,
          linearAd = null;

        if (type === 'pre') {
          linearAd = extend({}, validPreRollJson);
          adRollIndex = 0;
        } else if (type === 'mid') {
          linearAd = extend({}, validMidRollJson);
          adRollIndex = 1;
        } else if (type === 'post') {
          linearAd = extend({}, validPostRollJson);
          adRollIndex = 2;
        }

        if (linearAd) {
          linearAd.absoluteBeginTime = expectedBreakBegin;
          linearAd.absoluteEndTime = expectedBreakEnd;
          linearAd.playCount = 0;
          linearAd.index = 0;
          linearAd.skipoffset = 0;
          linearAd.companionAd = {
            'CompanionClickThrough': 'http://www.starbucks.com/static/images/global/logo.png',
            'TrackingEvents': {
              'Tracking': [
                {
                  'event': 'creativeView',
                  'url': 'http://companiontrack.demo.url.com/companion/starbuckstwo'
                }
              ]
            },
            'StaticResource': {
              'creativeType': 'image/jpeg',
              'url': 'http://demo.umedia.com/jes/ads/starbuckstwo300.jpg'
            },
            'height': '250',
            'id': '54061052904921234300x250',
            'width': '300'
          };
          adRoll = {
            absoluteBeginTime: expectedRollBegin,
            absoluteEndTime: expectedRollEnd,
            linearAdCount: expectedRollLinearAdCount,
            playCount: 0,
            index: adRollIndex
          };
        }

        return {
          absoluteTime: expectedAbsoluteTime,
          contentTime: expectedContentTime,
          adRoll: adRoll,
          linearAd: linearAd
        };
      };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(-1), null, 'Negative time should return null.');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(0), expectedAd('pre', 0, 0, 0, 0, 0, 30.0666666, 1, 0, 30.0666666), 'Timeline was not correct for 0');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(30), expectedAd('pre', 30, 30, 0, 0, 0, 30.0666666, 1, 0, 30.0666666), 'Timeline was not correct for 30');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(31), expectedAd('content', 31, 0.9333333999999986, null, null), 'Timeline was not correct for 31');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(60), expectedAd('content', 60, 29.9333334, null, null), 'Timeline was not correct for 60');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(61), expectedAd('mid', 61, 0.9333333999999951, 1, 0, 60.066666600000005, 90.13333320000001, 1, 60.066666600000005, 90.13333320000001), 'Timeline was not correct for 61');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(90), expectedAd('mid', 90, 29.933333399999995, 1, 0, 60.066666600000005, 90.13333320000001, 1, 60.066666600000005, 90.13333320000001), 'Timeline was not correct for 90');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(91), expectedAd('content', 91, 30.86666679999999, null, null), 'Timeline was not correct for 91');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(165), expectedAd('content', 165, 104.8666668, null, null), 'Timeline was not correct for 165');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(167), expectedAd('post', 167, 0.9996668, 2, 0, 166.0003332, 196.0669998, 1, 166.0003332, 196.0669998), 'Timeline was not correct for 167');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(197), null, 'Time past the end timeshould return null');
  });

  test('test pathAtAbsoluteTime for multiple ads in adRolls', function() {
    var
      contentURL = 'http://onceapi0-qa.unicornmedia.com/now/stitched/mp4/b8f575ef-380d-4e1a-a5d1-22bdf95619fa/2ad573ed-b5c8-4058-a146-8b572071480e/3a41c6e4-93a3-4108-8995-64ffca7b9106/9449ae81-2976-44a6-b8bb-cfc08f7120d9/content.mp4?oasid=cf924c5e-910a-4b4a-82eb-9b7983500074',
      //vmapData, validPreRollJson, validMidRollJson, validPostRollJson
      //are all imported from a javascript file in index.html we don't want
      //to modify them directly since they could be used in other tests.
      vmapXML = validAdRollVMAP,
      expectedAd = function(type, expectedAbsoluteTime, expectedContentTime, expectedAdRollIndex, expectedLinearAdIndex, expectedRollBegin, expectedRollEnd, expectedRollLinearAdCount, expectedBreakBegin, expectedBreakEnd) {
        var
          linearAd = null,
          adRollIndex = 0,
          adRoll = null;

        if (type === 'pre') {
          linearAd = extend({}, validPreRollJson);
          adRollIndex = 0;
        } else if (type === 'mid') {
          //Watch out there are two midrolls, we are only validating one right now.
          linearAd = extend({}, validMidRollJson);
          adRollIndex = 1;
        } else if (type === 'post') {
          linearAd = extend({}, validPostRollJson);
          adRollIndex = 3;
        }

        if (linearAd) {
          linearAd = validAdRollVMAPJson.adRolls[expectedAdRollIndex].linearAds[expectedLinearAdIndex];
          linearAd.absoluteBeginTime = expectedBreakBegin;
          linearAd.absoluteEndTime = expectedBreakEnd;
          linearAd.index = expectedLinearAdIndex;
          linearAd.companionAd = undefined;
          linearAd.playCount = 0;
          linearAd.skipoffset = 0;
          adRoll = {
            absoluteBeginTime: expectedRollBegin,
            absoluteEndTime: expectedRollEnd,
            linearAdCount: expectedRollLinearAdCount,
            playCount: 0,
            index: adRollIndex
          };
        }

        return {
          absoluteTime: expectedAbsoluteTime,
          contentTime: expectedContentTime,
          adRoll: adRoll,
          linearAd: linearAd
        };
      };

    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, vmapXML]);
    sandbox.server.respond();

    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(-1), null, 'Negative time should return null.');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(0), expectedAd('pre', 0, 0, 0, 0, 0, 124.1333332, 4, 0, 32), 'Timeline was not correct for 0');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(40), expectedAd('pre', 40, 8, 0, 1, 0, 124.1333332, 4, 32, 64), 'Timeline was not correct for 40');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(130), expectedAd('content', 130, 5.866666800000004, null, null), 'Timeline was not correct for 130');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(150), expectedAd('content', 150, 25.866666800000004, null, null), 'Timeline was not correct for 150');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(185), expectedAd('mid', 185, 0.8666668000000186, 1, 0, 184.13333319999998, 246.13333319999998, 2, 184.13333319999998, 216.13333319999998), 'Timeline was not correct for 185');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(230), expectedAd('mid', 230, 13.866666800000019, 1, 1, 184.13333319999998, 246.13333319999998, 2, 216.13333319999998, 246.13333319999998), 'Timeline was not correct for 230');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(250), expectedAd('content', 250, 63.866666800000004, null, null), 'Timeline was not correct for 250');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(280), expectedAd('content', 280, 93.86666680000002, null, null), 'Timeline was not correct for 280');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(350), expectedAd('post', 350, 8.733366799999999, 3, 0, 341.2666332, 401.33329979999996, 2, 341.2666332, 371.2999665), 'Timeline was not correct for 350');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(400), expectedAd('post', 400, 28.700033500000018, 3, 1, 341.2666332, 401.33329979999996, 2, 371.2999665, 401.33329979999996), 'Timeline was not correct for 400');
    deepEqual(player.onceux.timeline.pathAtAbsoluteTime(402), null, 'Time past the end timeshould return null');
  });

  test('test timeline for no ads after onceux-timeline-ready triggers.', function() {
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validNoAdsVMAP]);
    sandbox.server.respond();
    ok(!player.onceux.timeline.adRolls, 'There should be no adRolls on the timeline.');
    strictEqual(player.onceux.timeline.contentDuration, player.onceux.timeline.absoluteDuration, 'Without ads, the content time should be the same as the absoluteDuration.');
  });

  test('test timeline skipoffsets for skippable ads.', function() {
    sandbox.server.respondWith(options.metadataUri, [200, { 'Content-Type': 'text/xml' }, validSkipOffsetVMAP]);
    sandbox.server.respond();
    strictEqual(player.onceux.timeline.adRolls[0].linearAds[0].skipoffset, 5, 'pre-roll skippable offset is 5 sec');
    strictEqual(player.onceux.timeline.adRolls[1].linearAds[0].skipoffset, 4.95495, 'post-roll skippable offset is 33%');
  });

})(window, window.videojs, window.QUnit);