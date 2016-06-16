import TYPES from './types'
import parseTime from '../util/parse-time'

export default {
  [TYPES.bool]: (str) => (str === 'true'),
  [TYPES.int]: (str) => parseInt(str, 10),
  [TYPES.float]: parseFloat,
  [TYPES.time]: parseTime
}
