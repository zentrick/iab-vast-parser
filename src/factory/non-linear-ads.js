import { NonLinearAds, TrackingEvents } from 'iab-vast-model'
import createNonLinear from './non-linear'
import mapTrackingEvents from '../util/map-tracking-events'
import isNonEmptyArray from '../util/is-non-empty-array'

export default ($creative) => {
  const $nonLinearAds = $creative.nonLinearAds
  const nonLinearAds = new NonLinearAds()
  if ($nonLinearAds.nonLinear != null) {
    nonLinearAds.nonLinears.push(...$nonLinearAds.nonLinear.map(createNonLinear))
  }
  if ($nonLinearAds.trackingEvents != null && isNonEmptyArray($nonLinearAds.trackingEvents.tracking)) {
    nonLinearAds.trackingEvents = new TrackingEvents()
    mapTrackingEvents($nonLinearAds.trackingEvents, nonLinearAds.trackingEvents)
  }
  return nonLinearAds
}
