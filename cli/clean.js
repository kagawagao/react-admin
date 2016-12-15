import _debug from 'debug'
import { paths } from '../config'

const debug = _debug('app:clean')

debug('Clean dist files...')

require('rimraf')(paths.dist('**'), err => {
  if (err) {
    debug(err)
  } else {
    debug('Files cleaned.')
  }
})
