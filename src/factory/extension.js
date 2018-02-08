import {Extension} from 'iab-vast-model'

export default ($extension) => {
  // console.log($extension)
  const extension = new Extension()
  extension.type = $extension.type
  extension.xmlElement = $extension._value
  return extension
}
