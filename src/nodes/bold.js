import BaseNode from "./base.js"

const BoldNode = function (children) {
  BaseNode.apply(this, ["bold", children])
}

BoldNode.prototype = Object.create(BaseNode.prototype)
BoldNode.prototype.constructor = BoldNode

BoldNode.prototype.buildHTMLPreview = function (data) {

  // return html strong w content inside
  return "<strong>\n" + BaseNode.prototype.buildHTMLPreview.call(this, data) + "\n</strong>"
}

BoldNode.prototype.buildPrinterBytes = function (data) {

}

export default BoldNode;