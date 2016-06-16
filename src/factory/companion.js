import {Companion} from 'iab-vast-model'
import createClick from './click'
import createResource from './resource'
import mapTrackingEvents from '../util/map-tracking-events'

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
  companion.resource = createResource($companion)
  if ($companion.adParameters) {
    companion.adParameters = $companion.adParameters._value
  }
  if ($companion.altText) {
    companion.altText = $companion.altText._value
  }
  if ($companion.companionClickThrough) {
    companion.clickThrough = createClick($companion.companionClickThrough)
  }
  if ($companion.companionClickTracking) {
    companion.clickTrackings.push(...$companion.companionClickTracking.map(createClick))
  }
  mapTrackingEvents($companion.trackingEvents, companion.trackingEvents)
  return companion
}
