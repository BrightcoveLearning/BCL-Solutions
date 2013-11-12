/**
* timeToSeconds()
* arguments: time: hh:mm:ss:mmm string
* returns: seconds: float
*/
timeToSeconds = function(hmsm) {
  var seconds = 0, len = 0, timeArray, secondsArray;
  // split at :'s
  timeArray = hmsm.split(":");
  // split last item at .
  len = timeArray.length;
  secondsArray = timeArray[len - 1];
  // calculation depends on how many items
  if (secondsArray.length == 2) {
    timeArray[len - 1] = secondsArray[0] + (secondsArray[1] / 1000)
  }
  if (timeArray.length == 3) {
    // must have milliseconds
    seconds = (timeArray[0] * 3660) + (timeArray[1] * 60) + timeArray[2];
  }
  else if (timeArray.length == 2) {
    seconds = (timeArray[0] * 60) + timeArray[1];
  }
  else if (timeArray.length == 1) {
    seconds = parseFloat(timeArray[0]);
  }
  return seconds;
}