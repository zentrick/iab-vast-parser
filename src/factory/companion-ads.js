import {CompanionAds} from 'iab-vast-model'
import createCompanion from './companion'
import inheritCreative from '../inherit/creative'

export default ($creative) => {
  const $companionAds = $creative.companionAds
  const companionAds = new CompanionAds()
  inheritCreative($creative, companionAds)
  companionAds.required = $companionAds.required
  if ($companionAds.companion) {
    companionAds.companions.push(...$companionAds.companion.map(createCompanion))
  }
  return companionAds
}
