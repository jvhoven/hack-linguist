var hackLinguist = require("./src/index.js");

var ignore = [
    "*.gitignore", // file 
    ".git", // folder
    "*.ini",
    "*.bat"
];

hackLinguist.walkIdentify("./test/samples/directories/sample", function(error, directory) {
    console.log(directory);
}, ignore);