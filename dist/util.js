'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.File = exports.filter = exports.sort = exports.isFile = undefined;

var _fs = require('./fs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Function that checks if a given URI is actually a file.
*
* @returns boolean if given URI is a file, true. Otherwise false.
*/
var isFile = exports.isFile = function _callee(uri) {
  var fileInfo;
  return regeneratorRuntime.async(function _callee$(_context) {
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
  }, null, undefined, [[0, 7]]);
};

var sort = exports.sort = function sort(collection) {
  return new Promise(function (resolve, reject) {
    var sorted = {
      files: [],
      folders: []
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = collection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var file = _step.value;

        if (file.uri.match(/\*(.)+/g) || file.uri.match(/([^\s]+(\.)[^\s]+)/)) {
          sorted.files.push(file);
        } else {
          sorted.folders.push(file);
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

    resolve(sorted);
  });
};

/*
* TODO: Only check filename.extension when matching an ignored file
*/
var filterMatch = function filterMatch(file, filter) {
  var match = false;
  filter.map(function (f) {
    var matcher = f;
    // Check if wildcard selector
    if (f.charAt(0) === '*') {
      matcher = f.substr(1);
    }

    file.parent.match(new RegExp("^.*" + matcher + "[\/]?")) ? match = true : '';
  });
  return !match; // if there is a match(true), we want to return false
};

var filter = exports.filter = function filter(collection, _filter) {
  return new Promise(function (resolve, reject) {
    var filtered = collection.files.filter(function (file) {
      return filterMatch(file, _filter.directories);
    });
    filtered = filtered.filter(function (file) {
      return filterMatch(file, _filter.files);
    });

    resolve(filtered);
  });
};

var File = exports.File = function File(parent, uri) {
  var language = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  _classCallCheck(this, File);

  this.parent = parent;
  this.uri = uri;
  this.language = language;
};