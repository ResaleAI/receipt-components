import BaseNode from "./base.js"

const TextNode = function (children) {
  BaseNode.apply(this, ["text", children])
}

TextNode.prototype = Object.create(BaseNode.prototype)
TextNode.prototype.constructor = TextNode

TextNode.prototype.buildHTMLPreview = function (data) {

  // return html strong w content inside
  return "<span>\n" + BaseNode.prototype.buildHTMLPreview.call(this, data) + "\n</span>"
}

TextNode.prototype.buildPrinterBytes = function (data) {
  return BaseNode.prototype.buildPrinterBytes.call(this, data)
}

export default TextNode