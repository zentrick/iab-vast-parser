import {VAST, AdPod} from 'iab-vast-model'
import createAd from './ad'

const createPod = ($vast, vast, options) => {
  const podAds = $vast.ad
    .filter($ad => typeof $ad.sequence !== 'undefined')
    .map($ad => createAd($ad, options))
  if (podAds.length > 0) {
    vast.adPod = new AdPod()
    for (let i = 0; i < podAds.length; i++) {
      vast.adPod.ads.add(podAds[i])
    }
  }
}

const createBuffet = ($vast, vast, options) => {
  const buffetAds = $vast.ad
    .filter($ad => typeof $ad.sequence === 'undefined')
    .map($ad => createAd($ad, options))
  if (buffetAds.length > 0) {
    for (let i = 0; i < buffetAds.length; i++) {
      vast.ads.add(buffetAds[i])
    }
  }
}

export default ($vast, options) => {
  const vast = new VAST()
  vast.version = $vast.version
  if ($vast.ad && $vast.ad.length > 0) {
    try {
      createPod($vast, vast, options)
      createBuffet($vast, vast, options)
    } catch (err) {
      options.errorHandler(err)
    }
  }
  return vast
}
