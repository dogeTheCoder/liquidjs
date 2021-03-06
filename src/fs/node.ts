import * as _ from '../util/underscore'
import { resolve, extname } from 'path'
import { stat, statSync, readFile, readFileSync } from 'fs'
import IFS from './ifs'

const statAsync = _.promisify(stat)
const readFileAsync = _.promisify<string, string, string>(readFile)

const fs: IFS = {
  exists: (filepath: string) => {
    return statAsync(filepath).then(() => true).catch(() => false)
  },
  readFile: filepath => {
    return readFileAsync(filepath, 'utf8')
  },
  existsSync: (filepath: string) => {
    try {
      statSync(filepath)
      return true
    } catch (err) {
      return false
    }
  },
  readFileSync: filepath => {
    return readFileSync(filepath, 'utf8')
  },
  resolve: (root: string, file: string, ext: string) => {
    if (!extname(file)) file += ext
    return resolve(root, file)
  },
  fallback: (file: string) => {
    try {
      return require.resolve(file)
    } catch (e) {}
  }
}

export default fs
