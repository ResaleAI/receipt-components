const BaseNode = require("./base.js")
const findNextRenderedNode = require("../util/find-next-node")
class SmoothingNode extends BaseNode {
  constructor(baseMods) {
    super(baseMods)
  }

  renderHTML(data) {
    return super.renderHTML(data)
  }

  renderPrinterBytes(data) {
    // check either prev sibling or parent to see what needs to be done for open
    let prevNode = this.prevSibling ?? this.parent
    let nextNode = findNextRenderedNode(this)
    let retVal = super.renderPrinterBytes(data)


    // ensure smooth mode wasnt already on
    if (prevNode === null || !prevNode.baseMods.smoothingByte) {
      retVal.unshift(BaseNode.bytes.GS, 'b', 1)
    }

    if (nextNode === null || !nextNode.baseMods.smoothingByte) {
      retVal.push(BaseNode.bytes.GS, 'b', 0)
    }
    return retVal
  }
}



module.exports = SmoothingNode;