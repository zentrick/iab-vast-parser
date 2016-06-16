import Unmarshaler from './xml/unmarshaler'
import schema from './vast/schema'
import createVAST from './factory/vast'

const toElement = (xml, options) => {
  if (typeof xml === 'string') {
    const domParser = options.domParser || new DOMParser()
    xml = domParser.parseFromString(xml, 'text/xml')
  }
  if (xml.documentElement != null) {
    xml = xml.documentElement
  }
  return xml
}

export default (xml, options = {}) => {
  const elem = toElement(xml, options)
  const unmarshaler = new Unmarshaler(schema)
  const root = unmarshaler.unmarshal(elem)
  return createVAST(root)
}
