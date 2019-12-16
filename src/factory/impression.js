import { Impression } from 'iab-vast-model'

export default ($impression) => {
  const impression = new Impression()
  impression.id = $impression.id
  impression.uri = $impression._value
  return impression
}
