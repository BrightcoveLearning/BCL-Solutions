/**
 * Related Overlay
 */
videojs.plugin('relatedOverlay', function() {
    
    var myPlayer = this,
        requestData,
        apiRequest,
        proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/doc-samples-proxy.php',
        cmsURL = 'https://cms.api.brightcove.com/v1/accounts/',
        videoData = [];
    
    myPlayer.one('loadedmetadata', function(){        
        // set up data for CMS API request
        requestData = setRequestData();
        // make the CMS API request
        getRelatedVideos(requestData, function(relatedVideos) {
            // extract the needed video data into an array
            videoData = extractVideoData(relatedVideos);
            // generate the HTML for the overlay
            videoList = createVideoList(videoData);
            // add the overlay
            addOverlayText(videoList);
        });  
    });
    
    /**
     * sets up the data for the API request
     */
    function setRequestData() {
        var endPoint = '',
            accountId,
            videoName,
            requestURL,
            endPoint,
            tagValue,
            requestData = {},
            dataReturned = false;

        accountId = myPlayer.mediainfo.account_id;
        tagValue = myPlayer.mediainfo.tags[0];
        videoName = myPlayer.mediainfo.name;

        requestURL = cmsURL + accountId + '/videos';
        // return up to 9 videos which have a tag value equal to the current video, excluding the current video by name
        endPoint = '?q=tags:"' + tagValue + '"+-name:"' + videoName + '"&limit=9';

        requestData.url = requestURL + endPoint;
        requestData.requestType = 'GET';
        return requestData;
    }
    
    function getRelatedVideos(options, callback) {
        var httpRequest = new XMLHttpRequest(),
            responseRaw,
            parsedData,
            requestParams;
        // set up request data
        requestParams = 'url=' + encodeURIComponent(options.url) + '&requestType=' + options.requestType;
        // set response handler
        httpRequest.onreadystatechange = getResponse;
        // open the request
        httpRequest.open('POST', proxyURL);
        // set headers
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // open and send request
        httpRequest.send(requestParams);
        // response handler
        function getResponse() {
            dataReturned = false;
            try {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        responseRaw = httpRequest.responseText;
                        parsedData = JSON.parse(responseRaw);
                        dataReturned = true;
                    } else {
                        alert('There was a problem with the request. Request returned ' + httpRequest.status);
                    }
                }
            } catch (e) {
                alert('Caught Exception: ' + e);
            }
            if (dataReturned) {
                callback(parsedData);
            }
        }
    }
    
    /**
      * extract video data from CMS API response
      * @param {array} cmsData the data from the CMS API
      * @return {array} videoData array of video info
      */
    function extractVideoData(cmsData) {
        var i,
            iMax = cmsData.length,
            videoItem;
        for (i = 0; i < iMax; i++) {
            if (cmsData[i].id !== null || cmsData[i].images.thumbnail.src !== null) {
                videoItem = {};
                videoItem.id = cmsData[i].id;
                videoItem.name = cmsData[i].name;
                videoItem.thumbnail = cmsData[i].images.thumbnail.src;
                videoData.push(videoItem);
            }
        }
        return videoData;
    }
    
    /**
     * create the html for the overlay
     * @param {array} videoData array of video objects
     * @return {HTMLElement} videoList the div element containing the overlay
     */
    function createVideoList(videoData) {
        var i,
            iMax = videoData.length,
            videoList = createEl('div', {
                id: 'videoList'
            }),
            videoWrapper = createEl('div'),
            thumbnailLink,
            thumbnailImage;
          
        videoList.appendChild(videoWrapper);
        for (i = 0; i < iMax; i++) {
            thumbnailLink = createEl('a', {
                href: 'javascript:loadAndPlay(' + i + ')'
            })
            thumbnailImage = createEl('img', {
                class: 'video-thumbnail',
                src: videoData[i].thumbnail
            });
            videoWrapper.appendChild(thumbnailLink);
            thumbnailLink.appendChild(thumbnailImage);
        }
        return videoList;
    }
    
    /**
     * create an element
     *
     * @param  {string} type - the element type
     * @param  {object} attributes - attributes to add to the element
     * @return {HTMLElement} the HTML element
     */
    function createEl(type, attributes) {
        var el,
            attr;
          
        el = document.createElement(type);
        if (attributes !== null) {
            for (attr in attributes) {
                el.setAttribute(attr, attributes[attr]);
            }
            return el;
        }
    }

    /**
     * adds text content to an element
     * @param {HTMLElement} el the element
     * @param {string} str the text content
     */
    function addText(el, str) {
        el.appendChild(document.createTextNode(str));
    }
    
    /**
     * intializes the overlay plugin with the related video thumbnails
     * @param {HTML} overlayContent the HTML for the overlay
     */
    function addOverlayText(overlayContent) {
        myPlayer.overlay({
            content: '<strong>Default overlay content</strong>',
            overlays: [{
              content: overlayContent,
              start: 'pause',
              end: 'play'
            },
            {
              content: overlayContent,
              start: 'end',
              end: 'play'
            }]
        });
    }
    
    /**
     * loads and plays a video
     * this function called when thumbnails in the overlay are clicked
     * @param {integer} idx the index of the video object in the videoData array
     */
    loadAndPlay = function(idx) {
        var currentId = videoData[idx].id;
        myPlayer.catalog.getVideo(currentId, function(error, video) {
            try {
                myPlayer.catalog.load(video);
            } catch (e) {
                myPlayer.catalog.load(video);
            }     
            myPlayer.play();
        });
      }

});