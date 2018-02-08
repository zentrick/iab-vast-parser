import {Companion, TrackingEvents} from 'iab-vast-model'
import createClick from './click'
import createResource from './resource'
import mapTrackingEvents from '../util/map-tracking-events'
import isNonEmptyArray from '../util/is-non-empty-array'
import hasValue from '../util/has-value'

export default ($companion) => {
  const companion = new Companion()
  companion.id = $companion.id
  companion.width = $companion.width
  companion.height = $companion.height
  companion.assetWidth = $companion.assetWidth
  companion.assetHeight = $companion.assetHeight
  companion.expandedWidth = $companion.expandedWidth
  companion.expandedHeight = $companion.expandedHeight
  companion.apiFramework = $companion.apiFramework
  companion.adSlotID = $companion.adSlotID
  companion.pxratio = $companion.pxratio
  companion.resource = createResource($companion)
  if ($companion.adParameters && hasValue($companion.adParameters)) {
    companion.adParameters = $companion.adParameters._value
  }
  if ($companion.altText && hasValue($companion.altText._value)) {
    companion.altText = $companion.altText._value
  }
  if ($companion.companionClickThrough && hasValue($companion.companionClickThrough)) {
    companion.companionClickThrough = createClick($companion.companionClickThrough)
  }
  if ($companion.companionClickTracking) {
    companion.companionClickTracking.push(
      ...$companion.companionClickTracking
      .filter(hasValue)
      .map(createClick))
  }
  if ($companion.trackingEvents && isNonEmptyArray($companion.trackingEvents.tracking)) {
    companion.trackingEvents = new TrackingEvents()
    mapTrackingEvents($companion.trackingEvents, companion.trackingEvents)
  }
  return companion
}
