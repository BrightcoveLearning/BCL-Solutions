/**
 * bclsChapterBuilder
 * app object for the chapter builder
 */

var bclsApp = (function (window, document, $) {
    "use strict";
    var  bclsLog = function (message) {
        var d;
        if (window.console && window.console.log) {
            d = new Date();
            window.console.log(d + ": ");
            window.console.log(message);
        }
    };
    return {
        handleError : function (error) {
            bclsLog("An error occurred: " + error);
        }
    };
})(window, document, jquery);
