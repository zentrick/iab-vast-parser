import { AdSystem } from 'iab-vast-model'

export default ($adSystem) => {
  const adSystem = new AdSystem()
  adSystem.version = $adSystem.version
  adSystem.name = $adSystem._value
  return adSystem
}
