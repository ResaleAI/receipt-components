import BaseNode from "./base.js"

const ReceiptDocNode = function (children) {
  BaseNode.apply(this, ["document", children])
}

ReceiptDocNode.prototype = Object.create(BaseNode.prototype)
ReceiptDocNode.prototype.constructor = ReceiptDocNode

ReceiptDocNode.prototype.buildHTMLPreview = function (data) {

  // return html strong w content inside
  return "<div class='print-preview'>\n" + BaseNode.prototype.buildHTMLPreview.call(this, data) + "\n</div>"
}

ReceiptDocNode.prototype.buildPrinterBytes = function (data) {
  // initialization bytes
  return [this.getBytesFor("ESC"), 0x40, ...BaseNode.prototype.buildPrinterBytes.call(this, data), this.getBytesFor("LF"), "A", 3]
}

export default ReceiptDocNode