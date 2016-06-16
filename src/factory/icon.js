import {Icon} from 'iab-vast-model'
import createResource from './resource'
import createClick from './click'

export default ($icon) => {
  const icon = new Icon()
  icon.program = $icon.program
  icon.width = $icon.width
  icon.height = $icon.height
  icon.xPosition = $icon.xPosition
  icon.yPosition = $icon.yPosition
  icon.duration = $icon.Duration
  icon.offset = $icon.offset
  icon.apiFramework = $icon.apiFramework
  icon.resource = createResource($icon)
  if ($icon.iconClicks) {
    if ($icon.iconClicks.iconClickThrough) {
      icon.clicks.clickThrough = createClick($icon.iconClicks.iconClickThrough)
    }
    if ($icon.iconClicks.iconClickTracking) {
      icon.clicks.clickTrackings.push(...$icon.iconClicks.iconClickTracking.map(createClick))
    }
  }
  if ($icon.iconViewTracking) {
    icon.viewTrackings.push(...$icon.iconViewTracking.map(createClick))
  }
  return icon
}
