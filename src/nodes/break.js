import BaseNode from "./base.js"

const BreakNode = function (attrs) {
  BaseNode.apply(this, ["break", [], attrs])
}

BreakNode.prototype = new BaseNode()
BreakNode.prototype.constructor = BreakNode

BreakNode.prototype.buildHTMLPreview = function (data) {
  return "<br />".repeat(attrs.lines ?? 0)
}

BreakNode.prototype.buildPrinterBytes = function (data) {

}

export default BreakNode;
