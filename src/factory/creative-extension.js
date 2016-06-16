import {CreativeExtension} from 'iab-vast-model'

export default ($creativeExtension) => {
  const creativeExtension = new CreativeExtension()
  creativeExtension.type = $creativeExtension.type
  creativeExtension.content = $creativeExtension._value
  return creativeExtension
}
