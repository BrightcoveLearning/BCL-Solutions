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
        options = {},
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
        }

        // function to set up video data request
        function setVideoRequestOptions() {
            options = {};
            options.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + currentVideo);
            options.proxyURL = proxyURL;
            console.log(options.url);
            submitRequest(options, function{response} {
              var o = {};
              response = JSON.parse(response);
              o.id = response.id;
              o.reference_id = response.reference_id;
              o.name = response.name;
              videoDataArray.push(o);
              setSourcesRequestOptions();
            });
        };
        // function to set up video sources request
        function setSourcesRequestOptions() {
            options.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + currentVideo + '/sources';
            options.proxyURL = proxyURL;

            submitRequest(options, function(response) {
              response = JSON.parse(response);
              videoDataArray[videoNumber].sources = response.length;
            });
        }

        // initiates the cms api requests
        function getVideoInfo() {
            if (videoIdArray.length > 0) {
                currentVideo = videoIdArray[videoNumber];
                setVideoRequestOptions();
            } else {
                loadingMessage.innerHTML = 'No videos have been ingested';
            }
        };

        /**
         * send API request to the proxy
         * @param  {Object} options for the request
         * @param  {String} options.url the full API request URL
         * @param  {String="GET","POST","PATCH","PUT","DELETE"} requestData [options.requestType="GET"] HTTP type for the request
         * @param  {String} options.proxyURL proxyURL to send the request to
         * @param  {String} options.client_id client id for the account (default is in the proxy)
         * @param  {String} options.client_secret client secret for the account (default is in the proxy)
         * @param  {JSON} [options.requestBody] Data to be sent in the request body in the form of a JSON string
         * @param  {Function} [callback] callback function that will process the response
         */
        function makeRequest(options, callback) {
            var httpRequest = new XMLHttpRequest(),
                response,
                requestParams,
                dataString,
                proxyURL    = options.proxyURL,
                // response handler
                getResponse = function() {
                    try {
                        if (httpRequest.readyState === 4) {
                            if (httpRequest.status >= 200 && httpRequest.status < 300) {
                                response = httpRequest.responseText;
                                // some API requests return '{null}' for empty responses - breaks JSON.parse
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
             * the proxy used here takes the following request body:
             * JSON.strinify(options)
             */
            // set response handler
            httpRequest.onreadystatechange = getResponse;
            // open the request
            httpRequest.open('POST', proxyURL);
            // set headers if there is a set header line, remove it
            // open and send request
            httpRequest.send(JSON.stringify(options));
        }


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
