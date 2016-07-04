import { pstat } from './fs'

/*
* Function that checks if a given URI is actually a file.
*
* @returns boolean if given URI is a file, true. Otherwise false.
*/
export async function isFile (uri) {
  try {
    let fileInfo = await pstat(uri)
    return fileInfo.isFile() ? true : false
  } catch (e) {
    console.error(e)
  }
}

/* 
* TODO: Sort files starting with a dot like .gitignore
*/
export const sort = (ignored) => new Promise((resolve, reject) => {
  let list = {
    files: [],
    directories: []
  }

  if (typeof(ignored) === 'object') {
    for (let element of ignored) {
      // Check if element in ignored is a file
      if (element.match(/\*(.)+/g) || element.match(/([^\s]+(\.)[^\s]+)/)) {
        if (element.charAt(0) == '*') {
          // Wildcard selector
          list.files.push(element.substr(1))
        } else {
          // Explicit file
          list.files.push(element)
        }
      } else {
        list.directories.push(element)
      }
    }

    resolve(list)
  } else {
    reject(new Error(error.IGNORELIST_ARRAY))
  }
})