videojs.plugin('pluginDev', function() {
  console.log(document);
  var player = this,
    el = player.el(),
    ol,
    playlist;
    player.on('loadedmetadata', function() {
      playlist = document.getElementsByTagName('ol')[0];
      console.log("playlist", playlist);
      playlist.setAttribute("style", "width:100%;top:360px;");
    });
  // playlist.setAttribute("style", "width:100%;top:360px;");
});