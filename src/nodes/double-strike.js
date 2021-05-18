const BaseNode = require("./base.js")

const DoubleStrikeNode = function (children) {
  BaseNode.apply(this, ["double-strike", children])
}

DoubleStrikeNode.prototype = Object.create(BaseNode.prototype)
DoubleStrikeNode.prototype.constructor = DoubleStrikeNode

DoubleStrikeNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<strong>\n" + BaseNode.prototype.renderHTML.call(this, data) + "\n</strong>"
}

DoubleStrikeNode.prototype.renderPrinterBytes = function (data) {
  // set double height and double width
  return [BaseNode.bytes.ESC, 'G', 1, ...BaseNode.prototype.renderPrinterBytes.call(this, data), BaseNode.bytes.ESC, 'G', 0]
}

module.exports = DoubleStrikeNode;