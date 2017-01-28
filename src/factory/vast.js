import {VAST, AdPod} from 'iab-vast-model'
import createAd from './ad'

const createPod = ($ads, options) => {
  const pod = new AdPod()
  for (const $ad of $ads) {
    try {
      const createdAd = createAd($ad, options)
      pod.ads.add(createdAd)
    } catch (err) {
      options.errorHandler(err)
    }
  }
  return pod
}

export default ($vast, options) => {
  const vast = new VAST()
  vast.version = $vast.version
  if ($vast.ad && $vast.ad.length > 0) {
    if ($vast.ad.length > 1) {
      vast.adPod = createPod($vast.ad, options)
    } else {
      try {
        const createdAd = createAd($vast.ad[0], options)
        vast.ads.add(createdAd)
      } catch (err) {
        options.errorHandler(err)
      }
    }
  }
  return vast
}
