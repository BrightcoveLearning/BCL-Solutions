var videos = ["BettyBoop.mp4",
    "Bird_Chickadee.mp4",
    "Bird_CommonRedpoll.mp4",
    "Bird_Magpie.mp4",
    "Bird_Peacock.mp4",
    "Bird_Robin.mp4",
    "Bird_Seagulls.mp4",
    "Bird_Woodpecker.mp4",
    "Bird_Sea_Brown Pelican.mpg",
    "Bird_Sea_Brown Pelicans on the Rocks.mpg",
    "Bugs-Bee.mp4",
    "Bugs-Butterfly.mp4",
    "Sea Marvels.mp4",
    "Sea-Crab.mp4",
    "Sea-Dolphins.mp4",
    "Sea-SeaTurtle.mp4",
    "Sea_Anemone.mp4",
    "Sea_ClownFish.mp4",
    "Sea_LionFish.mp4",
    "Sea_SeaHorse.mp4",
    "Space-Galaxy.mp4",
    "Space-Planets.mp4",
    "Space-Satellite.mp4",
    "Water-Bubbles.mp4",
    "Water-Droplet.mp4",
    "Water-Liquid-Flow.mp4",
    "Water-Splashing.mp4",
    "Wildlife_Tiger.mov",
    "Bird_greatblueheron.mp4",
    "Bird_greathornedowl.mp4",
    "Bird_Sea_laughing_gull.mp4",
    "Sea_leafy_seadragon.mp4",
    "Bird_Sea_oystercatcher.mp4"],
    now = new Date().toISOString(),
    videoData = [],
    videoDataItem = {},
    urlString = 'http://learning-services-media.brightcove.com/videos/mp4/',
    i,
    iMax = videos.length,
    j,
    jMax = 20;

    for (j = 0; j < jMax; j += 1) {
        for (i = 0; i < iMax; i += 1) {
            videoDataItem = {};
            videoDataItem.di = {};
            videoDataItem.cms = {};
            videoDataItem.cms.name = 'transceiver-' + videos[i].substring(0, videos[i].length - 5) + '-' + j;
        }
    }
