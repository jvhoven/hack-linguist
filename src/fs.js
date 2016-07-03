import * as fs from 'fs'

/*
* Promisified version of fs.stat
*
* @uri {string} Location of the to be identified file
* @returns {Promise.<String, String>} Returns a promise which gives the stat data of the file when resolved,
* and an error if it does not succeed.
*/
export const stat = (uri) => {
	return new Promise((resolve,reject) => {
     fs.stat(uri, (err, data) => err != null ? reject(err) : resolve(data))
	})
}