export default ($trackingEvents, trackingEvents) => {
  if ($trackingEvents != null && Array.isArray($trackingEvents.tracking)) {
    for (const $tracking of $trackingEvents.tracking) {
      trackingEvents.add($tracking.event, $tracking._value)
    }
  }
}
