require("babel-polyfill");
require("coffee-script/register")
let linguist = require("atom-linguist")

import { isFile, sort, ignore, filter } from './util'
import * as error from './errors'
import { walk } from './fs'

/*
* Identifies the language of a given URI.
* It's possible that it returns multiple languages.
* 
* @uri {string} Location of a single file
* @returns {Promise.<String|Array, Error>} A promise that returns an array or string of the 
* identified language(s) if resolved, or an error if rejected.
*/
const identify = (uri) => {
	new Promise((resolve, reject) => {
  	isFile(uri) ? resolve(linguist.detect(uri)) : reject(error.NOT_A_FILE)
	})
}

const walkIdentify = (folder, ignored) => { 
	new Promise(async (resolve, reject) => {
	  try {
			const collection = await walk(folder)
			const sorted = await sort(collection)
			const filtered = await filter(sorted, ignored)
			console.log(filtered)
	  } catch(e) {
	    console.error(e)
	  }
	})
}

// const identified = identify('./src/index.js').then((result) => console.log(result))
walkIdentify('test', { directories: [ 'config', 'bats' ], files: [ 'php.php', 'test.lua' ]})
