(function(window, vjs) {
  vjs.onceux.Controls = function(player, options) {
    var
      onceControls,
      onceControlBar,

      // grab the tech element (HTML5 video element or Flash object)
      tech = player.el().querySelector('.vjs-tech'),

      // create ad container overlay element and insert into player
      adContainer = document.createElement('div');

    // initialize the ad container
    adContainer.className = 'vjs-onceux-ad-container';
    tech.parentNode.insertBefore(adContainer, tech.nextSibling);
    
    onceControls = vjs.onceux.player(adContainer, {
      contentPlayer: player
    });

    onceControlBar = new vjs.ControlBar(onceControls, options.adControlBar);
    onceControlBar.addClass('vjs-onceux-control-bar');
    player.addChild(onceControlBar);
    return onceControls;
  };

  /**
   * A minimalist player that extends Component and uses that to construct
   * a separate control bar to playback the ad and content.
   */
  vjs.onceux.controlProxy = videojs.Component.extend({
    buffered: function() {
      return [];
    },
    init: function(elem, options, ready) {
      //run the prototype initializers
      vjs.Component.call(this, this, options, ready);

    },
    language: function() {},
    languages: function() {},

    localize: function() {},
    muted: function(value) {
      if (value !== undefined) {
        return this.volume(value ? 0 : 1) === 0;
      }
      return this.volume() === 0;
    },
    remainingTime: function() {
      return this.duration() - this.currentTime();
    },
    exitFullscreen: function() {
      return this.options().contentPlayer.exitFullscreen();
    },
    reportUserActivity: function() {},
    requestFullscreen: function() {
      return this.options().contentPlayer.requestFullscreen();
    },
    textTracks: function() {
      return vjs.MediaTechController.prototype.textTracks.call(this);
    },
    remoteTextTracks: function() {
      return vjs.MediaTechController.prototype.remoteTextTracks.call(this);
    },
    addTextTrack: function() {
      return vjs.MediaTechController.prototype.addTextTrack.apply(this, arguments);
    },
    addRemoteTextTrack: function() {
      return vjs.MediaTechController.prototype.addRemoteTextTrack.apply(this, arguments);
    },
    removeRemoteTextTrack: function() {
      return vjs.MediaTechController.prototype.removeRemoteTextTrack.apply(this, arguments);
    }
  });

  /**
   * This player is then specialized by onceux timeline to provide controls for ad
   * and content playback.
   * Returns a player decorated to proxy calls back and forth with the core videojs
   * @param options {object} a hash of options to pass to the player
   *
   * @returns {object} a videojs.onceux.Controls
   */
  vjs.onceux.player = function(elem, options) {
    var
      controlProxy = new vjs.onceux.controlProxy(elem, options),
      contentPlayer = options.contentPlayer,
      _paused = false,
      _volume = 1,

      simulateTimeupdate = function() {
        //prevents unecessary timeupdate trigger while the player is paused
        //and not in a playable state
        if (!controlProxy.paused() && contentPlayer.currentTime()) {
          controlProxy.trigger('timeupdate');
          if (contentPlayer.ads.state === 'ad-playback') {
            updateMarkerDisplayStyle('none');
          } else {
            updateMarkerDisplayStyle('block');
          }
        }
        window.setTimeout(simulateTimeupdate, 250);
      },

      updateMarkerDisplayStyle = function(style) {
        var markers = contentPlayer.el().querySelectorAll('.vjs-marker');
        for (var i = 0; i < markers.length; i++) {
          //If there are markers
          if (markers[i]) {
            //show the markers when the content is playing.
            markers[i].style.display = style;
          }
        }
      };

    contentPlayer.on('play', function() {
      controlProxy.play(true);
    });

    contentPlayer.on('pause', function() {
      controlProxy.pause(true);
    });

    contentPlayer.on('volumechange', function() {
      controlProxy.volume(contentPlayer.volume(), true);
    });

    contentPlayer.on('loadedmetadata', function() {
      controlProxy.trigger('timeupdate');
      updateMarkerDisplayStyle('block');
    });

    /**
     * Creates the markers on control bar for midRolls
     *
     * @param None
     *
     * @returns
     */
    controlProxy.createMarkers = function() {
      var
        markers = controlProxy.markers(),
        duration = contentPlayer.onceux.timeline.contentDuration,
        elem,
        pos,
        marker_id = '-videojsmarker-',
        video_wrapper = contentPlayer.el();

       for (var i = 0; i < markers.length; i++) {
          pos = (markers[i].startTime/duration) * 100;

          elem = document.createElement('div');
          elem.className = 'vjs-marker';
          elem.id = video_wrapper.id + marker_id + i;
          elem.style.left = pos + '%';

          //hide them to start with.
          elem.style.display = 'none';
          video_wrapper.querySelector('.vjs-onceux-control-bar .vjs-progress-control .vjs-progress-holder.vjs-slider').appendChild(elem);
       }
    };

    controlProxy.markers = function() {
      var
        adRollIterator,
        markers = [],
        timeOffset,
        currentAdRoll;

      //initialize the markers array with the mid-roll ad start times and duration.
      if (contentPlayer.onceux.timeline.adRolls) {
        for (adRollIterator = 0; adRollIterator < contentPlayer.onceux.timeline.adRolls.length; adRollIterator++) {
          currentAdRoll = contentPlayer.onceux.timeline.adRolls[adRollIterator];
          timeOffset = currentAdRoll.timeOffset;
          if (timeOffset === 'start' || timeOffset === 'end') {
            //ignoring pre-roll and post roll ads.
            continue;
          } else {
            markers.push({
              startTime: contentPlayer.onceux.toSeconds(currentAdRoll.linearAds[0].timeOffset),
              duration: currentAdRoll.absoluteEndTime - currentAdRoll.absoluteBeginTime
            });
          }
        }
      }
      return markers;
    };

    controlProxy.currentTime = function(seekControlTime) {
      var
        seekDiff,
        absoluteSeekTime,
        currentPath = contentPlayer.onceux.timeline.pathAtAbsoluteTime(contentPlayer.currentTime()),
        contentTime = contentPlayer.onceux.objectAtPath(currentPath, 'contentTime'),
        totalAdDuration,
        skippedAdDurations = function(fromTime, toTime) {
          var
            midRolls = controlProxy.markers(),
            adDurations = 0,
            seekingForward = (fromTime < toTime);

          for (var i = 0; i < midRolls.length; i++) {
            //skipping forward
            if (seekingForward && fromTime < midRolls[i].startTime && toTime > midRolls[i].startTime) {
              adDurations += midRolls[i].duration;
            }

            //skipping backward
            if (!seekingForward && fromTime > midRolls[i].startTime && toTime < midRolls[i].startTime) {
              adDurations += midRolls[i].duration;
            }
          }
          return adDurations;
        };

      //returns the content time whether ad or content is playing.
      if (!seekControlTime) {
        return contentTime;
      }
      //otherwise, if time is passed as an argument which happens
      //when control bar is scrubbed when the content is playing
      //then diff the time between when the scrub started and ended
      //and add/subtract it to the player's currentTime dependig
      //on seeking forward/backward. Also need to account any
      //midRoll's duration when seeking.
      seekDiff = seekControlTime - contentTime;
      totalAdDuration = skippedAdDurations(contentTime, seekControlTime);
      if (seekDiff < 0) {
        absoluteSeekTime = contentPlayer.currentTime() - Math.abs(seekDiff) - totalAdDuration;
      } else {
        absoluteSeekTime = contentPlayer.currentTime() + seekDiff + totalAdDuration;
      }
      contentPlayer.currentTime(absoluteSeekTime);
    };

    controlProxy.duration = function() {
      var ad = contentPlayer.onceux.objectAtPath(contentPlayer.onceux.timeline.pathAtAbsoluteTime(contentPlayer.currentTime()), 'linearAd');
      if (ad && contentPlayer.currentTime()) {
        return ad.absoluteEndTime - ad.absoluteBeginTime;
      }
      return contentPlayer.onceux.timeline.contentDuration;
    };

    controlProxy.pause = function(eventTrigger) {
      _paused = true;
      controlProxy.trigger('pause');
      if (!eventTrigger) {
        contentPlayer.pause();
      }
    };

    controlProxy.paused = function() {
      return _paused;
    };

    controlProxy.play = function(eventTrigger) {
      _paused = false;
      controlProxy.trigger('play');
      if (!eventTrigger) {
        contentPlayer.play();
      }
    };

    controlProxy.isFullscreen = function() {
      return contentPlayer.isFullscreen();
    };

    controlProxy.requestFullscreen = function() {
      return contentPlayer.requestFullscreen();
    };

    controlProxy.exitFullscreen = function() {
      return contentPlayer.exitFullscreen();
    };

    controlProxy.volume = function(value, eventTrigger) {
      if (value !== undefined) {
        _volume = value;
        if (!eventTrigger) {
          contentPlayer.volume(value);
        }
        controlProxy.trigger('volumechange');
      }
      return _volume;
    };

    //trigger timeupdates regularly during playback.
    contentPlayer.one('playing', function() {
      simulateTimeupdate();
    });

    return controlProxy;
  };
})(window, window.videojs);