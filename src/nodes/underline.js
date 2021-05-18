const BaseNode = require("./base.js")
const UnderlineNode = function (children, attrs) {
  BaseNode.apply(this, ["align", children, attrs])

}

UnderlineNode.prototype = Object.create(BaseNode.prototype)
UnderlineNode.prototype.constructor = UnderlineNode

UnderlineNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return `<span style="text-align: ${this.attrs.type}">\n` + BaseNode.prototype.renderHTML.call(this, data) + "\n</span>"
} 

UnderlineNode.prototype.renderPrinterBytes = function (data) {
  return [BaseNode.bytes.ESC, '-', this.attrs.heavy ? 2 : 1, ...BaseNode.prototype.renderPrinterBytes.call(this, data), BaseNode.bytes.ESC, '-', 0]
}

module.exports = UnderlineNode;