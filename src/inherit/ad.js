import {AdSystem} from 'iab-vast-model'
import createCreative from '../factory/creative'
import createExtension from '../factory/extension'
import createImpression from '../factory/impression'
import isNonEmptyString from '../util/is-non-empty-string'

const hasValue = ($node) => ($node != null && isNonEmptyString($node._value))

export default ($ad, $impl, ad, options) => {
  ad.id = $ad.id
  ad.sequence = $ad.sequence
  if ($impl.adSystem != null) {
    ad.adSystem = new AdSystem()
    ad.adSystem.name = $impl.adSystem._value
    ad.adSystem.version = $impl.adSystem.version
  }
  if ($impl.impression != null) {
    ad.impressions.push(...$impl.impression
      .filter(hasValue)
      .map(createImpression))
  }
  if ($impl.error != null) {
    ad.errors.push(...$impl.error
      .filter(hasValue)
      .map($err => $err._value))
  }
  if ($impl.creatives != null && Array.isArray($impl.creatives.creative)) {
    $impl.creatives.creative.forEach((creative) => {
      try {
        const parsedCreative = createCreative(creative, options)
        ad.creatives.add(parsedCreative)
      } catch (err) {
        options.errorHandler(err)
      }
    })
  }
  if ($impl.extensions != null && Array.isArray($impl.extensions.extension)) {
    ad.extensions.push(...$impl.extensions.extension.map(createExtension))
  }
  return ad
}
