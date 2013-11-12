# makeChapters.js - Chapter Display Plugin for video.js #

makeChapters.js is a plugin for video.js that takes chapter data and displays the chapters above, below, or to the right of your player. Clicking or tapping a chapter moves the playhead to the beginning of the chapter.

## Chapter Data ##

Chapter data is passed to the plugin as a **chapterData** array of objects within an **options** object. makeChapters expects the chapter data in this form:

```js
[
    {
      "startTime"   : "00:00.000",
      "endTime"     : "00:11.050",
      "chapterInfo" : {
        "thumbnail" : "/bcls/assets/images/wim-chapter-1-thumbnail.png",
        "title" : "Bubbles"
      }
    },
    {
      "startTime"   : "00:11.060",
      "endTime"     : "00:21.040",
      "chapterInfo" : {
        "thumbnail" : "/bcls/assets/images/wim-chapter-2-thumbnail.png",
        "title" : "Jets Colliding"
      }
    },
    {
      "startTime"   : "00:21.050",
      "endTime"     : "00:35.190",
      "chapterInfo" : {
        "thumbnail"   : "/bcls/assets/images/wim-chapter-3-thumbnail.png",
        "title" : "Dropping"
      }
    },
    {
      "startTime"   : "00:36.200",
      "endTime"     : "00:55.000",
      "chapterInfo" : {
        "thumbnail"   : "/bcls/assets/images/wim-chapter-4-thumbnail.png",
        "title" : "Splashing"
      }
    }
  ]
  ```
  
  Note that the **startTime** and **endTime** can be HH:MM:SS.mmm strings or seconds as a number, such as **13.023**.