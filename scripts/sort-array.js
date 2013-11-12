
BCLSsortArray = function(theArray) {
	theArray.sort( function(a,b) {
    return a.time - b.time;
  });
  return theArray;
}
