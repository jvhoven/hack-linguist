"use strict";

var _util = require("./util");

var _errors = require("./errors");

var error = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

require("babel-polyfill");
require("coffee-script/register");
var linguist = require("atom-linguist");

/*
* A function that identifies the language of a given 
* uri which should always lead to a file. It's possible that it returns multiple languages.
* 
* @uri {string} Location of a single file
* @returns {Promise.<String|Array, Error>} A promise that returns an array or string of the 
* identified language(s) if resolved, or an error if rejected.
*/
var identify = function identify(uri) {
	return new Promise(function (resolve, reject) {
		if ((0, _util.isFile)(uri)) {
			var language = linguist.detect(uri);
			resolve(language);
		} else {
			reject(error.NOT_A_FILE);
		}
	});
};

// async function test() {
// 	let language = await identify('./src/index.js')
// 	console.log(language)
// }

// test()