var BCLS = ( function (window, document) {
    var mrssStr = '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">',
    sChannel = '<channel>',
    eChannel = '</channel>',
    sTitle = '<title>',
    eTitle = '</title>',
    sDescription = '<description>',
    eDescription = '</description>',
    sItem = '<item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">',
    defaultEndDate = '2020-10-15T00:00+01:00',
    eItemStart = '<dcterms:valid xmlns:dcterms="http://purl.org/dc/terms/">end=',
    eItemEnd = '; scheme=W3C-DTF</dcterms:valid><dcterms:type>live-video</dcterms:type></item>',
    sLink = '<link>',
    eLink = '</link>',
    sPubDate = '<pubDate>',
    ePubDate = '</pubDate>',
    sMediaContent = '<media:content',
    eMediaContent = '</media:content>',
    sMediaPlayer = '<media:player',
    eMediaPlayer = '/>',
    sMediaDescription = '<media:description>',
    eMediaDescription = '</media:description>',
    sMediaThumbnail = '<media:thumbnail',
    eMediaThumbnail = '/>',
    sMediaTitle = '<media:title>',
    eMediaTitle = '</media:title>',
    // account stuff
    accountId,
    clientId,
    clientSecret,
    // api stuff
    proxyURL = './mh_atv_mrss.php',
    baseURL = 'https://cms.api.brightcove.com/v1/accounts/',
    sort,
    sortDirection = "",
    playlist,
    limit = 25,
    totalVideos = 0,
    totalCalls = 0,
    callNumber = 0,
    videosArray = [],
    // elements
    account_id = document.getElementById('account_id'),
    client_id = document.getElementById('client_id'),
    client_secret = document.getElementById('client_secret'),
    feedTitle = document.getElementById('feedTitle'),
    feedDescription = document.getElementById('feedDescription'),
    playlist_id = document.getElementById('playlist_id'),
    makeFeed = document.getElementById('makeFeed'),
    logger = document.getElementById('logger'),
    apiRequest = document.getElementById('apiRequest'),
    feedDisplay = document.getElementById('feedDisplay'),
    allButtons = document.getElementsByName('button');

    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {String|Number} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    function isDefined(x){
        if ( x === "" || x === null || x === undefined) {
            return false;
        }
        return true;
    }

    /**
     * disables all buttons so user can't submit new request until current one finishes
     */
    function disableButtons() {
        var i,
            iMax = allButtons.length;
        for (i = 0; i < iMax; i++) {
            allButtons[i].setAttribute('disabled', 'disabled');
        }
    }

    /**
    * re-enables all buttons
    */
    function enableButtons() {
        var i,
        iMax = allButtons.length;
        for (i = 0; i < iMax; i++) {
            allButtons[i].removeAttribute('disabled');
        }
    }

    /**
     * sort an array of objects based on an object property
     * @param {array} targetArray - array to be sorted
     * @param {string|number} objProperty - object property to sort on
     * @return sorted array
     */
    function sortArray(targetArray, objProperty) {
        targetArray.sort(function (b, a) {
            var propA = a[objProperty], propB = b[objProperty];
            // sort ascending; reverse propA and propB to sort descending
            if (propA < propB) {
                 return -1;
            } else if (propA > propB) {
                 return 1;
            } else {
                 return 0;
            }
        });
        return targetArray;
    }

    function processSources(sources) {
        var i = sources.length;
        // remove non-MP4 sources
        while (i > 0) {
            i--;
            if (sources[i].container !== 'MP4') {
                sources.splice(i, 1);
            } else if (sources[i].hasOwnProperty('stream_name')) {
                sources.splice(i, 1);
            }
        }
        // sort sources by encoding rate
        sortArray(sources, 'encoding_rate');
        // return the first item (highest bitrate)
        return sources[0];
    }

    function addItems() {
        var i, iMax, video, pubdate, eItem, videoURL, thumbnailURL, doThumbnail = true;
        if (videosArray.length > 0) {
            iMax = videosArray.length;
            for (i = 0; i < iMax; i += 1) {
                video = videosArray[i];
                // video may not have a valid source
                if (isDefined(video.source) && isDefined(video.source.src)) {
                    videoURL = encodeURI(video.source.src.replace(/&/g, '&amp;'));
                } else {
                    videoURL = "";
                }
                // depending on when/how the video was created, it may have different thumbnail properties or none at all
                if (isDefined(video.images) && isDefined(video.images.thumbnail)) {
                    thumbnailURL = encodeURI(video.images.thumbnail.sources[0].src.replace(/&/g, '&amp;'));
                } else if (isDefined(video.thumbnail)) {
                    thumbnailURL = encodeURI(video.thumbnail.replace(/&/g, '&amp;'));
                } else {
                    doThumbnail = false;
                }

                pubdate = new Date(video.created_at).toGMTString();
                mrssStr += sItem;
                mrssStr += sLink + 'https://players.brightcove.net/' + accountId + '/default_default/index.html?videoId=' + video.id + eLink;
                mrssStr += sPubDate + pubdate + ePubDate;
                mrssStr += sMediaContent + ' url="' + videoURL + '" fileSize="' + video.source.size + '" type="video/quicktime" medium="video" duration="' + video.duration / 1000 + '" isDefault="true" height="' + video.source.height + '" width="' + video.source.width + '">';
                mrssStr += sMediaPlayer + ' url="' + 'https://players.brightcove.net/' + accountId + '/default_default/index.html?videoId=' + video.id + '"' + eMediaPlayer;
                mrssStr += sMediaTitle + video.name + eMediaTitle;
                mrssStr += sMediaDescription + video.description + eMediaDescription;
                if (doThumbnail) {
                    mrssStr += sMediaThumbnail + ' url="' + thumbnailURL + '"';
                    if (isDefined(video.images)) {
                        mrssStr += ' height="' + video.images.thumbnail.sources[0].height + '" width="' + video.images.thumbnail.sources[0].width + '"' + eMediaThumbnail;
                    } else {
                        mrssStr += eMediaThumbnail;
                    }
                }
                mrssStr += eMediaContent;
                if (isDefined(video.schedule) && video.schedule.ends_at) {
                    eItem = eItemStart + video.schedule.ends_at + eItemEnd;
                } else {
                    eItem = eItemStart + defaultEndDate + eItemEnd;
                }
                mrssStr += eItem;
            }
        }
        mrssStr += eChannel + '</rss>';
        logger.textContent = 'Finished!';
        feedDisplay.textContent = vkbeautify.xml(mrssStr);
        enableButtons();
    }

    /**
     * sets up the data for the API request
     * @param {String} id the id of the button that was clicked
     */
    function setRequestData(id) {
        var endPoint = '',
            requestData = {};
        // disable buttons to prevent a new request before current one finishes
        disableButtons();
        switch (id) {
            case 'getVideos':
            endPoint = accountId + '/playlists/' + playlist + '/videos';

            requestData.url = baseURL + endPoint;
            requestData.requestType = 'GET';
            apiRequest.textContent = requestData.url;
            getMediaData(requestData, id, function(response) {
                videosArray = JSON.parse(response);
                console.log('videosArray', videosArray);
                setRequestData('getVideoSources');
            });
            break;
            case 'getVideoSources':
                var i,
                    iMax = videosArray.length;
                    endpoint = accountId + '/videos/' + videosArray[callNumber].id + '/sources';
                    callback = function(sources) {
                        if (sources.length > 0) {
                            // get the best MP4 rendition
                            var source = processSources(sources);
                            videosArray[callNumber].source = source;
                        } else {
                            // video has no sources
                            videosArray[callNumber].source = null;
                        }
                        callNumber++;
                        if (callNumber < iMax) {
                            setRequestData('getVideoSources');
                        } else {
                            // remove videos with no sources
                            i = videosArray.length;
                            while (i > 0) {
                                i--;
                                console.log('videosArray[i]', videosArray[i]);
                                if (!isDefined(videosArray[i].source)) {
                                    console.log('i', i);
                                    videosArray.splice(i, 1);
                                }
                            }
                            addItems();
                        }
                    };
                endPoint = accountId + '/videos/' + videosArray[callNumber].id + '/sources';
                requestData.url = baseURL + endPoint;
                requestData.requestType = 'GET';
                apiRequest.textContent = requestData.url;
                logger.textContent = 'Getting sources for video ' + videosArray[callNumber].name;
                getMediaData(requestData, id, callback);
                break;
        }
    }

    /**
     * send API request to the proxy
     * @param  {Object} requestData options for the request
     * @param  {String} requestID the type of request = id of the button
     * @param  {Function} [callback] callback function
     */
    function getMediaData(options, requestID, callback) {
        var httpRequest = new XMLHttpRequest(),
            responseRaw,
            parsedData,
            requestParams,
            dataString,
            sources,
            // response handler
            getResponse = function() {
                try {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            // check for completion
                            if (requestID === 'getVideos') {
                                if (httpRequest.responseText === '[]') {
                                    // no video returned
                                    alert('no video returned');
                                }
                                responseRaw = httpRequest.responseText;
                                callback(responseRaw);
                            } else if (requestID === 'getVideoSources') {
                                responseRaw = httpRequest.responseText;
                                parsedData = JSON.parse(responseRaw);
                                callback(parsedData);
                            } else {
                              alert('There was a problem with the request. Request returned ' + httpRequest.status);
                            }
                        }
                    }
                } catch (e) {
                  alert('Caught Exception: ' + e);
                }
            };
        // set up request data
        requestParams = "url=" + encodeURIComponent(options.url) + "&requestType=" + options.requestType;
        // only add client id and secret if both were submitted
        if (isDefined(clientId) && isDefined(clientSecret)) {
            requestParams += '&client_id=' + clientId + '&client_secret=' + clientSecret;
        }

        // set response handler
        httpRequest.onreadystatechange = getResponse;
        // open the request
        httpRequest.open('POST', proxyURL);
        // set headers
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // open and send request
        httpRequest.send(requestParams);
    }

    function init() {
        // event handlers
        makeFeed.addEventListener('click', function() {
            var numVideos;
            // get the inputs
            clientId = client_id.value;
            clientSecret = client_secret.value;
            // only use entered account id if client id and secret are entered also
            if (isDefined(clientId) && isDefined(clientSecret)) {
                if (isDefined(account_id.value)) {
                    accountId = account_id.value;
                } else {
                    window.alert('To use your own account, you must specify an account id, and client id, and a client secret - since at least one of these is missing, a sample account will be used');
                    clientId = '';
                    clientSecret = '';
                    accountId = '57838016001';
                }
            } else {
                accountId = '57838016001';
            }
            playlist = (playlist_id.value) ? playlist_id.value : 5317603116001;
            // add title and description
            mrssStr += sChannel + sTitle + feedTitle.value + eTitle + sDescription + feedDescription.value + eDescription;
            setRequestData('getVideos');
        });
        feedDisplay.addEventListener('click', function() {
            feedDisplay.select();
        });
    }

    init();
})(window, document);
