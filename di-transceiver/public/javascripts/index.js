var ingestData = document.getElementById('ingestData'),
    submitData = document.getElementById('submitData'),
    logger = document.getElementById('logger'),
    requestURL = window.location.href + 'requests';

function logIt(context, message) {
    logger.textContent = context + ': ' + message;
}
logIt('requestURL', requestURL);
/**
 * send API request to the proxy
 * @param  {Object} requestData options for the request
 * @param  {String} requestID the type of request = id of the button
 */
function getMediaData(options, requestID) {
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
                        console.log(httpRequest.responseText);
                        responseRaw = httpRequest.responseText;
                        responseData.textContent = responseRaw;
                        parsedData = JSON.parse(responseRaw);
                        // save new ids on create requests
                        if (requestID === 'createVideo') {
                            newVideo_id = parsedData.id;
                        }
                        responseData.textContent = JSON.stringify(parsedData, null, '  ');
                        // re-enable the buttons
                        enableButtons();
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
    ingestData.addEventListener('change', function() {
        if (ingestData.textContent !== '') {
            logit('data entered!');
            submitData.removedAttribute('disabled');
        }
    });
