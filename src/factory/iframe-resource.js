import {IFrameResource} from 'iab-vast-model'

export default ($iFrameResource) => {
  const res = new IFrameResource()
  res.content = $iFrameResource._value
  return res
}
