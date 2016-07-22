import {TrackingEvents, SortedList} from 'iab-vast-model'
import {XMLSerializer} from 'xmldom'
import normalizeNewline from 'normalize-newline'

const getPropertyNames = (proto) => {
  const props = Object.create(null)
  while (proto != null && proto !== Object.prototype) {
    const protoProps = Object.getOwnPropertyNames(proto)
      .filter((prop) => Object.getOwnPropertyDescriptor(proto, prop).get)
    for (const prop of protoProps) {
      props[prop] = true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return Object.keys(props)
}

const marshalObject = (obj) => {
  const result = Object.create(null)
  const props = getPropertyNames(Object.getPrototypeOf(obj))
    .filter((name) => (name !== '$type'))
  for (const prop of props) {
    const value = obj[prop]
    if (value != null) {
      result[prop] = marshalAny(value)
    }
  }
  if (obj.constructor != null) {
    result._type = obj.constructor.name
  }
  return result
}

const marshalSortedList = (sortedList) => {
  const result = Object.create(null)
  result._type = 'SortedList'
  result._value = sortedList.toArray().map(marshalAny)
  return result
}

const marshalTrackingEvents = (trackingEvents) => {
  const result = Object.create(null)
  result._type = 'TrackingEvents'
  result._value = Object.create(null)
  for (const type of trackingEvents.types) {
    result._value[type] = marshalAny(trackingEvents.get(type))
  }
  return result
}

const marshalElement = (elem) => {
  return normalizeNewline(new XMLSerializer().serializeToString(elem))
}

const marshalAny = (obj) => {
  return (obj == null) ? null
    : (typeof obj === 'string') ? normalizeNewline(obj)
    : (typeof obj !== 'object') ? obj
    : (obj instanceof SortedList) ? marshalSortedList(obj)
    : (obj instanceof TrackingEvents) ? marshalTrackingEvents(obj)
    : (obj.nodeName != null) ? marshalElement(obj)
    : Array.isArray(obj) ? obj.map(marshalAny)
    : marshalObject(obj)
}

export default marshalAny
