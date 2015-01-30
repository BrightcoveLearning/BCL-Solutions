# Video.js OnceUX

OnceUX plugin for the Brightcove video.js player

## Getting Started

Once you've added the OnceUX plugin script to your page, you can use it with any Brightcove Once video:

```html
<script src="video.js"></script>
<script src="videojs-onceux.js"></script>
<script>
  var options = {
    metadataUri : 'http://onceux.unicornmedia.com/now/ads/vmap/od/auto/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/9b118b95-38df-4b99-bb50-8f53d62f6ef8??umtp=0'
  }
  videojs(document.querySelector('video')).onceux(options);
</script>
```
This plugin allows the Brightcove video.js player to playback [Brightcove Once](https://www.brightcove.com/en/once) URIs.

The default behavior of the plugin enforces that all advertisements are watched and displays an ad countdown timer while they play.  However, the plugin provides a playback timeline and functions to aid developers who wish to customize their onceUX integration to show their own overlays or allow users to skip advertisements.

There's also a [working example](example.html) of the plugin you can check out if you're having trouble.

If this is your first time using this plugin it might be helpful to read through the [Glossary](#glossary).

Perhaps you just want to see a [player configuration](#players) or the [tracking events](#events)?

### OPTIONS

You must pass in an options object to the plugin upon initialization. This
object must contain a metadataURI (or vmap object) and may contain any of the other following properties:

#### metadataUri
Type: `String`
Default: undefined
Example: 'http://onceux.unicornmedia.com/now/ads/vmap/od/auto/1234'

(Required) The uri to call for the once vmap data.

#### contentHeaders
Type: `Boolean`
Default: false
Example: true //Will play HLS content on desktop browsers with flash installed

(Optional) If true, Brightcove specific content headers will be sent in the metadataUri request.  These headers
will ask Once to deliver an HLS contentUri wherever the Brightcove player has added HLS support (i.e. dekstop
browsers with flash installed).  Only set this true, if you are using a Brightcove player or a videoJS player
with the HLS tech plugin. When set false, the default formats preferred by Once will be returned as the contentUri.

#### hideOverlay
Type: `Boolean`
Default: false
Example: true //Hides default overlays

(Optional) If true, the countdown timer and "Learn More" click through overlays will not
be shown while ads are playing.

#### timeout
Type: `Number`
Default: 45000
Example: 10000 //10 seconds

(Optional) The time in ms to wait for the once uri to respond.

#### vmap
Type: `Object`

(Optional) If this is passed, plugin will use this vmap object instead of calling metadata url to get the vmap.

Example:

```JSON
{
  "Extensions":{
    "once":{
      "contenturi":"http://onceux.unicornmedia.com/now/ads/vmap/od/auto/1234",
      "contentlength":"105.867",
      "payloadlength":"196.067"
    }
  },
  "adBreaks":[
    {
      "breakType":"linear",
      "breakId":"PreRoll_0_0",
      "timeOffset":"start",
      "AdSource":{
        "allowMultipleAds":"true",
        "followRedirects":"true",
        "id":"0",
        "VASTData":{
          "VAST":{
            "Ad":{
              "id":"UmdemoAds",
              "Inline":{
                "AdSystem":"UnicornInternal",
                "AdTitle":"videoadvertisement",
                "Description":"video ad",
                "Impression":"http://impressionurl1.demo.url.com/impression/demoAdstwo",
                "Creatives":{
                  "Creative":[
                    {
                      "Linear":{
                        "Duration":"00:00:30.0666666+00:00",
                        "TrackingEvents":{
                          "Tracking":[
                            {
                              "event":"start",
                              "offset":"0",
                              "text":"http://trackingurl.demo.url.com/start/demoAdstwo"
                            },
                            {
                              "event":"firstQuartile",
                              "offset":"7",
                              "text":"http://trackingurl.demo.url.com/firstQuartile/demoAdstwo"
                            },
                            {
                              "event":"midpoint",
                              "offset":"15",
                              "text":"http://trackingurl.demo.url.com/midpoint/demoAdstwo"
                            },
                            {
                              "event":"thirdQuartile",
                              "offset":"22",
                              "text":"http://trackingurl.demo.url.com/thirdQuartile/demoAdstwo"
                            },
                            {
                              "event":"complete",
                              "offset":"30",
                              "text":"http://trackingurl.demo.url.com/complete/demoAdstwo"
                            }
                          ]
                        },
                        "VideoClicks":{
                          "ClickThrough":{
                            "id":"abc",
                            "text":"http://www.demoAds.com/static/images/global/logo.png"
                          },
                          "ClickTracking":{
                            "id":"",
                            "text":"http://www.clicktracking.com/test?click"
                          }
                        },
                        "MediaFiles":{

                        }
                      }
                    },
                    "CompanionAds": {
                      "Companion":{
                        "id": "54061052904921234300x250",
                        "width": "300",
                        "height": "250",
                        "CompanionClickThrough": "http: //www.starbucks.com/static/images/global/logo.png",
                        "TrackingEvents": {
                            "Tracking": [
                                {
                                  "event": "creativeView",
                                  "url": "http: //companiontrack.demo.url.com/companion/starbuckstwo"
                                }
                            ]
                        },
                        "StaticResource": {
                          "creativeType": "image/jpeg",
                          "url": "http: //demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

### METHODS

#### player.onceux.currentTime()

A function that returns the current time within the playing ad or content.

##### PARAMETERS:
* `None`

##### RETURNS:
* `Number`

#### player.onceux.duration()

A function that returns the current duration of the playing ad or content.

##### PARAMETERS:
* `None`

##### RETURNS:
* `Number`

#### player.onceux.seekAds(timeInSeconds) <a id="seek-ads"></a>

A function that takes a time (in seconds) to seek to without the [default seek handling behavior](#default-seek-handling) enforcing that ads are not skipped.

##### PARAMETERS:
* `Number` The absolute time in seconds to seek to.

##### RETURNS:
* `None`

#### player.onceux.timeline.pathAtAbsoluteTime(timeInSeconds)

A function which takes a Number and provides a "path" into the timeline at any given point between 0 and the absoluteDuration of the stream.

##### PARAMETERS:
* `Number` The absolute time in seconds to provide a "path" for.

##### RETURNS:
* `JSON` Path representing the timeline.

```JSON
{
  "absoluteTime": 0,
  "contentTime": 0,
  "adRoll": {},
  "linearAd": {}
}
```

**path.absoluteTime** is the time in the stream relative to the absolute total time. This will always match what is passed into the function and provided just for convenience.

**path.contentTime** is the time in the stream relative to the currently playing linear advertisement or content.

**path.adRoll** `null` if no ad should be playing at the passed absolute time **or** if an ad should be playing, a JSON Object with the linear advertisement absolute begin/end time info from the timeline.

**path.linearAd** `null` if no ad should be playing at the passed absolute time **or** if an ad should be playing, a JSON Object with the linear advertisement AdBreak info from the timeline.

Example of returned "path" **without** an ad:

```JSON
{
  "absoluteTime": 3,
  "contentTime": 3,
  "adRoll": null,
  "linearAd": null
}
```

Example of returned "path" **with** an ad:

```JSON
{
  "absoluteTime": 3,
  "contentTime": 3,
  "adRoll": {
    "absoluteBeginTime": 0,
    "absoluteEndTime": 60,
    "index": 0,
    "playCount": 0,
    "linearAdCount": 1
  },
  "linearAd": {
    "absoluteBeginTime": 0,
    "absoluteEndTime": 30,
    "breakType":"linear",
    "breakId":"PreRoll_0_0",
    "timeOffset":"start",
    "index": 0,
    "playCount": 0,
    "skipOffset": 0,
    "companionAd":{
        "id": "54061052904921234300x250",
        "width": "300",
        "height": "250",
        "CompanionClickThrough": "http: //www.starbucks.com/static/images/global/logo.png",
        "TrackingEvents": {
          "Tracking": [
              {
                "event": "creativeView",
                "url": "http: //companiontrack.demo.url.com/companion/starbuckstwo"
              }
          ]
        },
        "StaticResource": {
          "creativeType": "image/jpeg",
          "url": "http: //demo.umedia.com/jes/ads/starbuckstwo300.jpg"
        }
    },
    "AdSource": {
      "id":"1",
      "VASTData":{
      "VAST":{
        "Ad":{
          "id":"UmAds",
          "Inline":{
            "AdSystem":"UnicornInternal",
            "AdTitle":"videoadvertisement",
            "Description":"video ad",
            "Impression":"http://impressionurl1.demo.url.com/impression/demoAdstwo",
            "Creatives":{
              "Creative":[
                {
                  "Linear":{
                    "Duration":"00:00:30.0666666+00:00",
                    "TrackingEvents":{
                      "Tracking":[
                        {
                          "event":"start",
                          "offset":"0",
                          "text":"http://trackingurl.demo.url.com/start/demoAdstwo"
                        },
                        {
                          "event":"firstQuartile",
                          "offset":"7",
                          "text":"http://trackingurl.demo.url.com/firstQuartile/demoAdstwo"
                        },
                        {
                          "event":"midpoint",
                          "offset":"15",
                          "text":"http://trackingurl.demo.url.com/midpoint/demoAdstwo"
                        },
                        {
                          "event":"thirdQuartile",
                          "offset":"22",
                          "text":"http://trackingurl.demo.url.com/thirdQuartile/demoAdstwo"
                        },
                        {
                          "event":"complete",
                          "offset":"30",
                          "text":"http://trackingurl.demo.url.com/complete/demoAdstwo"
                        }
                      ]
                    },
                    "VideoClicks":{
                      "ClickThrough":{
                        "id":"abc",
                        "text":"http://www.demoAds.com/static/images/global/logo.png"
                      },
                      "ClickTracking":{
                        "id":"",
                        "text":"http://www.clicktracking.com/test?click"
                      }
                    },
                    "MediaFiles":{

                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
   }
  }
}
```

### Runtime Properties

#### player.onceux.timeline
Type: `Object`

An object providing the essential parsed "absolute" timeline information from the VMAP.

```Javascript
{
  contenturi: "",
  adRolls: [],
  absoluteDuration: 0,
  contentDuration: 0,
  pathAtAbsoluteTime: function() {
    return {};
  }
}
```

#### player.onceux.timeline.contenturi
Type: `String`

The content uri parsed from the vmap specified by the metadatUri option passed to the plugin.

#### player.onceux.timeline.adRolls:
Type: `Array`

An Array of JSON objects representing the unmodified VAST 'AdBreak' info parsed from the Once vmap XML. Additionally, we add these fields:

**adRoll.absoluteBeginTime** - indicates the absolute time at which the adRoll will begin.
**adRoll.absoluteEndTime** - indicates the absolute time at which the adRoll will end.
**adRoll.index** - indicates the position of the adRoll with respect to the other adRolls. 
**adRoll.playCount** - indicates the number of times the adRoll has completed. Value 0 indicates that it has not been played.
**linearAd.absoluteBeginTime** - indicates the absolute time at which the linearAd will begin.
**linearAd.absoluteEndTime_** - indicates the absolute time at which the linearAd will end.
**linearAd.index** - indicates the position of the linearAd within the adRoll.
**linearAd.playCount** - indicates the number of times the linearAd has been played. Value 0 indicates that it has not been played. 
**linearAd.skipOffset** - indicates the time after which the linearad can be skipped. Value 0 indicates that the linear ad is not skippable. 
**linearAd.companionAd** - object representing the unmodified VAST companionAd info. 

Not all properties are currently parsed from the vmap. This is what the current objects will return.

```JSON
{
  "absoluteBeginTime": 0,
  "absoluteEndTime": 30,

  "index": 0,
  "playCount": 1,
  "linearAds": [
  {
    "absoluteBeginTime": 0,
    "absoluteEndTime": 30,
    "breakId": "PreRoll_0_0",
    "breakType": "linear",
    "timeOffset": "start",
    "index": 0,
    "playCount": 1,
    "skipOffset": 0,
    "companionAd": {
        "id": "54061052904921234300x250",
        "width": "300",
        "height": "250",
        "CompanionClickThrough": "http: //www.starbucks.com/static/images/global/logo.png",
        "TrackingEvents": {
          "Tracking": [
              {
                "event": "creativeView",
                "url": "http: //companiontrack.demo.url.com/companion/starbuckstwo"
              }
          ]
        },
        "StaticResource": {
          "creativeType": "image/jpeg",
          "url": "http: //demo.umedia.com/jes/ads/starbuckstwo300.jpg"
        }
    },
    "AdSource": {
      "id": 0,
      "VASTData":{
        "VAST":{
          "Ad":{
            "id":"UmdemoAds",
            "Inline":{
              "AdSystem":"UnicornInternal",
              "AdTitle":"videoadvertisement",
              "Description":"video ad",
              "Impression":"http://impressionurl1.demo.url.com/impression/demoAdstwo",
              "Creatives":{
                "Creative":[
                  {
                    "Linear":{
                      "Duration":"00:00:30.0666666+00:00",
                      "TrackingEvents":{
                        "Tracking":[
                          {
                            "event":"start",
                            "offset":"0",
                            "text":"http://trackingurl.demo.url.com/start/demoAdstwo"
                          },
                          {
                            "event":"firstQuartile",
                            "offset":"7",
                            "text":"http://trackingurl.demo.url.com/firstQuartile/demoAdstwo"
                          },
                          {
                            "event":"midpoint",
                            "offset":"15",
                            "text":"http://trackingurl.demo.url.com/midpoint/demoAdstwo"
                          },
                          {
                            "event":"thirdQuartile",
                            "offset":"22",
                            "text":"http://trackingurl.demo.url.com/thirdQuartile/demoAdstwo"
                          },
                          {
                            "event":"complete",
                            "offset":"30",
                            "text":"http://trackingurl.demo.url.com/complete/demoAdstwo"
                          }
                        ]
                      },
                      "VideoClicks":{
                        "ClickThrough":{
                          "id":"abc",
                          "text":"http://www.demoAds.com/static/images/global/logo.png"
                        },
                        "ClickTracking":{
                          "id":"",
                          "text":"http://www.clicktracking.com/test?click"
                        }
                      },
                      "MediaFiles":{

                      }
                    },
                    "CompanionAds": {
                      "Companion":{
                        "id": "54061052904921234300x250",
                        "width": "300",
                        "height": "250",
                        "CompanionClickThrough": "http: //www.starbucks.com/static/images/global/logo.png",
                        "TrackingEvents": {
                          "Tracking": [
                              {
                                "event": "creativeView",
                                "url": "http: //companiontrack.demo.url.com/companion/starbuckstwo"
                              }
                          ]
                        },
                        "StaticResource": {
                          "creativeType": "image/jpeg",
                          "url": "http: //demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  {
    "absoluteBeginTime": 30,
    "absoluteEndTime": 60,
    "breakId": "PreRoll_0_1",
    "breakType": "linear",
    "timeOffset": "start",
    "index": 1,
    "playCount": 1,
    "skipOffset": 0,
    "companionAd": {
        "id": "54061052904921234300x250",
        "width": "300",
        "height": "250",
        "CompanionClickThrough": "http: //www.starbucks.com/static/images/global/logo.png",
        "TrackingEvents": {
          "Tracking": [
              {
                  "event": "creativeView",
                  "url": "http: //companiontrack.demo.url.com/companion/starbuckstwo"
              }
          ]
        },
        "StaticResource": {
          "creativeType": "image/jpeg",
          "url": "http: //demo.umedia.com/jes/ads/starbuckstwo300.jpg"
        }
    },
    "AdSource": {
      "id":"1",
      "VASTData":{
      "VAST":{
        "Ad":{
          "id":"UmdemoAds",
          "Inline":{
            "AdSystem":"UnicornInternal",
            "AdTitle":"videoadvertisement",
            "Description":"video ad",
            "Impression":"http://impressionurl1.demo.url.com/impression/demoAdstwo",
            "Creatives":{
              "Creative":[
                {
                  "Linear":{
                    "Duration":"00:00:30.0666666+00:00",
                    "TrackingEvents":{
                      "Tracking":[
                        {
                          "event":"start",
                          "offset":"0",
                          "text":"http://trackingurl.demo.url.com/start/demoAdstwo"
                        },
                        {
                          "event":"firstQuartile",
                          "offset":"7",
                          "text":"http://trackingurl.demo.url.com/firstQuartile/demoAdstwo"
                        },
                        {
                          "event":"midpoint",
                          "offset":"15",
                          "text":"http://trackingurl.demo.url.com/midpoint/demoAdstwo"
                        },
                        {
                          "event":"thirdQuartile",
                          "offset":"22",
                          "text":"http://trackingurl.demo.url.com/thirdQuartile/demoAdstwo"
                        },
                        {
                          "event":"complete",
                          "offset":"30",
                          "text":"http://trackingurl.demo.url.com/complete/demoAdstwo"
                        }
                      ]
                    },
                    "VideoClicks":{
                      "ClickThrough":{
                        "id":"abc",
                        "text":"http://www.demoAds.com/static/images/global/logo.png"
                      },
                      "ClickTracking":{
                        "id":"",
                        "text":"http://www.clicktracking.com/test?click"
                      }
                    },
                    "MediaFiles":{

                    }
                  },
                  "CompanionAds": {
                      "Companion":{
                        "id": "54061052904921234300x250",
                        "width": "300",
                        "height": "250",
                        "CompanionClickThrough": "http: //www.starbucks.com/static/images/global/logo.png",
                        "TrackingEvents": {
                          "Tracking": [
                              {
                                "event": "creativeView",
                                "url": "http: //companiontrack.demo.url.com/companion/starbuckstwo"
                              }
                          ]
                        },
                        "StaticResource": {
                          "creativeType": "image/jpeg",
                          "url": "http: //demo.umedia.com/jes/ads/starbuckstwo300.jpg"
                        }
                      }
                  }
                }
              ]
            }
          }
        }
      }
    }
   }
  }
  ],
  "timeOffset": "start"
}
```

#### player.onceux.timeline.absoluteDuration
Type: `Number`

The total duration of the content including all Linear advertisements.

#### player.onceux.timeline.contentDuration
Type: `Number`

The duration of the content excluding all Linear advertisements.

### EVENTS
Below are the events which onceux plugin emits. These events gets triggered when the
timeupdate event occurs. The linearAd and adRoll objects are passed in these events.

```Javascript
event = {
  adRoll: {},
  linearAd: {}
};
```

#### onceux-linearad-start `EVENT`
The linearad starts playing.

#### onceux-linearad-impression `EVENT`
The linearad impression URL has been pinged.

#### onceux-linearad-firstQuartile `EVENT`
The linearad playhead crosses first quartile.

#### onceux-linearad-midpoint `EVENT`
The linearad playhead crosses midpoint.

#### onceux-linearad-thirdQuartile `EVENT`
The linearad playhead crosses third quartile.

#### onceux-linearad-complete `EVENT`
The linearad completes playing. The playCount property of linearAd is incremented.

#### onceux-adroll-start `EVENT`
The adroll starts playing.

#### onceux-adroll-complete `EVENT`
The adroll completes playing. The playCount property of the adRoll is incremented.

#### onceux-ads-complete `EVENT`
All the ads have been played.

#### onceux-linearad-skipped `EVENT`
The linearad is skipped by the user. Ads can be skipped only when multiple adRolls are seeked over or by invoking the seekAds() function.

#### onceux-linearad-mute `EVENT`
The linearad is muted by the user.

#### onceux-linearad-unmute `EVENT`
The linearad is unmuted by the user.

#### onceux-linearad-pause `EVENT`
The linearad is paused by the user.

#### onceux-linearad-resume `EVENT`
The linearad is resumed by the user.

#### onceux-companionad-creativeView `EVENT`
The companionAd creative view event fired.

### Plugin Notes

This project uses two other open source VideoJS plugins:
* [videojs-contrib-ads](https://github.com/videojs/videojs-contrib-ads)
* [videojs-overlay](https://github.com/brightcove/videojs-overlay)

Using videojs-contrib-ads allows you to listen for 'adstart' and 'adend' events. You can listen for these events to know when an adRoll starts and ends respectively.
*Be aware*, however, that these events can fire in rapid succession when scrubbing. They should always accurately reflect the currentTime of the playhead and states of the player though.

### Default Seek Handling

By default, the plugin enforces a "must-watch" ad policy.  All advertisements must are watched in their entirety and adRolls cannot be skipped over or into part way.  The only exception to this is when a seek is performed over multiple adRolls.  In the multiple adRoll seek, the plugin enforces only that the last adRoll that was seeked over is watched.

__Examples:__

Seek out of an ad - returned to where they seeked from.

Seek into an adBreak - returned to the start of the adRoll containing the adBreak.

Seek over an ad - returned to the start of the adRoll seeked over

Seek over multiple adRoll - returned to the start of the last adRoll seeked over

Seek backwards - no default handling.

### Glossary:

This plugin distinguishes the concepts of "absolute" and "content" time within a OnceUX stream.  Traditional video players only have a concept of "content" time; times between start and end of the URI it is currently playing.  Because a OnceUX stream is essentially a number of "content" streams stiched together we've introduced the concept of "absolute" time which takes into account the complete stitched stream including the video advertisements.  When you see the prefix "absolute" on a property or method, the times expected/returned are relative to the entire stitched stream.  When you see the prefix "content", the times expected/returned are relative only to a particular piece of content that was stitched into the stream (the main content or single linear advertisement).

__timeline:__ A JSON representation of the information in the Once VMAP XML.  The timeline describes the stream and is referenced during playback constantly to ensure the UI is adapting to the currently playing content.

__path__: A snapshot of the timeline at any given second with information that is relavant only to that point in time within the stream.

__absoluteDuration:__ The total duration of the stream including the linear ads.

__contentDuration:__ The total duration of the stream excluding the linear ads.

__absoluteTime:__ The time within the stream relative to absolute time.

__contentTime:__ The time within the stream relative to the stitched content segement.

__absoluteStartTime:__ The start time for stitched content in absolute time.

__absoluteEndTime:__ The end time for stitched content in absolute time.

__adRoll:__ A collection of one or more linear ads and non-linear ads.

__linearAd:__ An adBreak which replaces the main video content. For example, video ads.

__companionAd:__ An adBreak accompanying the linearAd or nonlinearAd which will be displayed outside the player screen. For example, ad banners.

__nonLinerAd:__ An adBreak which will not replace the main video content.  For example, overlay ads.  These are not yet supported.

### Testing

For testing, you can either run `npm test` or use `grunt` directly.

Tests run in the headless [PhantomJS](http://phantomjs.org/) webkit and are written in the [QUnit](http://qunitjs.com/) framework.

### Deployment

Trigger the TC Builder #11 here to package an artifact off the master branch:

http://trunkcity/viewType.html?buildTypeId=VideoJs_VideoJsOnceUX_11CreateVersionedReleaseArtifact

Confirm that the artifact has what you want, then trigger build #12 to push it to S3:

http://trunkcity/viewType.html?buildTypeId=VideoJs_VideoJsOnceUX_12StageToS3

Now the artifact is on S3.  You will need to run these commands to extract it and make it accessible:

1- Login to james

2- Find a production dangerzone host

3- Login to the host

4- Traverse to dangerzone's root directory

5- Run the cdn-deploy script

```bash
ssh login.jam.brightcove.com
ssh `nodeattr -s "dangerzone&&status=production"`
ssh <host from response above>
cd /usr/local/brightcove/dangerzone
sudo -u tomcat bash -c "source ./environmentVariables.sh && node_modules/grunt-cli/bin/grunt --gruntfile=node_modules/cdn-deploy/Gruntfile.js --name=videojs-onceux --number='production'"
```
All Done. Confirm that the file is updated here:

https://players.brightcove.net/videojs-onceux/videojs-onceux.min.js

### Players

To create a Brightcove Player with this plugin, you can use this configuration:

```bash
curl --header "Content-Type: application/json" --user $EMAIL --request POST --data '{
  "name": "onceux example",
  "description": "onceux example player",
  "configuration": {
    "scripts": [
      "https://players.brightcove.net/videojs-onceux/videojs-onceux.min.js"
    ],
    "stylesheets": [
      "https://players.brightcove.net/videojs-onceux/videojs-onceux.min.css"
    ],
    "media": {
      "poster": {
        "highres": "http://brightcove04.o.brightcove.com/1872491397001/1872491397001_2560627730001_vs-51ee1ea6e4b05614b50df944-590065948001.jpg"
      }
    },
    "plugins": [{
      "name": "onceux",
      "options": {
        "metadataUri": "http://onceux.unicornmedia.com/now/ads/vmap/od/auto/95ea75e1-dd2a-4aea-851a-28f46f8e8195/43f54cc0-aa6b-4b2c-b4de-63d707167bf9/9b118b95-38df-4b99-bb50-8f53d62f6ef8??umtp=0"

      }
    }]
  }
}' https://players.api.brightcove.com/v1/accounts/$ACCOUNT/players
```

You can publish the player with this command:

```bash
curl --user $EMAIL -XPOST -H "Content-Type: application/json" https://players.api.brightcove.com/v1/accounts/$ACCOUNT/players/$PLAYER/publish
```

## Release History

 - 0.1.1: Initial release
