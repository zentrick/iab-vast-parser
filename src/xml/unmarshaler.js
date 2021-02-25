import { getText, getChildren, isElement } from './dom'
import convertors from './convertors'

const toProperty = (() => {
  const re = /^[A-Z]+/
  const insert = (m) => (m.length === 1) ? m.toLowerCase()
    : m.substr(0, m.length - 1).toLowerCase() + m.charAt(m.length - 1)
  return (str) => str.replace(re, insert)
})()

const hasPair = (map, parentName, childName) =>
  (map[parentName] != null && ~map[parentName].indexOf(childName))

export default class Unmarshaler {
  constructor ({ collections, freeforms, hybrids, types }) {
    this._collections = collections
    this._freeforms = freeforms
    this._hybrids = hybrids
    this._types = types
  }

  unmarshal (xml) {
    return this._createNode(xml)
  }

  _createNode (xml) {
    const node = Object.create(null)
    node._value = this._isHybrid(xml.nodeName)
      ? xml
      : this._convertPropertyValue(getText(xml), xml.nodeName, '_value')
    this._copyAttributes(node, xml)
    this._createCollections(node, xml)
    this._createChildren(node, xml)
    return node
  }

  _createFreeformNode (xml) {
    const node = Object.create(null)
    this._copyAttributes(node, xml)
    node._value = xml
    return node
  }

  _copyAttributes (node, xml) {
    const parentName = xml.nodeName
    for (let i = 0; i < xml.attributes.length; ++i) {
      const attrNode = xml.attributes[i]
      const name = attrNode.nodeName
      const rawValue = attrNode.nodeValue
      node[name] = this._convertPropertyValue(rawValue, parentName, name)
    }
  }

  _createCollections (node, xml) {
    if (this._collections[xml.nodeName] != null) {
      this._collections[xml.nodeName].forEach((childName) => {
        node[toProperty(childName)] = []
      })
    }
  }

  _createChildren (node, xml) {
    const parentName = xml.nodeName
    getChildren(xml, isElement).forEach((child) => {
      const childName = child.nodeName
      const prop = toProperty(childName)
      if (this._isFreeformParent(parentName)) {
        if (this._isFreeformChild(parentName, childName)) {
          this._addFreeformChild(child, prop, node)
        }
      } else {
        this._addNodeChild(child, prop, node, parentName, childName)
      }
    })
  }

  _addNodeChild (child, prop, parentNode, parentName, childName) {
    const childNode = this._createNode(child)
    if (parentNode[prop] == null) {
      parentNode[prop] = childNode
    } else if (this._isCollection(parentName, childName)) {
      parentNode[prop].push(childNode)
    } else {
      throw new Error(`Multiple values for ${parentName}.${childName}`)
    }
  }

  _addFreeformChild (child, prop, parentNode) {
    parentNode[prop] = parentNode[prop] || []
    parentNode[prop].push(this._createFreeformNode(child))
  }

  _convertPropertyValue (value, parentName, property) {
    const typeId = (this._types[parentName] != null) ? this._types[parentName][property] : null
    return (typeId != null) ? convertors[typeId](value) : value
  }

  _isCollection (parentName, childName) {
    return hasPair(this._collections, parentName, childName)
  }

  _isFreeformParent (name) {
    return (this._freeforms[name] != null)
  }

  _isFreeformChild (parentName, childName) {
    return hasPair(this._freeforms, parentName, childName)
  }

  _isHybrid (name) {
    return this._hybrids.indexOf(name) >= 0
  }
}
