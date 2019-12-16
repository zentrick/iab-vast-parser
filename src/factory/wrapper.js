import { Wrapper } from 'iab-vast-model'
import inheritAd from '../inherit/ad'

export default ($ad, options) => {
  const wrapper = new Wrapper()
  const $wrapper = $ad.wrapper
  inheritAd($ad, $wrapper, wrapper, options)
  if ($wrapper.followAdditionalWrappers != null) {
    wrapper.followAdditionalWrappers = $wrapper.followAdditionalWrappers
  }
  if ($wrapper.allowMultipleAds != null) {
    wrapper.allowMultipleAds = $wrapper.allowMultipleAds
  }
  wrapper.fallbackOnNoAd = $wrapper.fallbackOnNoAd
  wrapper.vastAdTagURI = ($wrapper.vastAdTagURI != null)
    ? $wrapper.vastAdTagURI._value
    : null
  return wrapper
}
