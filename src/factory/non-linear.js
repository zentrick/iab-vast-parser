import {NonLinear} from 'iab-vast-model'
import createResource from './resource'
import createClick from './click'

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
  if ($nonLinear.nonLinearClickThrough) {
    nonLinear.clickThrough = createClick($nonLinear.nonLinearClickThrough)
  }
  if ($nonLinear.nonLinearClickTracking) {
    nonLinear.clickTrackings.push(...$nonLinear.nonLinearClickTracking.map(createClick))
  }
  if ($nonLinear.adParameters) {
    nonLinear.adParameters = $nonLinear.adParameters._value
  }
  return nonLinear
}
