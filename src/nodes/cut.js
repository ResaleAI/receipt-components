const BaseNode = require("./base.js")

class CutNode extends BaseNode {
  constructor(attrs) {
    super([], attrs)
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    return [BaseNode.bytes.LF, BaseNode.bytes.GS, 'V', this.attrs.partial === undefined ? 65 : 66]
  }
}

module.exports = CutNode