import {TrackingEvent} from 'iab-vast-model'
import createTimeOffset from '../factory/time-offset'

export default ($trackingEvents, trackingEvents) => {
  if ($trackingEvents != null && Array.isArray($trackingEvents.tracking)) {
    for (const $tracking of $trackingEvents.tracking) {
      const conf = new TrackingEvent()
      conf.uri = $tracking._value
      if ($tracking.event === 'progress' &&
          typeof $tracking.offset === 'string' && $tracking.offset.length > 0) {
        conf.offset = createTimeOffset($tracking.offset)
      }
      trackingEvents.add($tracking.event, conf)
    }
  }
}
