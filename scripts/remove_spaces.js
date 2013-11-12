/*
* space remover
* arguments: string:str
* returns: string:str
*/
bcls_removeSpaces = function (str) {
  str = str.replace(/\s+/g, '');
  return str;
};