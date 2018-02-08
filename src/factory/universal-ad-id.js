export default (universalAdId, $universalAdId) => {
  if ($universalAdId.idRegistry) {
    universalAdId.idRegistry = $universalAdId.idRegistry
  }
  if ($universalAdId.idValue) {
    universalAdId.idValue = $universalAdId.idValue
  }
  universalAdId.creativeIdentifier = $universalAdId._value
}
