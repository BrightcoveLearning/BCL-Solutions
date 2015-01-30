(function(window) {
  'use strict';
  var videojs = window.videojs;

  videojs.onceux.DefaultOverlays = function(player, settings) {
    var
      self = this,
      debug = settings.verbose ? player.onceux.log : function(){};

    // Setup the linear ad overlay banner listeners if they are not already created.
    self.init = function(player) {
      debug('initializing default overlays');
      if (!player.el().querySelector('.vjs-overlay-onceux-countdown')) {
        player.overlay({
          overlays: [{
            content: ' ',
            start: 'adstart',
            end: 'adend',
            align: 'onceux-countdown'
          },
          {
            content: ' ',
            start: 'adstart',
            end: 'adend',
            align: 'onceux-skipad'
          }]
        });
      }
    };

    /*
     * This method is called on every timeupdate event while an advertisement
     * is playing so that the default overlays which show the remaining ads and
     * total ad time as well as the learn more link and skipAd button (if necessary)
     * are updated.
     *
     * @param (required) player {Object} - A reference to the player
     * @param (required) currentPath {Object} - The path on the timeline where the
     *                                          player currently is.
     *
     * @returns
     */
    self.updateOverlays = function(player, currentPath) {
      var
        //Top Banner Overlay
        currentAdIndex = currentPath.linearAd.index + 1,
        totalAdsInAdRoll = currentPath.adRoll ? currentPath.adRoll.linearAdCount : 0,
        clickThrough = currentPath.linearAd.AdSource.VASTData.VAST.Ad.Inline.Creatives.Creative[0].Linear.VideoClicks.ClickThrough,
        adRollMessage = '',
        countdownOverlay = player.el().getElementsByClassName('vjs-overlay-onceux-countdown')[0],
        adsRemainingText = player.el().getElementsByClassName('vjs-overlay-onceux-countdown-text')[0],
        learnMoreText = player.el().getElementsByClassName('vjs-overlay-onceux-learnmore-text')[0],

        //Skip Ad Button
        skipTimeRemaining = 0,
        skipAdOverlay = player.el().getElementsByClassName('vjs-overlay-onceux-skipad')[0],
        skipAdText = player.el().getElementsByClassName('vjs-overlay-onceux-skipad-text')[0];

      //countdownOverlay will not exist if they set the "hideOverlays: true" setting.
      if (countdownOverlay) {
        if (!adsRemainingText) {
          //creates the countdown element text to display the number of ads and time 
          //remaining in the top left.
          adsRemainingText = document.createElement('p');
          adsRemainingText.className = 'vjs-overlay-onceux-countdown-text';
          countdownOverlay.appendChild(adsRemainingText);
        }
        if (!learnMoreText) {
          //creates the element to display a click-through link in the top right.
          learnMoreText = document.createElement('p');
          learnMoreText.className = 'vjs-overlay-onceux-learnmore-text';
          countdownOverlay.appendChild(learnMoreText);
        }

        if (currentAdIndex !== totalAdsInAdRoll) {
          adRollMessage = currentAdIndex + ' of ' + totalAdsInAdRoll + ' - ';
        }
        adsRemainingText.innerHTML = adRollMessage + 'Your video will resume in ' + Math.round(currentPath.adRoll.absoluteEndTime - player.currentTime()) + ' seconds';

        if (clickThrough && clickThrough.url) {
          //setting target="_blank" enforces that a new tab is opened
          learnMoreText.innerHTML = '<a target="_blank" href=\'' + clickThrough.url + '\'>Learn More</a>';
        } else {
          learnMoreText.innerHTML = '';
        }
      }

      //skipAdOverlay will not exist if they set the "hideOverlays: true" setting
      //or the ad is not skippable based on the VMAP metadata.
      if (skipAdOverlay) {
        if (!currentPath.linearAd || !currentPath.linearAd.skipoffset) {
          return;
        }

        //The number of seconds that must still be watched until the ad can be skipped.
        skipTimeRemaining = currentPath.linearAd.skipoffset - currentPath.contentTime;
        
        //Add the skipAdText if its not already present
        if (!skipAdText) {
          //creates the skip ad element text in the bottom right.
          skipAdText = document.createElement('p');
          skipAdText.className = 'vjs-overlay-onceux-skipad-text';
          skipAdOverlay.appendChild(skipAdText);
          //Add the listener to call seekAds when the element is clicked.
          skipAdOverlay.addEventListener('click', function() {
            //'Skip Ad' text is only visible once they have watched the required
            //duration of the ad. 
            if (skipAdText.innerHTML.indexOf('Skip Ad') === 0) {
              player.onceux.seekAds(player.onceux.timeline.pathAtAbsoluteTime(player.currentTime()).linearAd.absoluteEndTime);
            }
          });
        }
        
        //Update the text based on whether we've passed the skipoffset or not
        if (skipTimeRemaining <= 0) {
          skipAdText.innerHTML = 'Skip Ad &rarrb;';
          skipAdOverlay.style.cursor = 'pointer';
        } else {
          skipAdText.innerHTML = 'You can skip this ad in ' + Math.round(skipTimeRemaining) + ' seconds';
          skipAdOverlay.style.cursor = 'default';
        }
      }
    };
  };
})(window);