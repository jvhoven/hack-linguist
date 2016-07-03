require("babel-polyfill");
require("coffee-script/register")
let linguist = require("atom-linguist")

import { isFile } from './util'
import * as error from './errors'

/*
* A function that identifies the language of a given 
* uri which should always lead to a file. It's possible that it returns multiple languages.
* 
* @uri {string} Location of a single file
* @returns {Promise.<String|Array, Error>} A promise that returns an array or string of the 
* identified language(s) if resolved, or an error if rejected.
*/
const identify = (uri) => new Promise((resolve, reject) => {
	if(isFile(uri)) {
		let language = linguist.detect(uri)
		resolve(language)
	} else {
		reject(error.NOT_A_FILE)
	}
})

// async function test() {
// 	let language = await identify('./src/index.js')
// 	console.log(language)
// }

// test()
