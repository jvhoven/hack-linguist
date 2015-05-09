require('coffee-script/register');
var file 		= require("file");
var util 		= require("util");
var linguist 	= require("atom-linguist");

/*
* Ignored languages array
* TODO: possibly make configuration for this
*/
var ignoredLanguages = [
    'Text', 'Markdown', 'JSON',
    'YAML', 'Groff', 'Shell', 'Batchfile', 'XML'
];

var ignoredDirs = [
    '.git', 'node_modules'
];

/*
* We'll need this to identify if an element already exists in
* an array
*/
Array.prototype.contains = function(k) {
  for(var i=0; i < this.length; i++){
    if(this[i] === k){
      return true;
    }
  }
  return false;
};

// Filter all ignored dirs
function isIgnoredDir(dirPath) {
  
  for(var i = 0; i < ignoredDirs.length; i++) {
    if(dirPath.search(ignoredDirs[i]) > 0) {
      return true;
    }
  }
}

exports.detect = function(dir) {
  
    // The allmighty languages array
    var languages = [];
  
    file.walkSync(dir, function(dirPath, dirs, files) {
        if(!isIgnoredDir(dirPath)){
          files.forEach(function(file) {
              var lang = linguist.detect(dirPath + "\\" + file);
              
              if(typeof(lang) != 'undefined') {
                if(lang instanceof Array)
                   lang = lang[lang.length - 1];
                   
                if(!ignoredLanguages.contains(lang) && !languages.contains(lang))
                   if(typeof(lang) != 'undefined')
                   languages.push(lang);
              }
              
              console.log(file + lang);
          }, this);
         }
    });
    return languages;
};
