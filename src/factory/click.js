import { Click } from 'iab-vast-model'

export default ($click) => {
  const click = new Click()
  click.id = $click.id
  click.uri = $click._value
  return click
}
