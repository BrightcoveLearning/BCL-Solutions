var BCLS = (function(window, document) {
  var account_id_input = document.getElementById('account_id_input'),
    client_id_input = document.getElementById('client_id_input'),
    client_secret_input = document.getElementById('client_secret_input'),
    get_profiles = document.getElementById('get_profiles'),
    logger = document.getElementById('logger'),
    api_request_display = document.getElementById('api_request_display'),
    api_response = document.getElementById('api_response'),
    list_filters = document.getElementsByName('list_filter'),
    hide_obsolete = document.getElementById('hide_obsolete'),
    profile_list = document.getElementById('profile_list'),
    obsoletes_hidden = true,
    all_profiles = [],
    all_current_profiles = [],
    filtered_profiles = [],
    // below are the 3 standard live profiles - you just have to know their names
    live_profiles = ['Live - Standard', 'Live - HD', 'Live - Premium HD'],
    account_id,
    default_account_id = '1752604059001',
    client_id,
    client_secret,
    selectedProfile,
    i,
    iMax;

  // event listeners
  get_profiles.addEventListener('click', function() {
    getAccountInfo();
    createRequest('get_profiles');
  });

  iMax = list_filters.length;
  for (i = 0; i < iMax; i++) {
    list_filters[i].addEventListener('change', function() {
      filterProfiles(getRadioValue(list_filters));
    });
  }

  hide_obsolete.addEventListener('change', function() {
    toggleObsoleteProfiles();
  });


  /**
   * get account info from input fields
   */
  function getAccountInfo() {
      account_id    = (isDefined(account_id_input.value)) ? removeSpaces(account_id_input.value) : default_account_id;
      client_id     = removeSpaces(client_id_input.value);
      client_secret = removeSpaces(client_secret_input.value);
      return;
  }

  /**
   * injects messages into the UI
   * @param  {HTMLElement} el The element to inject text into
   * @param  {String} message The message to inject
   * @param  {Boolean} append Append the message to existing content
   */
  function logMessage(el, message, append) {
    if (append === true) {
      var br = document.createElement('br');
      el.appendChild(br);
      el.appendChild(document.createTextNode(message));
    } else {
      el.textContent = message;
    }
    return;
  }

  /**
   * tests for all the ways a variable might be undefined or not have a value
   * @param {*} x the variable to test
   * @return {Boolean} true if variable is defined and has a value
   */
  function isDefined(x) {
      if ( x === '' || x === null || x === undefined) {
          return false;
      }
      return true;
  }

  /**
   * tests to see if a string is json
   * @param {String} str string to test
   * @return {Boolean}
   */
  function isJson(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }

  /**
   * determines if checkbox is checked
   * @param  {htmlElement}  e the checkbox to check
   * @return {Boolean}  true if box is checked
   */
  function isChecked(e) {
    if (e.checked) {
      return true;
    }
    return false;
  }

  /**
  * get value of a selected radio buttom
  * @param {htmlElementCollection} rgroup the collection of radio buttom elements
  */
  function getRadioValue(rgroup) {
      var i = 0,
      iMax = rgroup.length;
      for (i; i < iMax; i++) {
          if (rgroup[i].checked) {
              return rgroup[i].value;
          }
      }
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
   * find index of an object in array of objects
   * based on some property value
   *
   * @param {array} targetArray array to search
   * @param {string} objProperty object property to search
   * @param {string} value of the property to search for
   * @return {integer} index of first instance if found, otherwise returns -1
  */
  function findObjectInArray(targetArray, objProperty, value) {
      var i, totalItems = targetArray.length, objFound = false;
      for (i = 0; i < totalItems; i++) {
          if (targetArray[i][objProperty] === value) {
              objFound = true;
              return i;
          }
      }
      if (objFound === false) {
          return -1;
      }
  }

/**
 * remove or add obsolete profiles from the current profiles list
 */
  function toggleObsoleteProfiles() {
    // below are the obsolete profiles - you just have to know their names
    var deprecated_profiles = ['balanced-nextgen-player', 'Express Standard', 'mp4-only', 'balanced-high-definition', 'low-bandwidth-devices', 'balanced-standard-definition', 'single-rendition', 'Live - Standard', 'high-bandwidth-devices', 'Live - Premium HD', 'Live - HD', 'videocloud-default-trial', 'screencast'];
    if (isChecked(hide_obsolete)) {
      i = all_current_profiles.length;
      while (i > 0) {
        i--;
        if (arrayContains(deprecated_profiles, all_current_profiles[i].name)) {
          all_current_profiles.splice(i, 1);
        }
        if (!obsoletes_hidden) {
          obsoletes_hidden = true;
        }
      }
    } else {
      var index;
      if (obsoletes_hidden) {
        iMax = deprecated_profiles.length;
        for (i = 0; i < iMax; i++) {
          index = findObjectInArray(all_profiles, 'name', deprecated_profiles[i]);
          all_current_profiles.push(all_profiles[index]);
          obsoletes_hidden = false;
        }
        obsoletes_hidden = false;
      }
    }
    displayFilteredProfiles();
    return;
  }

  /**
   * remove spaces from a string
   * @param {String} str string to process
   * @return {String} trimmed string
   */
  function removeSpaces(str) {
      str= str.replace(/\s/g, '');
      return str;
  }

  /**
   * displays the filtered list of profiles
   */
  function displayFilteredProfiles() {
    var ul = document.createElement('ul'),
      li;
    iMax = all_current_profiles.length;
    for (i = 0; i < iMax; i++) {
      li = document.createElement('li');
      li.textContent = all_current_profiles[i].name;
      ul.appendChild(li);
    }
    profile_list.innerHTML = '';
    profile_list.appendChild(ul);
    return;
  }

  /**
   * resets the current profiles array to all profiles
   */
  function resetAllCurrentProfiles() {
    iMax = all_profiles.length;
    all_current_profiles = [];
    for (i = 0; i < iMax; i++) {
      all_current_profiles.push(all_profiles[i]);
    }
  }

  /**
   * filters the profile list
   * @param  {string} filter_type the type of filter to use
   */
  function filterProfiles(filter_type) {
    if (filter_type) {
      resetAllCurrentProfiles();
      toggleObsoleteProfiles();
      switch (filter_type) {
        case 'show_all':
          // nothing to do here; just a pass-through
          break;
        case 'show_standard':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (all_current_profiles[i].brightcove_standard === false) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        case 'show_custom':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (all_current_profiles[i].brightcove_standard === true) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        case 'show_live':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (!arrayContains(live_profiles, all_current_profiles[i].name)) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        case 'hide_legacy':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (all_current_profiles[i].hasOwnProperty('dynamic_origin')) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        case 'hide_dynamic_delivery':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (!all_current_profiles[i].hasOwnProperty('dynamic_origin')) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        case 'hide_cae':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (!all_current_profiles[i].hasOwnProperty('dynamic_origin')) {
              all_current_profiles.splice(i, 1);
            } else if (all_current_profiles[i].dynamic_origin.hasOwnProperty('dynamic_profile_options')) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        case 'show_cae':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (!all_current_profiles[i].hasOwnProperty('dynamic_origin')) {
              all_current_profiles.splice(i, 1);
            } else if (!all_current_profiles[i].dynamic_origin.hasOwnProperty('dynamic_profile_options')) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        default:
        console.log('should not be here - unknown filter_type: ', filter_type);
      }
      displayFilteredProfiles();
    } else {
      console.log('no filter_type passed');
    }
    return;
  }

  /**
   * createRequest sets up requests, send them to makeRequest(), and handles responses
   * @param  {string} type the request type
   */
  function createRequest(type) {
    var options = {},
      requestBody = {},
      proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/doc-samples-proxy-v2.php',
      baseURL = 'https://ingestion.api.brightcove.com/v1/accounts/' + account_id,
      endpoint,
      responseDecoded,
      today = new Date().toISOString(),
      tmpArray = [],
      i,
      iMax;

    // set credentials
    if (isDefined(client_id) && isDefined(client_secret)) {
      options.client_id = client_id;
      options.client_secret = client_secret;
    }
    options.account_id = account_id;
    options.proxyURL = proxyURL;

    switch (type) {
      case 'get_profiles':
        logMessage(logger, 'Getting all_profiles', true);
        endpoint = '/profiles';
        options.url = baseURL + endpoint;
        api_request_display.textContent = options.url;
        options.requestType = 'GET';
        makeRequest(options, function(response) {
          if (isJson(response)) {
            responseDecoded = JSON.parse(response);
            api_response.textContent = JSON.stringify(responseDecoded, null, '  ');
            all_profiles = responseDecoded;
            resetAllCurrentProfiles();
            toggleObsoleteProfiles();
            displayFilteredProfiles();
          } else {
            api_response.textContent = response;
            logMessage(logger, 'The get all profiles operation failed; see the API Response for the error', true);
            return;
          }
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

})(window, document);
