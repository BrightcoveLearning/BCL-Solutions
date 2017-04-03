/**
 * Manage a lightbox player with a jQuery carousel
 * of video thumbnails
 */
videojs.plugin('carousel', function() {
	var myPlayer = this,
		$lightbox = $("#BCLSlightbox"),
		$carousel = $("#feature-carousel"),
		$close = $(".BCLSclose"),
		// vars for Handlebars
		videosTemplate = "{{#each items}}<div class=\"carousel-feature\"><img alt=\"{{name}}\" class=\"carousel-image\" src=\"{{thumbnailURL}}\" width=\"180\" height=\"96\" data-id=\"{{id}}\" /><div class=\"carousel-caption\"><p>{{shortDescription}}</p></div></div>{{/each}}",
		carouselNavigation = "<div id=\"carousel-left\"><img src=\"http://solutions.brightcove.com/bcls/scripts/jQuery-Feature-Carousel/images/arrow-left.png\" /></div><div id=\"carousel-right\"><img src=\"http://solutions.brightcove.com/bcls/scripts/jQuery-Feature-Carousel/images/arrow-right.png\" /></div>",
		template,
		data,
		results,
		i = 0,
		max = 0,
		currentVideo,
		playlistData =
			{
			"items": [
			{
			"id":0,
			"name":"Tiger",
			"shortDescription":"Tigers in the wild",
			"thumbnailURL":"//solutions.brightcove.com/bcls/assets/images/Tiger.jpg",
			"sources":[
				{
				"type":"video/mp4",
				"src":"http://solutions.brightcove.com/bcls/assets/videos/Tiger.mp4"
				}
				]
			},
			{
			"id":1,
			"name":"Great Blue Heron",
			"shortDescription":"The great blue heron",
			"thumbnailURL":"//solutions.brightcove.com/bcls/assets/images/Great-Blue-Heron.png",
			"sources":[
				{
				"type":"video/mp4",
				"src":"http://solutions.brightcove.com/bcls/assets/videos/Great-Blue-Heron.mp4"
				}
				]
			},
			{
			"id":2,
			"name":"Birds of a Feather",
			"shortDescription":"A variety of birds",
			"thumbnailURL":"http://solutions.brightcove.com/bcls/assets/images/BirdsOfAFeather.png",
			"sources":[
				{
				"type":"video/mp4",
				"src":"http://solutions.brightcove.com/bcls/assets/videos/BirdsOfAFeather.mp4"
				}
				]
			},
			{
			"id":3,
			"name":"Sea Marvels",
			"shortDescription":"A collection of sea life",
			"thumbnailURL":"http://solutions.brightcove.com/bcls/assets/images/Sea Marvels.png",
			"sources":[
				{
				"type":"video/mp4",
				"src":"http://solutions.brightcove.com/bcls/assets/videos/Sea-Marvels.mp4"
				}
				]
			}

		]};


	function buildPlaylistData() {

	  // build the related videos carousel
	  template = Handlebars.compile(videosTemplate);
	  results = template(playlistData);
	  $carousel.prepend(results);
	  // instantiate the carousel
	  $carousel.featureCarousel({
		  smallFeatureWidth:    .7,
		  smallFeatureHeight:		.7,
		  "trackerIndividual" : false
	  });

		// add event listener for clicks on videos
		$(".carousel-image").on("click", showAndLoad);
		$("#but_prev").click(function () {
		  $carousel.prev();
		});
		$("#but_pause").click(function () {
		  $carousel.pause();
		});
		$("#but_start").click(function () {
		  $carousel.start();
		});
		$("#but_next").click(function () {
		  $carousel.next();
		});
		$close.on("click", hideAndStop);

	   // let the video selector know the player is loaded
	   playerLoaded = true;
	};

	buildPlaylistData();

	function showAndLoad(videoID) {
		// make sure the player is loaded
		if (playerLoaded) {
		  // load the video
		  currentVideo = $(this).attr("data-id");
		  myPlayer.src(playlistData.items[currentVideo].sources);
		  // reveal the lightbox
		  $lightbox.attr("class", "BCLSshow");
		  // play the video
		  myPlayer.play();
		}
	  };

	function hideAndStop() {
		// pause the video
		myPlayer.pause();

		// hide the lightbox
		$lightbox.attr("class", "BCLShide");
	};

});
