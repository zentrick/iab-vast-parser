import createAdSystem from '../factory/ad-system'
import createCreative from '../factory/creative'
import createExtension from '../factory/extension'
import createImpression from '../factory/impression'
import createPricing from '../factory/pricing'
import createViewableImpression from '../factory/viewable-impression'
import createVerification from '../factory/verification'
import isNonEmptyString from '../util/is-non-empty-string'

const hasValue = ($node) => ($node != null && isNonEmptyString($node._value))

export default ($ad, $impl, ad, options) => {
  ad.id = $ad.id
  ad.conditionalAd = $ad.conditionalAd
  ad.sequence = $ad.sequence
  if ($impl.adSystem != null) {
    ad.adSystem = createAdSystem($impl.adSystem)
  }
  if ($impl.impression != null) {
    ad.impressions.push(...$impl.impression
      .filter(hasValue)
      .map(createImpression))
  }
  if ($impl.pricing != null) {
    ad.pricing = createPricing($impl.pricing)
  }
  if ($impl.error != null) {
    ad.errors.push(...$impl.error
      .filter(hasValue)
      .map($err => $err._value))
  }
  if ($impl.viewableImpression != null) {
    ad.viewableImpression = createViewableImpression($impl.viewableImpression)
  }
  if ($impl.adVerifications != null) {
    $impl.adVerifications.verification.forEach(($verification) => {
      try {
        const verification = createVerification($verification, options)
        ad.verifications.push(verification)
      } catch (error) {
        options.errorHandler.tryRecover(error)
      }
    })
  }
  if ($impl.extensions != null) {
    ad.extensions.push(...$impl.extensions.extension.map(createExtension))
  }
  if ($impl.creatives != null) {
    $impl.creatives.creative.forEach(($creative) => {
      try {
        const creative = createCreative($creative, options)
        ad.creatives.add(creative)
      } catch (error) {
        options.errorHandler.tryRecover(error)
      }
    })
  }
  return ad
}
