import { DOMParser } from 'xmldom'
import parse from './parse'

export default (xml, options = {}) => {
  if (options.domParser == null) {
    options.domParser = new DOMParser()
  }
  return parse(xml, options)
}
