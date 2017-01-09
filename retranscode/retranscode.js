var BCLS = (function(window, document) {
    var account            = document.getElementById('account'),
        cid                = document.getElementById('cid'),
        secret             = document.getElementById('secret'),
        captureImages      = document.getElementById('captureImages'),
        searchString       = document.getElementById('searchString'),
        profiles           = document.getElementById('profiles'),
        profileText        = document.getElementById('profileText'),
        profileBtn         = document.getElementById('profileBtn'),
        goBtn              = document.getElementById('goBtn'),
        videoCount         = document.getElementById('videoCount'),
        videosRetrieved    = document.getElementById('videosRetrieved'),
        videosRejected     = document.getElementById('videosRejected'),
        videosRetranscoded = document.getElementById('videosRetranscoded'),
        rejected           = document.getElementById('rejected'),
        status             = document.getElementById('status'),
        errors             = document.getElementById('errors'),
        timeElapsed        = document.getElementById('timeElapsed'),
        selectedProfile    = '',
        videoIDs           = [],
        rejectedVideoIDs   = [],
        errorCodes         = [],
        intervalID,
        newImages          = false,
        totalVideos        = 0,
        totalCMSCalls      = 0,
        callNumber         = 0,
        timePassed         = 0,
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
            intervalID = window.setInterval(function() {
                var now;
                timePassed++;
                now = secondsToTime(timePassed);
                logMessage(timeElapsed, now.h + ':' + now.m + ':' + now.s);
            }, 1000);
            createRequest('deleteOldLogs');
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
 * utility to extract h/m/s from seconds
 * @param {number} secs - seconds to convert to hh:mm:ss
 * @returns {object} object with members h (hours), m (minutes), s (seconds)
 */
    function secondsToTime(secs) {
        var hours = Math.floor(secs / (60 * 60)),
            divisor_for_minutes = secs % (60 * 60),
            minutes = Math.floor(divisor_for_minutes / 60),
            divisor_for_seconds = divisor_for_minutes % 60,
            seconds = Math.ceil(divisor_for_seconds),
            obj = {};

        if (hours < 10) {
            hours = "0" + hours.toString();
        } else {
            hours = hours.toString();
        }

        if (minutes < 10) {
            minutes = "0" + minutes.toString();
        } else {
            minutes = minutes.toString();
        }

        if (seconds < 10) {
            seconds = "0" + seconds.toString();
        } else {
            seconds = seconds.toString();
        }

        obj = {
            'h': hours,
            'm': minutes,
            's': seconds
        };

        return obj;
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
            t,
            i,
            iMax,
            el,
            txt;

        // set credentials
        options.client_id     = cid.value;
        options.client_secret = secret.value;
        options.account_id    = account.value;

        switch (type) {
            case 'deleteOldLogs':
                options.proxyURL    = './delete-log.php';
                // the only option this case needs is the proxy id, but makeRequest function expects url and requestType
                options.url         = ipBaseURL;
                options.requestType = 'GET';
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    logMessage(status, responseDecoded.message);
                    createRequest('getVideoCount');
                });
                break;
            case 'getProfiles':
                options.proxyURL    = './profiles-proxy.php';
                endpoint            = '/profiles';
                options.url         = ipBaseURL + endpoint;
                options.requestType = 'GET';
                logMessage(status, 'Getting account ingest profiles');
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
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
                                if (i === 0) {
                                    el.setAttribute('selected', 'selected');
                                }
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
                options.proxyURL    = './videos-proxy.php';
                endpoint            = '/counts/videos';
                if (searchString.value) {
                    endpoint += '?q=' + encodeURI(searchString.value);
                }
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
                options.proxyURL    = './videos-proxy.php';
                endpoint            = '/videos?sort=created_at&limit=' + limit + '&offset=' + (callNumber * limit);
                if (searchString.value) {
                    endpoint += '&q=' + encodeURI(searchString.value);
                }
                options.url         = cmsBaseURL + endpoint;
                options.requestType = 'GET';
                logMessage(status, 'Getting videos');
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    if (responseDecoded.error_code) {
                        errorCodes.push('get videos: ' + responseDecoded.error_code);
                        callNumber++;
                        if (callNumber < totalCMSCalls) {
                            logMessage(videosRetrieved, videoIDs.length);
                            logMessage(videosRejected, rejectedVideoIDs.length);
                            createRequest('getVideos');
                        } else {
                            logMessage(status, 'Finished retrieving videos');
                            logMessage(videosRetrieved, videoIDs.length);
                            logMessage(videosRejected, rejectedVideoIDs.length);
                            callNumber = 0;
                            createRequest(videoIDs[callNumber] + ': transcodeVideo');
                        }
                    } else {
                        iMax = responseDecoded.length;
                        for (i = 0; i < iMax; i++) {
                            if (responseDecoded[i].has_digital_master === true) {
                                videoIDs.push(responseDecoded[i].id);
                            } else {
                                rejectedVideoIDs.push(responseDecoded[i].id);
                            }
                        }
                        callNumber++;
                        if (callNumber < totalCMSCalls) {
                            logMessage(status, 'Got ' + iMax + ' videos');
                            logMessage(videosRetrieved, videoIDs.length);
                            logMessage(videosRejected, rejectedVideoIDs.length);
                            createRequest('getVideos');
                        } else {
                            logMessage(status, 'Finished retrieving videos');
                            logMessage(videosRetrieved, videoIDs.length);
                            logMessage(videosRejected, rejectedVideoIDs.length);
                            callNumber = 0;
                            createRequest('transcodeVideo');
                        }
                    }
                });
                break;
            case 'transcodeVideo':
                options.proxyURL    = './retranscode-proxy.php';
                endpoint            = '/videos/' + videoIDs[callNumber] + '/ingest-requests';
                options.url         = diBaseURL + endpoint;
                options.requestType = 'POST';
                options.requestBody = '{"profile":"' + selectedProfile + '","capture-images":' + isChecked(captureImages) + ',"master":{"use_archived_master": true},"callbacks":["http://solutions.brightcove.com/bcls/retranscode/notifications.php"]}';
                logMessage(status, 'Sending retranscode requests - do NOT leave this page');
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    if (Array.isArray(responseDecoded)) {
                        errorCodes.push('retranscoding ' + videoIDs[callNumber] + ': ' + responseDecoded[0].error_code);
                        callNumber++;
                        if (callNumber < videoIDs.length) {
                            logMessage(videosRetranscoded, callNumber);
                            createRequest('transcodeVideo');
                        } else {
                            logMessage(videosRetranscoded, callNumber);
                            logMessage(status, 'All retranscode requests submitted');
                            logMessage(rejected, JSON.stringify(rejectedVideoIDs));
                            logMessage(errors, JSON.stringify(errorCodes, null, '  '));
                        }
                    } else if (responseDecoded.message === 'wait') {
                        t = window.setTimeout(createRequest('transcodeVideo'), 30000);
                        logMessage(status, 'Job queue full - retrying in 30 seconds');
                    } else {
                        callNumber++;
                        if (callNumber < videoIDs.length) {
                            logMessage(videosRetranscoded, callNumber);
                            createRequest('transcodeVideo');
                        } else {
                            window.clearInterval(intervalID);
                            logMessage(videosRetranscoded, callNumber);
                            logMessage(status, 'All retranscode requests submitted');
                            logMessage(errors, JSON.stringify(errorCodes, null, '  '));
                        }
                    }
                });
                break;
        }
    }

    /**
     * send API request to the proxy
     * @param  {Object} options for the request
     * @param  {String} options.url the full API request URL
     * @param  {String="GET","POST","PATCH","PUT","DELETE"} requestData [options.requestType="GET"] HTTP type for the request
     * @param  {String} options.proxyURL proxyURL to send the request to
     * @param  {String} options.account_id the account id
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
                        if (httpRequest.status === 200 || httpRequest.status === 204) {
                            response = httpRequest.responseText;
                            // some API requests return '{null}' for empty responses - breaks JSON.parse
                            // console.log('response', response);
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
         * options.url - the full API request (required)
         * options.account_id - the account id
         * options.requestType - the HTTP request type (default: GET)
         * options.client_id - the client id (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         * options.client_secret - the client secret (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         * options.requestBody - request body for write requests (optional JSON string)
         */
        requestParams = 'url=' + encodeURIComponent(options.url) + '&requestType=' + options.requestType + '&account_id=' + options.account_id;
        // only add client id and secret if both were submitted
        if (options.client_id && options.client_secret) {
            requestParams += '&client_id=' + options.client_id + '&client_secret=' + options.client_secret;
        }
        // add request data if any
        if (options.requestBody) {
            requestParams += '&requestBody=' + encodeURIComponent(options.requestBody);
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


})(window, document);