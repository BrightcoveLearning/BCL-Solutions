/**
 * Brightcove player plugin that displays a playlist
 * as a row of thumbnail images along the bottom of the
 * player
 * @option {integer} width - the width of the player and playlist in pixels
 *
 * created by Robert Crooks, Brightcove Learning Services, rcrooks@brightcove.com
 * last modified: 2015-09-15
 */
videojs.plugin('customPlaylist', function (options) {
    var myPlayer = this,
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
            playerWrapper = document.createElement('div'),
            playlistWrapper = document.createElement('div'),
            playlistItem,
            itemTitle,
            playlistData = myPlayer.playlist(),
            videoItem,
            playerWidth = myPlayer.width(),
            playerHeight = (9 / 16) * playerWidth;


        /**
         * removes highlight from all playlist items
         */
        function clearHighlight() {
            var i,
                iMax = playlistItems.length;
            for (i = 0; i < iMax; i++) {
                playlistItems[i].setAttribute('style', '2px solid #141B17');
            }
        }

        /**
         * highlights the current playlist item
         */
        function setHighlight() {
            var index = myPlayer.playlist.currentItem();
            // override the background color
            playlistItems[index].setAttribute('style', 'border:2px solid #80CBC4;');
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
            // create the playlist item and set its class and style
            playlistItem = document.createElement('div');
            playlistItem.setAttribute('data-playlist-index', i),
            playlistItem.setAttribute('class', 'bcls-playlist-item');
            playlistItem.setAttribute('style', 'background-image:url(' + videoItem.thumbnail + ');');
            // create the title and set its class
            itemTitle = document.createElement('span');
            itemTitle.setAttribute('class', 'bcls-title');
            // add the video name to the title element
            itemTitle.appendChild(document.createTextNode(videoItem.name));
            // now append the title to the item, and the item to the playlist
            playlistItem.appendChild(itemTitle);
            playlistWrapper.appendChild(playlistItem);
        }

        // highlight playlist item when new video starts
        myPlayer.on('play', function () {
            clearHighlight();
            setHighlight();
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
