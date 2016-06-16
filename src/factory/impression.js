import {Impression} from 'iab-vast-model'

export default ($impression) => {
  const impression = new Impression()
  if ($impression._value) {
    impression.id = $impression.id
    impression.uri = $impression._value
  } else {
    impression.uri = $impression
  }
  return impression
}
