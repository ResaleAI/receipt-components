const BaseNode = require("./base.js")

class BarcodeNode extends BaseNode {
  constructor(attrs) {
    // no children for barcode node
    super([], attrs)

    this.requireAttributes("data")
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    let dataBuff = [...Buffer.from(this.attrs.data)]

    return [BaseNode.bytes.GS, 'h', this.attrs.height ?? 80, BaseNode.bytes.GS, 'k', this.attrs.standard ?? 4, ...dataBuff, BaseNode.bytes.NUL]
  }
}

module.exports = BarcodeNode;