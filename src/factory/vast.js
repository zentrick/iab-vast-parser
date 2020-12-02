import { VAST, AdPod } from 'iab-vast-model'
import createAd from './ad'

const triageAds = ($$ads) => {
  const $$adsWithSequence = []
  const $$adsWithoutSequence = []
  for (let i = 0; i < $$ads.length; ++i) {
    const $ad = $$ads[i]
    if (typeof $ad.sequence !== 'undefined') {
      $$adsWithSequence.push($ad)
    } else {
      $$adsWithoutSequence.push($ad)
    }
  }
  return [$$adsWithSequence, $$adsWithoutSequence]
}

export default ($vast, options) => {
  const vast = new VAST()
  vast.version = $vast.version
  vast.errors.push(...$vast.error
    .map((err) => err._value)
    .filter((uri) => (uri !== '')))
  const [$$adsWithSequence, $$adsWithoutSequence] = triageAds($vast.ad)
  if ($$adsWithSequence.length > 0) {
    if (options.noSingleAdPods &&
        $vast.ad.length === 1 && $$adsWithSequence.length === 1) {
      $$adsWithoutSequence.push($$adsWithSequence[0])
    } else {
      vast.adPod = new AdPod()
      for (let i = 0; i < $$adsWithSequence.length; i++) {
        vast.adPod.ads.add(createAd($$adsWithSequence[i], options))
      }
    }
  }
  for (let i = 0; i < $$adsWithoutSequence.length; i++) {
    vast.ads.add(createAd($$adsWithoutSequence[i], options))
  }
  return vast
}
