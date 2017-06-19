import createInLine from './in-line'
import createWrapper from './wrapper'

export default ($ad, vast, options) => {
  let ad

  if ($ad.inLine) {
    ad = createInLine($ad, options)
  } else if ($ad.wrapper) {
    ad = createWrapper($ad, options)
  } else {
    throw new Error('Unrecognized ad type')
  }

  ad.parent = vast
  return ad
}
