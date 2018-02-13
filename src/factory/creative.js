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
  if ($creative.universalAdId != null) {
    setUniversalAdId(creative.universalAdId, $creative.universalAdId)
  }
  if ($creative.creativeExtensions != null && $creative.creativeExtensions.creativeExtension) {
    creative.creativeExtensions
      .push(...$creative.creativeExtensions.creativeExtension.map(createCreativeExtension))
  }
  if ($creative.linear != null) {
    creative.creativeAds.push(createLinear($creative, options))
  } else if ($creative.nonLinearAds != null) {
    creative.creativeAds.push(createNonLinearAds($creative))
  }
  if ($creative.companionAds != null) {
    creative.creativeAds.push(createCompanionAds($creative))
  }
  if (creative.creativeAds.length === 0) {
    throw new Error('Unrecognized or missing creative ad')
  }
  return creative
}
