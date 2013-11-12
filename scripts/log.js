/*************************
logging
*************************/
var bclslog = function (message) {
  if (window["console"] && console["log"]) {
    var d = new Date();
    console.log(d + ": ");
    console.log(message);
  };
};