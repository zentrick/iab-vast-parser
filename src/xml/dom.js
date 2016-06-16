const nodeTypeIs = (type) => (node) => (node.nodeType === type)

export const isElement = nodeTypeIs(1)

export const isText = nodeTypeIs(3)

export const isCdata = nodeTypeIs(4)

export const getChildren = (node, filter) => Array.prototype.filter.call(node.childNodes, filter)

const isTextOrCdata = (node) => (isText(node) || isCdata(node))

export const getText = (node) => getChildren(node, isTextOrCdata).map((child) => child.nodeValue).join('').trim()
