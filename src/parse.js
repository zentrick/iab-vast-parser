import Unmarshaler from './xml/unmarshaler'
import schema from './vast/schema'
import createVAST from './factory/vast'
import strictHandler from './errors/strict'
import looseHandler from './errors/loose'

const DEFAULT_OPTIONS = {
  strict: false,
  noSingleAdPods: false
}

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
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  options.errorHandler = options.strict ? strictHandler : looseHandler
  const elem = toElement(xml, options)
  const unmarshaler = new Unmarshaler(schema)
  const root = unmarshaler.unmarshal(elem)
  return createVAST(root, options)
}
