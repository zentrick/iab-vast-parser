import {AdSystem} from 'iab-vast-model'
import createCreative from '../factory/creative'
import createExtension from '../factory/extension'
import createImpression from '../factory/impression'

export default ($ad, $impl, ad) => {
  ad.id = $ad.id
  ad.sequence = $ad.sequence
  if ($impl.adSystem) {
    ad.adSystem = new AdSystem()
    ad.adSystem.name = $impl.adSystem._value
    ad.adSystem.version = $impl.adSystem.version
  }
  if ($impl.impression) {
    ad.impressions.push(...$impl.impression.map(createImpression))
  }
  if ($impl.error) {
    ad.error = $impl.error._value
  }
  if ($impl.creatives && $impl.creatives.creative) {
    for (const creative of $impl.creatives.creative.map(createCreative)) {
      ad.creatives.add(creative)
    }
  }
  if ($impl.extensions && $impl.extensions.extension) {
    ad.extensions.push(...$impl.extensions.extension.map(createExtension))
  }
  return ad
}
