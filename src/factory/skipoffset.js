import {AbsoluteSkipoffset, RelativeSkipoffset} from 'iab-vast-model'
import parseTime from '../util/parse-time'

export default (offsetStr) => {
  const lastChar = offsetStr.charAt(offsetStr.length - 1)
  if (lastChar === '%') {
    const offset = new RelativeSkipoffset()
    offset.value = parseFloat(offsetStr.substr(0, offsetStr.length - 1))
    return offset
  } else {
    const offset = new AbsoluteSkipoffset()
    offset.value = parseTime(offsetStr)
    return offset
  }
}
