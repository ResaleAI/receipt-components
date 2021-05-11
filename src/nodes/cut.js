import BaseNode from "./base.js"

const CutNode = function (attrs) {
  BaseNode.apply(this, ["cut", [], attrs])
}

CutNode.prototype = Object.create(BaseNode.prototype)
CutNode.prototype.constructor = CutNode

CutNode.prototype.buildHTMLPreview = function (data) {

  // return html strong w content inside
  return "<hr />"
}

CutNode.prototype.buildPrinterBytes = function (data) {

}

export default CutNode