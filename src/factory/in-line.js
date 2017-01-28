import {InLine} from 'iab-vast-model'
import inheritAd from '../inherit/ad'
import createPricing from './pricing'

export default ($ad, options) => {
  const inLine = new InLine()
  const $inLine = $ad.inLine
  inheritAd($ad, $inLine, inLine, options)
  inLine.adTitle = ($inLine.adTitle != null) ? $inLine.adTitle._value : null
  inLine.description = ($inLine.description != null) ? $inLine.description._value : null
  inLine.advertiser = ($inLine.advertiser != null) ? $inLine.advertiser._value : null
  inLine.survey = ($inLine.survey != null) ? $inLine.survey._value : null
  if ($inLine.pricing) {
    inLine.pricing = createPricing($inLine.pricing)
  }
  return inLine
}
