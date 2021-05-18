const BaseNode = require("./base.js")

const modeMap = {
  left: 0,
  center: 1,
  right: 2,
}
const AlignNode = function (children, attrs) {
  BaseNode.apply(this, ["align", children, attrs])

  this.modeNum = modeMap[this.attrs.mode] ?? 0
}

AlignNode.prototype = Object.create(BaseNode.prototype)
AlignNode.prototype.constructor = AlignNode

AlignNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return `<span style="text-align: ${this.attrs.type}">\n` + BaseNode.prototype.renderHTML.call(this, data) + "\n</span>"
} 

AlignNode.prototype.renderPrinterBytes = function (data) {
  if (this.modeNum === 0) {
    return [this.getBytesFor("ESC"), 'a', this.modeNum, ...BaseNode.prototype.renderPrinterBytes.call(this, data)]
  }
  return [this.getBytesFor("ESC"), 'a', this.modeNum, ...BaseNode.prototype.renderPrinterBytes.call(this, data), this.getBytesFor("ESC"), 'a', 0]
}

module.exports = AlignNode;