var assert = require("assert");
var linguist = require("../src/index.js");

describe("atom-linguist functions", function() {
	
	describe("identify()", function() {
		
		var tests = [
			{ file: "./test/samples/languages/configuration.ini", expected: "INI" },
			{ file: "./test/samples/languages/cplusplus.cpp", expected: "C++" },
			{ file: "./test/samples/languages/javascript.js", expected: "JavaScript" },
			{ file: "./test/samples/languages/php.php", expected: "PHP" },
			{ file: "./test/samples/languages/ruby.rb", expected: "Ruby" },
			{ file: "./test/samples/languages/test.lua", expected: "Lua" }
		];
		
		tests.forEach(function(test) {
			it("should identify the programming language " + test.expected, function() {
				linguist.identify(test.file, function(err, language) {
					if(err) throw err;
					assert.equal(language, test.expected);
				});
			});
		});
		
	});
	
});