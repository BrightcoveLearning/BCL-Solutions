var BCLS = (function(window, document) {
    var videoTableBody      = document.getElementById('videoTableBody'),
        getPreviousVideos   = document.getElementById('getPreviousVideos'),
        getNextVideos       = document.getElementById('getNextVideos'),
        addCaptions         = document.getElementById('addCaptions'),
        totalVideos         = 0,
        totalVideoSets      = 0,
        nextVideoSet        = 0,
        diCallNumber        = 0,
        totalDiCalls        = 0,
        // placeholder for a collection of checkboxes we'll get later
        checkBoxes,
        // place holder for the array of selected video ids
        selectedVideos      = [],
        /**
         * since i don't have captions per video, i'm just going to add
         * these samples to all videos
         * note i'm adding English and Spanish both in case you guys do
         * multilanguage
         */
        text_tracks         = [{url:'http://solutions.brightcove.com/bcls/assets/vtt/sample.vtt', srclang:'en', kind:'captions', label:'English',default:'true'}, {url:'http://solutions.brightcove.com/bcls/assets/vtt/sample-es.vtt', srclang:'es', kind:'captions', label:'Español',default:'false'}],
        // somehow I know this
        customer_id         = 'customer1',
        brightcoveAccountId = '1485884786001';

    /**
     * event listeners
     */
    window.addEventListener('load', function() {
        // get the video count and load the first set immediately
        createRequest('getVideoCount');
        createRequest('getVideos');
    });

    getNextVideos.addEventListener('click', function() {
        // get the next video set
        nextVideoSet++;
        createRequest('getVideos');
    });

    addCaptions.addEventListener('click', function() {
        // add captions to selected videos
        getSelectedCheckboxes(checkBoxes, selectedVideos);
        totalDiCalls = selectedVideos.length;
        createRequest('addCaptions');
    });

    /**
     * getSelectedCheckboxes returns an array of the values
     * of checked checkboxes
     * @param {htmlElementCollection} checkboxCollection a collection of the checkbox elements, usually gotten by document.getElementsByName()
     * @param {Array} targetArray the array to store the values in
     * @returns {Array} the target array
     */
    function getSelectedCheckboxes(checkboxCollection, targetArray) {
        var i,
            iMax = checkboxCollection.length;
        for (i = 0; i < iMax; i += 1) {
            if (checkboxCollection[i].checked) {
                targetArray.push(checkboxCollection[i].value);
            }
        }
        return targetArray;
    }

    function disableButton(el) {
        el.setAttribute('disabled', 'disabled');
        el.setAttribute('style', 'cursor:not-allowed;opacity:.5')
    }

    /**
     * selects all checkboxes in a collection
     * of checked checkboxes
     * @param {htmlElementCollection} checkboxCollection a collection of the checkbox elements, usually gotten by document.getElementsByName()
     */
    function selectAllCheckboxes(checkboxCollection) {
        var i,
            iMax = checkboxCollection.length;
        for (i = 0; i < iMax; i += 1) {
            checkboxCollection[i].setAttribute('checked', 'checked');
        }
        return targetArray;
    }

    /**
     * createRequest sets up requests, send them to makeRequest(), and handles responses
     * @param  {string} type the request type
     */
    function createRequest(type) {
        var options    = {},
            cmsBaseURL = 'https://cms.api.brightcove.com/v1/accounts/' + brightcoveAccountId,
            diBaseURL  = 'https://ingest.api.brightcove.com/v1/accounts/' + brightcoveAccountId,
            endpoint,
            responseDecoded,
            limit      = 20,
            track,
            i,
            iMax;

        options.customer_id = customer_id;
        options.account_id  = brightcoveAccountId;
        switch (type) {
            case 'getVideoCount':
                endpoint            = '/counts/videos';
                options.url         = cmsBaseURL + endpoint;
                options.requestType = 'GET';
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    totalVideos     = parseInt(responseDecoded.count);
                    totalVideoSets  = Math.ceil(totalVideos / limit);
                });
                break;
            case 'getVideos':
                endpoint            = '/videos?limit=' + limit + '&offset=' + (nextVideoSet * limit);
                options.url         = cmsBaseURL + endpoint;
                options.requestType = 'GET';
                makeRequest(options, function(response) {
                    var video,
                        tr,
                        td,
                        input,
                        img,
                        txt,
                        docFragment = document.createDocumentFragment();
                    // parse the response
                    responseDecoded = JSON.parse(response);
                    // inject the table rows for the videos
                    iMax = responseDecoded.length;
                    for (i = 0; i < iMax; i++) {
                        video = responseDecoded[i];
                        if (video.id) {
                            tr = document.createElement('tr');
                            // checkbox cell
                            td = document.createElement('td');
                            input = document.createElement('input');
                            input.setAttribute('type', 'checkbox');
                            input.setAttribute('id', video.id);
                            input.setAttribute('name', 'videoSelect');
                            input.setAttribute('value', video.id);
                            td.appendChild(input);
                            tr.appendChild(td);
                            // thumbnail cell
                            if (video.images && video.images.thumbnail) {
                                td = document.createElement('td');
                                img = document.createElement('img');
                                img.setAttribute('src', video.images.thumbnail.src);
                                img.setAttribute('alt', video.name);
                                td.appendChild(img);
                                tr.appendChild(td);
                            } else {
                                td = document.createElement('td');
                                txt = document.createTextNode('(no image)');
                                td.appendChild(txt);
                                tr.appendChild(td);
                            }
                            // add title cell
                            td = document.createElement('td');
                            txt = document.createTextNode(video.name);
                            td.appendChild(txt);
                            tr.appendChild(td);
                            // append this row to the doc fragment
                            docFragment.appendChild(tr);
                        }
                    }
                    // clear the table body and append the doc fragment to the table body
                    videoTableBody.innerHTML = '';
                    videoTableBody.appendChild(docFragment);
                    // get a reference to the checkbox collection
                    checkBoxes = document.getElementsByName('videoSelect');
                });
                break;
            case 'addCaptions':
                console.log('selectedVideos', selectedVideos);
                options.proxyURL    = './retranscode-proxy.php';
                endpoint            = '/videos/' + selectedVideos[diCallNumber] + '/ingest-requests';
                options.url         = diBaseURL + endpoint;
                options.requestType = 'POST';
                options.requestBody = '{"text_tracks":[';
                iMax = text_tracks.length;
                for (i = 0; i < iMax; i++) {
                    track = text_tracks[i];
                    // note that default must be a boolean, so no quotes around the value
                    options.requestBody += '{"url":"' + track.url + '","srclang":"' + track.srclang + '","kind":"' + track.kind + '","label":"' + track.label + '","default":' + track.default + '}';
                    if (i < (iMax - 1)) {
                        options.requestBody += ',';
                    }
                }
                options.requestBody += ']}';
                makeRequest(options, function(response) {
                    responseDecoded = JSON.parse(response);
                    console.log('responseDecoded', responseDecoded);
                    diCallNumber++;
                    if (diCallNumber < totalDiCalls) {
                        createRequest('transcodeVideo');
                    } else {
                        // you could display some completed message here
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
     * @param  {String} options.account_id the account id
     * @param  {JSON} [options.requestBody] Data to be sent in the request body in the form of a JSON string
     * @param  {Function} [callback] callback function that will process the response
     */
    function makeRequest(options, callback) {
        var httpRequest = new XMLHttpRequest(),
            response,
            requestParams,
            dataString,
            proxyURL    = 'https://solutions.brightcove.com/bcls/add-captions/videos-proxy.php',
            // response handler
            getResponse = function() {
                try {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            response = httpRequest.responseText;
                            // some API requests return '{null}' for empty responses - breaks JSON.parse
                            console.log('response', response);
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
         console.log('options', options);
        requestParams = 'url=' + encodeURIComponent(options.url) + '&requestType=' + options.requestType + '&account_id=' + options.account_id + '&customer_id=' + options.customer_id;
        // only add client id and secret if both were submitted
        if (options.client_id && options.client_secret) {
            requestParams += '&client_id=' + options.client_id + '&client_secret=' + options.client_secret;
        }
        // add request data if any
        if (options.requestBody) {
            requestParams += '&requestBody=' + encodeURIComponent(options.requestBody);
        }
        console.log('requestParams', decodeURIComponent(requestParams));
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
