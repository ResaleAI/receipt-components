import BaseNode from "./base.js"

const TextModeNode = function (children, attrs) {
  BaseNode.apply(this, ["mode", children, attrs])

  // form: 'horizontal:vertical'
  if (this.attrs.scale) {
    let [hScale, vScale] = this.attrs.scale.split(":").map((asciiNum) => parseInt(asciiNum) - 1)
    this.scaleByte = (hScale << 4) | vScale;
    
    if (this.scaleByte > 0b01110111) {
      throw new Error(`invalid scale, both values must be 1-8 (got ${hScale}:${vScale})`)
    }
  }
}

TextModeNode.prototype = Object.create(BaseNode.prototype)
TextModeNode.prototype.constructor = TextModeNode

TextModeNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<span>\n" + BaseNode.prototype.renderHTML.call(this, data) + "\n</span>"
}

TextModeNode.prototype.renderPrinterBytes = function (data) {
  if (this.scaleByte !== undefined) {
    return [this.getBytesFor("GS"), '!', this.scaleByte, ...BaseNode.prototype.renderPrinterBytes.call(this,data), this.getBytesFor("GS"), '!', 0]
  }
  return BaseNode.prototype.renderPrinterBytes.call(this, data)
}

export default TextModeNode