;
/* module-key = 'com.atlassian.jira.plugins.jira-editor-plugin:polyfil-string-ends-with', location = '/js/polyfills/stringEndsWithPolyfill.js' */
if(!String.prototype.endsWith){String.prototype.endsWith=function(b,a){if(a===undefined||a>this.length){a=this.length}return this.substring(a-b.length,a)===b}};;