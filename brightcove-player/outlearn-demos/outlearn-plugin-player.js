var myPlayer,
    playlistWrapper = document.getElementById('playlistWrapper');
// handle loadedmetadata just once, it fires again with each video load
videojs("myPlayerID").one('loadedmetadata', function () {
    var myPlayer = this,
        playerEl = myPlayer.el(),
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
    console.log(myPlayer.playlist());
    playerParent.insertBefore(playerWrapper, playerEl);
    playerWrapper.appendChild(playerEl);
    playerWrapper.appendChild(playlistWrapper);
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
    // function to load playlist items on click
    function loadPlaylistItem () {
        var index = this.getAttribute('data-playlist-index');
        myPlayer.playlist.currentItem(parseInt(index));
        myPlayer.play();
    };
    playlistItems = document.getElementsByClassName('bcls-thumbnail');
    iMax = playlistItems.length;
    for (i = 0; i < iMax; i++) {
        playlistItems[i].addEventListener('click', loadPlaylistItem);
    }
});