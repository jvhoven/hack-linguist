'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walk = exports.preaddir = exports.pstat = undefined;

var _fs = require('fs');

var _util = require('./util');

var _path = require('path');

/*
* Promisified version of fs.stat
*
* @uri {string} Location of the to be identified file
* @returns {Promise.<String, String>} Returns a promise which gives the stat data of the file when resolved,
* and an error if it gets rejected.
*/
var pstat = exports.pstat = function pstat(uri) {
  return new Promise(function (resolve, reject) {
    (0, _fs.stat)(uri, function (err, data) {
      return err != null ? reject(err) : resolve(data);
    });
  });
};

/*
* Promisified version of fs.readdir
*
* @dir {string} Location of the directory
* @returns {Promise.<String, Array>} Returns a promise which gives the directory contents when resolved,
* and an error if it gets rejected.
*/
var preaddir = exports.preaddir = function preaddir(dir) {
  return new Promise(function (resolve, reject) {
    (0, _fs.readdir)(dir, function (err, data) {
      return err != null ? reject(err) : resolve(data);
    });
  });
};

/*
* Find all files inside given directory including subdirectories.
*
* @dir {string} Location of the start directory
* @returns {Promise.<String, Array>} Returns a promise which gives the directory and subdirectories contents when resolved,
* and an error if it gets rejected.
*
* http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
*/
var walk = exports.walk = function walk(dir) {
  return new Promise(function _callee3(resolve, reject) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(function _callee2() {
              var list, results, pending;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(preaddir(dir));

                    case 2:
                      list = _context2.sent;
                      results = [];
                      pending = list.length;


                      if (!pending) {
                        resolve(results);
                      }

                      list.forEach(function _callee(file) {
                        var stat, res;
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                file = (0, _path.join)(dir, file);
                                _context.next = 3;
                                return regeneratorRuntime.awrap(pstat(file));

                              case 3:
                                stat = _context.sent;

                                if (!(stat && stat.isDirectory())) {
                                  _context.next = 13;
                                  break;
                                }

                                _context.next = 7;
                                return regeneratorRuntime.awrap(walk(file));

                              case 7:
                                res = _context.sent;

                                results.push(new _util.File(dir, file));
                                results = results.concat(res);

                                // If this was the last one
                                if (--pending === 0) {
                                  resolve(results);
                                }
                                _context.next = 15;
                                break;

                              case 13:
                                // File
                                results.push(new _util.File(dir, file));
                                if (--pending === 0) {
                                  resolve(results);
                                }

                              case 15:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, null, undefined);
                      });

                    case 7:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, null, undefined);
            }());

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3['catch'](0);

            reject(_context3.t0);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, null, undefined, [[0, 5]]);
  });
};