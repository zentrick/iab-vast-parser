import {Extension} from 'iab-vast-model'

export default ($extension) => {
  const extension = new Extension()
  extension.type = $extension.type
  extension.content = $extension._value
  return extension
}
