/*
* Report
*
* Datamapper for identifyWalk
*
* @var files
*	The scanned files
*
* @var languages
*	All the identified languages
*
* @var occurrences
*	How many times each language was found
*
* @function getPercentages
*	Returns the percentage values of the occurrences
*/
var Report = module.exports = function() {
	this.files = [];
	this.languages = [];
	this.occurrences = [];
	this.getPercentages = function() {
		
		var total = 0;
		var eachLang = this.occurrences;
		var percentages = [];
		
		// Add up totals
		for(var key in eachLang) {
			total += eachLang[key];
		};
		
		// Calculate for each language
		this.languages.forEach(function(language) {
			percentages[language] = eachLang[language] * 100 / total;
		});

		return percentages;
	};
};

