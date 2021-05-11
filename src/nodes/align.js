import BaseNode from "./base.js"

const AlignNode = function (children, attrs) {
  BaseNode.apply(this, ["align", children, attrs])
}

AlignNode.prototype = new BaseNode()
AlignNode.prototype.constructor = AlignNode

AlignNode.prototype.buildHTMLPreview = function (data) {

  // return html strong w content inside
  return `<span style="text-align: ${this.attrs.type}">\n\t` + BaseNode.prototype.buildHTMLPreview.call(this) + "\n</span>"
}

AlignNode.prototype.buildPrinterBytes = function (data) {

}

export default AlignNode;