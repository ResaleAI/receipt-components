import BaseNode from "./base.js"

const DocNode = function (children) {
  BaseNode.apply(this, ["document", children])
}

DocNode.prototype = Object.create(BaseNode.prototype)
DocNode.prototype.constructor = DocNode

DocNode.prototype.buildHTMLPreview = function (data) {

  // return html strong w content inside
  return "<div class='print-preview'>\n" + BaseNode.prototype.buildHTMLPreview.call(this, data) + "\n</div>"
}

DocNode.prototype.buildPrinterBytes = function (data) {

}

export default DocNode