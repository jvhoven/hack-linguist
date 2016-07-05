"use strict";

var _util = require("./util");

var _errors = require("./errors");

var error = _interopRequireWildcard(_errors);

var _fs = require("./fs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

require("babel-polyfill");
require("coffee-script/register");
var linguist = require("atom-linguist");

/*
* Identifies the language of a given URI.
* It's possible that it returns multiple languages.
* 
* @uri {string} Location of a single file
* @returns {Promise.<String|Array, Error>} A promise that returns an array or string of the 
* identified language(s) if resolved, or an error if rejected.
*/
var identify = function identify(uri) {
	new Promise(function (resolve, reject) {
		(0, _util.isFile)(uri) ? resolve(linguist.detect(uri)) : reject(error.NOT_A_FILE);
	});
};

var walkIdentify = function walkIdentify(folder, ignored) {
	new Promise(function _callee(resolve, reject) {
		var collection, sorted, filtered;
		return regeneratorRuntime.async(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return regeneratorRuntime.awrap((0, _fs.walk)(folder));

					case 3:
						collection = _context.sent;
						_context.next = 6;
						return regeneratorRuntime.awrap((0, _util.sort)(collection));

					case 6:
						sorted = _context.sent;
						_context.next = 9;
						return regeneratorRuntime.awrap((0, _util.filter)(sorted, ignored));

					case 9:
						filtered = _context.sent;

						console.log(filtered);
						_context.next = 16;
						break;

					case 13:
						_context.prev = 13;
						_context.t0 = _context["catch"](0);

						console.error(_context.t0);

					case 16:
					case "end":
						return _context.stop();
				}
			}
		}, null, undefined, [[0, 13]]);
	});
};

// const identified = identify('./src/index.js').then((result) => console.log(result))
walkIdentify('test', { directories: ['config', 'bats'], files: ['php.php', 'test.lua'] });