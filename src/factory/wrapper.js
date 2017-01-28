import {Wrapper} from 'iab-vast-model'
import inheritAd from '../inherit/ad'

export default ($ad, options) => {
  const wrapper = new Wrapper()
  const $wrapper = $ad.wrapper
  inheritAd($ad, $wrapper, wrapper, options)
  wrapper.vastAdTagURI = ($wrapper.vastAdTagURI != null)
    ? $wrapper.vastAdTagURI._value
    : null
  wrapper.followAdditionalWrappers = !!$wrapper.followAdditionalWrappers
  wrapper.allowMultipleAds = !!$wrapper.allowMultipleAds
  wrapper.fallbackOnNoAd = !!$wrapper.fallbackOnNoAd
  return wrapper
}
