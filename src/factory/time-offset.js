import { AbsoluteTimeOffset, RelativeTimeOffset } from 'iab-vast-model'
import parseTime from '../util/parse-time'

export default (offsetStr, options, err) => {
  const lastChar = offsetStr.charAt(offsetStr.length - 1)
  if (lastChar === '%') {
    const offset = new RelativeTimeOffset()
    offset.value = parseFloat(offsetStr.substr(0, offsetStr.length - 1))
    return offset
  } else {
    const offset = new AbsoluteTimeOffset()
    try {
      offset.value = parseTime(offsetStr)
    } catch (error) {
      options.errorHandler.tryRecover(error)
    }
    return offset
  }
}
