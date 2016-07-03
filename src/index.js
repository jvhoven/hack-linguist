require("babel-polyfill");
require("coffee-script/register")
let fs = require("fs")
let linguist = require("atom-linguist")

/*
* Identify is a function that identifies the language of a given 
* uri which should always lead to a file. 
*
* It's possible that it returns multiple languages.
* The function will return a promise.
*
* @uri Location of a single file
*/
export async function identify (uri) {
 	return new Promise((resolve, reject) => {
		//let fileInfo = await fs.stat(uri)
		//console.log(fileInfo)
		file === 'test' ? resolve(file) : reject('Is not test')
	})
}

async function print() {
  try {
    var test = await identify('test')
    console.log(test)
  } catch (e) {
    console.log(e)
  }
}

const stat = (uri) => new Promise((resolve, reject) => {
	(resolve, reject) => fs.stat('index.js', (err, res) => err ? reject(err) : resolve(res))
})

async function testStat(uri) {
	try {
		let test = await stat(uri)
		console.log(test)
	} catch (e) {
		console.log(e)
	}
}

testStat('./index.js')