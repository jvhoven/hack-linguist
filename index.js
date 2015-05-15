var hackLinguist = require("./lib/index.js");

var report = hackLinguist.walkIdentifySync("./test/samples/directories/sample", ['config']);
console.log(report.getPercentages());