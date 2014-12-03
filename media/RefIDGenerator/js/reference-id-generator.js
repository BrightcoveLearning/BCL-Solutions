// JavaScript Document
var BCLS = ( function () {
  var app = {}, // Application Variables
      acc = {}, // Account Variables
      f = {}, // Form References
      currentPage = 0,
      currentVideo = 0,
      initialized = false,
      result,
      totalRequests = 0,
      isDefined =  function (v) {
        if(v !== "" && v !== null && v !== "undefined") { return true; }
        else { return false; }
      },
      reinit = function () {
        acc.totalVideos = null;
        acc.videosWithoutRefIds = null;
        acc.videosWithoutRefIds = [];
        acc.videos.length = 0;

        f.totalVideosLabel.innerHTML = "";
        f.videosWithoutReferenceIdsLabel.innerHTML = "";
        f.getTotalVideos.disabled = false;
        f.updateVideosBtn.disabled = true;
		f.getVideosWithoutReferenceIds.disabled = true;
      },
      returnCurrentTime = function () {
        currentDate = new Date();
        hours = currentDate.getHours();
        minutes = currentDate.getMinutes();
        seconds = currentDate.getSeconds();
        meridian = "am";
        if(hours > 11) { meridian = "pm"; }
        if(hours > 12) { hours -= 12; }
        if(hours == 0) { hours = 12; }
        if(minutes < 10) { minutes = "0" + minutes; }
        if(seconds < 10) { seconds = "0" + seconds; }
        return hours + ":" + minutes + "." + "<span style='font-size:8pt;'>" + seconds + "</span>" + meridian + " ";

      },
      trace = function (eventString) {
        if(!initialized) { setupDisplay(); }

        if(eventString == null || eventString == "") { eventString = "null value passed"; }
        eventString = eventString.toString();
        eventString = eventString.replace(/</g,"&lt;");
        eventString = eventString.replace(/>/g,"&gt;");
        eventString = eventString.replace(/"/g,"&quot;");
        document.getElementById('trace').innerHTML = returnCurrentTime() + eventString + "<br />\n" + document.getElementById('trace').innerHTML;
      },

      track = function (eventString, position) {
        if(!initialized) { setupDisplay(); }

        eventString = eventString.toString();
        eventString = eventString.replace(/</g,"&lt;");
        eventString = eventString.replace(/>/g,"&gt;");
        eventString = eventString.replace(/"/g,"&quot;");

        if(position == 0 || position == null) { document.getElementById("es_tracker0").innerHTML = eventString; }
        if(position == 1) { document.getElementById("es_tracker1").innerHTML = eventString; }
        if(position == 2) { document.getElementById("es_tracker2").innerHTML = eventString; }

      },

      setupDisplay = function () {
        var display = document.createElement("div");
        display.position = "absolute";
        display.id = "es_traceContainer";
          var trackContainer = document.createElement("div");
          trackContainer.position = "absolute";
          trackContainer.id = "track";
          display.appendChild(trackContainer);
            trackers = new Array();
            var tracker0 = document.createElement("div");
            tracker0.id = "es_tracker0";
            trackers.push(tracker0);
            trackContainer.appendChild(tracker0);
            var tracker1 = document.createElement("div");
            tracker1.id = "es_tracker1";
            trackers.push(tracker1);
            trackContainer.appendChild(tracker1);
            var tracker2 = document.createElement("div");
            tracker2.id = "es_tracker2";
            trackers.push(tracker2);
            trackContainer.appendChild(tracker2);
            for(i = 0; i < trackers.length; i++) {
              trackers[i].style.cssFloat = "left";
              trackers[i].style.fontFamily = "Arial,Helvetica,sans-serif";
              trackers[i].style.fontStyle = "italic";
              trackers[i].style.fontWeight = "bold";
              trackers[i].style.fontSize = "9pt";
              trackers[i].style.color = "#677072";
              trackers[i].style.padding = "5px";
            }
          var trace = document.createElement("div");
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
      performUpdate = function (videoId) {
        // Returns xmlHttp.responseText

        var xmlHttp, parameters;
        try { xmlHttp = new XMLHttpRequest(); }
        catch (e) {
          try { xmlHttp=new ActiveXObject("Msxml12.XMLHTTP");    }
          catch (e) {
            try { xmlHttp= new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) {
              updateVideos('{"result":null,"error":{"code":"-1","name":"AjaxNotSupported","message":"Ajax not Supported by your Browser"},"id":null}');
            }
          }
        }
        xmlHttp.onreadystatechange=function() {
          if (xmlHttp.readyState === 4) {
            onUpdateVideos(xmlHttp.responseText);
          }
        }
        parameters = "?writeToken=" + acc.writeToken + "&videoId=" + videoId + "&refId=" + videoId + "&writeApiLocation=" + app.writeApiLocation;
        xmlHttp.open("POST", "update_video.php" + parameters, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.setRequestHeader("Content-length", parameters.length);
        xmlHttp.setRequestHeader("Connection", "close");
        xmlHttp.send(null);
      },
      onUpdateVideos = function (JSONdata) {
        var videoData = JSON.parse(JSONdata)
        if (videoData.error !== null){
          if(videoData.error.code !== undefined && videoData.error.code === "-1") {
            trace("[Error] Fatal Error: " + videoData.error.message);
          } else if(1 !== 1) {
            // Use this section for non-retryable errors
            trace("[Error] " + videoData.error.code + ": " + videoData.error.message);
          } else {
            // Repeatable errors
            trace("[Debug] " + videoData.error.code + ": " + videoData.error.message);
            updateVideos();
          }
        } else {
          trace(videoData.result.name + " has been updated");
          if(currentVideo + 1 < acc.videosWithoutRefIds.length) {
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
        if(f.updateVideosBtn.disabled === false) {
          f.updateVideosBtn.disabled = true;
          f.updateVideosBtn.loadingMode(true);
          f.updateVideosBtn.value = "Loading ...";
        }
        f.updatingVideosLabel.innerHTML = "Updating video " + (currentVideo+1) + " of " + acc.videosWithoutRefIds.length;
        performUpdate(acc.videosWithoutRefIds[currentVideo].id);
      },
      onTotalVideosResult = function (result) {
		f.getTotalVideos.disabled = false;
        f.getTotalVideos.loadingMode(false);
        f.getTotalVideos.value = "Load";

        result = result;

        if(result.error != null) {
          trace("[Error] " + result.code + ": " + result.error);
        } else if(typeof result != "object") {
          trace("[Error] Invalid response from server");
        } else {
          acc.totalVideos = result.total_count;
          f.totalVideosLabel.innerHTML = "Total Videos: " + acc.totalVideos;
          f.getVideosWithoutReferenceIds.disabled = false;
        }
      },
      loadTotalVideos = function () {
          f.getTotalVideos.disabled = true;
          f.getVideosWithoutReferenceIds.disabled = true;
          f.getTotalVideos.value = "Loading    ";
          f.getTotalVideos.loadingMode(true);

          req = app.readApiLocation + "?";
          req += "&token=" + acc.readToken + "&command=search_videos&get_item_count=true&page_size=" + app.pageSize + "&callback=" + "BCLS.onTotalVideosResult";

          var scriptElem = document.createElement('script');
          scriptElem.setAttribute('src', req);
          scriptElem.setAttribute('type','text/javascript');
          document.getElementsByTagName('head')[0].appendChild(scriptElem);
      },
      onLoadVideosWithoutReferenceIds = function (result) {
        if(result.error != null) {
          trace("[Error] " + result.code + ": " + result.error);
          loadVideosWithoutReferenceIds(); // Try again
        } else if(result.result == null && typeof result.error == "object") {
          trace("[Error] " + result.error.code + ": " + result.error.name + " " + result.error.message);
          loadVideosWithoutReferenceIds();
        } else if(typeof result != "object") {
          trace("[Error] Invalid response from server");
          loadVideosWithoutReferenceIds();
        } else {

          for(i=0; i<result.items.length;i++) {
            acc.videos.push(result.items[i]);
          }
          f.videosWithoutReferenceIdsLabel.innerHTML = "Request " + (currentPage+1) + " of " + totalRequests;
          currentPage++;
          if(currentPage < totalRequests) {
            loadVideosWithoutReferenceIds();
          } else if(currentPage >= totalRequests) {
            f.getVideosWithoutReferenceIds.disabled = false;
            f.getVideosWithoutReferenceIds.loadingMode(false);
            f.getVideosWithoutReferenceIds.value = "Load";
            currentPage = 0;

            for(i=0;i<acc.videos.length;i++) {
              if(acc.videos[i].referenceId == null) {
                acc.videosWithoutRefIds.push(acc.videos[i]);
              }

            }
            f.videosWithoutReferenceIdsLabel.innerHTML = "Videos without RefIds: " + acc.videosWithoutRefIds.length;
            if(acc.videosWithoutRefIds.length > 0) {
              f.updateVideosBtn.disabled = false;
            }
          }
        }
      },
      loadVideosWithoutReferenceIds = function () {
        var totalVideos = acc.totalVideos;
        totalRequests = Math.ceil(totalVideos / app.pageSize);
        if(currentPage === 0) {

          f.getVideosWithoutReferenceIds.value = "Loading    ";
          f.getVideosWithoutReferenceIds.disabled = true;
          f.getVideosWithoutReferenceIds.loadingMode(true);

          acc.videosWithoutRefIds = null;
          acc.videosWithoutRefIds = [];
          acc.videosWithoutRefIds.length = 0;
          acc.videos.length = 0;
          f.videosWithoutReferenceIdsLabel.innerHTML = "";

        }

        req = app.readApiLocation + "?";
        req+= "&token=" + acc.readToken + "&command=find_all_videos&videoFields=id,name,shortDescription,referenceId&get_item_count=false";
        req+= "&page_size=" + app.pageSize;
        req+= "&page_number=" + currentPage;
        req+= "&callback=" + "BCLS.onLoadVideosWithoutReferenceIds";


        var scriptElem = document.createElement('script');
        scriptElem.setAttribute('src', req);
        scriptElem.setAttribute('type','text/javascript');
        document.getElementsByTagName('head')[0].appendChild(scriptElem);

      },
      init = function () {
        // initialize app vars
        app.readApiLocation = document.getElementById("readApiLocation").value;
        app.writeApiLocation = document.getElementById("writeApiLocation").value;
        app.pageSize = 50;
        // initialize account vars
        acc.readToken = "";
        acc.writeToken = "";
        acc.totalVideos = null;
        acc.videosWithoutRefIds = [];
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
        f.readToken.addEventListener("change", function() {
          acc.readToken = f.readToken.value;
          reinit();
        });
        f.writeToken = document.getElementById("writeToken");
        f.writeToken.addEventListener("change", function() {
          acc.writeToken = f.writeToken.value;
          reinit();
        });
        f.getTotalVideos = document.getElementById("getTotalVideos");
        f.getTotalVideos.addEventListener("click", loadTotalVideos);
        f.getTotalVideos.disabled = true;
          // Give Button Visual Scroller to indicate loading/processing
          f.getTotalVideos.scrollPos = 0;
          f.getTotalVideos.scrollBtn = function() {
              this.disabled = true;
              if(this.scrollPos == 0) { this.value = "Loading    "; this.scrollPos = 1; }
              else if(this.scrollPos == 1) { this.value = "Loading .  "; this.scrollPos = 2; }
              else if(this.scrollPos == 2) { this.value = "Loading .. "; this.scrollPos = 3; }
              else if(this.scrollPos == 3) { this.value = "Loading ..."; this.scrollPos = 0; }
          }
          f.getTotalVideos.loadingMode = function(v) {
            if(v) { my = setInterval("BCLS.f.getTotalVideos.scrollBtn()",500); }
            else {
				clearInterval(my);
		    }
          }
        f.getVideosWithoutReferenceIds = document.getElementById("getVideosWithoutReferenceIds");
        f.getVideosWithoutReferenceIds.addEventListener("click", loadVideosWithoutReferenceIds);
        f.getVideosWithoutReferenceIds.disabled = true;
        // Give Button Visual Scroller to indicate loading/processing
        f.getVideosWithoutReferenceIds.scrollPos = 0;
        f.getVideosWithoutReferenceIds.scrollBtn = function() {
            this.disabled = true;
            if(this.scrollPos == 0) { this.value = "Loading    "; this.scrollPos = 1; }
            else if(this.scrollPos == 1) { this.value = "Loading .  "; this.scrollPos = 2; }
            else if(this.scrollPos == 2) { this.value = "Loading .. "; this.scrollPos = 3; }
            else if(this.scrollPos == 3) { this.value = "Loading ..."; this.scrollPos = 0; }
        }
        f.getVideosWithoutReferenceIds.loadingMode = function(v) {
          if(v) { my = setInterval("BCLS.f.getVideosWithoutReferenceIds.scrollBtn()",500); }
          else {
			  clearInterval(my);
		  }
        }
        f.totalVideosLabel = document.getElementById("totalVideosLabel");
        f.videosWithoutReferenceIdsLabel = document.getElementById("videosWithoutReferenceIdsLabel");
        if(isDefined(app.readApiLocation)) { f.readApiLocation.value = app.readApiLocation; }
        if(isDefined(acc.readToken)) { f.readToken.value = acc.readToken; }
        if(isDefined(app.writeApiLocation)) { f.writeApiLocation.value = app.writeApiLocation; }
        if(isDefined(acc.writeToken)) { f.writeToken.value = acc.writeToken; }
        f.updateVideosForm = document.getElementById("updateVideosForm");
        f.updateVideosBtn = document.getElementById("updateVideosBtn");
        f.updateVideosBtn.addEventListener("click", updateVideos);
        f.updateVideosBtn.disabled = true;
        // Give Button Visual Scroller to indicate loading/processing
        f.updateVideosBtn.scrollPos = 0;
        f.updateVideosBtn.scrollBtn = function() {
            this.disabled = true;
            if(this.scrollPos == 0) { this.value = "Updating    "; this.scrollPos = 1; }
            else if(this.scrollPos == 1) { this.value = "Updating .  "; this.scrollPos = 2; }
            else if(this.scrollPos == 2) { this.value = "Updating .. "; this.scrollPos = 3; }
            else if(this.scrollPos == 3) { this.value = "Updating ..."; this.scrollPos = 0; }
        }
        f.updateVideosBtn.loadingMode = function(v) {
          if(v) { my = setInterval("BCLS.f.updateVideosBtn.scrollBtn()",500); }
          else { clearInterval(my); }
        }
        f.updatingVideosLabel = document.getElementById("updatingVideosLabel");
      };
  // initialize
  init();

  return {
    updateVideos : updateVideos,
    loadTotalVideos : loadTotalVideos,
    loadVideosWithoutReferenceIds : loadVideosWithoutReferenceIds,
    onTotalVideosResult : onTotalVideosResult,
    onLoadVideosWithoutReferenceIds : onLoadVideosWithoutReferenceIds,
    f : f
  }
})();
