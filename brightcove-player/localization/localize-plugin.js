videojs.plugin('pluginLocalize', function() {
  videojs.addLanguage('de', {
      "Hello": "Guten Tag",
      "Goodbye": "Auf Wiedersehen",
  });
  var myPlayer = this,
  textSpan = document.createElement('span');
  textSpan.className = "localizeStyle"
  textSpan.innerHTML = myPlayer.localize("Hello") + "/" + myPlayer.localize("Goodbye");
  myPlayer.el().appendChild(textSpan);
});