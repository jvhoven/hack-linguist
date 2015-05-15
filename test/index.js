var assert = require("assert");
var linguist = require("../lib/index.js");
var expect = require("expect.js");

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

describe("hack-linguist functions", function() {
	
	describe("walkIdentifySync()", function() {
		
		var tests = [
			{ directory: "./test/samples/directories/sample", ignored: undefined, expected: ["Batchfile", "JSON", "JavaScript", "INI", "C++", "Objective-C"]},
			{ directory: "./test/samples/directories/sample", ignored: ['config'], expected: ["Batchfile", "JSON", "JavaScript", "C++", "Objective-C"]},
			{ directory: "./test/samples/directories/sample", ignored: ['*.ini', '*.h'], expected: ["Batchfile", "JSON", "JavaScript", "C++"]},
			{ directory: "./test/samples/directories/sample", ignored: ['binder.h', 'cpp', '*.js'], expected: ["Batchfile", "JSON", "INI"] }
		];
		
		tests.forEach(function(test) {		
			it("should identify programming languages for every file in a directory", function() {
				var report = linguist.walkIdentifySync(test.directory, test.ignored);					
				expect(report.occurrences).to.only.have.keys(test.expected);
			});
		});
	});
});