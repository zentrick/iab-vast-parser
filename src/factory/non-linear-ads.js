import {NonLinearAds} from 'iab-vast-model'
import createNonLinear from './non-linear'
import inheritCreative from '../inherit/creative'
import mapTrackingEvents from '../util/map-tracking-events'

export default ($creative) => {
  const $nonLinearAds = $creative.nonLinearAds
  const nonLinearAds = new NonLinearAds()
  inheritCreative($creative, nonLinearAds)
  if ($nonLinearAds.nonLinear) {
    nonLinearAds.nonLinears.push(...$nonLinearAds.nonLinear.map(createNonLinear))
  }
  mapTrackingEvents($nonLinearAds.trackingEvents, nonLinearAds.trackingEvents)
  return nonLinearAds
}
