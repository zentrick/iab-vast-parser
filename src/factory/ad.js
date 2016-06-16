import createInLine from './in-line'
import createWrapper from './wrapper'

export default ($ad) => {
  if ($ad.inLine) {
    return createInLine($ad)
  } else if ($ad.wrapper) {
    return createWrapper($ad)
  } else {
    throw new Error('Unrecognized ad type')
  }
}
