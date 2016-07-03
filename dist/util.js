'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isFile = isFile;

var _fs = require('./fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
* Function that checks if a given URI is actually a file.
*
* @returns boolean if given URI is a file, true. Otherwise false.
*/
function isFile(uri) {
	var fileInfo;
	return regeneratorRuntime.async(function isFile$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.prev = 0;
					_context.next = 3;
					return regeneratorRuntime.awrap(fs.stat(uri));

				case 3:
					fileInfo = _context.sent;
					return _context.abrupt('return', fileInfo.isFile() ? true : false);

				case 7:
					_context.prev = 7;
					_context.t0 = _context['catch'](0);

					console.error(_context.t0);

				case 10:
				case 'end':
					return _context.stop();
			}
		}
	}, null, this, [[0, 7]]);
}