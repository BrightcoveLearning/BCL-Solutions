var BCLS = ( function (videoIdArray) {
    // to use another account, set the account_id value appropriately
    // the client_id and client_secret will also need to be changed in the proxy
    var account_id = '57838016001',
        account = document.getElementById('account'),
        logBody = document.getElementById('logBody'),
        loadingMessage = document.getElementById('loadingMessage'),
        clearLogBtn = document.getElementById('clearLogBtn'),
        i = 0,
        iMax = videoIdArray.length,
        // set the proxyURL to the location of the proxy app that makes Brightcove API requests
        proxyURL = './brightcove-learning-proxy.php',
        videoDataArray = [],
        videoDataItem = {},
        requestOptions = {},
        currentVideo,
        // functions
        submitRequest,
        setVideoRequestOptions,
        setSourcesRequestOptions,
        getVideoInfo,
        writeReport,
        clearLog,
        bclslog;

        /**
         * Logging function - safe for IE
         * @param  {string} context - description of the data
         * @param  {*} message - the data to be logged by the console
         * @return {}
         */
        bclslog = function (context, message) {
            if (window["console"] && console["log"]) {
              console.log(context, message);
            }
            return;
        };

        // write out the report table
        writeReport = function () {
            var j,
                jMax = videoDataArray.length,
                item;
            loadingMessage.className = 'hidden';
            for (j = 0; j < jMax; j++) {
                item = videoDataArray[j];
                logBody.innerHTML += '<tr><td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.reference_id + '</td><td>' + item.sources + '</td></tr>';
            }
        };

        // function to set up video data request
        setVideoRequestOptions = function () {
            requestOptions = {};
            requestOptions.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + currentVideo;
            submitRequest(requestOptions, proxyURL, 'video');
        };
        // function to set up video sources request
        setSourcesRequestOptions = function () {
            requestOptions.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + currentVideo + '/sources';
            submitRequest(requestOptions, proxyURL, 'sources');
        };

        // initiates the cms api requests
        getVideoInfo = function () {
            if (videoIdArray.length > 0) {
                currentVideo = videoIdArray[i];
                setVideoRequestOptions();
            } else {
                loadingMessage.innerHTML = 'No videos have been ingested';
            }
        };

        // function to make the cms api requests
        submitRequest = function (options, url, type) {
            var httpRequest = new XMLHttpRequest(),
                requestData,
                responseData,
                parsedData,
                getResponse = function () {
                    try {
                        if (httpRequest.readyState === 4) {
                          if (httpRequest.status === 200) {
                            responseData = httpRequest.responseText;
                            switch (type) {
                                case "video":
                                videoDataItem = {};
                                parsedData = JSON.parse(responseData);
                                videoDataItem.id = parsedData.id;
                                videoDataItem.reference_id = parsedData.reference_id;
                                videoDataItem.name = parsedData.name;
                                setSourcesRequestOptions();
                                break;
                                case "sources":
                                parsedData = JSON.parse(responseData);
                                if (parsedData.length > 0) {
                                    videoDataItem.sources = parsedData.length;
                                } else {
                                    videoDataItem.sources = '<span style="color:#990000">No renditions - ingest failed!</span>';
                                }

                                videoDataArray.push(videoDataItem);

                                i++;
                                if (i < iMax) {
                                    getVideoInfo();
                                } else {
                                    writeReport();
                                }
                                break;
                            }
                          } else {
                            bclslog("There was a problem with the request. Request returned " + httpRequest.status);
                            if (type === 'video') {
                                setVideoRequestOptions();
                            } else {
                                setSourcesRequestOptions();
                            }
                          }
                        }
                      }
                      catch(e) {
                        bclslog('Caught Exception: ' + e);
                      }
                };
            // set up request data
            requestData = "url=" + encodeURIComponent(options.url) + "&requestType=GET";
            // set response handler
            httpRequest.onreadystatechange = getResponse;
            // open the request
            httpRequest.open("POST", url);
            // set headers
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // open and send request
            httpRequest.send(requestData);
        };

        // event handlers
        clearLogBtn.addEventListener('click', function () {
            if (window.confirm('Are you sure? This action cannot be undone!')) {
                // if your clear-log app resides in another location, change the URL
                window.location.href = 'clear-log.php';
            }
        });
        // bclslog('videoIdArray', videoIdArray);

        // get things started
        account.innerHTML = account_id;
        getVideoInfo();

    })(videoIdArray);
