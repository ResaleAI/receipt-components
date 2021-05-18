import BaseNode from "./base.js"

const modeBits = {
  "altFont": 0b1,
  "bold": 0b1000,
  "wide": 32,
  "long": 16,
  "underline": 0b10000000
}

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

  this.modByte = 0
  Object.keys(this.attrs).forEach((param) => this.modByte |= modeBits[param])

  // parse out other mode attrs


}

TextModeNode.prototype = Object.create(BaseNode.prototype)
TextModeNode.prototype.constructor = TextModeNode

TextModeNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<span>\n" + BaseNode.prototype.renderHTML.call(this, data) + "\n</span>"
}

TextModeNode.prototype.renderPrinterBytes = function (data) {

  let retVal = BaseNode.prototype.renderPrinterBytes.call(this,data)
  if (this.scaleByte !== undefined) {
    // retVal =[this.getBytesFor("GS"), '!', this.scaleByte, ...retVal, this.getBytesFor("GS"), '!', 0]
    retVal.unshift(BaseNode.bytes.GS, "!", this.scaleByte)
    retVal.push(BaseNode.bytes.GS, "!", 0)
  }

  if (this.modByte > 0) {
    retVal.unshift(BaseNode.bytes.ESC, "!", this.modByte)
    retVal.push(BaseNode.bytes.ESC, "!", 0)
  }
  
  


  return retVal
}

export default TextModeNode