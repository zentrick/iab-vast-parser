import {VAST} from 'iab-vast-model'
import createAd from './ad'

const isSingleAdPod = $vast => $vast.ad.length === 1 && $vast.ad[0].sequence !== 'undefined'

const createPod = ($vast, vast, options) => {
  if (!(options.noSingleAdPods && isSingleAdPod($vast))) {
    $vast.ad
      .filter($ad => typeof $ad.sequence !== 'undefined')
      .map($ad => createAd($ad, vast, options))
      .forEach(podAd => vast.adPod.add(podAd))
  }
}

const createBuffet = ($vast, vast, options) => {
  if (options.noSingleAdPods && isSingleAdPod($vast)) {
    const singlePodAd = createAd($vast.ad[0], vast, options)
    vast.adBuffet.add(singlePodAd)
  } else {
    $vast.ad
      .filter($ad => typeof $ad.sequence === 'undefined')
      .map($ad => createAd($ad, vast, options))
      .forEach(buffetAd => vast.adBuffet.add(buffetAd))
  }
}

const createVAST = ($vast, options) => {
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

export default ($vast, options) => {
  try {
    return createVAST($vast, options)
  } catch (err) {
    options.errorHandler(err)
  }
}
