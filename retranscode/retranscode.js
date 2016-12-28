var BCLS = (function(window, document) {
    var account            = document.getElementById('account'),
        cid                = document.getElementById('cid'),
        secret             = document.getElementById('secret'),
        captureImages      = document.getElementById('captureImages'),
        profiles           = document.getElementById('profiles'),
        profileText        = document.getElementById('profileText'),
        profileBtn         = document.getElementById('profileBtn'),
        goBtn              = document.getElementById('goBtn'),
        videoCount         = document.getElementById('videoCount'),
        videosRetrieved    = document.getElementById('videosRetrieved'),
        videosRetranscoded = document.getElementById('videosRetranscoded'),
        status             = document.getElementById('status'),
        errors             = document.getElementById('errors'),
        selectedProfile    = '',
        videoIDs           = [],
        errorCodes         = [],
        newImages          = false,
        totalVideos        = 0,
        totalCMSCalls      = 0,
        callNumber         = 0,
        deprecatedProfiles = ['balanced-nextgen-player','Express Standard','mp4-only','balanced-high-definition','low-bandwidth-devices','balanced-standard-definition','single-rendition','Live - Standard','high-bandwidth-devices','Live - Premium HD','Live - HD','videocloud-default-trial','screencast'];

    // event listeners
    profileBtn.addEventListener('click', function() {
        if (checkRequired()) {
            createRequest('getProfiles');
        } else {
            alert('The account id, client id, and client secret are required');
        }
    });

    goBtn.addEventListener('click', function() {
        if (checkRequired()) {
            selectedProfile = getSelectedValue(profiles);
            newImages = isChecked(captureImages);
            createRequest('getVideoCount');
        } else {
            alert('The account id, client id, and client secret are required');
        }
    });

    /**
     * write messages to the UI
     * @param  {htmlElement} el The element to write the message to
     * @param  {String} m  the message to write
     */
    function logMessage(el, m) {
        el.textContent = m;
    }

    /**
     * determines whether specified item is in an array
     *
     * @param {array} array to check
     * @param {string} item to check for
     * @return {boolean} true if item is in the array, else false
     */
    function arrayContains(arr, item) {
        var i,
            iMax = arr.length;
        for (i = 0; i < iMax; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    /**
     * check for required fields
     * @return {Boolean} true if all required fields have values
     */
    function checkRequired() {
        if (account.value && cid.value && secret.value) {
            return true;
        }
        return false;
    }

    /**
     * determines if checkbox is checked
     * @param  {htmlElement}  e the checkbox to check
     * @return {Boolean}  true if box is checked
     */
    function isChecked(e) {
        if (e.value) {
            return true;
        }
        return false;
    }


    /**
     * get selected value for single select element
     * @param {htmlElement} e the select element
     * @return {String} the selected value
     */
    function getSelectedValue(e) {
        var selected = e.options[e.selectedIndex],
            val      = selected.value,
            txt      = selected.textContent;
        if (val) {
            return val;
        } else {
            return txt;
        }
    }

    /**
     * createRequest sets up requests, send them to makeRequest(), and handles responses
     * @param  {string} type the request type
     */
    function createRequest(type) {
        var options    = {},
            ipBaseURL  = 'https://ingestion.api.brightcove.com/v1/accounts/' + account.value,
            cmsBaseURL = 'https://cms.api.brightcove.com/v1/accounts/' + account.value,
            diBaseURL  = 'https://ingest.api.brightcove.com/v1/accounts/' + account.value,
            endpoint,
            responseDecoded,
            limit = 25,
            i,
            iMax,
            el,
            txt;

        // set credentials
        options.client_id     = cid.value;
        options.client_secret = secret.value;

        switch (type) {
            case 'getProfiles':
                options.proxyURL    = './profiles-proxy.php';
                endpoint            = '/profiles';
                options.url         = ipBaseURL + endpoint;
                options.requestType = 'GET';
                logMessage(status, 'Getting account ingest profiles');
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    console.log('profiles', responseDecoded);
                    if (Array.isArray(responseDecoded)) {
                        // remove existing options
                        iMax = profiles.options.length;
                        for (i = 0; i < iMax; i++) {
                            profiles.remove(profiles.options[i]);
                        }
                        // add new options
                        iMax = responseDecoded.length;
                        for (i = 0; i < iMax; i++) {
                            if (!arrayContains(deprecatedProfiles, responseDecoded[i].name)) {
                                el = document.createElement('option');
                                el.setAttribute('value', responseDecoded[i].name);
                                txt = document.createTextNode(responseDecoded[i].name);
                                el.appendChild(txt);
                                profiles.appendChild(el);
                            }
                        }
                        logMessage(status, 'Account ingests profiles retrieved');
                    }
                });
                break;
            case 'getVideoCount':
                options.proxyURL    = './profiles-proxy.php';
                endpoint            = '/counts/videos';
                options.url         = cmsBaseURL + endpoint;
                options.requestType = 'GET';
                logMessage(status, 'Getting video count');
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    if (responseDecoded.error_code) {
                        errorCodes.push('get video count error: ' + responseDecoded.error_code);
                    } else {
                        totalVideos = parseInt(responseDecoded.count);
                        totalCMSCalls = Math.ceil(totalVideos / limit);
                        logMessage(status, 'Video count retrieved');
                        logMessage(videoCount, totalVideos);
                        createRequest('getVideos');
                    }
                });
                break;
            case 'getVideos':
                options.proxyURL    = './profiles-proxy.php';
                endpoint            = '/videos?sort=created_at&limit=' + limit + '&offset=' + (callNumber * limit);
                options.url         = cmsBaseURL + endpoint;
                options.requestType = 'GET';
                logMessage(status, 'Getting videos');
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    if (responseDecoded.error_code) {
                        errorCodes.push('get videos: ' + responseDecoded.error_code);
                    } else {
                        iMax = responseDecoded.length;
                        for (i = 0; i < iMax; i++) {
                            videoIDs.push(responseDecoded[i].id);
                        }
                        callNumber++;
                        if (callNumber < totalCMSCalls) {
                            logMessage(status, 'Got ' + iMax + ' videos');
                            logMessage(videosRetrieved, videoIDs.length);
                            createRequest('getVideos');
                        } else {
                            logMessage(status, 'Finished retrieving videos');
                            logMessage(videosRetrieved, videoIDs.length);
                        }
                    }
                });
                break;
            case 'transcodeVideo':
                options.proxyURL    = './retranscode-proxy.php';
                endpoint            = '/videos/' + videoIDs[callNumber];
                options.url         = cmsBaseURL + endpoint;
                options.requestType = 'POST';
                makeRequest(options, function(response) {

                });
                break;
        }
    }

    /**
     * send API request to the proxy
     * @param  {Object} requestData options for the request
     * @param  {String} requestData options.url the full API request URL
     * @param  {String="GET","POST","PATCH","PUT","DELETE"} requestData [options.requestType="GET"] HTTP type for the request
     * @param  {String} requestData options.proxyURL proxyURL to send the request to
     * @param  {String} requestData options.client_id client id for the account (default is in the proxy)
     * @param  {String} requestData options.client_secret client secret for the account (default is in the proxy)
     * @param  {JSON} requestData [options.requestData] Data to be sent in the request body in the form of a JSON string
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
                        if (httpRequest.status === 200 || httpRequest.status === 204) {
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
         * the proxy used here takes the following params:
         * url - the full API request (required)
         * requestType - the HTTP request type (default: GET)
         * clientId - the client id (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         * clientSecret - the client secret (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         * requestBody - request body for write requests (optional JSON string)
         */
        requestParams = "url=" + encodeURIComponent(options.url) + "&requestType=" + options.requestType;
        // only add client id and secret if both were submitted
        if (options.client_id && options.client_secret) {
            requestParams += '&client_id=' + options.client_id + '&client_secret=' + options.client_secret;
        }
        // add request data if any
        if (options.requestData) {
            requestParams += '&requestData=' + options.requestData;
        }
        console.log('requestParams', requestParams);
        // set response handler
        httpRequest.onreadystatechange = getResponse;
        // open the request
        httpRequest.open('POST', proxyURL);
        // set headers
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // open and send request
        httpRequest.send(requestParams);
    }


})(window, document);
