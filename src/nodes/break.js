import BaseNode from "./base.js"

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
  return [this.getBytesFor("ESC"), 'd', this.attrs.lines ?? 1]
}

export default BreakNode;
