var BCLS = (function(window, document) {
  var // CMS API stuff
    account_id = '57838016001',
    callbackURL = './callbacks-di.php',
    account = document.getElementById('account'),
    cms_requestBody = document.getElementById('cms_requestBody'),
    cms_url = document.getElementById('cms_url'),
    di_requestBody = document.getElementById('di_requestBody'),
    di_url = document.getElementById('di_url'),
    cms_submit = document.getElementById('cms_Submit'),
    cms_response = document.getElementById('cms_response'),
    di_response = document.getElementById('di_response'),
    proxyURL = "./brightcove-learning-proxy.php",
    videoSelector = document.getElementById('videoSelector'),
    profileSelector = document.getElementById('profileSelector'),
    selectedVideo,
    selectedVideoURL,
    selectedProfile,
    videoName,
    reference_id,
    profiles,
    ddProfiles = [];

  /**
   * get selected value for single select element
   * @param {htmlElement} e the select element
   * @return {Object} object containing the `value`, text, and selected `index`
   */
  function getSelectedValue(e) {
    var selected = e.options[e.selectedIndex],
      val = selected.value,
      txt = selected.textContent,
      idx = e.selectedIndex;
    return {
      value: val,
      text: txt,
      index: idx
    };
  }

  /**
   * find the dynamic delivery profiles
   * @param {array} profiles the profiles array to search
   */
  function findDynamicDelivery(profiles) {
    var i = 0,
      iMax = profiles.length;
    for (i; i < iMax; i++) {
      if (profiles[i].hasOwnProperty('dynamic_origin')) {
        ddProfiles.push(profiles[i]);
      }
    }
    return;
  }

  /**
   * remove obsolete profiles from the current profiles list
   */
  function removeObsoleteProfiles(profiles) {
    // below are the obsolete profiles - you just have to know their names
    var deprecated_profiles = ['balanced-nextgen-player', 'Express Standard', 'mp4-only', 'balanced-high-definition', 'low-bandwidth-devices', 'balanced-standard-definition', 'single-rendition', 'Live - Standard', 'high-bandwidth-devices', 'Live - Premium HD', 'Live - HD', 'videocloud-default-trial', 'screencast'],
      i = profiles.length;
    while (i > 0) {
      i--;
      if (arrayContains(deprecated_profiles, profiles[i].name)) {
        profiles.splice(i, 1);
      }
    }
    return profiles;
  }

  /**
   * createRequest sets up requests, send them to makeRequest(), and handles responses
   * @param  {string} type the request type
   */
  function createRequest(type) {
    var options = {},
      requestBody = {},
      ipBaseURL = 'https://ingestion.api.brightcove.com/v1/accounts/' + account_id,
      cmsBaseURL = 'https://cms.api.brightcove.com/v1/accounts/' + account_id,
      diBaseURL = 'https://ingest.api.brightcove.com/v1/accounts/' + account_id,
      endpoint,
      responseDecoded,
      i,
      iMax,
      el,
      txt;

    options.proxyURL = proxyURL;

    switch (type) {
      case 'getProfiles':
        endpoint = '/profiles';
        options.url = ipBaseURL + endpoint;
        options.requestType = 'GET';
        makeRequest(options, function(response) {
          profiles = JSON.parse(response);
          if (Array.isArray(responseDecoded)) {
            // remove obsolete profiles
            profiles = removeObsoleteProfiles(profiles);
            findDynamicDelivery(profiles);
            // if there are dynamic delivery profiles, only show those
            if (ddProfiles.length > 0) {
              profiles = ddProfiles;
            }
            // add new options
            iMax = responseDecoded.length;
            for (i = 0; i < iMax; i++) {
              el = document.createElement('option');
              el.setAttribute('value', responseDecoded[i].name);
              txt = document.createTextNode(responseDecoded[i].name);
              el.appendChild(txt);
              profileSelector.appendChild(el);
            }
          }
        });
        break;
      case 'createVideo':
        endpoint = '/profiles';
        options.url = cmsBaseURL + endpoint;
        options.requestType = 'POST';
        requestBody.master = {};
        requestBody.master.url = 'http://myvideos.com/foo.mp4';
        // add more properties
        options.requestBody = JSON.stringify(requestBody);
        makeRequest(options, function(response) {
          responseDecoded = JSON.parse(response);
          // do more stuff
        });
        break;

      case 'ingestVideo':
        endpoint = '/profiles';
        options.url = diBaseURL + endpoint;
        options.requestType = 'POST';
        requestBody.master = {};
        requestBody.master.url = selectedVideoURL;
        requestBody.profile = selectedProfile;
        requestBody.callbacks = [];
        requestBody.callbacks.push(callbackURL);
        // add more properties
        options.requestBody = JSON.stringify(requestBody);
        makeRequest(options, function(response) {
          responseDecoded = JSON.parse(response);
          // do more stuff
        });
        break;

        // additional cases
      default:
        console.log('Should not be getting to the default case - bad request type sent');
        break;
    }
  }

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
      proxyURL = options.proxyURL,
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
    if (options.requestBody) {
      requestParams += '&requestBody=' + options.requestBody;
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

  // set the CMS request data
  function setCMSDataDisplay() {
    var body = {};
    body.name = selectedVideo;
    body.reference_id = reference_id;
    cms_requestBody.value = JSON.stringify(body);
  };

  // set DI request data
  function setDIDataDisplay() {
    var body = {};
    di_requestBody.textContent = '{"master":{"url":"' + selectedVideoURL + '"},"profile":"' + selectedProfile + '","callbacks": [' + callbackURL + ']}'
  }

  // get the videoname from the path, append timestamp
  function getVideoName() {
    var now = new Date().toISOString(),
      video = getSelectedValue(videoSelector);
    selectedVideo = video.text;
    reference_id = video.text + now;
    return selectedVideo;
  }

  // event listeners
  videoSelector.addEventListener('change', function() {
    selectedVideoURL = getSelectedValue(videoSelector);
    videoName = getVideoName();
    setCMSDataDisplay();
    setDIDataDisplay();
  });
  profileSelector.addEventListener('change', function() {
    selectedProfile = getSelectedValue(profileSelector);
    videoName = getVideoName();
    setCMSDataDisplay();
    setDIDataDisplay();
  });
  cms_submit.addEventListener('click', function() {
    createRequest('createVideo');
  });

  // get profiles and initial values
  createRequest('getProfiles');
  selectedVideoURL = getSelectedValue(videoSelector);
  selectedVideo = getVideoName();
  account.innerHTML = account_id;
  setCMSDataDisplay();
})(window, document);
