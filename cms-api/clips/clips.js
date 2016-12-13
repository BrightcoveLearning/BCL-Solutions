var BCLS = (function (window, document) {
    /**
     * this scripts assumes that HTML elements with ids shown
     * in the following assignments exist in the page that
     * calls this script.
     * Alternatively, store the client_id and client_secret
     * in the proxy (NOT in a client-side script!)
     * and the account_id value here
     */
    var account_id      = document.getElementById('account_id'),
        client_id       = document.getElementById('client_id'),
        client_secret   = document.getElementById('client_secret'),
        status          = document.getElementById('status'),
        goBtn           = document.getElementById('goBtn'),
        videoCount      = 0,
        videoNumber     = 0,
        totalCalls      = 0,
        callNumber      = 0,
        renditionNumber = 0,
        videoData       = [],
        renditionData   = [],
        posterData      = {},
        thumbnailData   = {};

    /**
     * sets up all API requests and handles the responses
     * @param {String} type the request type
     */
    function setUpRequest(type) {
        var baseURL = 'https://cms.api.brightcove.com/v1/accounts',
            endpoint,
            responseDecoded,
            // recommended limit value for best performance with CMS API
            limit   = 25,
            options = {};
        options.client_id = (client_id.value) ? client_id.value : null;
        options.client_secret = (client_secret.value) ? client_secret.value : null;

        switch (type) {
            // get a count of clips
            case 'getCount':
                endpoint = '/' + account_id.value + '/counts/videos?q=%2Bis_clip:true';
                options.url = baseURL + endpoint;
                options.requestType = 'GET';
                makeRequest(options, function(response) {
                    if (response) {
                        responseDecoded = JSON.parse(response);
                        videoCount = parseInt(responseDecoded.count);
                        // calculate total calls needed to get the video clips
                        totalCalls = Math.ceil(videoCount / limit);
                        setUpRequest('getVideoClips');
                    }
                });
                break;
            // retrieve the clips
            case 'getVideoClips':
                endpoint = '/' + account_id.value + '/videos?q=%2Bis_clip:true&limit=' + limit + '&offset=' + (limit * callNumber);
                options.url = baseURL + endpoint;
                options.requestType = 'GET';
                makeRequest(options, function(response) {
                    if (response) {
                        responseDecoded = JSON.parse(response);
                        // add new clips to videoData array
                        videoData.push.apply(videoData, responseDecoded);
                    }
                    // increment the call number
                    callNumber++;
                    // are we done?
                    if (callNumber < totalCalls) {
                        // get the next batch
                        setUpRequest('getVideoClips');
                    } else {
                        // got all the clips
                        // update status
                        status.textContent =+ videoData.length + ' video clips found \n';
                        // reset the callNumber
                        callNumber = 0;
                        setUpRequest('getRenditions');
                    }
                });
                break;
            case 'getRenditions':
                endpoint = '/' + account_id.value + '/videos/' + videoData[videoNumber].id + '/assets/renditions';
                options.url = baseURL + endpoint;
                options.requestType = 'GET';
                // update status
                status.textContent =+ 'fetching renditions for clip ' + videoData[callNumber].name + ' \n';
                makeRequest(options, function(response) {
                    if (response) {
                        responseDecoded = JSON.parse(response);
                        renditionData = responseDecoded;
                        // update status
                        status.textContent =+ renditionData.length + ' renditions found for clip ' + videoData[callNumber].name + ' \n';
                        if (renditionData.length > 0) {
                            setUpRequest('deleteRendition');
                        } else {
                            setUpRequest('getPoster');
                        }
                    } else {
                        // no renditions
                        status.textContent =+ 'no renditions found for clip number ' + videoData[callNumber].name + ' \n';
                        setUpRequest('getPoster');
                    }
                });
                break;
            case 'deleteRendition':
                endpoint = '/' + account_id.value + '/videos/' + videoData[videoNumber].id + '/assets/renditions/' + renditionData[renditionNumber].id;
                options.url = baseURL + endpoint;
                options.requestType = 'DELETE';
                makeRequest(options, function(response) {
                    // there should be no response unless there was an error
                    if (response) {
                        status.textContent += 'Delete rendition response: ' + response + ' \n';
                        // keep going anyway
                        renditionNumber++;
                        if (renditionNumber < renditionData.length) {
                            setUpRequest('deleteRendition');
                        } else {
                            // done with renditions, do poster
                            setUpRequest('getPoster');
                        }
                    } else {
                        status.textContent += 'Rendition deleted for ' + videoData[callNumber].name + '\n';
                        renditionNumber++;
                        // check to see if there are more renditions
                        if (renditionNumber < renditionData.length) {
                            setUpRequest('deleteRendition');
                        } else {
                            // do the poster
                            setUpRequest('getPoster');
                        }
                    }
                });
                break;
            case 'getPoster':
                endpoint = '/' + account_id.value + '/videos/' + videoData[videoNumber].id + '/assets/poster';
                options.url = baseURL + endpoint;
                options.requestType = 'GET';
                makeRequest(options, function(response) {
                    if (response) {
                        posterData = JSON.parse(response);
                        setUpRequest('deletePoster');
                    } else {
                        // no poster, do the thumbail
                        setUpRequest('getThumbnail');
                    }
                });
                break;
            case 'deletePoster':
                endpoint = '/' + account_id.value + '/videos/' + videoData[videoNumber].id + '/assets/poster/' + posterData.id;
                options.url = baseURL + endpoint;
                options.requestType = 'DELETE';
                makeRequest(options, function(response) {
                    // no response unless something went wront
                    if (response) {
                        status.textContent += 'Delete poster response: ' + response + ' \n';
                        // try thumbnail anyway
                        setUpRequest('getThumbnail');
                    } else {
                        // success; do thumbnail
                        status.textContent += 'Poster deleted for ' + videoData[callNumber].name + ' \n';
                        setUpRequest('getThumbnail');
                    }
                 });
                break;
            case 'getThumbnail':
                endpoint = '/' + account_id.value + '/videos/' + videoData[callNumber].id + '/assets/thumbnail';
                options.url = baseURL + endpoint;
                options.requestType = 'GET';
                makeRequest('options', function(response) {
                    if (response) {
                        thumbnailData = JSON.parse(response);
                        setUpRequest('deleteThumbnail');
                    } else {
                        // if no thumbnail, go on
                        videoNumber++;
                        if (videoNumber < videoCount) {
                            setUpRequest('getRenditions');
                        } else {
                            // done
                            status.textContent += 'Finished!';
                        }
                    }
                });
                break;
            case 'deleteThumbnail':
                endpoint = '/' + account_id.value + '/videos/' + videoData[videoNumber].id + '/assets/thumbnail/' + thumbnailData.id;
                options.url = baseURL + endpoint;
                options.requestType = 'DELETE';
                makeRequest(options, function(response) {
                    // no response unless something went wrong
                    if (response) {
                        status.textContent += 'Delete thumbnail response: ' + response + ' \n';
                        // do next video anyway if any
                        videoNumber++;
                        if (videoNumber < videoCount) {
                            setUpRequest('getRenditions');
                        } else {
                            // done
                            status.textContent += 'Finished!';
                        }
                    } else {
                        // success
                        status.textContent += 'Thumbnail deleted for ' + videoData[callNumber].name + ' \n';
                        // do next video if any
                        videoNumber++;
                        if (videoNumber < videoCount) {
                            setUpRequest('getRenditions');
                        } else {
                            // done
                            status.textContent += 'Finished!';
                        }
                    }
                });
                break;
            default:
                if (console) {
                    console.log('default case: we should not be here');
                }
        }
    }

    /**
     * send API request to the proxy
     * @param  {Object} requestData options for the request
     * @param  {Function} [callback] callback function
     */
    function makeRequest(options, callback) {
        var httpRequest = new XMLHttpRequest(),
            response,
            requestParams,
            dataString,
            proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/clips-proxy.php',
            // response handler
            getResponse = function() {
                try {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 204) {
                            response = httpRequest.responseText;
                            if (response === '{null}') {
                                response = null;
                            }
                            // return the response
                            callback(response);
                        } else {
                            alert('There was a problem with the request. Request returned ' + httpRequest.status);
                        }
                    }
                } catch (e) {
                    alert('Caught Exception: ' + e);
                }
            };
        /**
         * set up request data
         * the proxy used here takes the following params:
         * url - the full API request (required)
         * requestType - the HTTP request type (default: GET)
         * clientId - the client id (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         * clientSecret - the client secret (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         */
        requestParams = "url=" + encodeURIComponent(options.url) + "&requestType=" + options.requestType;
        // only add client id and secret if both were submitted
        if (client_id.value && client_secret.value) {
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

    // set up event listener for button
    goBtn.addEventListener('click', function() {
        if (account_id.value) {
            setUpRequest('getCount');
        } else {
            alert('no account id submitted');
        }
    });

})(window, document);
