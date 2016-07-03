"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.identify = identify;
require("babel-polyfill");
require("coffee-script/register");
var fs = require("fs");
var linguist = require("atom-linguist");

/*
* Identify is a function that identifies the language of a given 
* uri which should always lead to a file. 
*
* It's possible that it returns a multitude of languages.
* The function will return a promise.
*
* @uri Location of a single file
*/
function identify(uri) {
	return regeneratorRuntime.async(function identify$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					return _context.abrupt("return", new Promise(function (resolve, reject) {
						//let fileInfo = await fs.stat(uri)
						//console.log(fileInfo)
						file === 'test' ? resolve(file) : reject('Is not test');
					}));

				case 1:
				case "end":
					return _context.stop();
			}
		}
	}, null, this);
}

function print() {
	var test;
	return regeneratorRuntime.async(function print$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_context2.prev = 0;
					_context2.next = 3;
					return regeneratorRuntime.awrap(identify('test'));

				case 3:
					test = _context2.sent;

					console.log(test);
					_context2.next = 10;
					break;

				case 7:
					_context2.prev = 7;
					_context2.t0 = _context2["catch"](0);

					console.log(_context2.t0);

				case 10:
				case "end":
					return _context2.stop();
			}
		}
	}, null, this, [[0, 7]]);
}

var stat = function stat(uri) {
	return new Promise(function (resolve, reject) {
		(function (resolve, reject) {
			return fs.stat('index.js', function (err, res) {
				return err ? reject(err) : resolve(res);
			});
		});
	});
};

function testStat(uri) {
	var test;
	return regeneratorRuntime.async(function testStat$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					_context3.prev = 0;
					_context3.next = 3;
					return regeneratorRuntime.awrap(stat(uri));

				case 3:
					test = _context3.sent;

					console.log(test);
					_context3.next = 10;
					break;

				case 7:
					_context3.prev = 7;
					_context3.t0 = _context3["catch"](0);

					console.log(_context3.t0);

				case 10:
				case "end":
					return _context3.stop();
			}
		}
	}, null, this, [[0, 7]]);
}

testStat('./index.js');