// JavaScript Document
var BCLS = (function (document, BCLSmain, console) {
    //"use strict";
    var app = {}, // Application Variables
        acc = {}, // Account Variables
        f = {}, // Form References
        currentPage = 0,
        currentVideo = 0,
        videoCounter = 0,
        currentDate,
        totalVideos,
        hours,
        minutes,
        seconds,
        meridian,
        trackers,
        my,
        total3PlayRequests,
        initialized = false,
        reqresult,
        totalRequests = 0,
        isDefined = function (v) {
            if (v !== "" && v !== null && v !== "undefined") {
                return true;
            } else {
                return false;
            }
        },
        reinit = function () {
            acc.totalVideos = null;
            acc.videosWithoutthreePlayIds = null;
            acc.videosWithoutthreePlayIds = [];
            acc.videos.length = 0;

            f.totalVideosLabel.innerHTML = "";
            f.videosWithoutthreePlayIdsLabel.innerHTML = "";
            f.getTotalVideos.disabled = false;
            f.updateVideosBtn.disabled = true;
        },
        returnCurrentTime = function () {
            currentDate = new Date();
            hours = currentDate.getHours();
            minutes = currentDate.getMinutes();
            seconds = currentDate.getSeconds();
            meridian = "am";
            if (hours > 11) {
                meridian = "pm";
            }
            if (hours > 12) {
                hours -= 12;
            }
            if (hours === 0) {
                hours = 12;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return hours + ":" + minutes + "." + "<span style='font-size:8pt;'>" + seconds + "</span>" + meridian + " ";

        },
        setupDisplay = function () {
            var display = document.createElement("div"),
                trackContainer = document.createElement("div"),
                tracker0 = document.createElement("div"),
                tracker1 = document.createElement("div"),
                tracker2 = document.createElement("div"),
                trace = document.createElement("div"),
                i;
            display.position = "absolute";
            display.id = "es_traceContainer";
            trackContainer.position = "absolute";
            trackContainer.id = "track";
            display.appendChild(trackContainer);
            trackers = [];
            tracker0.id = "es_tracker0";
            trackers.push(tracker0);
            trackContainer.appendChild(tracker0);
            tracker1.id = "es_tracker1";
            trackers.push(tracker1);
            trackContainer.appendChild(tracker1);
            tracker2.id = "es_tracker2";
            trackers.push(tracker2);
            trackContainer.appendChild(tracker2);
            for (i = 0; i < trackers.length; i++) {
                trackers[i].style.cssFloat = "left";
                trackers[i].style.fontFamily = "Arial,Helvetica,sans-serif";
                trackers[i].style.fontStyle = "italic";
                trackers[i].style.fontWeight = "bold";
                trackers[i].style.fontSize = "9pt";
                trackers[i].style.color = "#677072";
                trackers[i].style.padding = "5px";
            }
            trace.position = "absolute";
            trace.id = "trace";
            trace.style.clear = "both";
            trace.style.fontFamily = "Arial,Helvetica,sans-serif";
            trace.style.fontStyle = "normal";
            trace.style.fontSize = "9pt";
            trace.style.color = "#677072";
            trace.style.borderLeft = "solid";
            trace.style.borderTop = "solid";
            trace.style.borderWidth = "1px";
            trace.style.width = "800px";
            trace.style.padding = "5px";
            trace.style.marginTop = "20px";
            display.appendChild(trace);
            document.getElementsByTagName("body")[0].appendChild(display);
            initialized = true;
        },

        trace = function (eventString) {
            if (!initialized) {
                setupDisplay();
            }

            if (eventString === null || eventString === "") {
                eventString = "null value passed";
            }
            eventString = eventString.toString();
            eventString = eventString.replace(/</g, "&lt;");
            eventString = eventString.replace(/>/g, "&gt;");
            eventString = eventString.replace(/"/g, "&quot;");
            document.getElementById('trace').innerHTML = returnCurrentTime() + eventString + "<br />\n" + document.getElementById('trace').innerHTML;
        },

        track = function (eventString, position) {
            if (!initialized) {
                setupDisplay();
            }

            eventString = eventString.toString();
            eventString = eventString.replace(/</g, "&lt;");
            eventString = eventString.replace(/>/g, "&gt;");
            eventString = eventString.replace(/"/g, "&quot;");

            if (position === 0 || position === null) {
                document.getElementById("es_tracker0").innerHTML = eventString;
            }
            if (position === 1) {
                document.getElementById("es_tracker1").innerHTML = eventString;
            }
            if (position === 2) {
                document.getElementById("es_tracker2").innerHTML = eventString;
            }

        },

        performUpdate = function (video) {
            // Returns xmlHttp.responseText

            var xmlHttp, parameters;
            try {
                xmlHttp = new XMLHttpRequest();
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Msxml12.XMLHTTP");
                } catch (e) {
                    try {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        updateVideos('{"result":null,"error":{"code":"-1","name":"AjaxNotSupported","message":"Ajax not Supported by your Browser"},"id":null}');
                    }
                }
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    onUpdateVideos(xmlHttp.responseText);
                }
            };
            parameters = "?method=update_video&writeToken=" + acc.writeToken + "&id=" + video.id + "&threeplayid=" + video.customFields.threeplayid + "&writeApiLocation=" + app.writeApiLocation;
            xmlHttp.open("POST", "update_video.php" + parameters, true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // xmlHttp.setRequestHeader("Content-length", parameters.length);
            // xmlHttp.setRequestHeader("Connection", "close");
            xmlHttp.send(null);
        },
        onUpdateVideos = function (JSONdata) {
            var videoData = JSON.parse(JSONdata);
            if (videoData.error !== null) {
                if (videoData.error.code !== undefined && videoData.error.code === "-1") {
                    trace("[Error] Fatal Error: " + videoData.error.message);
                } else if (1 !== 1) {
                    // Use this section for non-retryable errors
                    trace("[Error] " + videoData.error.code + ": " + videoData.error.message);
                } else {
                    // Repeatable errors
                    trace("[Debug] " + videoData.error.code + ": " + videoData.error.message);
                    updateVideos();
                }
            } else {
                trace(videoData.result.name + " has been updated");
                if (currentVideo + 1 < acc.videosWithoutthreePlayIds.length) {
                    currentVideo++;
                    updateVideos();
                } else {
                    f.updateVideosBtn.loadingMode(false);
                    f.updateVideosBtn.value = "Complete";
                    f.updateVideosBtn.disabled = "true";
                }
            }
        },
        updateVideos = function () {
            if (f.updateVideosBtn.disabled === false) {
                f.updateVideosBtn.disabled = true;
                f.updateVideosBtn.loadingMode(true);
                f.updateVideosBtn.value = "Loading ...";
            }
            f.updatingVideosLabel.innerHTML = "Updating video " + (currentVideo + 1) + " of " + acc.videosWithoutthreePlayIds.length;
            performUpdate(acc.videosWithoutthreePlayIds[currentVideo]);
        },
        onTotalVideosResult = function (result) {
            f.getTotalVideos.loadingMode(false);
            f.getTotalVideos.value = "Load";
            f.getTotalVideos.disabled = false;
            reqresult = result;
            totalVideos = result.total_count;
            acc.totalVideos = result.total_count;
            f.getTotalVideos.value = "Loaded";
            f.totalVideosLabel.innerHTML = "Total Videos: " + acc.totalVideos;
            f.getVideosWithoutthreePlayIds.disabled = false;
        },
        sendRequest = function (req) {
            var scriptElem = document.createElement('script');
            scriptElem.setAttribute('src', req);
            scriptElem.setAttribute('type', 'text/javascript');
            document.getElementsByTagName('head')[0].appendChild(scriptElem);
        },
        loadTotalVideos = function () {
            var req;
            f.getTotalVideos.disabled = true;
            f.getVideosWithoutthreePlayIds.disabled = true;
            f.getTotalVideos.value = "Loading    ";
            f.getTotalVideos.loadingMode(true);

            req = app.readApiLocation + "?";
            req += "&token=" + acc.readToken + "&command=search_videos&get_item_count=true&page_size=1&callback=" + "BCLS.onTotalVideosResult";
            sendRequest(req);
        },
        onLoad3PlayInfo = function (JSONdata) {
            var req;
            if (!JSONdata.hasOwnProperty("iserror")) {
                acc.videosWithoutthreePlayIds[videoCounter].customFields.threeplayid = JSONdata.id;
            } else if (JSONdata.iserror === true) {
                acc.videosWithoutthreePlayIds.splice(videoCounter, 1);
                videoCounter--;
                total3PlayRequests--;
            } else {
                // BCLSmain.bclslog("Something's wrong...");
            }
            videoCounter++;
            if (videoCounter < total3PlayRequests) {
                load3PlayInfo();
                f.get3PlayDataLabel.innerHTML = "Getting 3Play info for video " + videoCounter;
            } else {
                f.get3PlayDataLabel.innerHTML = acc.videosWithoutthreePlayIds.length + " videos to update";
                f.updateVideosBtn.disabled = false;
                currentVideo = 0;
            }
        },
        load3PlayInfo = function () {
            var callback = "BCLS.onLoad3PlayInfo", req;
            total3PlayRequests = acc.videosWithoutthreePlayIds.length;
            req = app.threePlayApiLocation + acc.videosWithoutthreePlayIds[videoCounter].id + "?apikey=" + acc.threePlayKey + "&usevideoid=1" + "&callback=" + callback;
            sendRequest(req);
        },
        onLoadVideosWithoutthreePlayIds = function (result) {
            var video, i;
            for (i = 0; i < result.items.length; i++) {
                acc.videos.push(result.items[i]);
            }
            f.videosWithoutthreePlayIdsLabel.innerHTML = "Request " + (currentPage + 1) + " of " + totalRequests;
            currentPage++;
            if (currentPage < totalRequests) {
                loadVideosWithoutthreePlayIds();
            } else if (currentPage >= totalRequests) {
                f.getVideosWithoutthreePlayIds.disabled = false;
                f.getVideosWithoutthreePlayIds.loadingMode(false);
                f.getVideosWithoutthreePlayIds.value = "Loaded";
                currentPage = 0;

                for (i = 0; i < acc.videos.length; i++) {
                    video = acc.videos[i];
                    if (video.hasOwnProperty("customFields") && video.customFields !== null) {
                        if (!video.customFields.hasOwnProperty("threeplayid")) {
                            acc.videosWithoutthreePlayIds.push(video);
                        }
                    }
                    if (!video.hasOwnProperty("customFields")) {
                        acc.videosWithoutthreePlayIds.push(video);
                    }
                }
                f.videosWithoutthreePlayIdsLabel.innerHTML = "Videos without threePlayIds: " + acc.videosWithoutthreePlayIds.length;
                if (acc.videosWithoutthreePlayIds.length > 0) {
                    f.get3PlayData.disabled = false;
                    f.updateVideosBtn.disabled = false;
                }
            }
        },
        loadVideosWithoutthreePlayIds = function () {
            var totalVideos = acc.totalVideos, req;
            totalRequests = Math.ceil(totalVideos / app.pageSize);
            if (currentPage === 0) {

                f.getVideosWithoutthreePlayIds.value = "Loading    ";
                f.getVideosWithoutthreePlayIds.disabled = true;
                f.getVideosWithoutthreePlayIds.loadingMode(true);

                acc.videosWithoutthreePlayIds = null;
                acc.videosWithoutthreePlayIds = [];
                acc.videosWithoutthreePlayIds.length = 0;
                acc.videos.length = 0;
                f.videosWithoutthreePlayIdsLabel.innerHTML = "";

            }

            req = app.readApiLocation + "?";
            req += "&token=" + acc.readToken + "&command=search_videos";
            req += "&video_fields=id,name,customFields";
            req += "&get_item_count=false";
            req += "&page_size=" + app.pageSize;
            req += "&page_number=" + currentPage;
            req += "&callback=" + "BCLS.onLoadVideosWithoutthreePlayIds";

            sendRequest(req);

        },
        init = function () {
            // initialize app vars
            app.readApiLocation = document.getElementById("readApiLocation").value;
            app.writeApiLocation = document.getElementById("writeApiLocation").value;
            app.threePlayApiLocation = "http://api.3playmedia.com/files/";
            app.pageSize = 50;
            // initialize account vars
            acc.readToken = "";
            acc.writeToken = "";
            acc.totalVideos = null;
            acc.threePlayKey = document.getElementById("threePlayKey").value;
            acc.videosWithoutthreePlayIds = [];
            acc.videos = [];
            // initialize form references
            f.readApiLocation = document.getElementById("readApiLocation");
            f.readApiLocation.addEventListener("change", function () {
                app.readApiLocation = f.readApiLocation.value;
            });
            f.writeApiLocation = document.getElementById("writeApiLocation");
            f.writeApiLocation.addEventListener("change", function () {
                app.writeApiLocation = f.writeApiLocation.value;
            });
            f.readToken = document.getElementById("readToken");
            acc.readToken = f.readToken.value;
            f.readToken.addEventListener("change", function () {
                acc.readToken = f.readToken.value;
                reinit();
            });
            f.writeToken = document.getElementById("writeToken");
            acc.writeToken = f.writeToken.value;
            f.writeToken.addEventListener("change", function () {
                acc.writeToken = f.writeToken.value;
                reinit();
            });
            f.threePlayKey = document.getElementById("threePlayKey");
            acc.threePlayKey = f.threePlayKey.value;
            f.threePlayKey.addEventListener("change", function () {
                acc.threePlayKey = f.threePlayKey.value;
                reinit();
            });
            f.getTotalVideos = document.getElementById("getTotalVideos");
            f.getTotalVideos.addEventListener("click", loadTotalVideos);
            f.getTotalVideos.disabled = false;
            // Give Button Visual Scroller to indicate loading/processing
            f.getTotalVideos.scrollPos = 0;
            f.getTotalVideos.scrollBtn = function () {
                this.disabled = true;
                if (this.scrollPos === 0) {
                    this.value = "Loading    ";
                    this.scrollPos = 1;
                } else if (this.scrollPos === 1) {
                    this.value = "Loading .  ";
                    this.scrollPos = 2;
                } else if (this.scrollPos === 2) {
                    this.value = "Loading .. ";
                    this.scrollPos = 3;
                } else if (this.scrollPos === 3) {
                    this.value = "Loading ...";
                    this.scrollPos = 0;
                }
            };
            f.getTotalVideos.loadingMode = function (v) {
                var my;
                if (v) {
                    my = setInterval("BCLS.f.getTotalVideos.scrollBtn()", 500);
                } else {
                    clearInterval(my);
                }
            };
            f.getVideosWithoutthreePlayIds = document.getElementById("getVideosWithoutthreePlayIds");
            f.getVideosWithoutthreePlayIds.addEventListener("click", loadVideosWithoutthreePlayIds);
            f.getVideosWithoutthreePlayIds.disabled = true;
            // Give Button Visual Scroller to indicate loading/processing
            f.getVideosWithoutthreePlayIds.scrollPos = 0;
            f.getVideosWithoutthreePlayIds.scrollBtn = function () {
                this.disabled = true;
                if (this.scrollPos === 0) {
                    this.value = "Loading    ";
                    this.scrollPos = 1;
                } else if (this.scrollPos === 1) {
                    this.value = "Loading .  ";
                    this.scrollPos = 2;
                } else if (this.scrollPos === 2) {
                    this.value = "Loading .. ";
                    this.scrollPos = 3;
                } else if (this.scrollPos === 3) {
                    this.value = "Loading ...";
                    this.scrollPos = 0;
                }
            };
            f.getVideosWithoutthreePlayIds.loadingMode = function (v) {
                if (v) {
                    my = setInterval("BCLS.f.getVideosWithoutthreePlayIds.scrollBtn()", 500);
                } else {
                    clearInterval(my);
                }
            };
            f.get3PlayData = document.getElementById("get3PlayData");
            f.get3PlayData.addEventListener("click", load3PlayInfo);
            f.get3PlayData.disabled = true;
            // Give Button Visual Scroller to indicate loading/processing
            f.get3PlayData.scrollPos = 0;
            f.get3PlayData.scrollBtn = function () {
                this.disabled = true;
                if (this.scrollPos === 0) {
                    this.value = "Loading    ";
                    this.scrollPos = 1;
                } else if (this.scrollPos === 1) {
                    this.value = "Loading .  ";
                    this.scrollPos = 2;
                } else if (this.scrollPos === 2) {
                    this.value = "Loading .. ";
                    this.scrollPos = 3;
                } else if (this.scrollPos === 3) {
                    this.value = "Loading ...";
                    this.scrollPos = 0;
                }
            };
            f.get3PlayData.loadingMode = function (v) {
                if (v) {
                    my = setInterval("BCLS.f.get3PlayData.scrollBtn()", 500);
                } else {
                    clearInterval(my);
                }
            };
            f.totalVideosLabel = document.getElementById("totalVideosLabel");
            f.videosWithoutthreePlayIdsLabel = document.getElementById("videosWithoutthreePlayIdsLabel");
            f.get3PlayDataLabel = document.getElementById("get3PlayDataLabel");
            if (isDefined(app.readApiLocation)) {
                f.readApiLocation.value = app.readApiLocation;
            }
            if (isDefined(acc.readToken)) {
                f.readToken.value = acc.readToken;
            }
            if (isDefined(app.writeApiLocation)) {
                f.writeApiLocation.value = app.writeApiLocation;
            }
            if (isDefined(acc.writeToken)) {
                f.writeToken.value = acc.writeToken;
            }
            f.updateVideosForm = document.getElementById("updateVideosForm");
            f.updateVideosBtn = document.getElementById("updateVideosBtn");
            f.updateVideosBtn.addEventListener("click", updateVideos);
            f.updateVideosBtn.disabled = true;
            // Give Button Visual Scroller to indicate loading/processing
            f.updateVideosBtn.scrollPos = 0;
            f.updateVideosBtn.scrollBtn = function () {
                this.disabled = true;
                if (this.scrollPos === 0) {
                    this.value = "Updating    ";
                    this.scrollPos = 1;
                } else if (this.scrollPos === 1) {
                    this.value = "Updating .  ";
                    this.scrollPos = 2;
                } else if (this.scrollPos === 2) {
                    this.value = "Updating .. ";
                    this.scrollPos = 3;
                } else if (this.scrollPos === 3) {
                    this.value = "Updating ...";
                    this.scrollPos = 0;
                }
            };
            f.updateVideosBtn.loadingMode = function (v) {
                if (v) {
                    my = setInterval("BCLS.f.updateVideosBtn.scrollBtn()", 500);
                } else {
                    clearInterval(my);
                }
            };
            f.updatingVideosLabel = document.getElementById("updatingVideosLabel");
        };
    // initialize
    init();

    return {
        updateVideos: updateVideos,
        loadTotalVideos: loadTotalVideos,
        loadVideosWithoutthreePlayIds: loadVideosWithoutthreePlayIds,
        onTotalVideosResult: onTotalVideosResult,
        onLoadVideosWithoutthreePlayIds: onLoadVideosWithoutthreePlayIds,
        load3PlayInfo: load3PlayInfo,
        onLoad3PlayInfo: onLoad3PlayInfo,
        f: f
    };
})(document, BCLSmain, console);