import BaseNode from "./base.js"

const SmoothingNode = function (children) {
  BaseNode.apply(this, ["smooth", children])
}

SmoothingNode.prototype = Object.create(BaseNode.prototype)
SmoothingNode.prototype.constructor = SmoothingNode

SmoothingNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  throw new Error("Not implemented")
}

SmoothingNode.prototype.renderPrinterBytes = function (data) {
  // set smoothing
  return [BaseNode.bytes.GS, 'b', 1, ...BaseNode.prototype.renderPrinterBytes.call(this, data), BaseNode.bytes.ESC, 'b', 0]
}

export default SmoothingNode;