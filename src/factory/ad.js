import createInLine from './in-line'
import createWrapper from './wrapper'

export default ($ad, options) => {
  if ($ad.inLine != null) {
    return createInLine($ad, options)
  } else if ($ad.wrapper != null) {
    return createWrapper($ad, options)
  } else {
    throw new Error('Unrecognized ad type')
  }
}
