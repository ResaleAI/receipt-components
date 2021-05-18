const BaseNode = require("./base.js")

const BreakNode = function (attrs) {
  BaseNode.apply(this, ["break", [], attrs])

  // make it a number
  this.attrs.lines = parseInt(this.attrs.lines)
}

BreakNode.prototype = new BaseNode()
BreakNode.prototype.constructor = BreakNode

BreakNode.prototype.renderHTML = function (data) {
  return "<br />".repeat(this.attrs.lines ?? 0)
}

BreakNode.prototype.renderPrinterBytes = function (data) {
  if (this.attrs.lines) {
    return [this.getBytesFor("ESC"), 'd', this.attrs.lines ?? 1]
  }
  return [BaseNode.bytes.LF]
}

module.exports = BreakNode;
