import { Pricing } from 'iab-vast-model'

export default ($pricing) => {
  const pricing = new Pricing()
  pricing.model = $pricing.model
  pricing.currency = $pricing.currency
  pricing.value = $pricing._value
  return pricing
}
