import { ViewableImpression } from 'iab-vast-model'

export default ($viewableImpression) => {
  const viewableImpression = new ViewableImpression()
  viewableImpression.id = $viewableImpression.id
  if ($viewableImpression.viewable != null) {
    viewableImpression.viewables
      .push(...$viewableImpression.viewable.map(imp => imp._value))
  }
  if ($viewableImpression.notViewable != null) {
    viewableImpression.notViewables
      .push(...$viewableImpression.notViewable.map(imp => imp._value))
  }
  if ($viewableImpression.viewUndetermined != null) {
    viewableImpression.viewUndetermineds
      .push(...$viewableImpression.viewUndetermined.map(imp => imp._value))
  }
  return viewableImpression
}
