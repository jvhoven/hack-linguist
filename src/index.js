require("babel-polyfill");
require("coffee-script/register")
let linguist = require("atom-linguist")

import { isFile } from './util'
import * as error from './errors'
import { walk } from './fs'

/*
* A function that identifies the language of a given URI.
* It's possible that it returns multiple languages.
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

async function walkIdentify (folder, ignored) {
  try {
    const coll = await walk(folder)
    console.log(coll)
  } catch(e) {
    console.error(e)
  }
}

const identified = walkIdentify('./src', null)
