'use strict';

var fs = require("fs");
var Gitignore;
/*
* Used to communicate with the .gitignore file
*/
module.exports = Gitignore = {
	
	/*
	* Test environment
	*
	* Sets the gitignore url to a test gitignore file
	*/
	test: {
		file: "",
		init: function(file) {
			this.file = file;
		}
	},
	/*
	* read
	*
	* Reads out the .gitignore file and formats it
	* It deletes comments and whitespace 
	*
	* return Array
	*/
	read: function(callback) {

		var target = this.test.file || ".gitignore";
		
		fs.readFile(target, function(err, data){
			
			if(err)
				callback(err, null);
			
			var content = data.toString();
			content = content.replace(/#(.)+/g, "");
			content = content.replace(/^\s*[\r\n]/gm, "");
		
			callback(null, content.match(/[^\r\n]+/g));
		});	
	},
	
	/*
	* sort
	*
	* Sorts out the files and folders
	*
	* return Array files
	* return Array folders
	*/
	sort: function(callback) {
		
		var files = [];
		var dirs = [];
		
		this.read(function(err, data) {
			
			if(err) throw err;
			
			for(var i = 0; i < data.length; i++) {
				if(data[i].match(/\*(.)+/g) || data[i].match(/\.(.)+/g)) {
					files.push(data[i]);
				} else {
					dirs.push(data[i]);
				}
			}
			
			callback(dirs, files);
		});
	}
};

