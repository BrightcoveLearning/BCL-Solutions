(function(window) {
  'use strict';
  var videojs = window.videojs;

  // this code works very similarly to a recursive-descent parser
  // create a function to extract each high-level property you want
  // to build in your output object and then call those helper
  // functions as you work your way down to the leaf nodes of the XML
  // see http://en.wikipedia.org/wiki/Recursive_descent_parser
  videojs.onceux.VmapParser = function() {
    var
      self = this;

    self.parse = function(xml) {
      var
        vmap = {},
        parsableAdBreaks,
        timedTextURL;

      if (!xml.querySelector('VMAP') || !xml.querySelector('unicornOnce')) {
        return null;
      }

      vmap = {
        Extensions: {
          once: {
            contenturi: xml.querySelector('unicornOnce').getAttribute('contenturi'),
            contentlength: xml.querySelector('unicornOnce').getAttribute('contentlength'),
            payloadlength: xml.querySelector('unicornOnce').getAttribute('payloadlength')
          }
        }
      };

      timedTextURL = xml.querySelector('timedTextURL');
      if (timedTextURL) {
        vmap.Captions = {
          timedTextURL: timedTextURL.textContent,
          languageCode: timedTextURL.getAttribute('languageCode')
        };
      }

      parsableAdBreaks = xml.querySelectorAll('AdBreak');
      if (parsableAdBreaks) {
        vmap.adBreaks = [];
        for (var i = 0; i < parsableAdBreaks.length; i++) {
          vmap.adBreaks.push(self.parseBreak(parsableAdBreaks[i]));
        }
        //Remove any keys/objects with null or underfined values from the vmap
        self.removeUndefinedKeys(vmap);
        return vmap;
      }
    };

    self.parseBreak = function(elem) {
      if (elem) {
        return {
            breakType: elem.getAttribute('breakType'),
            breakId: elem.getAttribute('breakId'),
            timeOffset: elem.getAttribute('timeOffset'),
            AdSource: self.parseSource(elem.querySelector('AdSource'))
        };
      }
    };

    self.parseSource = function(elem) {
      if (elem) {
        return {
          id: elem.getAttribute('id'),
          VASTData: {
            VAST: {
              Ad: self.parseAd(elem.querySelector('Ad'))
            }
          }
        };
      }
    };

    self.parseAd = function(elem) {
      if (elem) {
        return {
          id: elem.getAttribute('id'),
          Inline: self.parseInlineAd(elem.querySelector('InLine'))
        };
      }
    };

    self.parseInlineAd = function(elem) {
      if (elem) {
        return {
          Impression: elem.querySelector('Impression').textContent,
          Creatives: {
            Creative: [{
              Linear: self.parseLinear(elem.querySelector('Creatives Creative Linear')),
              CompanionAds: self.parseCompanionAds(elem.querySelector('Creatives Creative CompanionAds'))
            }]
          }
        };
      }
    };

    self.parseLinear = function(elem) {
      if (elem) {
        return {
          skipoffset: elem.getAttribute('skipoffset'),
          Duration: elem.querySelector('Duration').textContent,
          VideoClicks: self.parseVideoClicks(elem.querySelector('VideoClicks')),
          TrackingEvents: self.parseTrackingEvents(elem.querySelector('TrackingEvents'))
        };
      }
    };

    self.parseVideoClicks = function(elem) {
      if (elem) {
        return {
          ClickThrough: self.parseClickThrough(elem.querySelector('ClickThrough')),
          ClickTracking: self.parseClickTracking(elem.querySelector('ClickTracking'))
        };
      }
    };

    self.parseClickThrough = function(elem) {
      if (elem) {
        return {
          id: elem.getAttribute('id'),
          url: elem.textContent
        };
      }
    };

    self.parseClickTracking = function(elem) {
      if (elem) {
        return {
          id: elem.getAttribute('id'),
          url: elem.textContent
        };
      }
    };

    self.parseTrackingEvents = function(elem) {
      if (elem) {
        return {
          Tracking: self.parseTracking(elem.querySelectorAll('Tracking'))
        };
      }
    };

    self.parseTracking = function(elem) {
      if (elem) {
        var tracking = [];
        for (var i = 0; i < elem.length; i++) {
          tracking.push({
            event: elem[i].getAttribute('event'),
            offset: elem[i].getAttribute('offset'),
            url: elem[i].textContent
          });
        }
        return tracking;
      }
    };

    self.parseCompanionAds = function(elem) {
      if (elem) {
        return {
          Companion: self.parseCompanion(elem.querySelector('Companion'))
        };
      }
    };

    self.parseCompanion = function(elem) {
      if (elem) {
        return {
          id: elem.getAttribute('id'),
          width: elem.getAttribute('width'),
          height: elem.getAttribute('height'),
          CompanionClickThrough: elem.querySelector('CompanionClickThrough') ? elem.querySelector('CompanionClickThrough').textContent : null,
          TrackingEvents: self.parseTrackingEvents(elem.querySelector('TrackingEvents')),
          StaticResource: self.parseStaticResource(elem.querySelector('StaticResource'))
        };
      }
    };

    self.parseStaticResource = function(elem) {
      if (elem) {
        return {
          creativeType: elem.getAttribute('creativeType'),
          url: elem.textContent
        };
      }
    };

    self.removeUndefinedKeys = function(obj) {
      //remove all keys with null || undefined values
      for (var k in obj) {
        if (obj[k] === null || obj[k] === undefined) {
          if (k instanceof Array) {
            obj.splice(k,1);
          } else {
            delete obj[k];
          }
        } else if (typeof obj[k] === 'object') {
          self.removeUndefinedKeys(obj[k]);
        }
      }
    };
  };
})(window);