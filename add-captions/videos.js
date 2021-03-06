var BCLS = (function(window, document) {
    var videoTableBody      = document.getElementById('videoTableBody'),
        getPreviousVideos   = document.getElementById('getPreviousVideos'),
        getNextVideos       = document.getElementById('getNextVideos'),
        addCaptions         = document.getElementById('addCaptions'),
        statusMessages      = document.getElementById('statusMessages'),
        totalVideos         = 0,
        totalVideoSets      = 0,
        nextVideoSet        = 0,
        diCallNumber        = 0,
        totalDiCalls        = 0,
        // placeholder for a collection of checkboxes we'll get later
        eight_hour_checkBoxes,
        twelve_hour_checkBoxes,
        one_day_checkBoxes,
        two_day_checkBoxes,
        // place holder for the array of selected video ids
        eight_hourVideos    = [],
        twelve_hourVideos   = [],
        one_dayVideos       = [],
        two_dayVideos       = [],
        selectedVideos      = [],
        /**
         * since i don't have captions per video, i'm just adding
         * sample captions to all videos
         * note i'm adding English and Spanish both in case you do
         * multilanguage
         */
        text_tracks         = [{url:'http://solutions.brightcove.com/bcls/assets/vtt/sample.vtt', srclang:'en', kind:'captions', label:'English',default:'true'}, {url:'http://solutions.brightcove.com/bcls/assets/vtt/sample-es.vtt', srclang:'es', kind:'captions', label:'Español',default:'false'}],
        /**
         * in case this is for a multi-user environment
         * with multiple accounts, I'm simulating
         * user/account information obtained from some backend system
         */
        customer_id         = 'customer1',
        brightcoveAccountId = '1485884786001',
        pricePoints = ['8_hour', '12_hour', '1_day', '2_day'];

    /**
     * event listeners
     */
    // initial operations on page load
    window.addEventListener('load', function() {
        // get the video count and load the first set immediately
        disableButton(getPreviousVideos);
        createRequest('getVideoCount');
        createRequest('getVideos');
    });
    // get next set of videos
    getNextVideos.addEventListener('click', function() {
        // get the next video set
        statusMessages.textContent = '';
        enableButton(getPreviousVideos);
        nextVideoSet++;
        if (nextVideoSet === (totalVideoSets - 1)) {
            disableButton(getNextVideos);
        }
        createRequest('getVideos');
    });
    // get previous set of videos
    getPreviousVideos.addEventListener('click', function() {
        // get the next video set
        statusMessages.textContent = '';
        enableButton(getNextVideos);
        nextVideoSet--;
        if (nextVideoSet === 0) {
            disableButton(getPreviousVideos);
        }
        createRequest('getVideos');
    });
    // add captions to selected videos
    addCaptions.addEventListener('click', function() {
        // add captions to selected videos
        getSelectedCheckboxes(eight_hour_checkBoxes, eight_hourVideos);
        getSelectedCheckboxes(twelve_hour_checkBoxes, twelve_hourVideos);
        getSelectedCheckboxes(one_day_checkBoxes, one_dayVideos);
        getSelectedCheckboxes(two_day_checkBoxes, two_dayVideos);
        selectedVideos = eight_hourVideos.concat(twelve_hourVideos, one_dayVideos, two_dayVideos);
        console.log('selectedVideos', selectedVideos);
        // getSelectedCheckboxes(two_day_checkBoxes, two_dayVideos);
        totalDiCalls = selectedVideos.length;
        statusMessages.textContent = 'Adding captions...';
        createRequest('addCaptions');
        //
        console.log('eight_hourVideos', eight_hourVideos);
        console.log('twelve_hourVideos', twelve_hourVideos);
        console.log('one_dayVideos', one_dayVideos);
        console.log('two_dayVideos', two_dayVideos);
        /**
         * now you have arrays of the video ids for each pricepoint
         * to handoff to Vantage
         */
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
    }

    /**
     * Enable a button
     * @param {htmlElement} el the button
     */
    function enableButton(el) {
        el.removeAttribute('disabled');
        el.setAttribute('style', 'cursor:pointer;opacity:1;');
    }

    /**
    * Disable a button
    * @param {htmlElement} el the button
    */
    function disableButton(el) {
        el.setAttribute('disabled', 'disabled');
        el.setAttribute('style', 'cursor:not-allowed;opacity:.7;');
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
    }

    /**
     * deselects all checkboxes in a collection
     * of checked checkboxes
     * @param {htmlElementCollection} checkboxCollection a collection of the checkbox elements, usually gotten by document.getElementsByName()
     */
    function deselectAllCheckboxes(checkboxCollection) {
        var i,
            iMax = checkboxCollection.length;
        for (i = 0; i < iMax; i += 1) {
            checkboxCollection[i].removeAttribute('checked');
        }
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
                        br,
                        input,
                        label,
                        img,
                        txt,
                        j,
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
                            for (j = 0; j < pricePoints.length; j++) {
                                input = document.createElement('input');
                                input.setAttribute('type', 'checkbox');
                                input.setAttribute('id', pricePoints[j] + '_check_' + j);
                                input.setAttribute('name', pricePoints[j]);
                                input.setAttribute('value', video.id);
                                td.appendChild(input);
                                label = document.createElement('label');
                                label.setAttribute('for', pricePoints[j] + '_check_' + j);
                                txt = document.createTextNode(pricePoints[j]);
                                label.appendChild(txt);
                                td.appendChild(label);
                                br = document.createElement('br');
                                td.appendChild(br);
                            }
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
                            br = document.createElement('br');
                            td.appendChild(br);
                            txt = document.createTextNode(video.description);
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
                    eight_hour_checkBoxes = document.getElementsByName('8_hour');
                    twelve_hour_checkBoxes = document.getElementsByName('12_hour');
                    one_day_checkBoxes = document.getElementsByName('1_day');
                    two_day_checkBoxes = document.getElementsByName('2_day');
                });
                break;
            case 'addCaptions':
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
                    diCallNumber++;
                    if (diCallNumber < totalDiCalls) {
                        createRequest('addCaptions');
                    } else {
                        statusMessages.textContent = 'Captions added to ' + totalDiCalls + ' videos';
                        deselectAllCheckboxes(eight_hour_checkBoxes);
                        deselectAllCheckboxes(twelve_hour_checkBoxes);
                        deselectAllCheckboxes(one_day_checkBoxes);
                        deselectAllCheckboxes(two_day_checkBoxes);
                    }
                });
                break;
            default:
                // shouldn't be here
                console.log('somehow got to default case');
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
        requestParams = 'url=' + encodeURIComponent(options.url) + '&requestType=' + options.requestType + '&account_id=' + options.account_id + '&customer_id=' + options.customer_id;
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
