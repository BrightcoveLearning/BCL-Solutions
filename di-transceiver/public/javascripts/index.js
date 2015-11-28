var ingestData = document.getElementById('ingestData'),
    submitData = document.getElementById('submitData'),
    logger = document.getElementById('logger'),
    requestURL = window.location.href + 'requests';

function logIt(context, message) {
    logger.textContent = context + ': ' + message;
}
logIt('requestURL', requestURL);

/**
 * tests for all the ways a variable might be undefined or not have a value
 * @param {*} x the variable to test
 * @return {Boolean} true if variable is defined and has a value
 */
isDefined = function(x){
    if ( x === "" || x === null || x === undefined || x === NaN) {
        return false;
    }
    return true;
};

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
        requestData = ingestData.textContent,
        dataString,
        // response handler
        getResponse = function() {
            try {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        logit('request submitted');
                        responseRaw = httpRequest.responseText;
                    } else {
                        alert('There was a problem with the request. Request returned ' + httpRequest.status);
                    }
                }
            } catch (e) {
                alert('Caught Exception: ' + e);
            }
        };
        // set up request data
      // set response handler
      httpRequest.onreadystatechange = getResponse;
      // open the request
      httpRequest.open('POST', requestURL);
      // set headers
      httpRequest.setRequestHeader("Content-Type", "application/json");
      // open and send request
      httpRequest.send(requestData);
    }
    submitData.addEventListener('click', function() {
        if (isDefined(ingestData.textContent) && isValidJson(ingestData.textContent)) {
            logIt('data entered!');
            sendRequest();
        } else {
            logIt('no data or invalid data entered', null);
        }
    });
