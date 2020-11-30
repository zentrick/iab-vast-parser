import Unmarshaler from './xml/unmarshaler'
import schema from './vast/schema'
import createVAST from './factory/vast'
import ErrorHandler from './errors/error-handler'

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
  if (xml.getElementsByTagName('parsererror').length > 0) {
    options.errorHandler.fail('XML parsing error', 100)
  }
  return xml
}

export default (xml, options = {}) => {
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  options.errorHandler = new ErrorHandler(options.strict)
  const element = toElement(xml, options)
  const unmarshaler = new Unmarshaler(schema)
  try {
    const root = unmarshaler.unmarshal(element)
    return createVAST(root, options)
  } catch (error) {
    options.errorHandler.fail(error)
  }
}
