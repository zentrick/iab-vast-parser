import { IFrameResource } from 'iab-vast-model'

export default ($iFrameResource) => {
  const res = new IFrameResource()
  res.uri = $iFrameResource._value
  return res
}
