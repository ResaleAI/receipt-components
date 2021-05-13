import BaseNode from "./base.js"

const CutNode = function (attrs) {
  BaseNode.apply(this, ["cut", [], attrs])
}

CutNode.prototype = Object.create(BaseNode.prototype)
CutNode.prototype.constructor = CutNode

CutNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<hr />"
}

CutNode.prototype.renderPrinterBytes = function (data) {
  return [this.getBytesFor("GS"), 'V', this.attrs.partial ? 65 : 66]
}

export default CutNode