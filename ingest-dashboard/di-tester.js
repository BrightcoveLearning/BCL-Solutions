var BCLS = (function(window, document) {
  var // CMS API stuff
    account_id = '57838016001',
    callbackURL = 'https://solutions.brightcove.com/bcls/ingest-dashboard/callbacks-di.php',
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
    ipBaseUrl = 'https://ingestion.api.brightcove.com/v1/accounts',
    cmsBaseUrl = 'https://cms.api.brightcove.com/v1/accounts',
    diBaseUrl =  'https://ingest.api.brightcove.com/v1/accounts',
    selectedVideo,
    selectedVideoURL,
    selectedProfile,
    videoName,
    reference_id,
    video_id,
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
      endpoint,
      responseDecoded,
      i,
      iMax,
      el,
      txt;

    options.proxyURL = proxyURL;

    switch (type) {
      case 'getProfiles':
        endpoint = '/' + account_id + '/profiles';
        options.url = ipBaseUrl + endpoint;
        options.requestType = 'GET';
        makeRequest(options, function(response) {
          profiles = JSON.parse(response);
            // remove obsolete profiles
            profiles = removeObsoleteProfiles(profiles);
            findDynamicDelivery(profiles);
            // if there are dynamic delivery profiles, only show those
            if (ddProfiles.length > 0) {
              profiles = ddProfiles;
            }
            // add new options
            iMax = profiles.length;
            for (i = 0; i < iMax; i++) {
              el = document.createElement('option');
              el.setAttribute('value', profiles[i].name);
              txt = document.createTextNode(profiles[i].name);
              el.appendChild(txt);
              profileSelector.appendChild(el);
            }
        });
        break;
      case 'createVideo':
        options.url = cms_url.value;
        options.requestType = 'POST';
        options.requestBody = cms_requestBody.value;
        console.log('video options', options);
        makeRequest(options, function(response) {
          responseDecoded = JSON.parse(response);
          video_id = responseDecoded.id;
          cms_response.textContent = JSON.stringify(responseDecoded, null, 2);
          createRequest('ingestVideo');
        });
        break;

      case 'ingestVideo':
      var body = {};
      body.master = {};
      body.master.url = selectedVideoURL;
      if (selectedProfile) {
        body.profile = selectedProfile;
      }
      body['capture-images'] = true;
      body.callbacks = [callbackURL];
      di_requestBody.textContent = JSON.stringify(body);
      di_url.textContent = diBaseUrl + '/' + account_id + '/videos/' + video_id + '/ingest-requests';
        options.url = di_url.textContent;
        options.requestType = 'POST';
        options.requestBody = JSON.stringify(body);
        makeRequest(options, function(response) {
          responseDecoded = JSON.parse(response);
          di_response.textContent = JSON.stringify(responseDecoded);
        });
        break;

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
          proxyURL    = options.proxyURL,
          // response handler
          getResponse = function() {
              try {
                  if (httpRequest.readyState === 4) {
                      if (httpRequest.status >= 200 && httpRequest.status < 300) {
                          response = httpRequest.responseText;
                          console.log('response', response);
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
       * JSON.stringify(options)
       */
      // set response handler
      httpRequest.onreadystatechange = getResponse;
      // open the request
      httpRequest.open('POST', proxyURL);
      // set headers if there is a set header line, remove it
      // open and send request
      httpRequest.send(JSON.stringify(options));
  }


  // set the CMS request data
  function setCMSDataDisplay() {
    var body = {};
    body.name = selectedVideo;
    body.reference_id = reference_id;
    cms_requestBody.value = JSON.stringify(body);
    cms_url.value = cmsBaseUrl + '/' + account_id + '/videos';
  };

  // get the videoname from the path, append timestamp
  function getVideoName() {
    var now = new Date().toISOString(),
      video = getSelectedValue(videoSelector);
      console.log('video', video);
    selectedVideo = video.text;
    selectedVideoURL = video.value;
    reference_id = video.text + now;
    return selectedVideo;
  }

  // event listeners
  videoSelector.addEventListener('change', function() {
    videoName = getVideoName();
    setCMSDataDisplay();
  });
  profileSelector.addEventListener('change', function() {
    selectedProfile = getSelectedValue(profileSelector).value;
    videoName = getVideoName();
    setCMSDataDisplay();
  });
  cms_submit.addEventListener('click', function() {
    selectedProfile = getSelectedValue(profileSelector).value;
    videoName = getVideoName();
    setCMSDataDisplay();
    createRequest('createVideo');
  });

  // get profiles and initial values
  createRequest('getProfiles');
  selectedVideoURL = getSelectedValue(videoSelector);
  selectedVideo = getVideoName();
  account.innerHTML = account_id;
  setCMSDataDisplay();
})(window, document);
