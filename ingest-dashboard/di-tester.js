var BCLS = ( function ($) {
    var // CMS API stuff
        account_id = your_account_id_here,
        callbackURL = '//path-to/callbacks-di.php',
        account = document.getElementById('account'),
        cms_requestBody = document.getElementById('cms_requestBody'),
        cms_url = document.getElementById('cms_url'),
        di_requestBody = document.getElementById('di_requestBody'),
        di_url = document.getElementById('di_url'),
        requestType = 'POST',
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
        // functions
        bclslog,
        submitRequest,
        cleanString,
        setCMSOptions,
        getSelectedValue,
        getVideoName,
        setCMSData,
        setDIData,
        setDIOptions;
    // IE safe logger
    bclslog = function (context, message) {
        if (console) {
            console.log(context, message);
        }
    };
    // get selected value for single select element
    getSelectedValue = function (e) {
        bclslog('e.options', e.options);
        return e.options[e.selectedIndex].value;
    };
    // function to remove spaces and line breaks
    cleanString = function (str) {
        if (str !== "") {
            // remove line breaks
            str = str.replace(/(\r\n|\n|\r)/gm,"");
            // remove spaces
            // here we have to be careful - spaces fine within strings
            // but not outside them
            str = JSON.stringify(JSON.parse(str));
            return str;
        } else {
            return;
        }

    };
    // set options for the CMS API request
    setCMSOptions = function () {
        var options = {};
        options.requestBody = cleanString(cms_requestBody.value);
        options.requestType = requestType;
        options.url = cms_url.value;
        bclslog("cms options", options);
        // now submit the request
        submitRequest(options, "cms");
    };
    // set options for the Dynamic Ingest API request
    setDIOptions = function () {
        var options = {};
        options.requestBody = cleanString(di_requestBody.innerHTML);
        options.requestType = requestType;
        options.url = di_url.value;
        bclslog("di options", options);
        // now submit the request
        submitRequest(options, "di");
    };

    // function to submit Request
    submitRequest = function (options, type) {
        var parsedData = {};
        $.ajax({
            url: proxyURL,
            type: "POST",
            data: options,
            success : function (data) {
                bclslog(data);
                parsedData = JSON.parse(data);
                switch (type) {
                    case 'cms':
                    cms_response.innerHTML = data;
                    di_url.value = 'https://ingest.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + parsedData.id +'/ingest-requests';
                    bclslog(di_url.value);
                    setDIData();
                    setDIOptions();
                    break;
                    case 'di':
                    di_response.innerHTML = data;
                    break;
                }
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                switch (type) {
                    case "cms":
                    cms_response.innerHTML = "The called failed; here's what the server sent back: " + errorThrown;
                    break;
                    case "di":
                    di_response.innerHTML = "The called failed; here's what the server sent back: " + errorThrown;
                    break;
                }
            }
        });
    };
    // set the CMS request data
    setCMSData = function () {
        cms_requestBody.value = '{"name":"' + selectedVideo + '","reference_id":"' + reference_id + '"}'
    };

    // set DI request data
    setDIData = function () {
        // note: you MUST change the path to callback handler!!!
        di_requestBody.innerHTML = '{"master":{"url":"' + selectedVideoURL + '"},"profile":"' + selectedProfile + '","callbacks": [' + callbackURL + ']}'
    };

    // get the videoname from the path, append timestamp
    getVideoName = function () {
        var now = new Date().toISOString(),
            video = getSelectedValue(videoSelector);
        bclslog('now', now);
        selectedVideo = video.substring(video.lastIndexOf('/') + 1);
        reference_id = now + '-' + selectedProfile;
        bclslog('selectedVideo', selectedVideo);
        return selectedVideo;
    };

    // event listeners
    videoSelector.addEventListener('change', function (){
        selectedVideoURL = getSelectedValue(videoSelector);
        videoName = getVideoName();
        setCMSData();
        setDIData();
    });
    profileSelector.addEventListener('change', function () {
        selectedProfile = getSelectedValue(profileSelector);
        videoName = getVideoName();
        setCMSData();
        setDIData();
    });
    cms_submit.addEventListener('click', setCMSOptions);

    // get initial values
    selectedProfile = getSelectedValue(profileSelector);
    selectedVideoURL = getSelectedValue(videoSelector);
    selectedVideo = getVideoName();
    bclslog('selectedVideo', selectedVideo);
    account.innerHTML = account_id;
    setCMSData();
})($);
