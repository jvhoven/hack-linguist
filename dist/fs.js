'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stat = undefined;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
* Promisified version of fs.stat
*
* @uri {string} Location of the to be identified file
* @returns {Promise.<String, String>} Returns a promise which gives the stat data of the file when resolved,
* and an error if it does not succeed.
*/
var stat = exports.stat = function stat(uri) {
	return new Promise(function (resolve, reject) {
		fs.stat(uri, function (err, data) {
			return err != null ? reject(err) : resolve(data);
		});
	});
};