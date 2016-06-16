import {HTMLResource} from 'iab-vast-model'

export default ($htmlResource) => {
  const res = new HTMLResource()
  res.content = $htmlResource._value
  return res
}
