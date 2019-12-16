import { Linear, VideoClicks, TrackingEvents } from 'iab-vast-model'
import createMediaFile from './media-file'
import createInteractiveMediaFile from './interactive-creative-file'
import createIcon from './icon'
import createClick from './click'
import createTimeOffset from './time-offset'
import mapTrackingEvents from '../util/map-tracking-events'
import isNonEmptyString from '../util/is-non-empty-string'
import isNonEmptyArray from '../util/is-non-empty-array'
import hasValue from '../util/has-value'

const mapVideoClicks = ($videoClicks, videoClicks) => {
  if ($videoClicks.clickThrough != null && hasValue($videoClicks.clickThrough)) {
    videoClicks.clickThrough = createClick($videoClicks.clickThrough)
  }
  if ($videoClicks.clickTracking != null) {
    videoClicks.clickTrackings.push(
      ...$videoClicks.clickTracking
        .filter(hasValue)
        .map(createClick))
  }
  if ($videoClicks.customClick != null) {
    videoClicks.customClicks.push(
      ...$videoClicks.customClick
        .filter(hasValue)
        .map(createClick))
  }
}

export default ($creative, options) => {
  const $linear = $creative.linear
  const linear = new Linear()
  if (isNonEmptyString($linear.skipoffset)) {
    linear.skipoffset = createTimeOffset($linear.skipoffset, options)
  }
  if ($linear.duration != null) {
    linear.duration = $linear.duration._value
  }
  if ($linear.mediaFiles != null) {
    if ($linear.mediaFiles.mezzanine != null) {
      linear.mezzanine = $linear.mediaFiles.mezzanine._value
    }
    if ($linear.mediaFiles.mediaFile != null) {
      linear.mediaFiles
        .push(...$linear.mediaFiles.mediaFile.map(createMediaFile))
    }
    if ($linear.mediaFiles.interactiveCreativeFile != null) {
      linear.interactiveCreativeFiles
        .push(...$linear.mediaFiles.interactiveCreativeFile.map(createInteractiveMediaFile))
    }
  }
  if ($linear.adParameters != null) {
    linear.adParameters = $linear.adParameters._value
  }
  if ($linear.videoClicks != null) {
    linear.videoClicks = new VideoClicks()
    mapVideoClicks($linear.videoClicks, linear.videoClicks)
  }
  if ($linear.trackingEvents != null && isNonEmptyArray($linear.trackingEvents.tracking)) {
    linear.trackingEvents = new TrackingEvents()
    mapTrackingEvents($linear.trackingEvents, linear.trackingEvents, options)
  }
  if ($linear.icons != null && $linear.icons.icon) {
    linear.icons.push(...$linear.icons.icon.map(createIcon))
  }
  return linear
}
