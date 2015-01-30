(function(window) {
  'use strict';
  var videojs = window.videojs;

  videojs.onceux.AdTracking = function(player, settings) {
    var
      self = this,
      debug,
      quartiles,
      seekQuartiles,
      quartileIndex = 0,
      seekQuartileIndex = 0,
      currentAdId,
      previousAdId,
      adRollCount,
      previousVolume,
      trackingImg;

    debug = settings.verbose ? player.onceux.log : function(){};

    self.sendTrackingRequest = function(trackingUrl) {
      if (!trackingImg) {
        trackingImg = document.createElement('img');
      }
      trackingImg.src = trackingUrl;
    };

    /**
     * Emits the onceux ad tracking events. Makes xhr request to the once
     * server with the tracking url parsed from the vmap.
     *
     * @param (required) player {Object} - A reference to the player
     * @param (required) path {String} - The path in the onceux timeline
     * @param (required) tracking {Object} - Tracking object
     **/
    self.fireAdTracking = function(player, path, tracking) {
      if (path.adRoll) {
        //if the tracking type is start and the index of the linearad
        //in the adroll is 0, fire adroll start event.
        if (tracking.type === 'start' && path.linearAd.index === 0 ) {
          debug('firing ad roll start');
          player.trigger({
            type: 'onceux-adroll-start',
            linearAd: path.linearAd,
            adRoll: path.adRoll
          });
        }
        debug('fireAdTracking ', 'onceux-linearad-' + tracking.type);
        //fire the tracking events.
        player.trigger({
          type: 'onceux-linearad-' + tracking.type,
          adRoll: path.adRoll,
          linearAd: path.linearAd
        });

        //if there is a tracking url for the event, make xhr request to
        //the server.
        if (tracking.url) {
          for (var i = 0; i < tracking.url.length; i++) {
            self.sendTrackingRequest(tracking.url);
          }
        }
      } else {
        debug('ad tracking call without ad?');
      }
    };

    /**
     * Retrieves the tracking url for the event.
     *
     * @param (required) linearAd {Object} - linearAd in the timeline
     * @param (required) eventName {String} - event name for which url is needed.
     **/
    self.getTrackingUrl = function(linearAd, eventName) {
      var
        elm,
        url = [];

      elm = player.onceux.objectAtPath(linearAd, 'AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative.0.Linear.TrackingEvents.Tracking');
      if (!elm) {
        return;
      }

      for (var i = 0; i < elm.length; i++) {
        //if eventName passed to this function matches with the event in the vmap tracking
        //object, push the url. There could be multiple url for the same event.
        if (elm[i].event === eventName) {
          url.push(elm[i].url) ;
        }
      }
      return url;
    };

    /**
     * timeupdate listener. This sends the proper quartile tracking values
     * as progress is made through a linearAd.
     **/
    self.trackProgress = function() {
      var
        player = this,
        currentPath = player.onceux.timeline.pathAtAbsoluteTime(player.currentTime());

      currentAdId = player.onceux.objectAtPath(currentPath, 'linearAd.breakId');

      if (!player.seekEvents.stable) {
        return;
      }

      if (seekQuartileIndex > 0) {
        //If this is the first progress event after seeking into an ad, the
        //seekQuartileIndex will be greater than 0.  Use the seekQuartiles and
        //the seekQuartileIndex that was computed by seekTrackingHandler().
        quartiles = seekQuartiles;
        quartileIndex = seekQuartileIndex;
        self.trackCompanion(currentPath);
        //reset seekQuartileIndex to 0
        seekQuartileIndex = 0;
      } else if (currentAdId && currentAdId !== previousAdId) {
        //If this is different ad than the last one we played, grab new quartiles
        //and reset the quartileIndex.
        quartiles = self.setQuartiles(currentPath.linearAd);
        quartileIndex = 0;
        self.trackCompanion(currentPath);
      }

      previousAdId = currentAdId;

      if (!quartiles[quartileIndex]) {
        //Ignore any timeUpdates that might fire after the complete event for
        //an ad has already been triggered.  This happens because we trigger
        //linearAd-complete .5 seconds before the actual end of the ad.
        return;
      }

      //for the current break id (ad), compare the player's current time with the
      //quartiles object.
      if (player.currentTime() >= Number(quartiles[quartileIndex].time)) {
        //fire the ad tracking event for the corresponding quartile event in the timeline.
        self.fireAdTracking(player, currentPath, quartiles[quartileIndex]);
        //and increment the quartile index.
        quartileIndex++;
      }
    };

     /**
     * listener for ad interaction events - pause, resume, mute, and unmute
     *
     * @param (required) player {Object} - A reference to the player
     * @param (required) eventName {String} - event name for which tracking needs to be fired
     **/
    self.AdInteraction = function(player, event) {
      var
        currentPath = player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()),
        adInteractions = self.setAdInteraction(currentPath.linearAd);

      if (player.seekEvents.stable) {
        self.fireAdTracking(player, currentPath, adInteractions[event]);
      }
    };

    /**
     * Creates the ad object for the interaction events - pause, resume, mute, and unmute
     *
     * @param (required) linearAd {Object} - linearAd in the timeline
     * @returns Ad object containing the url and type of the event that needs to be triggered.
     **/
    self.setAdInteraction = function(linearAd) {
      var Ad = {
        'pause': {},
        'resume': {},
        'mute': {},
        'unmute': {}
      };

      Ad.pause = {
        'url': self.getTrackingUrl(linearAd, 'pause'),
        'type': 'pause'
      };

      Ad.resume = {
        'url': self.getTrackingUrl(linearAd, 'resume'),
        'type': 'resume'
      };

      Ad.mute = {
        'url': self.getTrackingUrl(linearAd, 'mute'),
        'type': 'mute'
      };

      Ad.unmute = {
        'url': self.getTrackingUrl(linearAd, 'unmute'),
        'type': 'unmute'
      };

      return Ad;
    };

    /**
     * Creates the quartiles object.
     *
     * @param (required) linearAd {Object} - linearAd in the timeline
     * @returns Quartiles object containing the time, url, and type of the event that needs to be triggered.
     **/
    self.setQuartiles = function(linearAd) {
      var
        quartiles = {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {}
        },
        linearAdDuration = linearAd.absoluteEndTime - linearAd.absoluteBeginTime;

      //start
      quartiles[0] = {
        'time': linearAd.absoluteBeginTime.toFixed(1),
        'url': self.getTrackingUrl(linearAd, 'start'),
        'type': 'start'
      };
      //firstquartile
      quartiles[1] = {
        'time': (linearAd.absoluteBeginTime + 0.25 * linearAdDuration).toFixed(1),
        'url': self.getTrackingUrl(linearAd, 'firstQuartile'),
        'type': 'firstQuartile'
      };
      //midpoint
      quartiles[2] = {
        'time': (linearAd.absoluteBeginTime + 0.50 * linearAdDuration).toFixed(1),
        'url': self.getTrackingUrl(linearAd, 'midpoint'),
        'type': 'midpoint'
      };
      //thirdquartile
      quartiles[3] = {
        'time': (linearAd.absoluteBeginTime + 0.75 * linearAdDuration).toFixed(1),
        'url': self.getTrackingUrl(linearAd, 'thirdQuartile'),
        'type': 'thirdQuartile'
      };
      //complete
      quartiles[4] = {
        'time': (linearAd.absoluteEndTime - 0.5).toFixed(1),
        'url': self.getTrackingUrl(linearAd, 'complete'),
        'type': 'complete'
      };

      return quartiles;
    };

    self.trackCompanion = function(currentPath) {
      var
        adRoll = currentPath.adRoll,
        linearAd = currentPath.linearAd,
        tracking,
        trackingUrl;

      //check to see if there is an companionAd
      //if so, fire the tracking event of companionAd
      if (linearAd && linearAd.companionAd) {
        tracking = player.onceux.objectAtPath(linearAd.companionAd, 'TrackingEvents.Tracking.0');

        if (tracking && tracking.event === 'creativeView') {
          trackingUrl = tracking.url;
        }

        if (trackingUrl) {
          player.trigger({
            type: 'onceux-companionad-creativeView',
            adRoll: adRoll,
            linearAd: linearAd
          });
          debug('firing onceux-companionad-creativeView', trackingUrl);
          self.sendTrackingRequest(trackingUrl);
        }
      }
    };

    self.trackElement = function(player) {
      if (player.onceux.timeline.adRolls) {
        adRollCount = player.onceux.timeline.adRolls.length;
      }

      //on adstart - listen for timeupdate, pause, resume, and volume change events.
      player.on('adstart', function() {
        player.on('timeupdate', self.trackProgress);
        player.on('pause', self.pauseHandler);
        player.on('play', self.resumeHandler);
        player.on('volumechange', self.volumeHandler);
      });

      player.on('stable', self.seekTrackingHandler);

      //on adend - remove listeners for timeupdate, pause, resume, and volume change events.
      player.on('adend', function() {
        player.off('timeupdate', self.trackProgress);
        player.off('pause', self.pauseHandler);
        player.off('play', self.resumeHandler);
        player.off('volumechange', self.volumeHandler);
      });

      player.on('onceux-linearad-start', function(event) {
        var impressionUrl = player.onceux.objectAtPath(event.linearAd, 'AdSource.VASTData.VAST.Ad.Inline.Impression');

        //fire the impression url
        if (impressionUrl) {
          player.trigger({
            type: 'onceux-linearad-impression',
            adRoll: event.adRoll,
            linearAd: event.linearAd
          });
          debug('firing ad impression ', impressionUrl);
          self.sendTrackingRequest(impressionUrl);
        }
      });

      //on linearad complete, check to see if the index of the linearad that
      //complets playing is the last of all the ads in the pod. if so, fire
      //adroll complete event.
      player.on('onceux-linearad-complete', function(event) {
        if (event.linearAd.index === event.adRoll.linearAdCount - 1) {
          debug('firing ad roll complete');
          player.trigger({
            type: 'onceux-adroll-complete',
            linearAd: event.linearAd,
            adRoll: event.adRoll
          });
        }
      });

      //on adroll complete, check to see if the index of the adroll that
      //completes playing is last of all the adroll in the entire duration of content.
      player.on('onceux-adroll-complete', function(event) {
        var adPlayed = true;
        if (event.adRoll.index === adRollCount - 1) {
          for (var adRollIndex = 0; adRollIndex < adRollCount; adRollIndex++) {
            //if the playCount of the adRoll is 0, it means that the adRoll
            //is skipped
            if (player.onceux.timeline.adRolls[adRollIndex].playCount <= 0) {
              adPlayed = false;
              break;
            }
          }
          // fire all ads complete event only if all the adrolls have been played.
          if(adPlayed) {
            debug('firing all ads complete event');
            player.trigger({
              type: 'onceux-ads-complete',
              linearAd: event.linearAd,
              adRoll: event.adRoll
            });
          }
        }
      });

      player.on('onceux-linearad-skipped', function(event) {
        self.sendTrackingRequest(self.getTrackingUrl(event.linearAd, 'skip'));
      });
    };

    /**
     * Resets the the quartileIndex to 0 and, if the seekEnd lands within
     * a linearAd, will set the seekQuartileIndex and seekQuartiles to
     * reflect the seek position.
     *
     * For example, if you use seekAds() to seek 4 seconds into a 10 second ad
     * the seekQuartiles would reflect the values for the ad and the
     * seekQuartileIndex would be set to 2 so that the first tracking event
     * to fire would be the midPoint.
     **/
    self.seekTrackingHandler = function() {
      var
        seekEvent = player.seekEvents.last(),
        seekEnd = player.onceux.objectAtPath(seekEvent, 'seekEnd'),
        seekEndLinearAd = player.onceux.objectAtPath(player.onceux.timeline.pathAtAbsoluteTime(seekEnd), 'linearAd'),
        quartileIndex = 0;

      //If the seekEnd was not in an ad, just return after resetting the
      //quartileIndex to 0.
      if (!seekEnd || !seekEndLinearAd) {
        return;
      }

      //Oddly, there are 5 "quartiles":
      //  start, first, mid, third, complete
      seekQuartiles = self.setQuartiles(seekEndLinearAd);
      while (quartileIndex < 5) {
        if (Number(seekQuartiles[quartileIndex].time) >= seekEnd) {
          //Set the seekQuartileIndex to the first quartile
          //that is past the seekEnd
          seekQuartileIndex = quartileIndex;
          return;
        }
        quartileIndex++;
      }
    };

    /**
     * listener for ad pause event.
     **/
    self.pauseHandler = function() {
      var player = this;
      self.AdInteraction(player, 'pause');
    };

    /**
     * listener for ad resume event.
     **/
    self.resumeHandler = function() {
      var player = this;
      self.AdInteraction(player, 'resume');
    };

    /**
     * listener for ad mute/unmute events.
     **/
    self.volumeHandler = function() {
      var
        player = this,
        currentVolume = player.volume();

      if (currentVolume !== previousVolume) {
        if (currentVolume === 0) {
          self.AdInteraction(player, 'mute');
        }
        if (previousVolume === 0 && currentVolume > 0) {
          self.AdInteraction(player, 'unmute');
        }
      }

      previousVolume = currentVolume;
    };
  };
})(window);