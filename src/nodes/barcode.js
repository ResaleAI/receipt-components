const BaseNode = require("./base.js")

const BarcodeNode = function (attrs) {
  BaseNode.apply(this, ["barcode", [], attrs])

  this.requireAttributes(["data"])
}

BarcodeNode.prototype = Object.create(BaseNode.prototype)
BarcodeNode.prototype.constructor = BarcodeNode

BarcodeNode.prototype.renderHTML = function (data) {

}

BarcodeNode.prototype.renderPrinterBytes = function (data) {
  console.log(this.attrs.data)
  return [BaseNode.bytes.GS, 'h', this.attrs.height ?? 80, BaseNode.bytes.GS, 'k', this.attrs.standard ?? 4, ...this.attrs.data.split(""), BaseNode.bytes.NUL]
}

module.exports = BarcodeNode;