const BaseNode = require("./base.js")

const SmallNode = function (children) {
  BaseNode.apply(this, ["bold", children])
}

SmallNode.prototype = Object.create(BaseNode.prototype)
SmallNode.prototype.constructor = SmallNode

SmallNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<strong>\n" + BaseNode.prototype.renderHTML.call(this, data) + "\n</strong>"
}

SmallNode.prototype.renderPrinterBytes = function (data) {
  // set double height and double width
  return [this.getBytesFor("ESC"), "M", 1, ...BaseNode.prototype.renderPrinterBytes.call(this, data), this.getBytesFor("ESC"), "M", 0]
}

module.exports = SmallNode;