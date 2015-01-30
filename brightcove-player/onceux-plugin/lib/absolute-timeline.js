(function(window) {
  'use strict';
  var videojs = window.videojs;

  videojs.onceux.AbsoluteTimeline = function(player) {
    var
      self = this;

    /**
     * Creates the player.onceux.timeline Object with all the details
     * parsed from the vmap.
     *
     * @param (required) vmap {Object}
     * @param (required) callback {Function} - The function to callback when
     *                                         the timline has been created.
     **/
    self.createTimeline = function(vmap, callback) {
      // contenturi, adRolls is guaranteed to exist if we are here
      self.timeline = {
        contenturi: vmap.Extensions.once.contenturi,
        adRolls: self.createAdRolls(vmap),
        absoluteDuration: parseFloat(vmap.Extensions.once.payloadlength),
        contentDuration: parseFloat(vmap.Extensions.once.contentlength),
        pathAtAbsoluteTime: self.pathAtAbsoluteTime
      };
      callback(self.timeline);
    };

    /**
     * Parsed the vmap and creates the adRolls object with all the linearAd
     * information for the timeline.
     *
     * @param (required) vmap {Object}
     *
     * @returns {Object} - null if there are no ads
     **/
    self.createAdRolls = function(vmap) {
      var
        adBreak,
        linearAds = {},
        adDuration,
        adRollCounter = 0,
        adRolls = [];

      for (var i = vmap.adBreaks.length - 1; i >= 0; i--) {
        adBreak = vmap.adBreaks[i];
        if (adBreak.breakType === 'linear') {
          // If the adBreaks are invalid, don't bother adding them to an adRoll and throw an error.
          adDuration = player.onceux.objectAtPath(adBreak, 'AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative.0.Linear.Duration');
          if (!adDuration) {
            videojs.log.error('OnceUX VMAP parser error: Expected Ad Properties on linear ad not found.  Removing linear Ad.');
            continue;
          }
          //Otherwise add the linear adBreak to the linearAds map
          if(!linearAds[adBreak.timeOffset]) {
            linearAds[adBreak.timeOffset] = [];
          }
          //Use unshift here because we are looping in reverse order.
          linearAds[adBreak.timeOffset].unshift(adBreak);
        }
      }

      //Once we have the map of linear ads, we can create the adRolls
      //The linearAds map should look something like this at this point:
      //  linearAds: {
      //    'start': [{}, {}],
      //    '00:00:05': [{}],
      //    'end': [{}, {}]
      //  }
      adRolls = [];
      for (var key in linearAds) {
        adRolls[adRollCounter] = {
          linearAds: linearAds[key]
        };
        adRollCounter++;
      }
      // Use reverse here because we looped through in reverse order when adding the adBreaks.
      adRolls = adRolls.reverse();
      // Add calculated absoluteBeginTime and absoluteEndTime properties to the timeline
      adRolls = self.addAbsoluteAdTimes(parseFloat(vmap.Extensions.once.contentlength), adRolls);

      return adRolls.length > 0 ? adRolls : null;
    };

    self.getAdDuration = function(linearAd) {
      if (!linearAd.AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative[0].Linear.Duration) {
        return null;
      } else {
        return player.onceux.toSeconds(linearAd.AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative[0].Linear.Duration);
      }
    };

    self.getSkipOffset = function(linearAd) {
      var skipOffset = linearAd.AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative[0].Linear.skipoffset;
      if (!skipOffset) {
        return null;
      } else {
        if (skipOffset.indexOf('%') > 0) {
          return self.getAdDuration(linearAd) * (skipOffset.split('%')[0] / 100);
        } else {
          return player.onceux.toSeconds(skipOffset);
        }
      }
    };

    /**
     * Populates the timeline with absoluteTimes for all adRolls and linearAds within them.
     * This method also sets the playCount and requiredPlayCount values on each adRoll and linearAd
     * to require only 1 view before they can be skipped.
     *
     * @param (required) contentDuration {Number} - The total duration of the content without ads
     *                                              This value is parsed from the vmap.
     * @param (required) adRolls {Object} - The parsed adRolls from the vmap.
     *
     * @returns {Object} - The adRolls Object passed in with the absolute times added.
     */
    self.addAbsoluteAdTimes = function(contentDuration, adRolls) {
      var
        adRollIndex,
        adIndex,
        adDuration = 0,
        totalPreRollDuration = 0,
        totalMidRollDuration = 0,
        totalPostRollDuration = 0,
        firstAdBreak = {},
        lastAdBreak = {},
        linearAd,
        adCount;

      // If there aren't any adRolls just return
      if (!adRolls) {
        return;
      }

      // Otherwise, loop through all of the adRolls and set the absoluteBeginTime
      // and absoluteEndTime for each linearAd
      for (adRollIndex = 0; adRollIndex < adRolls.length; adRollIndex++) {
        adCount = adRolls[adRollIndex].linearAds.length;
        for (adIndex = 0; adIndex < adCount; adIndex++) {
          linearAd = adRolls[adRollIndex].linearAds[adIndex];
          linearAd.playCount = 0;
          linearAd.index = adIndex;
          linearAd.skipoffset = parseFloat(self.getSkipOffset(linearAd)) || 0;
          linearAd.companionAd = player.onceux.objectAtPath(linearAd, 'AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative.0.CompanionAds.Companion');
          adDuration = parseFloat(self.getAdDuration(linearAd));
          // The absoluteBeginTime is calculated differently based on the type of ad
          if (linearAd.timeOffset === 'start') {
            // Its a preroll ad!!
            linearAd.absoluteBeginTime = parseFloat(totalPreRollDuration);
            totalPreRollDuration += adDuration;
          } else if (linearAd.timeOffset === 'end') {
            // Its a postroll ad!!
            linearAd.absoluteBeginTime = parseFloat(totalPreRollDuration + totalMidRollDuration + contentDuration + totalPostRollDuration);
            totalPostRollDuration += adDuration;
          } else {
            // Its a midroll ad!!
            linearAd.absoluteBeginTime = parseFloat(totalPreRollDuration + totalMidRollDuration + player.onceux.toSeconds(linearAd.timeOffset));
            totalMidRollDuration += adDuration;
          }
          // the absoluteEndTime is calculated the same way regardless of type
          linearAd.absoluteEndTime = parseFloat(linearAd.absoluteBeginTime + adDuration);
        }
        // Once, we've looped through all the ads for an adRoll, if there were linear Ads
        // set the adRoll's timeOffset, absoluteBeginTime, and absoluteEndTime'
        if (adRolls[adRollIndex].linearAds.length) {
          firstAdBreak = adRolls[adRollIndex].linearAds[0];
          lastAdBreak = adRolls[adRollIndex].linearAds[adRolls[adRollIndex].linearAds.length - 1];
          adRolls[adRollIndex].timeOffset = firstAdBreak.timeOffset;
          adRolls[adRollIndex].absoluteBeginTime = firstAdBreak.absoluteBeginTime;
          adRolls[adRollIndex].absoluteEndTime = lastAdBreak.absoluteEndTime;
          adRolls[adRollIndex].playCount = 0;
          adRolls[adRollIndex].index = adRollIndex;
        }
      }
      return adRolls;
    };

    /*
     * Given an absolute time, provide the contentTime (i.e. content
     * playbacks currentTime) and the linearAd details.
     *
     * @param (required) currentAbsoluteTime {Number} - The current absolute time.
     *
     * @returns {Object} - {
     *                        absoluteTime: {Number},
     *                        contentTime: {Number},
     *                        adRoll: {Object},
     *                        linearAd: {Object}
     *                     }
     */
    self.pathAtAbsoluteTime = function(currentAbsoluteTime) {
      var
        path = {
          absoluteTime: currentAbsoluteTime,
          contentTime: currentAbsoluteTime,
          adRoll: null,
          linearAd: null
        },
        adRoll = self.getCurrentAdRoll(currentAbsoluteTime),
        linearAd = self.getCurrentLinearAd(currentAbsoluteTime),
        adPod;

      if (currentAbsoluteTime < 0 || currentAbsoluteTime > self.timeline.absoluteDuration) {
        return null;
      }

      // If there aren't any adRolls just return the contentTime as the absoluteTime
      if (!self.timeline.adRolls) {
        return path;
      }

      //ctime is within a linearAd
      if (linearAd) {
        path.contentTime -= linearAd.absoluteBeginTime;
        path.linearAd = linearAd;
        path.adRoll = {
          absoluteBeginTime: adRoll.absoluteBeginTime,
          absoluteEndTime: adRoll.absoluteEndTime,
          linearAdCount: adRoll.linearAds.length,
          playCount: adRoll.playCount,
          index: adRoll.index
        };
        return path;
      }

      //ctime is in content
      for (var i = 0; i < self.timeline.adRolls.length; i++) {
        adPod = self.timeline.adRolls[i];
        //if we've passed this adRoll with linearAds subtract it from the contentTime
        if (adPod.linearAds && currentAbsoluteTime > adPod.absoluteEndTime) {
          path.contentTime -= adPod.absoluteEndTime - adPod.absoluteBeginTime;
        } else {
          //we're past all the relevant adRolls (ones that have already been played)
          break;
        }
      }
      return path;
    };

    self.getCurrentLinearAd = function (cTime) {
      var
        linearAdIndex,
        linearAd,
        adRoll = self.getCurrentAdRoll(cTime);

      if (!adRoll || !adRoll.linearAds) {
        return null;
      }

      for (linearAdIndex = 0; linearAdIndex < adRoll.linearAds.length; linearAdIndex++) {
        linearAd = adRoll.linearAds[linearAdIndex];
        if (cTime >= linearAd.absoluteBeginTime && cTime <= linearAd.absoluteEndTime) {
          return linearAd;
        }
      }
      return null;
    };

    self.getCurrentAdRoll = function (cTime) {
      var
        adRollIndex,
        adRoll;

      if (self.timeline.adRolls) {
        for (adRollIndex = 0; adRollIndex < self.timeline.adRolls.length; adRollIndex++) {
          adRoll = videojs.util.mergeOptions({}, self.timeline.adRolls[adRollIndex]);
          if (cTime >= adRoll.absoluteBeginTime && cTime <= adRoll.absoluteEndTime) {
            return adRoll;
          }
        }
      }
      return null;
    };
  };
})(window);