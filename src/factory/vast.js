import {VAST} from 'iab-vast-model'
import createAd from './ad'

const createPod = ($vast, vast, options) => {
  const podAds = $vast.ad
    .filter($ad => typeof $ad.sequence !== 'undefined')
    .map($ad => createAd($ad, vast, options))

  podAds.forEach(podAd => vast.adPod.add(podAd))
}

const createBuffet = ($vast, vast, options) => {
  const buffetAds = $vast.ad
    .filter($ad => typeof $ad.sequence === 'undefined')
    .map($ad => createAd($ad, vast, options))

  buffetAds.forEach(buffetAd => vast.adBuffet.add(buffetAd))
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
