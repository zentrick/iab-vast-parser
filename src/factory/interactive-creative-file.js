import { InteractiveCreativeFile } from 'iab-vast-model'

export default ($interactiveCreativeFile) => {
  const interactiveCreativeFile = new InteractiveCreativeFile()
  interactiveCreativeFile.type = $interactiveCreativeFile.type
  interactiveCreativeFile.apiFramework = $interactiveCreativeFile.apiFramework
  interactiveCreativeFile.uri = $interactiveCreativeFile._value
  return interactiveCreativeFile
}
