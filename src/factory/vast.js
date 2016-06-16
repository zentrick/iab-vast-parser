import {VAST, AdPod} from 'iab-vast-model'
import createAd from './ad'

const createPod = ($ads) => {
  const pod = new AdPod()
  for (const ad of $ads.map(createAd)) {
    pod.ads.add(ad)
  }
  return pod
}

export default ($vast) => {
  const vast = new VAST()
  vast.version = $vast.version
  if ($vast.ad && $vast.ad.length > 0) {
    if ($vast.ad.length > 1) {
      vast.adPod = createPod($vast.ad)
    } else {
      vast.ads.add(createAd($vast.ad[0]))
    }
  }
  return vast
}
