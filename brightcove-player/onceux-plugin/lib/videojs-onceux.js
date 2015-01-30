(function(window, videojs) {
  'use strict';
  videojs.onceux = {};

  var defaults = {
    verbose: false
  },
  debug,
  xhr,
  xdr,
  processVmap,
  setupPlaybackHandlers,
  resumeFromSeek,
  defaultSeekHandler,
  contentHeaders,
  onceux;

   /**
   * Process the vmap and setup the player for playback.
   *  1) Validate vmap has required elements
   *  2) Filter out linearAds without required elements
   *  3) Create a timeline from vmap metadata
   *  4) Setup the playback event listeners
   *  5) Set the content src and type to vjs player
   *
   * @param (required) player {Object} - reference to videojs player
   * @param (required) settings {Object} - The onceux plugin settings
   * @param (required) vmap {Object} - either parsed from metadatauri or
   *                        passed as an option
   *
   * @returns
   */
  processVmap = function(player, settings, vmap) {
    var
      contentType = '',
      absoluteTimeline = new videojs.onceux.AbsoluteTimeline(player);

    // Validate VMAP object.
    if (!vmap) {
      player.error({ code : 0, message : 'OnceUX VMAP parser error: Empty VMAP object'});
      return;
    } else if (!vmap.Extensions.once.contenturi) {
      player.error({ code : 0, message : 'OnceUX VMAP parser error: VMAP Extensions ContentURI not found'});
      return;
    }

    // Create timeline
    absoluteTimeline.createTimeline(vmap, function(timeline) {
      player.onceux.timeline = timeline;
      player.trigger('onceux-timeline-ready');

      // Set the source using contentURI in VMAP
      if (vmap.Extensions.once.contenturi.indexOf('/m3u8/') > 0) {
        contentType = 'application/x-mpegURL';
      } else {
        contentType = 'video/mp4';
      }

      setupPlaybackHandlers(player, settings);

      player.onceux.controls.createMarkers();

      //Set the content src
      player.src([
        { type: contentType, src: vmap.Extensions.once.contenturi }
      ]);

      if (vmap.Captions) {
        player.addRemoteTextTrack({
          kind: 'captions',
          language: vmap.Captions.languageCode,
          label: 'English',
          src: vmap.Captions.timedTextURL
        });
      }
    });
  };

  /*
   * This method sets up all the necessary playback event listeners.
   * These include:
   *   videojs-seek-events seek event (ALWAYS)
   *   videojs-onceux ad event listeners to track adPlayCounts (OPTIONAL)
   *   videojs-contrib-ads preroll and postroll listeners (ALWAYS)
   *   videojs-overlay event listeners to ensure the default overlays are shown (OPTIONAL)
   *   timeupdate listener to react to changes from ads to content and vice-versa
   *
   * @param (required) player {Object} - A reference to the player
   * @param (required) settings {Object} - The onceux plugin settings
   *
   * @returns
   */
  setupPlaybackHandlers = function(player, settings) {
    var
      adTracking = new videojs.onceux.AdTracking(player, settings),
      defaultOverlays = new videojs.onceux.DefaultOverlays(player, settings),
      clickThroughHandler;

    if (!settings.hideOverlay) {
      defaultOverlays.init(player);
    }

    // handle a seek event
    player.one('seek', defaultSeekHandler);

    //Setup listeners to increment the linearAd playCounts
    player.on('onceux-linearad-complete', function(event) {
      player.onceux.timeline.adRolls[event.adRoll.index].linearAds[event.linearAd.index].playCount++;
    });

    //Setup listeners to increment the adRoll playCounts
    player.on('onceux-adroll-complete', function(event) {
      player.onceux.timeline.adRolls[event.adRoll.index].playCount++;
    });

    //Notify we're ready for ads and put the player in linearAdMode
    //if there is a pre-roll.
    player.on('contentupdate', function() {
      player.trigger('adsready');
    });

    //Once the player is ready for a pre-roll, play one if there is one.
    player.on('readyforpreroll', function() {
      var startPath = player.onceux.timeline.pathAtAbsoluteTime(0);
      //setup the ad tracking listeners
      adTracking.trackElement(player);
      //If a preroll should play
      if (startPath.linearAd) {
        //start the ad once the player has loaded the src
        player.ads.startLinearAdMode();
        player.one('play', function() {
          defaultOverlays.updateOverlays(player, startPath);
          //videojs-contrib-ads requires that the ads plugin initiate playback
          player.play();
        });
      }
    });

    /*
     * The timeupdate handler is where all the magic happens.
     * Here we detect changes in the stream from content to ads and vice-versa.
     * Where there is a change, we ensure the ads should be played, and use
     * startLinearAdMode() and stopLinearAdMode() in videojs-contrib-ads to update
     * the UI accordingly.
     */
    player.on('timeupdate', function() {
      var
        currentPath = player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()),
        linearAd;

      if (currentPath) {
        linearAd = currentPath.linearAd;
      }

      //If there an ad is playing
      if (linearAd) {
        //swap to ad playback mode if we are in content playback mode
        if (player.ads.state === 'content-playback') {
          player.ads.startLinearAdMode();
        }
        defaultOverlays.updateOverlays(player, currentPath);
        return;
      }

      //If there is not an ad and we are in ad playback mode,
      //swap to content playback mode
      if (!linearAd && player.ads.state === 'ad-playback') {
        player.ads.endLinearAdMode();
        return;
      }

      //If we're here the player is already in the right state
      return;
    });

    //Make sure the player is in the right state when completing all playback.
    player.on('ended', function() {
      //If we play a postroll at the end
      if (player.onceux.timeline.adRolls) {
        var linearAds = player.onceux.timeline.adRolls[player.onceux.timeline.adRolls.length - 1].linearAds;
        if (linearAds && linearAds[linearAds.length - 1].timeOffset === 'end') {
          //End ad mode.
          if (player.ads.state === 'ad-playback') {
            player.ads.endLinearAdMode();
          }
        }
      }
    });

    player.on('onceux-linearad-start', function(event) {
      var
        clickThroughUrl = player.onceux.objectAtPath(event.linearAd, 'AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative.0.Linear.VideoClicks.ClickThrough.url'),
        adContainer = player.el().getElementsByClassName('vjs-onceux-ad-container')[0];

      clickThroughHandler = function _clickThroughUrl () {
        player.pause();
        window.open(clickThroughUrl, '_blank');
      };

      if (adContainer && clickThroughUrl) {
        adContainer.addEventListener('click', clickThroughHandler);
      }
    });

    player.on('onceux-linearad-complete', function(event) {
      var
        clickThroughUrl = player.onceux.objectAtPath(event.linearAd, 'AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative.0.Linear.VideoClicks.ClickThrough.url'),
        adContainer = player.el().getElementsByClassName('vjs-onceux-ad-container')[0];

      if (adContainer && clickThroughUrl) {
        adContainer.removeEventListener('click', clickThroughHandler);
      }
    });
  };

  /*
   * This method should be called to resume playback after any seeks
   * we initiate.  If passed a resume position, it will seek to the position
   * and wait for playback to stabilize (consistent periodic timeupdate events)
   * before re-adding a seek handler.  This is necessary since on some devices
   * reaching/recovering from a seek request can require a number of intermittent
   * seek events before playback resumes normally.  In those cases, if a seek handler
   * was immediately added we could launch into a loop of seeks as we try to
   * enfore watching a particular ad.
   *
   * @param (required) player {Object} - A reference to the player
   * @param (required) adResumePosition {Number} - The time to resume playback from.
   *
   * @returns
   */
  resumeFromSeek = function (player, adResumePosition) {
    if (adResumePosition) {
      player.pause();
      player.currentTime(+adResumePosition.toFixed(1));
      player.play();
    }
    //The stable event is fired from the videojs-seek-events plugin
    //when 3 timeupdate events are consecutively fired without an interval
    //that would be considered a seek.  This is required to prevents a seek
    //loop on some devices.
    debug('waiting for stable playback');
    player.one('stable', function() {
      debug('stable playback, adding seek listener');
      player.one('seek', defaultSeekHandler);
    });
  };

  /*
   * This handler attempts to enforce that all adRolls are watched and
   * cannot be skipped unless the adRoll or linearAd have reached their
   * requiredPlayCount.  By default the playCount on adRolls and linearAds
   * never increases and so ads should never be skipped over.
   *
   * Seeking backward will resume at the seekEnd time.
   * Seeking from an ad will resume at the seekStart time.
   * Seeking into an ad will resume at the adRolls start time.
   * Seeking over an ad or ads will resume at the beginning of the last adRoll
   *   which was seeked over.
   * Seeking within content or over an adRoll whose ads can all be skipped will
   *   resume at the seekEnd time.
   *
   * @returns
   */
  defaultSeekHandler = function() {
    debug('entered seek handler: ', new Date());
    var
      player = this,
      lastSeek = player.seekEvents.last(),
      seekStart = Number(lastSeek.seekStart),
      seekEnd = Number(lastSeek.seekEnd),
      interval = Number(seekEnd - seekStart),
      startPath = player.onceux.timeline.pathAtAbsoluteTime(seekStart),
      endPath = player.onceux.timeline.pathAtAbsoluteTime(seekEnd),
      adRolls = player.onceux.timeline.adRolls;

    //If they seek backward, no handling necessary, just resume from where they seeked.
    if (interval < 0) {
      debug('seek back: ss=' + seekStart + ', se=' + seekEnd);
      return resumeFromSeek(player);
    }

    //If they are seeking from an adRoll.
    if (startPath && startPath.linearAd) {
      //return them back to the ad.
      debug('seek out of ad: ss=' + seekStart + ', se=' + seekEnd);
      return resumeFromSeek(player, seekStart);
    }

    //If they seek directly into an adRoll.
    if (endPath && endPath.linearAd) {
      //return them to the start of the adRoll
      debug('seek into ad: ss=' + seekStart + ', se=' + seekEnd);
      return resumeFromSeek(player, endPath.adRoll.absoluteBeginTime);
    }

    //Otherwise, check if they have seeked over any adRolls and, if so,
    //set the resume time to beginning of last adRoll they seeked over.
    if (adRolls) {
      for (var adRollIndex = 0; adRollIndex < adRolls.length; adRollIndex++) {
        if (seekStart > adRolls[adRollIndex].absoluteEndTime) {
          //ignore adRolls that have already been viewed
          continue;
        } else if (seekEnd > adRolls[adRollIndex].absoluteEndTime) {
          //An entire adRoll was seeked over.
          //Loop thorough all the linear ads in the adRoll
          for (var linearAdIndex = 0; linearAdIndex < adRolls[adRollIndex].linearAds.length; linearAdIndex++) {
            //If the next adRoll was also seeked over, fire a adskip event for the linearAd and continue
            if (adRolls[adRollIndex + 1] && adRolls[adRollIndex + 1].absoluteEndTime < seekEnd) {
              player.trigger({
                type: 'onceux-linearad-skipped',
                adRoll: adRolls[adRollIndex],
                linearAd: adRolls[adRollIndex].linearAds[linearAdIndex]
              });
              continue;
            } else {
              //Otherwise we're in the adRoll that we need to resume from
              debug('seek over ad: ss=' + seekStart + ', se=' + seekEnd);
              return resumeFromSeek(player, adRolls[adRollIndex].linearAds[linearAdIndex].absoluteBeginTime);
            }
          }
        } else {
          //we finished looping through relevant adRolls.
          break;
        }
      }
    }
    //If we're here they seeked within the content
    //or without passing over any non-skippable ads.
    debug('seek in content: ss=' + seekStart + ', se=' + seekEnd);
    return resumeFromSeek(player);
  };

  contentHeaders = function() {
    var contentHeaders = {};
    if (videojs.Hls.isSupported() || videojs.Hls.supportsNativeHls) {
      contentHeaders['application/vnd.apple.mpegurl'] = true;
    }
    if ((videojs.Flash.isSupported()) || (videojs.Html5.isSupported())) {
      contentHeaders['video/mp4'] = true;
    }
    return contentHeaders;
  };

  /**
   * Initialize the plugin.
   *
   * @param options (optional) {Object} configuration for the plugin
   *
   * @returns
   */
  onceux = function(options) {
    var
      settings = videojs.util.mergeOptions(defaults, options),
      player = this,
      vmapParser = new videojs.onceux.VmapParser(),
      onceRequest = window.XDomainRequest ? xdr : xhr,
      vmap;

    debug = settings.verbose ? onceux.log : function(){};

    //if no overrides were specified, use the regular control bar options
    if (!('adControlBar' in settings)) {
      settings.adControlBar = videojs.util.mergeOptions(player.options().children.controlBar, {
        name: 'adControlBar'
      });
    }

    player.onceux.controls = videojs.onceux.Controls(player, settings);

    //Invoke the contrib-ads and seek plugins if it hasn't been
    //player.ads and player.seekEvents is an object once its been invoked.
    if (player.ads instanceof Function) {
      player.ads({
        prerollTimeout: 100
      });
    }
    if (player.seekEvents instanceof Function) {
      player.seekEvents({
        //set this true when debugging seek behavior
        verbose: false
      });
    }

    if (settings.vmap) {
      // If they passed in a VMAP object, use it.
      vmap = settings.vmap;
      processVmap(player, settings, vmap);
    } else if (settings.metadataUri) {
      // otherwise, if a vmap metadata uri is passed, call it to get vmap.
      onceRequest({
        url: settings.metadataUri,
        timeout: settings.timeout || 45000,
        contentHeaders: settings.contentHeaders
      }, function(doc) {
        if (doc.getElementsByTagName('parsererror').length > 0) {
          player.error({ code : 0, message : 'OnceUX VMAP XML invalid!'});
          return;
        }
        // parse the VMAP xml document
        vmap = vmapParser.parse(doc);
        debug(' parsed XML document from ' + settings.metadataUri + ':', JSON.stringify(vmap));
        processVmap(player, settings, vmap);
      }, function(e){
        debug('Failed to load XML document from ' + settings.metadataUri + ':', e);
        player.error({ code : 0, message : 'Request for OnceUX vmap failed'});
      });
    } else {
      // otherwise we can't get the VMAP.
      player.error({ code : 0, message : 'OnceUX VMAP error:  Undefined VMAP object or metadataUri in the plugin options '});
      return;
    }

    /*
     * Expose a function to return the duration as the duration for the current content.
     *
     * @param None
     *
     * @returns Number The current duration of the playing ad or content.
     */
    this.onceux.duration = function() {
      return player.onceux.controls.duration();
    };

    /*
     * Expose a function to return the currentTime as the time within the current content.
     *
     * @param None
     *
     * @returns Number The current time within the playing ad or content.
     */
    this.onceux.currentTime = function() {
      return player.onceux.controls.currentTime();
    };

    /*
     * Seek to a given time without invoking the default seek handling which would
     * typically enforce that ads play.  This method is intended to be used to
     * skip advertisements.
     *
     * @param time (required) {Number} - the absolute time in seconds to seek to.
     *
     * @returns
     */
    this.onceux.seekAds = function(time) {
      var
        seekStart = player.currentTime(),
        seekEnd = time,
        adRolls = player.onceux.timeline.adRolls,
        currentPath = player.onceux.timeline.pathAtAbsoluteTime(seekStart),
        linearAdBeginTime,
        linearAdEndTime;

      //For all ads that are skipped, trigger an adskip event.
      if (adRolls) {
        for (var adRollIndex = 0; adRollIndex < adRolls.length; adRollIndex++) {
          //if the seek didn't start in this adRoll and the adRoll is before the seek was initiated
          //from, don't worry about it.
          if (!currentPath.adRoll && seekStart > adRolls[adRollIndex].absoluteEndTime) {
            continue;
          }
          //Otherwise, we seeked out of an ad roll, into an adRoll, or over one
          if (seekEnd > adRolls[adRollIndex].absoluteBeginTime || seekEnd > adRolls[adRollIndex].absoluteEndTime) {
            //Loop thorough all the linear ads in the adRoll and trigger events for
            //each one which was entirely skipped.
            for (var linearAdIndex = 0; linearAdIndex < adRolls[adRollIndex].linearAds.length; linearAdIndex++) {
              linearAdBeginTime = adRolls[adRollIndex].linearAds[linearAdIndex].absoluteBeginTime;
              linearAdEndTime = adRolls[adRollIndex].linearAds[linearAdIndex].absoluteEndTime;
              //don't worry about linearAds that are before the time the seek was
              //initiated from or are seeked into.
              if (seekStart > linearAdEndTime || seekEnd < linearAdEndTime) {
                continue;
              }
              //Otherwise, the ad was seeked over entirely
              if (seekEnd >= linearAdEndTime) {
                //trigger an event for this linearAd since it was seeked over.
                player.trigger({
                  type: 'onceux-linearad-skipped',
                  seekStart: seekStart,
                  seekEnd: seekEnd,
                  adRoll: adRolls[adRollIndex],
                  linearAd: adRolls[adRollIndex].linearAds[linearAdIndex]
                });
              }
            }
          } else {
            //we finished looping through relevant adRolls.
            break;
          }
        }
      }
      //Turn off the default seek handling so we aren't forced back into ads.
      player.off('seek', defaultSeekHandler);

      //Once our seek here is done, re-enable the default listener.
      player.one('seek', function() {
        resumeFromSeek(player);
      });

      //Initiate the seek.
      player.currentTime(seekEnd);
    };
  };

  /*
   *  Append messages to the console using the videojs logging system.  All messages are
   *  prefixed with 'onceux: '.
   */
  onceux.log = function(){
    videojs.log('onceux: ' + Array.prototype.join.call(arguments, ' '));
  };

  /*
   * This method allows allows us to inspect nested object properties without having
   * to test the existence of the object at each nested level.
   */
  onceux.objectAtPath = function (obj, str) {
    if (!obj || typeof obj !== 'object' || !str || str.length === 0) {
      return obj;
    }
    var paths = str.split('.');
    return onceux.objectAtPath(obj[paths[0]], paths.slice(1).join('.'));
  };

  /**
     * Given a time like: 00:00:30.0666666+00:00, covert it into seconds.
     *
     * @param (required) {Number} time Time as string in vmap data
     *
     * @returns {Number} The number of seconds the passed time string is equivalent to.
  **/
  onceux.toSeconds = function(time) {
    var
      seconds = 0,
      timeParts;

    if (time) {
      timeParts = time.split('+')[0].split(':');
      if (timeParts.length === 3) {
        seconds += parseFloat(timeParts[0] * 3600); //convert hours to seconds
        seconds += parseFloat(timeParts[1] * 60); //convert minutes to seconds
        seconds += parseFloat(timeParts[2]);
      }
    }
    return seconds;
  };

  /**
   * Creates and sends an XDomainRequest. Used on platforms where XMLHttpRequest
   * is not supported.
   *
   * @param (required) settings {Object} it should contain a `metadataUri`
   *                                     property that indicates the URL to request
   * @param (required) successHandler {Function} a function to call when the
   *                                             request completes successfully.
   * @param (required) errorHandler {Function} a function to call when the
   *                                           request completes with an error.
   */
  xdr = function(settings, successHandler, errorHandler) {
    var
      options = videojs.util.mergeOptions({method: 'GET'}, settings),
      request = new window.XDomainRequest(),
      xmlHttpTimeout = setTimeout(function () {
          request.abort();
        },options.timeout);

    request.onload = function() {
      clearTimeout(xmlHttpTimeout);
      if (request.responseText) {
        try {
          var
            domParser,
            xmlDoc;

          if (window.DOMParser) {
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(request.responseText, 'text/xml');
          } else {
            xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
            xmlDoc.loadXML(request.responseText);
          }
          successHandler(xmlDoc);
        } catch (e) {
          errorHandler('Could not parse XDR response: ', e);
        }
      } else {
        errorHandler('No responseText recieved requesting VMAP.');
      }
    };
    request.onerror = function() {
      errorHandler('Error thrown on vmap request.');
    };
    request.open(options.method, options.url);
    request.send(null);
  };


  /**
   * Creates and sends an XMLHttpRequest.
   *
   * @param (required) settings {Object} it should contain a `metadataUri`
   *                                     property that indicates the URL to request
   * @param (required) successHandler {Function} a function to call when the
   *                                             request completes successfully.
   * @param (required) errorHandler {Function} a function to call when the
   *                                           request completes with an error.
   */
  xhr = function(settings, successHandler, errorHandler) {
    var
      options = videojs.util.mergeOptions({method: 'GET'}, settings),
      request = new XMLHttpRequest(),
      contentType,
      xmlHttpTimeout = setTimeout(function () {
        request.abort();
      },options.timeout);

    //Handler for non-IE browsers
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        clearTimeout(xmlHttpTimeout);
        if (request.status === 200) {
          if (request.responseXML !== null) {
            successHandler(request.responseXML);
          } else {
            errorHandler(request.responseText);
          }
        } else {
          errorHandler(request);
        }
      }
    };
    request.open(options.method, options.url, true);
    if (settings.contentHeaders) {
      for (contentType in contentHeaders()) {
        request.setRequestHeader('BCOV-Once-Accept', contentType);
      }
    }
    debug('making xhr request');
    request.send(null);
  };

  // register the plugin
  videojs.plugin('onceux', onceux);
})(window, window.videojs);