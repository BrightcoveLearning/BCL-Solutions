var BCLS = (function(window, document, rome) {
  var account          = document.getElementById('account'),
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
    showJobCount       = document.getElementById('showJobCount'),
    jobCount           = document.getElementById('jobCount'),
    showFailedJobs     = document.getElementById('showFailedJobs'),
    failedJobs         = document.getElementById('failedJobs'),
    showNotifications  = document.getElementById('showNotifications'),
    notifications      = document.getElementById('notifications'),
    dateRangeType      = document.getElementById('dateRangeType'),
    fromDate           = document.getElementById('fromDate'),
    toDate             = document.getElementById('toDate'),
    current_response   = document.getElementById('current_response'),
    lowPriority        = document.getElementById('lowPriority'),
    profileFilters     = document.getElementsByName('profileFilters'),
    show_legacy         = document.getElementById('show_legacy'),
    show_dynamic_delivery        = document.getElementById('show_dynamic_delivery'),
    showDDonly         = false,
    showLegacyOnly     = false,
    normalPriority     = true,
    dateTypeValue,
    fromDateValue,
    toDateValue,
    searchStringValue  = '',
    accountIdValue     = '3921507403001', // initial account value for profiles
    clientIdValue,
    clientSecretValue,
    jobCountFile,
    notificationsFile,
    selectedProfile    = '',
    all_profiles       = [],
    all_current_profiles = [],
    videoIDs           = [],
    rejectedVideoIDs   = [],
    errorCodes         = [],
    intervalID,
    totalVideos        = 0,
    totalCMSCalls      = 0,
    callNumber         = 0,
    timePassed         = 0,
    i,
    iMax;

  // date pickers
  rome(fromDate);
  rome(toDate);

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

  // event listeners
  profileBtn.addEventListener('click', function() {
    if (checkRequired()) {
      // get account info
      getAccountInfo(function(response) {
        if (response) {
          createRequest('getProfiles');
        }
      });
    } else {
      alert('The account id, client id, and client secret are required');
    }
  });

  goBtn.addEventListener('click', function() {
    if (checkRequired()) {
      jobCountFile      = account.value + '_count.txt';
      notificationsFile = account.value + '_notifications.txt';
      console.log('jobCountFile', jobCountFile);
      selectedProfile   = getSelectedValue(profiles);
      if (isChecked(lowPriority)) {
        normalPriority = false;
      }
      intervalID        = window.setInterval(function() {
        var now;
        timePassed++;
        now = secondsToTime(timePassed);
        logMessage(timeElapsed, now.h + ':' + now.m + ':' + now.s);
      }, 1000);
      // get account field values
      getAccountInfo(function(response) {
        if (response) {
          setSearchString(function(response) {
            if (response) {
              createRequest('deleteOldLogs');
            }
          });
        }
      });
    } else {
      alert('The account id, client id, and client secret are required');
    }
  });

  showJobCount.addEventListener('click', function() {
    createRequest('showJobCount');
  });

  showFailedJobs.addEventListener('click', function() {
    createRequest('showFailedJobs');
  });

  showNotifications.addEventListener('click', function() {
    createRequest('showNotifications');
  });

  iMax = profileFilters.length;
  for (i = 0; i < iMax; i++) {
    profileFilters[i].addEventListener('change', function() {
      filterProfiles();
    });
  }

  lowPriority.addEventListener('change', function() {
    togglefilters();
    filterProfiles();
  });

  /**
   * gets various values from account info fields
   */
  function getAccountInfo(callback) {
    // get values
    accountIdValue    = account.value;
    clientIdValue     = cid.value;
    clientSecretValue = secret.value;
    if (isDefined(accountIdValue) && isDefined(clientIdValue) && isDefined(clientSecretValue)) {
      callback(true);
    } else {
      console.log('You must provide the account id, client id, and client secret');
      callback(false);
    }
  }

  function togglefilters() {
    if (isChecked(lowPriority)) {
      show_dynamic_delivery.checked = true;
    }
  }

  /*
   * set up search string value based on inputs
   */
  function setSearchString(callback) {
    // set searchStringValue
    dateTypeValue     = getSelectedValue(dateRangeType);
    fromDateValue     = rome(fromDate).getDate();
    if (isDefined(fromDateValue)) {
      fromDateValue   = fromDateValue.toISOString();
    } else {
      fromDateValue   = '';
    }
    toDateValue       = rome(toDate).getDate();
    if (isDefined(toDateValue)) {
      toDateValue     = toDateValue.toISOString();
    } else {
      toDateValue     = '';
    }

    if (searchString.value) {
// console.log('search value: ', searchString.value);
// console.log('fromDateValue', fromDateValue);
// console.log('toDateValue', toDateValue);
      searchStringValue += 'q=' + encodeURI(searchString.value);
      if (isDefined(fromDateValue) || isDefined(toDateValue)) {
        searchStringValue += '+%2B' + dateTypeValue + ':' + fromDateValue + '..' + toDateValue;
      }
    } else {
      if (isDefined(fromDateValue) || isDefined(toDateValue)) {
        searchStringValue += 'q=' + dateTypeValue + ':' + fromDateValue + '..' + toDateValue;
      }
    }
    // console.log('searchStringValue', searchStringValue);
    callback(true);
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

  function removeObsoleteProfiles() {
    var deprecated_profiles = ['balanced-nextgen-player', 'Express Standard', 'mp4-only', 'balanced-high-definition', 'low-bandwidth-devices', 'balanced-standard-definition', 'single-rendition', 'Live - Standard', 'high-bandwidth-devices', 'Live - Premium HD', 'Live - HD', 'videocloud-default-trial', 'screencast'],
      i = all_current_profiles.length;
    while (i > 0) {
      i--;
      if (arrayContains(deprecated_profiles, all_current_profiles[i].name)) {
        all_current_profiles.splice(i, 1);
      }
    }
  }

  /**
   * filters the profile list
   * @param  {string} filter_type the type of filter to use
   */
  function filterProfiles() {
    var filter_type = getRadioValue(profileFilters);
    console.log('filter_type', filter_type);
    all_current_profiles = [];
    iMax = all_profiles.length;
    for (i = 0; i < iMax; i++) {
      all_current_profiles.push(all_profiles[i]);
    }
    // console.log('all_current_profiles', all_current_profiles);
      switch (filter_type) {
        case 'show_legacy':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (all_current_profiles[i].hasOwnProperty('dynamic_origin')) {
              all_current_profiles.splice(i, 1);
            }
          }
          console.log('all_current_profiles', all_current_profiles);
          break;
        case 'show_dynamic_delivery':
          i = all_current_profiles.length;
          while (i > 0) {
            i--;
            if (!all_current_profiles[i].hasOwnProperty('dynamic_origin')) {
              all_current_profiles.splice(i, 1);
            }
          }
          break;
        case 'show_all':
          // do nothing; don't need to remove any profiles
          break;
        default:
        console.log('should not be here - unknown filter_type: ', filter_type);
      }
      console.log('all_current_profiles', all_current_profiles);
      displayFilteredProfiles();
    return;
  }

/**
 * add profile options to the profile select
 */
  function displayFilteredProfiles() {
    var option,
      profile,
      frag = document.createDocumentFragment(),
      i,
      iMax;
    // remove existing options
    profiles.innerHTML = '';

    iMax = all_current_profiles.length;
    for (i = 0; i < iMax; i++) {
      profile = all_current_profiles[i],
      option = document.createElement('option');
      option.setAttribute('value', profile.name);
      if (isDefined(profile.display_name)) {
        option.textContent = profile.display_name;
      } else {
        option.textContent = profile.name;
      }
      frag.appendChild(option);
    }
    profiles.appendChild(frag);
  }

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
    var hours             = Math.floor(secs / (60 * 60)),
      divisor_for_minutes = secs % (60 * 60),
      minutes             = Math.floor(divisor_for_minutes / 60),
      divisor_for_seconds = divisor_for_minutes % 60,
      seconds             = Math.ceil(divisor_for_seconds),
      obj                 = {};

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
    if (e.checked) {
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
      val = selected.value,
      txt = selected.textContent;
    if (val) {
      return val;
    } else {
      return txt;
    }
  }


  function submitTranscodeRequest() {
    console.log('sending next transcode request');
    createRequest('transcodeVideo');
  }

  /**
   * createRequest sets up requests, send them to makeRequest(), and handles responses
   * @param  {string} type the request type
   */
  function createRequest(type) {
    var options = {},
      requestBody = {},
      url,
      ipBaseURL = 'https://ingestion.api.brightcove.com/v1/accounts/' + accountIdValue,
      cmsBaseURL = 'https://cms.api.brightcove.com/v1/accounts/' + accountIdValue,
      diBaseURL = 'https://ingest.api.brightcove.com/v1/accounts/' + accountIdValue,
      endpoint,
      responseDecoded,
      limit = 25,
      text,
      slackMessage = {},
      t,
      i,
      iMax,
      el,
      txt;

    // set credentials
    options.client_id     = clientIdValue;
    options.client_secret = clientSecretValue;
    options.account_id    = accountIdValue;
    options.normalPriority = normalPriority;

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
        options.proxyURL = './profiles-proxy.php';
        endpoint = '/profiles';
        options.url = ipBaseURL + endpoint;
        options.requestType = 'GET';
        logMessage(status, 'Getting account ingest profiles');
        console.log('options', options);
        makeRequest(options, function(response) {
          var profileNamePrefix;
          responseDecoded = JSON.parse(response);
          console.log('all_profiles', all_profiles);
          if (Array.isArray(responseDecoded)) {
            all_current_profiles = responseDecoded;
            // remove deprecated Profiles
            removeObsoleteProfiles();
            iMax = all_current_profiles.length;
            all_profiles = [];
            for (i = 0; i < iMax; i++) {
              all_profiles.push(all_current_profiles[i]);
            }
            console.log('all_profiles2', all_profiles);
            filterProfiles();
            logMessage(status, 'Account ingests profiles retrieved');
          }
        });
        break;
      case 'getVideoCount':
        options.proxyURL = './videos-proxy.php';
        endpoint = '/counts/videos';
        if (searchStringValue) {
          endpoint += '?' + searchStringValue;
        }
        options.url = cmsBaseURL + endpoint;
console.log('url', options.url);
        options.requestType = 'GET';
        logMessage(status, 'Getting video count');
        makeRequest(options, function(response) {
console.log('count response', response);
          responseDecoded = JSON.parse(response);
          if (responseDecoded.error_code) {
            errorCodes.push('get video count error: ' + responseDecoded.error_code);
          } else {
            totalVideos = parseInt(responseDecoded.count);
            if (totalVideos > 0) {
              totalCMSCalls = Math.ceil(totalVideos / limit);
              logMessage(status, 'Video count retrieved');
              logMessage(videoCount, totalVideos);
              createRequest('getVideos');
            } else {
              alert('Something went wrong - no videos found; the server returned: ' + response);
            }
          }
        });
        break;
      case 'getVideos':
        var shared = false;
        options.proxyURL = './videos-proxy.php';
        endpoint = '/videos?sort=created_at&limit=' + limit + '&offset=' + (callNumber * limit);
        if (isDefined(searchStringValue)) {
          endpoint += '&' + searchStringValue;
        }
// console.log('video endpoint', endpoint);
        options.url = cmsBaseURL + endpoint;
        options.requestType = 'GET';
        logMessage(status, 'Getting videos');
        makeRequest(options, function(response) {
// console.log('videos response', response);
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
              createRequest('transcodeVideo');
            }
          } else {
            iMax = responseDecoded.length;
            for (i = 0; i < iMax; i++) {
              if (isDefined(responseDecoded[i].sharing)) {
                if (responseDecoded[i].sharing.hasOwnProperty('by_external_acct')) {
                  if (responseDecoded[i].sharing.by_external_acct) {
                    shared = true;
                  }
                }
              }
              if (responseDecoded[i].has_digital_master === true && !shared) {
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
              createRequest('sendStartMessage');
              createRequest('transcodeVideo');
            }
          }
        });
        break;
      case 'transcodeVideo':
        var timeDelay;
        options.proxyURL = './retranscode-proxy.php';
        endpoint = '/videos/' + videoIDs[callNumber] + '/ingest-requests';
        options.url = diBaseURL + endpoint;
        options.requestType = 'POST';
        requestBody.profile = selectedProfile;
        requestBody['capture-images'] = isChecked(captureImages);
        requestBody.master = {};
        requestBody.master.use_archived_master = true;
        requestBody.callbacks = ['https://solutions.brightcove.com/bcls/retranscode/notifications.php','http://solutions.brightcove.com/bcls/di-api/di-callbacks.php'];
console.log('requestBody', requestBody);
        options.requestBody = JSON.stringify(requestBody);
console.log('stringified body', options.requestBody);
        logMessage(status, 'Sending retranscode requests - do NOT leave this page');
        makeRequest(options, function(response) {
          responseDecoded = JSON.parse(response);
          console.log('response', responseDecoded);
          logMessage(current_response, JSON.stringify(responseDecoded, null, '  '));
          if (Array.isArray(responseDecoded)) {
            errorCodes.push('retranscoding ' + videoIDs[callNumber] + ': ' + responseDecoded[0].error_code);
            if (responseDecoded[0].error_code !== 'RATE_LIMIT_EXCEEDED') {
              callNumber++;
            }
            if (callNumber < videoIDs.length) {
              logMessage(videosRetranscoded, callNumber);
              timeDelay = window.setTimeout(submitTranscodeRequest, 1000);
            } else {
              createRequest('sendEndMessage');
              logMessage(videosRetranscoded, callNumber);
              logMessage(status, 'All retranscode requests submitted');
              logMessage(rejected, JSON.stringify(rejectedVideoIDs));
              logMessage(errors, JSON.stringify(errorCodes, null, '  '));
            }
          } else if (responseDecoded.message === 'wait') {
            t = window.setTimeout(submitTranscodeRequest, 60000);
            logMessage(status, 'Job queue full - retrying in 10 seconds');
          } else {
            callNumber++;
            if (callNumber < videoIDs.length) {
              logMessage(videosRetranscoded, callNumber);
              console.log('pausing 1 sec');
              timeDelay = window.setTimeout(submitTranscodeRequest, 1000);
            } else {
              window.clearInterval(intervalID);
              createRequest('sendEndMessage');
              logMessage(videosRetranscoded, callNumber);
              logMessage(status, 'All retranscode requests submitted');
              logMessage(rejected, JSON.stringify(rejectedVideoIDs, null, ' '));
              logMessage(errors, JSON.stringify(errorCodes, null, '  '));
            }
          }
        });
        break;
      case 'showJobCount':
        url = './' + jobCountFile;
        getFile(url, function(response) {
          if (response) {
            responseDecoded = JSON.parse(response);
            logMessage(jobCount, responseDecoded.job_count);
          } else {
            logMessage(jobCount, 'Job count unavailable');
          }
        });
        break;
      case 'showFailedJobs':
        url = './' + jobCountFile;
        getFile(url, function(response) {
          if (response) {
            responseDecoded = JSON.parse(response);
            logMessage(failedJobs, JSON.stringify(responseDecoded.failed, null, ' '));
          } else {
            logMessage(failedJobs, 'Failed jobs info not yet available');
          }
        });
        break;
      case 'showNotifications':
        url = './' + notificationsFile;
        getFile(url, function(response) {
          if (response) {
            responseDecoded = JSON.parse(response);
            logMessage(notifications, JSON.stringify(responseDecoded, null, '  '));
          } else {
            logMessage(notifications, 'Notifications not yet available');
          }
        });
        break;
      case 'sendStartMessage':
        slackMessage.text = 'Retranscoding app is retranscoding ' + videoIDs.length + ' videos on account: ' + account.value;
        options.url = 'https://hooks.slack.com/services/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';
        options.requestBody = JSON.stringify(slackMessage);
        sendMessage(options, function(response) {
          console.log('di responses', response);
        });
        break;
      case 'sendEndMessage':
        slackMessage.text = 'Retranscoding app has completed on account: ' + account.value;
        options.url = 'https://hooks.slack.com/services/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';
        options.requestBody = JSON.stringify(slackMessage);
        sendMessage(options, function(response) {
          console.log(response);
        });
        break;
      default:
        alert('Something went wrong here - please report this message to rcrooks@brightcove.com');
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
      proxyURL = options.proxyURL,
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
console.log('raw response', response);
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
    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    httpRequest.open('POST', proxyURL);
    // set headers
    httpRequest.setRequestHeader("Content-Type", "application/json");
    // open and send request
    httpRequest.send(JSON.stringify(options));
  }

  /**
   * get the contents of a text file
   * @param  {String} url the url of the txt file
   * @param  {Function} [callback] callback function that will process the response
   */
  function getFile(url, callback) {
    var httpRequest = new XMLHttpRequest(),
      response,
      // response handler
      getResponse = function() {
        try {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
              response = httpRequest.responseText;
              // some API requests return '{null}' for empty responses - breaks JSON.parse
              // console.log('response', response);
              // if (response === '{null}') {
              //   response = null;
              // }
              // return the response
              callback(response);
            } else {
              callback(null);
            }
          }
        } catch (e) {
          console.log('e', e);
          callback(null);
        }
      };
    /**
     * set up request data
     */
    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    httpRequest.open('GET', url);
    // open and send request
    httpRequest.send();
  }

  /**
   * send a message to OVP room in Hipchat
   * @param  {String} url to send to
   * @param  {Function} [callback] callback function that will process the response
   */
  function sendMessage(options, callback) {
    var httpRequest = new XMLHttpRequest(),
      response,
      // response handler
      getResponse = function() {
        try {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
              response = httpRequest.responseText;
              // some API requests return '{null}' for empty responses - breaks JSON.parse
              // console.log('response', response);
              if (response === '{null}') {
                response = null;
              }
              // return the response
              callback(response);
            } else if (httpRequest.status === 404) {
              callback(null);
            } else {
              callback(null);
            }
          }
        } catch (e) {
          callback(null);
        }
      };
    /**
     * set up request data
     */
    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    httpRequest.open('POST', options.url);
    // open and send request
    httpRequest.send(options.requestBody);
  }


createRequest('getProfiles');

})(window, document, rome);
