const BaseNode = require("./base.js")

// The root node for receipts, attrs will apply
// to the whole receipt.

class ReceiptNode extends BaseNode {
  constructor(children, attrs = null) {
    super(children, attrs)
  }

  renderHTML(data) {
    return "<div class='print-preview'>\n" + super.renderHTML(data) + "\n</div>"
  }

  renderPrinterBytes(data) {
    // ESC @ .... initializes. it would make sense to have it also cut at the end,
    // but given there is a separate cut node, that may be confusing
    return [this.getBytesFor("ESC"), '@', ...super.renderPrinterBytes(data)]
  }
}

module.exports = ReceiptNode