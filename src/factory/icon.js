import {Icon} from 'iab-vast-model'
import createResource from './resource'
import createClick from './click'
import createIconClicks from './icon-clicks'
import hasValue from '../util/has-value'
import isNonEmptyArray from '../util/is-non-empty-array'

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
  icon.pxratio = $icon.pxratio
  icon.resources = createResource($icon)
  if ($icon.iconClicks != null &&
      (hasValue($icon.iconClicks.iconClickThrough) ||
        isNonEmptyArray($icon.iconClicks.iconClickTracking))) {
    icon.iconClicks = createIconClicks($icon.iconClicks)
  }
  if ($icon.iconViewTracking != null) {
    icon.viewTrackings.push(
      ...$icon.iconViewTracking
      .filter(hasValue)
      .map(createClick))
  }
  return icon
}
