const BaseNode = require("./base.js")
// import fsDither from "../dither/fs-dither.js"

const ImageNode = function (attrs) {
  BaseNode.apply(this, ["img", [], attrs])

  // require attributes
  if (this.attrs.testCircle === undefined) {
    this.requireAttributes(["src"])
  }

  if (this.attrs.width) {
    let shortWidth = parseInt(this.attrs.width) & 0xff
    let [wLow, wHigh] = [shortWidth & 0xf, shortWidth >> 4]
  }

  this.imageData = fsDither(this.attrs.src, shortWidth)
  
  console.log(this.imageData)
}

ImageNode.prototype = Object.create(BaseNode.prototype)
ImageNode.prototype.constructor = ImageNode

ImageNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return `<span style="text-align: ${this.attrs.type}">\n` + BaseNode.prototype.renderHTML.call(this, data) + "\n</span>"
} 

ImageNode.prototype.renderPrinterBytes = function (data) {
  return [BaseNode.bytes.ESC, '-', this.attrs.heavy ? 2 : 1, ...BaseNode.prototype.renderPrinterBytes.call(this, data), BaseNode.bytes.ESC, '-', 0]
}

module.exports = ImageNode;