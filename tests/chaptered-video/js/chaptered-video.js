videojs.plugin('chapteredVideo', function () {
    var player = this,
        text_tracks,
        chapter_track;

    player.on('loadedmetadata', function () {
        var i;
        text_tracks = player.text_tracks();
        i = text_tracks.TextTrackList.length;
        console.log("i", i);
        while (i > 0) {
            i--;
            console.log("text_tracks[i]", text_tracks.TextTrackList[i]);
        }
    });

})
