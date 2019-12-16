import { FlashResource } from 'iab-vast-model'

export default ($flashResource) => {
  const res = new FlashResource()
  res.apiFramework = $flashResource.apiFramework
  res.uri = $flashResource._value
  return res
}
