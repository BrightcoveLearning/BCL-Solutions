;
/* module-key = 'com.atlassian.jira.plugins.jira-editor-plugin:converter-util', location = '/js/converter/util/color-converter.js' */
define("jira/editor/converter/util/color-converter",["exports"],function(a){a.colorToHex=function b(d){if(d.substr(0,1)==="#"){return d}var g=/(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(d);var h=g[2];var f=g[3];var c=g[4];var e=[h,f,c].map(function(i){return("00"+parseInt(i).toString(16)).slice(-2)});return g[1]+"#"+e.join("")}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-editor-plugin:converter-util', location = '/js/converter/util/strings.js' */
define("jira/editor/converter/util/strings",["jira/editor/util/strings","exports","jquery","underscore"],function(c,e,g,j){var i="/images/icons/emoticons/";var b="/secure/attachment/";var d="/secure/thumbnail/";var f="/secure/temporaryattachment/";e.asBooleanOrString=function a(m){var l=m?m.toLowerCase():"";var k=m;if(l==="true"){k=true}else{if(l==="false"){k=false}}return k};e.startsWith=function(l,k){if(j.isEmpty(l)){return false}if(j.isEmpty(k)){return false}return l.indexOf(k)===0};e.endsWith=function(l,k){if(j.isEmpty(l)){return false}if(j.isEmpty(k)){return false}return l.indexOf(k)+k.length===l.length};e.substringAfter=function(m,k){if(j.isEmpty(m)){return m}if(j.isEmpty(k)){return""}var l=m.indexOf(k);if(l<0){return""}return m.substring(l+k.length)};e.substringBefore=function(m,k){if(j.isEmpty(m)){return m}if(j.isEmpty(k)){return""}var l=m.indexOf(k);if(l<0){return""}return m.substring(0,l)};e.contains=function(m,k){if(j.isEmpty(m)){return false}var l=m.indexOf(k);return l>=0};e.repeat=function(l,k){if(j.isEmpty(l)){return""}return new Array(k+1).join(l)};e.length=function(k){if(j.isEmpty(k)){return 0}return k.length};e.replace=function(p,m,k){if(j.isEmpty(p)){return""}if(j.isEmpty(m)){return""}if(typeof k==="undefined"){k=""}var q=0;var n=p.indexOf(m);while(n>=0){var l=p.substring(0,n);var o=p.substring(n+m.length);p=l+k+o;q=n+k.length;n=p.indexOf(m,q)}return p.substring(n,p.length)};e.hashCode=function h(m){var k;var n=0;if(!m){return""}for(var l=0;l<m.length;l+=1){k=m.charCodeAt(l);n=(n*31)+k;n|=0}return""+n};e.resolveUrl=function(l,m){if(!l){return}var k=g(document.createElement("base")).prop("href",m).appendTo("head");try{return g(document.createElement("a")).prop("href",l).prop("href")}finally{k.remove()}};e.getBaseUrl=function(){return document.location.origin+document.location.pathname};e.getContextUrl=function(){return document.location.origin+AJS.contextPath()};e.getFilenameFromHref=function(n,o){var l=n.split("/");var m=l[l.length-1];if(!o){var q=l[l.length-2];var p=q+"_";if(m.indexOf(p)===0){m=m.substring(p.length)}}else{var k=m.indexOf("_");if(k>0){m=m.substring(k+1)}}m=m.replace(new RegExp("\\+","g")," ");return decodeURIComponent(m)};e.isAttachmentPath=function(k){return e.contains(k,b)};e.isTemporaryAttachmentPath=function(k){return e.contains(k,f)};e.isThumbnailPath=function(k){return e.contains(k,d)};e.isEmotePath=function(k){return e.contains(k,i)};e.getFilenameFromError=function(k){return c.getFilenameFromError(k)}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-editor-plugin:converter-util', location = '/js/converter/util/uri.js' */
define("jira/editor/converter/util/uri",["exports","atlassian/libs/uri-1.14.1"],function(a,b){a.decodeUri=function(c){return b.decodeQuery(c||"",true)};a.encodeUri=function(c){return b.encodeQuery(c||"",true)}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-editor-plugin:converter-util', location = '/js/converter/util/rte-strings.js' */
define("jira/editor/converter/util/rte-strings",["exports","underscore"],function(a,b){a.isWhitespace=function(e){if(b.isEmpty(e)){return false}var d={"\t":1,"\n":1,"\u0020":1,"\u0009":1,"\u000A":1,"\u000D":1,"\u000C":1,"\u200B":1};var c=true;b.each(e,function(f){c=c&&(f in d)});return c};a.trim=function(c){if(b.isEmpty(c)){return""}return this.trimLeading(this.trimTrailing(c))};a.trimTrailing=function(d){if(b.isEmpty(d)){return""}var c;for(c=d.length-1;c>=0;c--){if(!this.isWhitespace(d[c])){break}}return d.substring(0,c+1)};a.trimLeading=function(d){if(b.isEmpty(d)){return""}var c;for(c=0;c<d.length;c++){if(!this.isWhitespace(d[c])){break}}return d.substring(c,d.length)};a.parseHtml=function(c){var e=new DOMParser();var d=e.parseFromString(c,"text/html").body;return d}});;