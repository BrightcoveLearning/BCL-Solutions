var BCLS = ( function (videoIdArray) {
    // to use another account, set the account_id value appropriately
    // the client_id and client_secret will also need to be changed in the proxy
    var account_id = '57838016001',
        account = document.getElementById('account'),
        logBody = document.getElementById('logBody'),
        loadingMessage = document.getElementById('loadingMessage'),
        clearLogBtn = document.getElementById('clearLogBtn'),
        videoNumber = 0,
        videoNumberMax = videoIdArray.length,
        // set the proxyURL to the location of the proxy app that makes Brightcove API requests
        proxyURL = './brightcove-learning-proxy.php',
        videoDataArray = [],
        videoDataItem = {},
        requestOptions = {},
        currentVideo;


        // write out the report table
        function writeReport() {
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
        function setVideoRequestOptions() {
            requestOptions = {};
            requestOptions.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + currentVideo);
            console.log(requestOptions.url);
            submitRequest(requestOptions, proxyURL, 'video');
        };
        // function to set up video sources request
        function setSourcesRequestOptions() {
            requestOptions.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + currentVideo + '/sources';
            submitRequest(requestOptions, proxyURL, 'sources');
        };

        // initiates the cms api requests
        function getVideoInfo() {
            if (videoIdArray.length > 0) {
                currentVideo = videoIdArray[videoNumber];
                setVideoRequestOptions();
            } else {
                loadingMessage.innerHTML = 'No videos have been ingested';
            }
        };

        // function to make the cms api requests
        function submitRequest(options, url, type) {
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

                                videoNumber++;
                                if (videoNumber < videoNumberMax) {
                                    getVideoInfo();
                                } else {
                                    writeReport();
                                }
                                break;
                            }
                          } else {
                            console.log("There was a problem with the request. Request returned " + httpRequest.status);
                            if (type === 'video') {
                                setVideoRequestOptions();
                            } else {
                                setSourcesRequestOptions();
                            }
                          }
                        }
                      }
                      catch(e) {
                        console.log('Caught Exception: ' + e);
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
        console.log('videoIdArray', videoIdArray);

        // get things started
        account.innerHTML = account_id;
        getVideoInfo();

    })(videoIdArray);
