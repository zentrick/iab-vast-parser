import { Icon } from 'iab-vast-model'
import createResource from './resource'
import createClick from './click'
import createIconClicks from './icon-clicks'
import hasValue from '../util/has-value'
import isNonEmptyArray from '../util/is-non-empty-array'

const parsePosition = (str, allowed) => (str == null) ? str
  : (allowed.indexOf(str) < 0) ? parseInt(str, 0)
    : str

export default ($icon) => {
  const icon = new Icon()
  icon.program = $icon.program
  icon.width = $icon.width
  icon.height = $icon.height
  icon.xPosition = parsePosition($icon.xPosition, ['left', 'right'])
  icon.yPosition = parsePosition($icon.yPosition, ['top', 'bottom'])
  icon.duration = $icon.duration
  icon.offset = $icon.offset
  icon.apiFramework = $icon.apiFramework
  icon.pxratio = $icon.pxratio
  icon.resources = createResource($icon)
  if ($icon.iconClicks != null &&
      (hasValue($icon.iconClicks.iconClickThrough) ||
        isNonEmptyArray($icon.iconClicks.iconClickTracking))) {
    icon.clicks = createIconClicks($icon.iconClicks)
  }
  if ($icon.iconViewTracking != null) {
    icon.viewTrackings.push(
      ...$icon.iconViewTracking
        .filter(hasValue)
        .map(createClick))
  }
  return icon
}
