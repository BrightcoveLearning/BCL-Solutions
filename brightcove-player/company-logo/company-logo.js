/**
 * Company Logo
 */
videojs.plugin('companyLogo', function() {
  // Create variables and new div, anchor and image for company logo
  var myPlayer = this,
    controlBar,
    newElement = document.createElement('div'),
    newLink = document.createElement('a'),
    newImage = document.createElement('img');

    // Assign id and classes to div for logo
    newElement.id = 'companyLogo';
    newElement.className = 'vjs-control';

    // Assign properties to elements and assign to parents
    newImage.setAttribute('src','http://solutions.brightcove.com/bcls/assets/images/bc-logo-white.png');
    newLink.setAttribute('href','http://www.brightcove.com');
    newLink.appendChild(newImage);
    newElement.appendChild(newLink);

    // Get control bar
    // Remember that getElementsByClassName() returns an array
    controlBar = document.getElementsByClassName('vjs-control-bar')[0];

    // Insert the logo div to the end of the control bar elements
    controlBar.appendChild(newElement);
  
});