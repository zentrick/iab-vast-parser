import { InLine } from 'iab-vast-model'
import inheritAd from '../inherit/ad'
import createCategory from './category'
import createSurvey from './survey'

export default ($ad, options) => {
  const inLine = new InLine()
  const $inLine = $ad.inLine
  inheritAd($ad, $inLine, inLine, options)
  inLine.adTitle = ($inLine.adTitle != null) ? $inLine.adTitle._value : null
  if ($inLine.category != null) {
    inLine.categories.push(...$inLine.category
      .filter(c => c.authority != null) // Ignores declarations such as <Category/>.
      .map(createCategory))
  }
  inLine.description = ($inLine.description != null) ? $inLine.description._value : null
  inLine.advertiser = ($inLine.advertiser != null) ? $inLine.advertiser._value : null
  if ($inLine.survey != null) {
    inLine.surveys.push(...$inLine.survey
      .filter(s => s._value.length > 0)
      .map(createSurvey))
  }
  return inLine
}
