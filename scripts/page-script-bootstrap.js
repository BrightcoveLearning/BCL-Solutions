$(document).ready(function(){
  "use strict";
  var linkPath,
  $currentPage,
  $currentItem,
  $window = $(window),
  href = window.location.href, // get location
  section;
  if (href.indexOf("#") > 0) {
    path = href.slice(href.indexOf("/en/"),href.indexOf("#"));
  }
  else if (href.indexOf("?") > 0) {
  path = href.slice(href.indexOf("/en/"),href.indexOf("?"));
}
  else {
    path = href.slice(href.indexOf("/en/"),href.length);
  }
  // check for auto-loaded index.html page
  if (path.charAt(path.length - 1) === "/") {
    path += "index.html";
  }
  /*****************************************
  functionality for the global navigation
  *****************************************/
  // Store variables
  var $global_navigation = $('.nav-collapse > li > a'),
    $global_navigation_all = $('.nav-collapse li a'),
    $in_page_navigation;
  // find current page in navigation menu
  $global_navigation_all.each(function(index) {
    var $this = $(this);
    linkPath = $this.attr('href');
    if (linkPath.slice(linkPath.indexOf("/en/"),linkPath.length) === path) {
      $currentPage = $this;
      $currentItem = $this.parent();
    }
  });
  // check if current item is in submenu
  // current page may be undefined if the site index
  if ($currentPage !== undefined) {
    $currentPage.addClass('active');
  }
  // if $currentPage is undefined, $currentItem will be also
  if ($currentItem !== undefined) {
    if ($currentItem.parent().parent().parent().hasClass('dropdown-menu')) {
      $currentItem.parent().parent().parent().siblings('.btn').addClass('active');
    }
    // check if current item is in dropdown
    else if ($currentItem.parent().hasClass('dropdown-menu')) {
      $currentItem.parent().siblings('.btn').addClass('active');
    }
  }
});