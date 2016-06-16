import createLinear from './linear'
import createNonLinearAds from './non-linear-ads'
import createCompanionAds from './companion-ads'

export default ($creative) => {
  if ($creative.linear) {
    return createLinear($creative)
  } else if ($creative.nonLinearAds) {
    return createNonLinearAds($creative)
  } else if ($creative.companionAds) {
    return createCompanionAds($creative)
  } else {
    throw new Error('Unrecognized creative type')
  }
}
