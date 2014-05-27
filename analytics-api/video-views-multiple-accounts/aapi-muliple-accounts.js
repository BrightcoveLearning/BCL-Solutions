var BCLS = (function (window, document, Handlebars, $, Pikaday) {
    "use strict";
    var callNumber = 0,
        firstRun = true,
        firstCall = true,
        accountID = document.getElementById("accountID"),
        token = document.getElementById("token"),
        addAccountButton = document.getElementById("addAccountButton"),
        accounts = document.getElementById("accounts"),
        multipleAccounts = document.getElementById("multipleAccounts"),
        addMultipleAccountsButton = document.getElementById("addMultipleAccountsButton"),
        errorLog = document.getElementById("log"),
        dimensions = document.getElementById("dimensions"),
        fields = document.getElementById("fields"),
        sort = document.getElementById("sort"),
        accountsObj = {},
        template,
        displayHeadersTemplate = "<tr>{{#items}}<th>{{this}}</th>{{/items}}</tr>",
        dimensionsArray = ["account", "player", "video", "country", "city", "region", "day", "destination_domain", "device_type", "device_os", "referrer_domain", "source_type", "search_terms"],
        dimensionsObj = {"items": dimensionsArray },
        dimensionOptionTemplate = "{{#items}}<option>{{this}}</option>{{/items}}",
        fieldOptionsTemplate = "{{#items}}<option>{{this}}</option>{{/items}}",
        currentAccount,
        currentAccountIndex = 0,
        removeAccountButton = document.getElementById("removeAccountButton"),
        reportTableHead = document.getElementById("reportTableHead"),
        reportTableBody = document.getElementById("reportTableBody"),
        detailTableHead = document.getElementById("detailTableHead"),
        detailTableBody = document.getElementById("detailTableBody"),
        detailCaption = document.getElementById("detailCaption"),
        analyticsData = {},
        from = document.getElementById("from"),
        to = document.getElementById("to"),
        fromPicker,
        toPicker,
        getData = document.getElementById("getData"),
        gettingDataDisplay = document.getElementById("gettingDataDisplay"),
        today = new Date(),
        weekAgo = new Date(today - 604800000),
        countryDisplayTemplate = "{{#totals}}<option value=\"{{country}}\">{{country_name}}</option>{{/totals}}",
        // fields for different dimensions
        baseFields = {"items": ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed"]},
        accountFields = {"items": ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"]},
        videoFields = {"items": baseFields.items.concat(["video", "video_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "bytes_delivered", "content_delivered"])},
        playerFields = {"items": baseFields.items.concat(["player", "player_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100"])},
        dayFields = {"items": ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"]},
        countryFields = {"items": baseFields.items.concat(["country", "country_name"])},
        cityFields = {"items": baseFields.items.concat(["city"])},
        regionFields = {"items": baseFields.items.concat(["region"])},
        destinationDomainFields = {"items": baseFields.items.concat(["destination_domain"])},
        referrer_domainFields = {"items": baseFields.items.concat(["player_load", "referrer_domain"])},
        source_typeFields = {"items": baseFields.items.concat(["player_load", "source_type"])},
        search_termsFields = {"items": baseFields.items.concat(["player_load", "search_terms"])},
        device_typeFields = {"items": baseFields.items.concat(["player_load", "device_type"])},
        device_osFields = {"items": baseFields.items.concat(["player_load", "device_os"])},
        // functions"
        bclslog,
        copyObj,
        isDefined,
        isNumber,
        dateToISO,
        getSelectedValue,
        getSelectedOptions,
        findObjectInArray,
        sortArray,
        displayData,
        displayDetailData,
        makeAnalyticsCall,
        getAnalyticsData,
        addAccount,
        addMultipleAccounts,
        removeAccounts,
        setFieldsSortOptions,
        setDimensions,
        setDisplayTableHeadings,
        initializeData,
        init,
        removeBreaksAndSpaces;
    // safe logger (hack for IE)
    bclslog = function (message) {
        if (console) {
            console.log(message);
        }
    };
    //  copy an Object
    copyObj = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    // is defined
    isDefined = function (x) {
        if (x !== "" && x !== null && x !== undefined) {
            return true;
        }
        return false;
    };
    // is a number
    isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    // return ISO 8601 date string (YYYY-MM-DD) for JS date
    dateToISO = function (date) {
        var y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDate(),
            isoDate;
        y = y.toString();
        m = m + 1;
        if (m < 10) {
            m = "0" + m.toString();
        } else {
            m = m.toString();
        }
        if (d < 10) {
            d = "0" + d.toString();
        } else {
            d = d.toString();
        }
        isoDate = y + "-" + m + "-" + d;
        return isoDate;
    };
    /* function to remove line breaks and spaces from text */
    removeBreaksAndSpaces = function (t) {
        t = t.replace(/\r\n/g, ',').replace(/[\r\n]/g, ',');
        t = t.replace(/\s/g, "");
        return t;
    };
    // get selected value for single select element
    getSelectedValue = function (e) {
        return e.options[e.selectedIndex].value;
    };
    /*
    get an array of selected options for multi-select element
    returns array of objects with properties "index" and "value"
    */
    getSelectedOptions = function (e) {
        var selectedOptions = [],
            index = 0,
            i;
        for (i = 0; i < e.length; i++) {
            if (e[i].selected) {
                index = selectedOptions.length;
                selectedOptions[index] = {};
                selectedOptions[index].value = e[i].value;
                selectedOptions[index].index = i;
            }
        }
        return selectedOptions;
    };
    /*
    find index of an object in array of objects
    based on some property value
    returns index if found, otherwise returns -1
    */
    findObjectInArray = function (targetArray, objProperty, value) {
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
    };
    /*
    sort an array of objects based on an object property
    returns the sorted array
    */
    sortArray = function (targetArray, objProperty) {
        targetArray.sort(function (a, b) {
            var propA = a[objProperty].toLowerCase(), propB = b[objProperty].toLowerCase();
            // sort ascending; reverse propA and propB to sort descending
            if (propA < propB) {
                return -1;
            } else if (propA > propB) {
                return 1;
            }
            return 0;
        });
        return targetArray;
    };
    // display the data
    displayData = function () {
        var i,
            j,
            totalItems,
            totalAccounts,
            str = "",
            accountItem,
            thisItem;

        reportTableBody.innerHTML = str;
    };
    // display account detail table
    displayDetailData = function () {

    };
    // make the analytics api call via AJAX
    makeAnalyticsCall = function (callURL) {
        var i, item, itemsMax, newItem = {}, newTotalsItem = {}, accountsMax = accountsObj.items.length, objIdx, prop;
        $.ajax({
            url: callURL,
            headers: {
                Authorization : "Bearer " + currentAccount.token
            },
            success : function (data) {
                errorLog.innerHTML += "<p class=\"success\">API call made:</p>";
                errorLog.innerHTML += "<textarea class=\"code-area\">" + callURL + "</textarea>";
                if (firstCall) {
                    setDisplayTableHeadings(data);
                    firstCall = false;
                    analyticsData.summary = copyObj(data.summary);
                    console.log(data.summary);
                    console.log(analyticsData.summary);
                } else {
                    for (prop in data.summary) {
                        analyticsData.summary[prop] += data.summary[prop];
                    }
                }
                callNumber++;
                if (data.item_count > 0) {
                    errorLog.innerHTML += "<p class=\"success\">Data successfully retrieved for account:" + data.account + "</p>";
                    analyticsData.items[currentAccount.id] = copyObj(data);
                    console.log(analyticsData);
                } else {
                    errorLog.innerHTML += "<p class=\"failure\">No data was returned for account: " + data.account + "</p>";
                }
                if (currentAccountIndex < accountsMax - 1) {
                    currentAccountIndex++;
                    getAnalyticsData();
                } else {
                    gettingDataDisplay.innerHTML = "Data retrieved - " + callNumber + " API calls made. See and filter your data below.";
                    displayData();
                }
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                if (window.console) {
                    errorLog.innerHTML += "<p class=\"failure\">Request was not successful for account " + currentAccount.id + ". Here's what the server sent back: " + errorThrown + "</p>";
                }
                if (currentAccountIndex < accountsMax - 1) {
                    currentAccountIndex++;
                    getAnalyticsData();
                } else {
                    gettingDataDisplay.innerHTML = "Data retrieved - " + callNumber + " API calls made. See and filter your data below.";
                    displayData();
                }
            }
        });
    };
    // get the analytics data for the videos
    getAnalyticsData = function () {
        var callURL,
            i,
            max,
            fieldsOptions,
            selectedFields = [];
        gettingDataDisplay.innerHTML = "Getting analytics data...";
        fieldsOptions = getSelectedOptions(fields);
        max = fieldsOptions.length;
        for (i = 0; i < max; i++) {
            selectedFields[i] = fieldsOptions[i].value;
        }
        // currentVideo = videoData.items[currentVideoIndex].video;
        currentAccount = accountsObj.items[currentAccountIndex];
        callURL = "https://data.brightcove.com/analytics-api/videocloud/account/" + currentAccount.id + "/report/?dimensions=" + getSelectedValue(dimensions) + "&from=" + from.value + "&to=" + to.value + "&limit=all" + "&fields=" + selectedFields.join(",");
        makeAnalyticsCall(callURL);
    };
    addAccount = function () {
        var id = accountID.value,
            acctToken = token.value,
            str = id + " " + acctToken;
        if (isDefined(id) && isDefined(acctToken)) {
            accountsObj.items.push({"id": id, "token": acctToken});
            accounts.options[accounts.options.length] = new Option(str, accounts.options.length);
            accounts.setAttribute('size', accounts.options.length);
            accounts.style.display = 'none';
            accounts.style.display = 'block';
        } else {
            window.alert("You must enter the account ID and the token for the account");
        }
    };
    // add multiple accounts from text area inpu
    addMultipleAccounts = function () {
        var acctData = multipleAccounts.value,
            tmpArray = [],
            str = "",
            i;
        if (isDefined(acctData)) {
            acctData = removeBreaksAndSpaces(acctData);
            tmpArray = acctData.split(",");
            for (i = 0; i < tmpArray.length; i = (i + 2)) {
                accountsObj.items.push({"id": tmpArray[i], "token": tmpArray[i + 1]});
                str = tmpArray[i] + " " + tmpArray[i + 1];
                accounts.options[accounts.options.length] = new Option(str, accounts.options.length);
                accounts.setAttribute('size', accounts.options.length);
                accounts.style.display = 'none';
                accounts.style.display = 'block';
            }
        } else {
            window.alert("Please enter account information in the form \"accountID, accountToken\" - one entry per line");
        }
    };
    // remove accounts from list
    removeAccounts = function () {
        var i, idx, selectedAccounts = getSelectedOptions(accounts);
        for (i = selectedAccounts.length - 1; i >= 0; i--) {
            idx = selectedAccounts[i].index;
            accountsObj.items.splice(idx, 1);
            accounts.remove(idx);
        }
    };
    // set the dimension options
    setDimensions = function () {
            template = Handlebars.compile(dimensionOptionTemplate);
            dimensions.innerHTML = template(dimensionsObj);
            dimensions.options[0].setAttribute("selected", "selected");
            setFieldsSortOptions();
    };
    // set fields and sort options
    setFieldsSortOptions = function () {
        var selectedDimension = getSelectedValue(dimensions),
            all = "<option selected=\"selected\">all</option>",
            str = "",
            setOptions = function () {
                fields.innerHTML = all + str;
                sort.innerHTML = str;
            };
        template = Handlebars.compile(fieldOptionsTemplate);
        switch (selectedDimension) {
        case "account":
            str = template(accountFields);
            break;
        case "player":
            str = template(playerFields);
            break;
        case "video":
            str = template(videoFields);
            break;
        case "destination_domain":
            str = template(destination_domainFields);
            break;
        case "referrer_domain":
            str = template(referrer_domainFields);
            break;
        case "day":
            str = template(dayFields);
            break;
        case "country":
            str = template(countryFields);
            break;
        case "region":
            str = template(regionFields);
            break;
        case "city":
            str = template(cityFields);
            break;
        case "source_type":
            str = template(source_typeFields);
            break;
        case "search_terms":
            str = template(search_termsFields);
            break;
        case "device_os":
            str = template(device_osFields);
            break;
        case "device_type":
            str = template(device_typeFields);
            break;
        }
        setOptions();
        fields.options[0].setAttribute("selected", "selected");
    }
    // set the display table headings
    setDisplayTableHeadings = function (obj) {
        var str = "<tr>",
            prop;
        // set summary table headings
        for (prop in obj.summary) {
            str += "<th>" + prop +  "</th>";
        }
        str += "</tr>";
        reportTableHead.innerHTML = str;
        // set detail table headings
        str = "<tr>";
        for (prop in obj.items[0]) {
            str += "<th>" + prop +  "</th>";
        }
        str += "</tr>";
        detailTableHead.innerHTML = str;
    }
    // reset data
    initializeData = function () {
        // need to create the accountsObj items just the first time called
        if (firstRun === true) {
            accountsObj.items = [];
            firstRun = false;
        } else {
            currentAccountIndex = 0;
        }
        callNumber = 0;
        errorLog.innerHTML = "";
        analyticsData.items = {};
        analyticsData.summary = {};
        getData.innerHTML = "Get Analytics Data";
        gettingDataDisplay.innerHTML = "Click the button above when you are ready to get the data"
    };
    init = function () {
        // add date pickers to the date input fields
        fromPicker = new Pikaday({
            field: document.getElementById("from"),
            format: 'YYYY-MM-DD',
            onSelect: initializeData
        });
        toPicker = new Pikaday({
            field: document.getElementById("to"),
            format: 'YYYY-MM-DD',
            onSelect: initializeData
        });
        // default date range values
        to.value = dateToISO(today);
        from.value = dateToISO(weekAgo);
        // accounts data setup
        initializeData();
        setDimensions();

        // event listeners
        getData.addEventListener("click", getAnalyticsData);
        addAccountButton.addEventListener("click", addAccount);
        addMultipleAccountsButton.addEventListener("click", addMultipleAccounts);
        removeAccountButton.addEventListener("click", removeAccounts);
        dimensions.addEventListener("change", setFieldsSortOptions);
    }
     // initialize
    console.log(detailTableHead);
    init();
    
    return {
    }
})(window, document, Handlebars, $, Pikaday);
