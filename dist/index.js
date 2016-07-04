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
* A function that identifies the language of a given URI.
* It's possible that it returns multiple languages.
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

function walkIdentify(folder, ignored) {
	var coll;
	return regeneratorRuntime.async(function walkIdentify$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.prev = 0;
					_context.next = 3;
					return regeneratorRuntime.awrap((0, _fs.walk)(folder));

				case 3:
					coll = _context.sent;

					console.log(coll);
					_context.next = 10;
					break;

				case 7:
					_context.prev = 7;
					_context.t0 = _context["catch"](0);

					console.error(_context.t0);

				case 10:
				case "end":
					return _context.stop();
			}
		}
	}, null, this, [[0, 7]]);
}

var identified = walkIdentify('./src', null);