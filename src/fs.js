import { stat, readdir, statSync } from 'fs'
import { isDir } from './util'
import { join } from 'path'

/*
* Promisified version of fs.stat
*
* @uri {string} Location of the to be identified file
* @returns {Promise.<String, String>} Returns a promise which gives the stat data of the file when resolved,
* and an error if it gets rejected.
*/
export const pstat = (uri) => {
  return new Promise((resolve, reject) => {
     stat(uri, (err, data) => err != null ? reject(err) : resolve(data))
  })
}

/*
* Promisified version of fs.readdir
*
* @dir {string} Location of the directory
* @returns {Promise.<String, Array>} Returns a promise which gives the directory contents when resolved,
* and an error if it gets rejected.
*/
export const preaddir = (dir) => {
  return new Promise((resolve, reject) => {
    readdir(dir, (err, data) => err != null ? reject(err) : resolve(data))
  })
}

/*
* Find all files inside given directory including subdirectories.
*
* @dir {string} Location of the start directory
* @returns {Promise.<String, Array>} Returns a promise which gives the directory and subdirectories contents when resolved,
* and an error if it gets rejected.
*
* http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
*/
export async function walk (dir) {
  return new Promise(async (resolve, reject) => {
    try {
      const list = await preaddir(dir)

      let results = []
      let pending = list.length;

      if (!pending) {
        resolve(results)
      }

      list.forEach(async (file) => {
        file = join(dir, file)
        let stat = await pstat(file)

        // If we
        if(stat && stat.isDirectory()) {
          let res = await walk(file)
          results = results.concat(res)

          // If this was the last one
          if (--pending === 0) {
            resolve(results)
          }
        } else {
          results.push(file)
          if (--pending === 0) {
            resolve(results)
          }
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}