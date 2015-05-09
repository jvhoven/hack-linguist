require('coffee-script/register');
var file 		= require("file");
var util 		= require("util");
var linguist 	= require("atom-linguist");

// The allmighty languages array
var languages = [];

/*
* Ignored languages array
* TODO: possibly make configuration for this
*/
var ignoredLanguages = [
    'Text'
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

exports.detect = function(dir) {
    
    file.walkSync(dir, function(dirPath, dirs, files) {
        files.forEach(function(file) {
            var lang = linguist.detect(dirPath + "\\" + file);
            
            if(!ignoredLanguages.contains(lang) && !languages.contains(lang))
               languages.push(lang);
              
        }, this);
    });

    return languages;
};
