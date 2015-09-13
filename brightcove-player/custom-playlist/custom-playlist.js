videojs.plugin('customPlaylist', function (options) {
    var myPlayer = this,
        defaults = {width: "500"},
        playerWidth = (isDefined(options.width)) ? options.width : default.width,
        playerHeight = (9 / 16) * playerWidth;
    // handle loadedmetadata just once, it fires again with each video load
    myPlayer.one('loadedmetadata', function () {
        var playerEl = myPlayer.el(),
            playerParent = playerEl.parentNode,
            i,
            iMax,
            playerWrapper = document.createElement('div'),
            playlistWrapper = document.createElement('div'),
            playlistItem,
            playlistItems,
            thumbnailImg,
            playlistData = myPlayer.playlist(),
            videoItem;
        /**
         * tests for all the ways a variable might be undefined or not have a value
         * @param {*} x the variable to test
         * @return {Boolean} true if variable is defined and has a value
         */
        function isDefined(x){
            if ( x === "" || x === null || x === undefined || x === NaN) {
                return false;
            }
            return true;
        }

        /**
         * removes highlight from all playlist items
         */
        function clearHighlight() {
            iMax = playlistItems.length;
            for (i = 0; i < iMax; i++) {
                playlistItems[i].setAttribute('class', 'bcls-thumbnail');
            }
        }

        /**
         * highlights the current playlist item
         */
        function setHighlight() {
            playlistItems[myPlayer.playlist.currentItem()].setAttribute('class', 'bcls-highlight');
        }

        /**
         * loads a playlist item that was clicked on
         */
        function loadPlaylistItem() {
            var index = this.getAttribute('data-playlist-index');
            myPlayer.playlist.currentItem(parseInt(index, 10));
            clearHighlight();
            setHighlight();
            myPlayer.play();
        }
        console.log(myPlayer.playlist());
        // add styles to wrapper and player and playlist wrapper
        playerWrapper.setAttribute('style', 'width:' + playerWidth + 'px;');
        playerEl.setAttribute('style', 'width:100%;height:' + playerHeight + 'px;');
        playlistWrapper.setAttribute('class', 'bcls-playlist');
        // insert a div to wrap the player and playlist before the player
        playerParent.insertBefore(playerWrapper, playerEl);
        // now append the player to the new div
        playerWrapper.appendChild(playerEl);
        // append the playlist wrapper to the new div
        playerWrapper.appendChild(playlistWrapper);
        // build the playlist items
        iMax = playlistData.length;
        for (i = 0; i < iMax; i++) {
            videoItem = playlistData[i];
            // create the playlist item and set its class
            playlistItem = document.createElement('div');
            playlistItem.setAttribute('class', 'bcls-playlist-item');
            // create the thumbnail img and set its class
            thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('class', 'bcls-thumbnail');
            // set the src for the thumbnail
            thumbnailImg.setAttribute('src', videoItem.thumbnail);
            // save the index - need this to load the video
            thumbnailImg.setAttribute('data-playlist-index', i);
            // for best practice, set the alt attribute to the video name
            thumbnailImg.setAttribute('alt', videoItem.name);
            // now append the img to the item, and the item to the playlist
            playlistItem.appendChild(thumbnailImg);
            playlistWrapper.appendChild(playlistItem);
        }
        // set click listeners on playlist items
        playlistItems = document.getElementsByClassName('bcls-thumbnail');
        iMax = playlistItems.length;
        for (i = 0; i < iMax; i++) {
            playlistItems[i].addEventListener('click', loadPlaylistItem);
        }
        // initially highlight the first item
        if (iMax > 0) {
            setHighlight();
        }
    });
});
