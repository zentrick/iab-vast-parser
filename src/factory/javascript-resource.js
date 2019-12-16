import { JavaScriptResource } from 'iab-vast-model'

export default ($javascriptResource) => {
  const res = new JavaScriptResource()
  res.apiFramework = $javascriptResource.apiFramework
  res.uri = $javascriptResource._value
  return res
}
