var assert = require("assert");
var gitignore = require("../src/gitignore.js");

describe("gitignore utility functions", function() {
	
	before(function() {
		gitignore.test.init("test/.test-gitignore");
	});
	
	describe("read()", function() {
		it("should remove comments and whitespace from .test-gitignore and return an array", function(done) {
			gitignore.read(function(err, data) {
				if(err) throw(err);
				assert.equal(11, data.length);
				done();
			});
		});
	});
	
	describe("sort()", function() {
		it("should sort files and directories in two seperate arrays", function(done) {
			gitignore.sort(function(directories, files) {
				assert.equal(6, directories.length);
				assert.equal(5, files.length);
				done();
			});
		});
	});
	
});