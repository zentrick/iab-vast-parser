import { TrackingEvent } from 'iab-vast-model'
import createTimeOffset from '../factory/time-offset'
import isNonEmptyString from './is-non-empty-string'

export default ($trackingEvents, trackingEvents, options) => {
  if ($trackingEvents == null || !Array.isArray($trackingEvents.tracking)) {
    return
  }
  for (const $tracking of $trackingEvents.tracking) {
    if (!isNonEmptyString($tracking._value)) {
      continue
    }
    const conf = new TrackingEvent()
    conf.uri = $tracking._value
    // VAST 3.0: 'offset' attribute is available for 'progress' events only.
    // VAST 4.0: 'offset' attribute is available when <Linear> is the parent.
    if (isNonEmptyString($tracking.offset)) {
      try {
        conf.offset = createTimeOffset($tracking.offset)
      } catch (error) {
        options.errorHandler.tryRecover(error)
      }
    }
    trackingEvents.add($tracking.event, conf)
  }
}
