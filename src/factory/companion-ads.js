import { CompanionAds } from 'iab-vast-model'
import createCompanion from './companion'

export default ($creative) => {
  const $companionAds = $creative.companionAds
  const companionAds = new CompanionAds()
  companionAds.required = $companionAds.required
  if ($companionAds.companion != null) {
    companionAds.companions.push(...$companionAds.companion.map(createCompanion))
  }
  companionAds.xmlElement = $companionAds._value
  return companionAds
}
