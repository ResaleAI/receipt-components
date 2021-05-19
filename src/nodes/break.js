const BaseNode = require("./base.js")


class BreakNode extends BaseNode {
  contructor(attrs) {
    super([], attrs)

    this.lines = parseInt(this.attrs.lines ?? "1")
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    // use ESC d N cmd if more than one line,
    // use LF otherwise
    if (this.lines > 1) {
      return [BaseNode.bytes.ESC, 'd', this.lines]
    }

    return [BaseNode.bytes.LF]
  }
}

module.exports = BreakNode;
