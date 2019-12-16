import { MediaFile } from 'iab-vast-model'

export default ($mediaFile) => {
  const mediaFile = new MediaFile()
  mediaFile.id = $mediaFile.id
  mediaFile.delivery = $mediaFile.delivery
  mediaFile.type = $mediaFile.type
  mediaFile.bitrate = $mediaFile.bitrate
  mediaFile.minBitrate = $mediaFile.minBitrate
  mediaFile.maxBitrate = $mediaFile.maxBitrate
  mediaFile.width = $mediaFile.width
  mediaFile.height = $mediaFile.height
  mediaFile.scalable = $mediaFile.scalable
  mediaFile.maintainAspectRatio = $mediaFile.maintainAspectRatio
  mediaFile.codec = $mediaFile.codec
  mediaFile.apiFramework = $mediaFile.apiFramework
  mediaFile.uri = $mediaFile._value
  return mediaFile
}
