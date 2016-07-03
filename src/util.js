import * as fs from './fs'

/*
* Function that checks if a given URI is actually a file.
*
* @returns boolean if given URI is a file, true. Otherwise false.
*/
export async function isFile (uri) {
	try {
		let fileInfo = await fs.stat(uri)
		return fileInfo.isFile() ? true : false
	} catch (e) {
		console.error(e)
	}
}