import {Icon} from 'iab-vast-model'
import createResource from './resource'
import createClick from './click'
import hasValue from '../util/has-value'

export default ($icon) => {
  const icon = new Icon()
  icon.program = $icon.program
  icon.width = $icon.width
  icon.height = $icon.height
  icon.xPosition = $icon.xPosition
  icon.yPosition = $icon.yPosition
  icon.duration = $icon.duration
  icon.offset = $icon.offset
  icon.apiFramework = $icon.apiFramework
  icon.resource = createResource($icon)
  if ($icon.iconClicks) {
    if ($icon.iconClicks.iconClickThrough && hasValue($icon.iconClicks.iconClickThrough)) {
      icon.clicks.clickThrough = createClick($icon.iconClicks.iconClickThrough)
    }
    if ($icon.iconClicks.iconClickTracking) {
      icon.clicks.clickTrackings.push(
        ...$icon.iconClicks.iconClickTracking
        .filter(hasValue)
        .map(createClick))
    }
  }
  if ($icon.iconViewTracking) {
    icon.viewTrackings.push(
      ...$icon.iconViewTracking
      .filter(hasValue)
      .map(createClick))
  }
  return icon
}
