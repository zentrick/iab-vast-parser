import { StaticResource } from 'iab-vast-model'

export default ($staticResource) => {
  const res = new StaticResource()
  res.creativeType = $staticResource.creativeType
  res.uri = $staticResource._value
  return res
}
