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
    player,
    vmapParser,
    mockDebug,
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

  module('vmap-parser', {
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

      // initialize the plugin with the default options
      player.onceux(options);
      mockDebug = function(){};

      // create an instance of the VmapParser!
      vmapParser = new videojs.onceux.VmapParser();
    },
    teardown: function() {
      videojs.Html5.isSupported = originalIsHtmlSupported;
      videojs.Flash.isSupported = originalFlashSupported;
      sandbox.restore();
    }
  });

  test('parse', function() {
    var
      parser,
      vmapDoc,
      expectedParsedPreRollJson,
      expectedParsedMidRollJson,
      expectedParsedPostRollJson,
      expectedParsedObject = {};

    // The test data has timeline object syntax.
    // Remove the properties that aren't valid for just the parsing.
    expectedParsedPreRollJson = extend({}, validPreRollJson);
    delete(expectedParsedPreRollJson.absoluteBeginTime);
    delete(expectedParsedPreRollJson.absoluteEndTime);

    expectedParsedMidRollJson = extend({}, validMidRollJson);
    delete(expectedParsedMidRollJson.absoluteBeginTime);
    delete(expectedParsedMidRollJson.absoluteEndTime);

    expectedParsedPostRollJson = extend({}, validPostRollJson);
    delete(expectedParsedPostRollJson.absoluteBeginTime);
    delete(expectedParsedPostRollJson.absoluteEndTime);

    expectedParsedObject = {
      Extensions: {
        once: {
          contenturi: 'http://api14-phx.unicornmedia.com/now/stitched/mp4/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/3a41c6e4-93a3-4108-8995-64ffca7b9106/9b118b95-38df-4b99-bb50-8f53d62f6ef8/content.mp4?oasid=8d3b56e6-639e-4777-9194-cf82fb386c1e%26umtp=0',
          contentlength: '105.867',
          payloadlength: '196.067'
        }
      },
      adBreaks: [
        expectedParsedPreRollJson,
        expectedParsedMidRollJson,
        expectedParsedPostRollJson
      ]
    };

    parser = new DOMParser();
    vmapDoc = parser.parseFromString(validVMAP,'text/xml');
    deepEqual(vmapParser.parse(vmapDoc, mockDebug), expectedParsedObject);
  });
})(window, window.videojs, window.QUnit);