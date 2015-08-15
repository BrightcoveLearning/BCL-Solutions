videojs.plugin('chapteredVideo', function () {
    var player = this,
        text_tracks,
        chapter_track;

    player.on('loadedmetadata', function () {
        var i;
        text_tracks = player.text_tracks();
        console.log("text_tracks", text_tracks);
        i = text_tracks.length;
        while (i > 0) {
            i--;
            console.log("text_tracks[i]", text_tracks[i]);
        }
    });

})
