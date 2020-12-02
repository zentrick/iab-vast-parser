import { Creative } from 'iab-vast-model'
import createUniversalAdId from '../factory/universal-ad-id'
import createCreativeExtension from '../factory/creative-extension'
import createLinear from './linear'
import createNonLinearAds from './non-linear-ads'
import createCompanionAds from './companion-ads'

export default ($creative, options) => {
  const creative = new Creative()
  creative.id = $creative.id
  creative.sequence = $creative.sequence
  // VAST3 XSD specifies AdID and that seems to be what parsers have agreed on
  creative.adID = $creative.AdID || $creative.adID || $creative.adId
  creative.apiFramework = $creative.apiFramework
  if ($creative.universalAdId != null) {
    creative.universalAdId = createUniversalAdId($creative.universalAdId)
  }
  if ($creative.creativeExtensions != null && $creative.creativeExtensions.creativeExtension) {
    creative.extensions
      .push(...$creative.creativeExtensions.creativeExtension.map(createCreativeExtension))
  }
  if ($creative.linear != null) {
    creative.linear = createLinear($creative, options)
  } else if ($creative.nonLinearAds != null) {
    creative.nonLinearAds = createNonLinearAds($creative)
  }
  if ($creative.companionAds != null) {
    creative.companionAds = createCompanionAds($creative)
  }
  if (creative.linear == null && creative.nonLinearAds == null &&
      creative.companionAds == null) {
    options.errorHandler.tryRecover('Creative has no ads')
  }
  return creative
}
