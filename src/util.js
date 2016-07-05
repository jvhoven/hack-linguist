import { pstat } from './fs'

/*
* Function that checks if a given URI is actually a file.
*
* @returns boolean if given URI is a file, true. Otherwise false.
*/
export const isFile = async uri => {
  try {
    let fileInfo = await pstat(uri)
    return fileInfo.isFile() ? true : false
  } catch (e) {
    console.error(e)
  }
}

export const sort = collection => {
  return new Promise((resolve, reject) => {
    let sorted = {
      files: [],
      folders: []
    }

    for (let file of collection) {
      if (file.uri.match(/\*(.)+/g) || file.uri.match(/([^\s]+(\.)[^\s]+)/)) {
        sorted.files.push(file)
      } else {
        sorted.folders.push(file)
      }
    }
    resolve(sorted)
  })
}

/*
* TODO: Only check filename.extension when matching an ignored file
*/
const filterMatch = (file, filter) => {
  let match = false
  filter.map(f => {
    let matcher = f
    // Check if wildcard selector
    if(f.charAt(0) === '*') {
      matcher = f.substr(1)
    }

    file.parent.match(new RegExp("^.*" + matcher + "[\/]?")) ? match = true : ''
  })
  return !match // if there is a match(true), we want to return false
}

export const filter = (collection, filter) => {
  return new Promise((resolve, reject) => {
    let filtered = collection.files.filter((file) => filterMatch(file, filter.directories))
    filtered = filtered.filter((file) => filterMatch(file, filter.files))

    resolve(filtered)   
  })
}

export class File {
  constructor(parent, uri, language = null) {
    this.parent = parent
    this.uri = uri
    this.language = language
  }
}