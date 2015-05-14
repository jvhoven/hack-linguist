'use strict';

require("coffee-script/register");
var util = require("util");
var file = require("file");
var linguist = require("atom-linguist");
var directory = require("./directory.js");

var Languist = module.exports = {
  
  /*
  * identify
  *
  * Identifies the language for a single file
  * returns a callback with the language
  */
  identify: function(file, callback) {
    try {
      var language = linguist.detect(file);
      
      // When it returns multiple languages, grab the last one
      if(language instanceof Array) {
        language = language[language.length -1];
      }
      
      callback(null, language);
    } catch(e) {
      callback(e);
    }
  },
  
  /*
  * identify
  *
  * Synchronous version of identify
  */
  identifySync: function(file) {
     try {
      var language = linguist.detect(file);
      
      // When it returns multiple languages, grab the last one
      if(language instanceof Array) {
        language = language[language.length -1];
      }
        return language;
      } catch(e) {
        throw(e);
    }
  },
  contains: function(array, object) {
      var i = array.length;
      while (i--) {
        if (array[i] === object) {
           return true;
        }
      }
    return false;
  },  
  /*
  * formatIgnore
  *
  * Formats the given array and splits it in 
  * files and folders
  */
  formatIgnore: function(ignore) {
    
    var ignored = {
      files: [],
      directories: []
    };
    
    for(var i = 0; i < ignore.length; i++) {
      if(ignore[i].match(/\*(.)+/g) || ignore[i].match(/([^\s]+(\.)[^\s]+)/)) {
        ignored.files.push(ignore[i].substr(1));  
      } else {
        ignored.directories.push(ignore[i]);
      }        
    }

    return ignored;
  },
  
  /*
  * isIgnored
  *
  * Checks if a file or folder is on the ignore list
  */
  isIgnored: function(fileOrFolder, ignored) {
   
    for(var i = 0; i < ignored.length; i++) {
      
      if(fileOrFolder == ignored[i]) {
        return true;
      }
            
      if(fileOrFolder.search(ignored[i]) > 0) {
        return true;
      }
    }
    
    return false;
  },  
  
  /*
  * walkIdentify
  *
  * Identifies an entire directory recursively
  * 
  */
  walkIdentify: function(folder, callback, ignore) {
    
    // Format the given files/directories seperately
    var ignored = typeof(ignore) != "undefined" ? Languist.formatIgnore(ignore) : null;
    
    // Loop through the given folder      
    file.walkSync(folder, function(dirPath, dirs, files) {    
      
      // Skip ignored directories
      if(!Languist.isIgnored(dirPath, ignored.directories)) {     
        files.forEach(function(file) {
          
          // Skip ignored files
          if(!Languist.isIgnored(file, ignored.files)) {
            var language = Languist.identifySync(dirPath + "/" + file);
            directory.files.push(file);
            
            // Only add language once
            if(!Languist.contains(directory.languages, language))
              directory.languages.push(language);
            
            // Occurences for statistics
            if(!directory.occurences[language]) {
              directory.occurences[language] = 1;
            } else {
              directory.occurences[language] += 1;
            }
          }
        });  
      }
    });
    
    callback(null, directory);
  }
};
