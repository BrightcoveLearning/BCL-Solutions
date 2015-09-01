/**
 * Featured Playlist
 */
(function(window, document, videojs) {

  // map and indexOf polyfills for obsolete browsers
  Array.prototype.map||(Array.prototype.map=function(r,t){var n,e,o;if(null==this)throw new TypeError(" this is null or not defined");var i=Object(this),a=i.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(n=t),e=new Array(a),o=0;a>o;){var f,p;o in i&&(f=i[o],p=r.call(n,f,o,i),e[o]=p),o++}return e});
  Array.prototype.indexOf||(Array.prototype.indexOf=function(r,t){var n;if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),i=e.length>>>0;if(0===i)return-1;var a=+t||0;if(1/0===Math.abs(a)&&(a=0),a>=i)return-1;for(n=Math.max(a>=0?a:i-Math.abs(a),0);i>n;){if(n in e&&e[n]===r)return n;n++}return-1});

  var featured = function(settings) {
    var player = this;
    var options = {loadVideoNotInPlaylist:true};
    var featuredItem, playlist, index, queries, query, i;
    var selectItem, selectWhenReady, iterations = 0, loadVideo;
      
      console.log("jeffs plugin test 0711");
    
    options = videojs.util.mergeOptions(options,settings);

    queries = window.location.search.slice(1).split('&');
    for (i = 0; i < queries.length; i++) {
      query = queries[i].split('=');
      if (query[0] === 'featuredVideoId' && query[1]) {
        featuredItem = query[1];
      }
    }

    selectItem = function() {
      if (player.playlist().length > 0 &&
          (featuredItem || player.options()['data-featured-video-id'])) {
        featuredItem = featuredItem || player.options()['data-featured-video-id'];
        playlist = player.playlist();
        if (featuredItem.indexOf('ref:') === 0) {
          index = playlist.map(function(x) {return x.reference_id; }).indexOf(featuredItem.split(':')[1]);
        } else {
          index = playlist.map(function(x) {return x.id; }).indexOf(featuredItem);
        }
        if (index > -1 ) {
          loadVideo(index);
        } else if (options.loadVideoNotInPlaylist) {
          player.catalog.getVideo(featuredItem, function (error, video) {
            if (!error) {
              loadVideo(index);
            }
          });
        }
      }
    }

    loadVideo = function (index) {
      if (player.hls) {
        player.hls.resetSrc_();
        window.setTimeout(function(){
          player.playlist.currentItem(index);
        }, 100);
      } else {
        player.playlist.currentItem(index);
      }
    }

    selectWhenReady = function() {
      if (player.mediainfo) {
        selectItem();
      }
      else if (iterations++ < 10) {
        window.setTimeout(selectWhenReady,100);
      }
    }

    // Flash doesn't fire loadstart/loadedmetadata until playback starts
    // TODO: switch to playlistchange
//    if (player.techName === 'Flash') {
//      selectWhenReady();
//    }
//    else {
//      player.one('loadstart', function(){
//        selectItem();
//      });
//    }
//  }
  
  player.one('loadedmetadata', function() {
      selectItem();
  });

  videojs.plugin('featured', featured);
})(window, document, videojs);