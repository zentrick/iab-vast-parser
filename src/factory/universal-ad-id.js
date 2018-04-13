import { UniversalAdId } from 'iab-vast-model'

export default ($universalAdId) => {
  const universalAdId = new UniversalAdId()
  if ($universalAdId.idRegistry != null) {
    universalAdId.idRegistry = $universalAdId.idRegistry
  }
  if ($universalAdId.idValue != null) {
    universalAdId.idValue = $universalAdId.idValue
  }
  universalAdId.creativeIdentifier = $universalAdId._value
  return universalAdId
}
