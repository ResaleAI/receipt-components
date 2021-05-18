const BaseNode = require("./base.js")

class UnderlineNode extends BaseNode {
  constructor(children, attrs) {
    super(children, attrs)
  }

  renderHTML(data) {
  }

  renderPrinterBytes(data) {
    let childBuff = super.renderPrinterBytes(data)
    return [BaseNode.bytes.ESC, '-', this.attrs.heavy !== undefined ? 2 : 1, ...childBuff, BaseNode.bytes.ESC, '-', 0]
  }
}

module.exports = UnderlineNode;