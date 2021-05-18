import BaseNode from "./base.js"

// The root node for receipts, attrs will apply
// to the whole receipt.
const ReceiptDocNode = function (children, attrs) {
  
  BaseNode.apply(this, ["document", children, attrs])
}

ReceiptDocNode.prototype = Object.create(BaseNode.prototype)
ReceiptDocNode.prototype.constructor = ReceiptDocNode

ReceiptDocNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<div class='print-preview'>\n" + BaseNode.prototype.renderHTML.call(this, data) + "\n</div>"
}

ReceiptDocNode.prototype.renderPrinterBytes = function (data) {
  // initialization bytes
  return [this.getBytesFor("ESC"), 0x40, ...BaseNode.prototype.renderPrinterBytes.call(this, data), this.getBytesFor("LF"), "A", 3]
}

export default ReceiptDocNode