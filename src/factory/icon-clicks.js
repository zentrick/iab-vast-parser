import {IconClicks} from 'iab-vast-model'
import createClick from './click'
import hasValue from '../util/has-value'

export default ($iconClicks) => {
  const iconClicks = new IconClicks()
  if ($iconClicks.iconClickThrough && hasValue($iconClicks.iconClickThrough)) {
    iconClicks.iconClickThrough = createClick($iconClicks.iconClickThrough)
  }
  if ($iconClicks.iconClickTracking) {
    iconClicks.iconClickTracking.push(
      ...$iconClicks.iconClickTracking
        .filter(hasValue)
        .map(createClick))
  }
  return iconClicks
}
