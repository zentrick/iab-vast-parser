import { IconClicks } from 'iab-vast-model'
import createClick from './click'
import hasValue from '../util/has-value'

export default ($iconClicks) => {
  const iconClicks = new IconClicks()
  if ($iconClicks.iconClickThrough != null && hasValue($iconClicks.iconClickThrough)) {
    iconClicks.clickThrough = createClick($iconClicks.iconClickThrough)
  }
  if ($iconClicks.iconClickTracking != null) {
    iconClicks.clickTrackings.push(
      ...$iconClicks.iconClickTracking
        .filter(hasValue)
        .map(createClick))
  }
  return iconClicks
}
