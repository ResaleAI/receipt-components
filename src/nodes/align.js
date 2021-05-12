import BaseNode from "./base.js"

const modeMap = {
  left: 0,
  right: 2,
  center: 1,
}
const AlignNode = function (children, attrs) {
  BaseNode.apply(this, ["align", children, attrs])

  this.modeNum = modeMap[this.attrs.mode] ?? 0
}

AlignNode.prototype = Object.create(BaseNode.prototype)
AlignNode.prototype.constructor = AlignNode

AlignNode.prototype.buildHTMLPreview = function (data) {

  // return html strong w content inside
  return `<span style="text-align: ${this.attrs.type}">\n` + BaseNode.prototype.buildHTMLPreview.call(this, data) + "\n</span>"
}

AlignNode.prototype.buildPrinterBytes = function (data) {
  if (this.modeNum === 0) {
    return [this.getBytesFor("ESC"), 'a', this.modeNum, ...BaseNode.prototype.buildPrinterBytes.call(this, data)]
  }
  return [this.getBytesFor("ESC"), 'a', this.modeNum, ...BaseNode.prototype.buildPrinterBytes.call(this, data), this.getBytesFor("ESC"), 'a', 0]
}

export default AlignNode;