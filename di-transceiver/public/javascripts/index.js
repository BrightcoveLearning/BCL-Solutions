var ingestData = document.getElementById('ingestData'),
    submitData = document.getElementById('submitData'),
    logger = document.getElementById('logger'),
    requestURL = window.location.href + 'requests';

function logIt(context, message) {
    logger.textContent = context + ': ' + message;
}
logIt('requestURL', requestURL);

// polyfill isNaN for IE
Number.isNaN = Number.isNaN || function(value) {
    return typeof value === "number" && isNaN(value);
};

/**
 * tests for ways a variable might be undefined or not have a value
 * @param {String|Number} x the variable to test
 * @return {Boolean} true if variable is defined and has a value
 */
function isDefined(x){
    if ( x === '' || x === null || x === undefined || Number.isNaN(x)) {
        return false;
    }
    return true;
}

/**
 * check string to insure it's valid json
 * @param {String} json the json to check
 * @return {Boolean}
 */
function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * send API request to the proxy
 * @param  {Object} requestData options for the request
 * @param  {String} requestID the type of request = id of the button
 */
function sendRequest() {
    var httpRequest = new XMLHttpRequest(),
        responseRaw,
        parsedData,
        requestData = ingestData.value,
        dataString,
        // response handler
        getResponse = function() {
            try {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        logIt('request submitted', '');
                        responseRaw = httpRequest.responseText;
                    } else {
                        console.log('There was a problem with the request. Request returned ' + httpRequest.status);
                    }
                }
            } catch (e) {
                console.log('Caught Exception: ' + e);
            }
        };
      // set response handler
      httpRequest.onreadystatechange = getResponse;
      // open the request
      httpRequest.open('POST', requestURL);
      // set headers
      httpRequest.setRequestHeader("Accept", "application/json");
      // open and send request
      httpRequest.send(requestData);
    }
    submitData.addEventListener('click', function() {
        var requestData = ingestData.value;
        console.log(requestData);
        if (isDefined(requestData) && isValidJson(requestData)) {
            logIt('data entered!');
            sendRequest();
        } else {
            logIt('no data or invalid data entered', isValidJson(requestData));
        }
    });
