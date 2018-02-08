import {Creative} from 'iab-vast-model'
import setUniversalAdId from '../factory/universal-ad-id'
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
  if ($creative.universalAdId) {
    setUniversalAdId(creative.universalAdId, $creative.universalAdId)
  }
  if ($creative.creativeExtensions && $creative.creativeExtensions.creativeExtension) {
    creative.creativeExtensions
      .push(...$creative.creativeExtensions.creativeExtension.map(createCreativeExtension))
  }
  if ($creative.linear) {
    creative.linear = createLinear($creative, options)
  } else if ($creative.nonLinearAds) {
    creative.nonLinearAds = createNonLinearAds($creative)
  } else if ($creative.companionAds) {
    creative.companionAds = createCompanionAds($creative)
  } else {
    throw new Error('Unrecognized creative type')
  }
  return creative
}
