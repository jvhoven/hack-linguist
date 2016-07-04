'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sort = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isFile = isFile;

var _fs = require('./fs');

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
          return regeneratorRuntime.awrap((0, _fs.pstat)(uri));

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

/* 
* TODO: Sort files starting with a dot like .gitignore
*/
var sort = exports.sort = function sort(ignored) {
  return new Promise(function (resolve, reject) {
    var list = {
      files: [],
      directories: []
    };

    if ((typeof ignored === 'undefined' ? 'undefined' : _typeof(ignored)) === 'object') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ignored[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          // Check if element in ignored is a file
          if (element.match(/\*(.)+/g) || element.match(/([^\s]+(\.)[^\s]+)/)) {
            if (element.charAt(0) == '*') {
              // Wildcard selector
              list.files.push(element.substr(1));
            } else {
              // Explicit file
              list.files.push(element);
            }
          } else {
            list.directories.push(element);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      resolve(list);
    } else {
      reject(new Error(error.IGNORELIST_ARRAY));
    }
  });
};