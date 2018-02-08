import {ViewableImpression} from 'iab-vast-model'

export default ($viewableImpression) => {
  const viewableImpression = new ViewableImpression()
  viewableImpression.id = $viewableImpression.id
  if ($viewableImpression.viewable != null) {
    viewableImpression.viewables.push(...$viewableImpression.viewable.map(i => i._value))
  }
  if ($viewableImpression.notViewable != null) {
    viewableImpression.notViewables.push(...$viewableImpression.notViewable.map(i => i._value))
  }
  if ($viewableImpression.viewUndetermined != null) {
    viewableImpression.viewUndetermined.push(...$viewableImpression.viewUndetermined.map(i => i._value))
  }
  return viewableImpression
}
