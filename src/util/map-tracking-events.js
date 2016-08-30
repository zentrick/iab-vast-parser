import {TrackingEvent} from 'iab-vast-model'
import createTimeOffset from '../factory/time-offset'
import isNonEmptyString from './is-non-empty-string'

export default ($trackingEvents, trackingEvents) => {
  if ($trackingEvents == null || !Array.isArray($trackingEvents.tracking)) {
    return
  }
  for (const $tracking of $trackingEvents.tracking) {
    if (!isNonEmptyString($tracking._value)) {
      continue
    }
    const conf = new TrackingEvent()
    conf.uri = $tracking._value
    if ($tracking.event === 'progress' && isNonEmptyString($tracking.offset)) {
      conf.offset = createTimeOffset($tracking.offset)
    }
    trackingEvents.add($tracking.event, conf)
  }
}
