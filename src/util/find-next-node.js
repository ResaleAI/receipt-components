function findNextRenderedNode(node) {
  if (!node) return null
  return node.nextSibling || findNextRenderedNode(node.parent)
}

module.exports = findNextRenderedNode