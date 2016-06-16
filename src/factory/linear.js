import {Linear} from 'iab-vast-model'
import createMediaFile from './media-file'
import createIcon from './icon'
import createClick from './click'
import createSkipoffset from './skipoffset'
import inheritCreative from '../inherit/creative'
import mapTrackingEvents from '../util/map-tracking-events'

const mapVideoClicks = ($videoClicks, videoClicks) => {
  if ($videoClicks.clickThrough) {
    videoClicks.clickThrough = createClick($videoClicks.clickThrough)
  }
  if ($videoClicks.clickTracking) {
    videoClicks.clickTrackings.push(...$videoClicks.clickTracking.map(createClick))
  }
  if ($videoClicks.customClick) {
    videoClicks.customClicks.push(...$videoClicks.customClick.map(createClick))
  }
}

export default ($creative) => {
  const $linear = $creative.linear
  const linear = new Linear()
  inheritCreative($creative, linear)
  if (typeof $linear.skipoffset === 'string' && $linear.skipoffset.length > 0) {
    linear.skipoffset = createSkipoffset($linear.skipoffset)
  }
  if ($linear.adParameters) {
    linear.adParameters = $linear.adParameters._value
  }
  if ($linear.duration) {
    linear.duration = $linear.duration._value
  }
  if ($linear.mediaFiles && $linear.mediaFiles.mediaFile) {
    linear.mediaFiles.push(...$linear.mediaFiles.mediaFile.map(createMediaFile))
  }
  mapTrackingEvents($linear.trackingEvents, linear.trackingEvents)
  if ($linear.videoClicks) {
    mapVideoClicks($linear.videoClicks, linear.videoClicks)
  }
  if ($linear.icons && $linear.icons.icon) {
    linear.icons.push(...$linear.icons.icon.map(createIcon))
  }
  return linear
}
