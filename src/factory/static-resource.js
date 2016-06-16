import {StaticResource} from 'iab-vast-model'

export default ($staticResource) => {
  const res = new StaticResource()
  res.creativeType = $staticResource.creativeType
  res.content = $staticResource._value
  return res
}
