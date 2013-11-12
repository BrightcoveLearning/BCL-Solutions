
/**
 * Processor for pre block code:
 * replaces line-breaks with br
 * replaces tabs or double spaces with double &nbsp;
 * replaces brackets, quotation marks, and ampersands
 * with equivalent ASCII codes, but does a basic check first to see
 * if these characters have already been converted
 *
 * Examples:
 *
 *     var myCode = document.getElementById('preBlock').innerHTML;
 *     myCode = preFix(myCode);
 *
 * @param {String} code to be fixed
 * @return {String} fixed html
 * @api public
 */
var BCLSpreFix = function(str) {
  var reNewLines = /[\n\r]/g;
  var reTabs = /[\t]/g;
  var reLeftBrackets = /[<]/g;
  var reRightBrackets = /[>]/g;
  var reQuote = /["]/g;
  var reAmp = /[&]/g;
  /**
  * the order of the statements below matters! Don't change them!
  *
  */
  if (str.indexOf("&lt;") == -1 || str.indexOf("&quot;") == -1) {
    str = str.replace(reAmp, "&amp;");
    str = str.replace(reQuote, "&quot;");
    str = str.replace(reLeftBrackets, "&lt;");
    str = str.replace(reRightBrackets, "&gt;");
  };
  str = str.replace( /\x20\x20/g, "&nbsp;&nbsp;" );
  str = str.replace(reTabs, "&nbsp;&nbsp;")
  str = str.replace(reNewLines, "<br />");
  return str;
}
