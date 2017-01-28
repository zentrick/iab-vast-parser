import {DOMParser} from 'xmldom'
import parse from './parse'
import strictHandler from './errors/strict'
import looseHandler from './errors/loose'

const DEFAULT_OPTIONS = {
  strict: false
}

export default (xml, options = {}) => {
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  if (options.domParser == null) {
    options.domParser = new DOMParser()
  }
  options.errorHandler = options.strict ? strictHandler : looseHandler
  return parse(xml, options)
}
