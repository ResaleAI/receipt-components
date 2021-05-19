const BaseNode = require("./base.js")

class SmoothingNode extends BaseNode {
  constructor(children) {
    super(children)
  }

  renderHTML(data) {
    return super.renderHTML(data)
  }

  renderPrinterBytes(data) {
    return [BaseNode.bytes.GS, 'b', 1, ...super.renderPrinterBytes(data), BaseNode.bytes.GS, 'b', 0]
  }
}

module.exports = SmoothingNode;