/*
* Dependencies: jQuery 1.5.1+
* public methods: BCLSformatJSON.formatJSON(JSON:data, jquery object: $target)
* returns: formatted JSON string
*/
var BCLSformatJSON = ( function () {
  var formattedData;
  return {
    formatJSON : function(data) {
      formattedData = JSON.stringify(data,null,"  ")
      return formattedData;
    }
  }
})();
