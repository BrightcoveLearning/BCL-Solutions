videojs.plugin('downloadVideoPlugin', function() {

  // Create variables and new div, anchor and image for download icon
  var myPlayer = this,
      videoName,
      totalRenditions,
      mp4Ara=[],
      highestQuality,
      spacer,
      newElement = document.createElement('div'),
      newLink = document.createElement('a'),
	  newImage = document.createElement('img');

  myPlayer.on('loadstart',function(){
      // Get video name and the MP4 renditions
      console.log('mediainfo', myPlayer.mediainfo);
      videoName = myPlayer.mediainfo['name'];
      rendtionsAra = myPlayer.mediainfo.sources;
      totalRenditions = rendtionsAra.length;
      for (var i = 0; i < totalRenditions; i++) {
          if (rendtionsAra[i].container === "MP4" && rendtionsAra[i].hasOwnProperty('src')) {
              mp4Ara.push(rendtionsAra[i]);
          };
      };
      // Sort the renditions from highest to lowest
      mp4Ara.sort( function (a,b){
          return b.size - a.size;
      });
	  // Set the highest rendition
      highestQuality= mp4Ara[0].src;

	  // Assign id and classes to div for icon
      newElement.id = 'downloadButton';
      newElement.className = 'downloadStyle vjs-control';

      // Assign properties to elements and assign to parents
      newImage.setAttribute('src','http://solutions.brightcove.com/bcls/brightcove-player/download-video/file-download.png');
	  newLink.setAttribute('href',highestQuality);
	  newLink.setAttribute('download',videoName);
	  newLink.appendChild(newImage);
	  newElement.appendChild(newLink);

	  // Get the spacer element
      spacer = myPlayer.controlBar.customControlSpacer.el();
	  // Set the content of the spacer to be right justified
    spacer.setAttribute("style", "justify-content: flex-end;");
    // Place the new element in the spacer
    spacer.appendChild(newElement);
  })
});
