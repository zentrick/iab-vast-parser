export default (universalAdId, $universalAdId) => {
  if ($universalAdId.idRegistry != null) {
    universalAdId.idRegistry = $universalAdId.idRegistry
  }
  if ($universalAdId.idValue != null) {
    universalAdId.idValue = $universalAdId.idValue
  }
  universalAdId.creativeIdentifier = $universalAdId._value
}
