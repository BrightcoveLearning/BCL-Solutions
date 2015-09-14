videojs.plugin('customPlaylist', function (options) {
    var myPlayer = this,
        defaults = {width: 500},
        playlistItems;

    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {*} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    function isDefined(x) {
        if (x === "" || x === null || x === undefined || x === NaN) {
            return false;
        }
        return true;
    }
    // handle loadedmetadata just once, it fires again with each video load
    myPlayer.one('loadedmetadata', function () {
        var playerEl = myPlayer.el(),
            playerParent = playerEl.parentNode,
            i,
            iMax,
            intervalId,
            lastIndex = 0,
            indexDiff = 0,
            playerWrapper = document.createElement('div'),
            playlistWrapper = document.createElement('div'),
            playlistItem,
            thumbnailImg,
            playlistData = myPlayer.playlist(),
            videoItem,
            playerWidth = (isDefined(options.width)) ? options.width : defaults.width,
            // assuming 16:9 aspect ratio
            playerHeight = (9 / 16) * playerWidth;
        /**
         * crude animation for playlist scrolling
         */
        function listScroller() {
            console.log('indexDiff', indexDiff);
            playlistWrapper.scrollLeft += indexDiff * 1;
            i++;
            if (i === 128) {
                window.clearInterval(intervalId);
                i = 0;
            }
        }

        /**
         * scroll playlist to selected item
         */
        function scrollPlaylist() {
            var index = myPlayer.playlist.currentItem(),
                indexDiff = index - lastIndex;
            lastIndex = index;
            i = 0;
            // crude animation for playlist scrolling
            intervalId = window.setInterval(listScroller, 5);
        }

        /**
         * removes highlight from all playlist items
         */
        function clearHighlight() {
            var i,
                iMax = playlistItems.length;
            for (i = 0; i < iMax; i++) {
                playlistItems[i].setAttribute('style', '');
            }
        }

        /**
         * highlights the current playlist item
         */
        function setHighlight() {
            var index = myPlayer.playlist.currentItem();
            // override the background color
            playlistItems[index].setAttribute('style', 'background-color:#80CBC4;');
        }

        /**
         * loads a playlist item that was clicked on
         */
        function loadPlaylistItem() {
            // item index in playlist array
            var index = parseInt(this.getAttribute('data-playlist-index'), 10);
            myPlayer.playlist.currentItem(index);
            myPlayer.play();
        }
        // add styles to wrapper and player and playlist wrapper
        playerWrapper.setAttribute('style', 'width:' + playerWidth + 'px;');
        playerWrapper.setAttribute('class', 'bcls-player-wrapper');
        playerEl.setAttribute('style', 'width:100%;height:' + playerHeight + 'px;');
        playlistWrapper.setAttribute('class', 'bcls-playlist');
        // the following needed for iframe embed only
        playlistWrapper.setAttribute('style', 'top:' + playerHeight + 'px;');
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

        // highlight playlist item when new video starts
        myPlayer.on('play', function () {
            clearHighlight();
            setHighlight();
            scrollPlaylist();
        });
        // set click listeners on playlist items
        playlistItems = document.getElementsByClassName('bcls-thumbnail');
        iMax = playlistItems.length;
        for (i = 0; i < iMax; i++) {
            playlistItems[i].addEventListener('click', loadPlaylistItem);
        }
        // initially highlight the first item
        // but make sure playlist isn't empty
        if (iMax > 0) {
            setHighlight();
        }
    });
});
