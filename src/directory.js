/*
* Directory
*
* Datamapper for identifyWalk
*/
var Directory = module.exports = {
	
	// Scanned files
	files: [],
	
	// All languages in the directory
	languages: [],
	
	// Number of occurences per language
	occurences: [],
	
	getPercentages: {
		
	},
	getLanguages: function() {
		return this.languages;
	}
}

