import {NonLinear} from 'iab-vast-model'
import createResource from './resource'
import createClick from './click'
import hasValue from '../util/has-value'

export default ($nonLinear) => {
  const nonLinear = new NonLinear()
  nonLinear.id = $nonLinear.id
  nonLinear.width = $nonLinear.width
  nonLinear.height = $nonLinear.height
  nonLinear.expandedWidth = $nonLinear.expandedWidth
  nonLinear.expandedHeight = $nonLinear.expandedHeight
  nonLinear.scalable = $nonLinear.scalable
  nonLinear.maintainAspectRatio = $nonLinear.maintainAspectRatio
  nonLinear.minSuggestedDuration = $nonLinear.minSuggestedDuration
  nonLinear.apiFramework = $nonLinear.apiFramework
  nonLinear.resource = createResource($nonLinear)
  if ($nonLinear.nonLinearClickThrough && hasValue($nonLinear.nonLinearClickThrough)) {
    nonLinear.clickThrough = createClick($nonLinear.nonLinearClickThrough)
  }
  if ($nonLinear.nonLinearClickTracking) {
    nonLinear.clickTrackings.push(
      ...$nonLinear.nonLinearClickTracking
      .filter(hasValue)
      .map(createClick))
  }
  if ($nonLinear.adParameters) {
    nonLinear.adParameters = $nonLinear.adParameters._value
  }
  return nonLinear
}
