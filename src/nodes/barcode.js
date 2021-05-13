import BaseNode from "./base.js"

const BarcodeNode = function (children) {
  BaseNode.apply(this, ["bold", children])
}

BarcodeNode.prototype = Object.create(BaseNode.prototype)
BarcodeNode.prototype.constructor = BarcodeNode

BarcodeNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<strong>\n" + BaseNode.prototype.renderHTML.call(this, data) + "\n</strong>"
}

BarcodeNode.prototype.renderPrinterBytes = function (data) {
  // set double height and double width
  let largeMode = 16 | 32
  return [this.getBytesFor("ESC"), "!", largeMode, ...BaseNode.prototype.renderPrinterBytes.call(this, data), this.getBytesFor("ESC"), "!", 0]
}

export default BarcodeNode;