const BaseNode = require("./base.js")

// mapping of the attr
// name to the bits they activate
const modBits = {
  "altFont": 0b1,
  "bold": 0b1000,
  "wide": 32,
  "long": 16,
  "underline": 0b10000000
}

class TextModsNode extends BaseNode {
  constructor(children, attrs) {
    super(children, attrs)

    if (this.attrs.scale) {
      // the scale attr should be in the form 'hor:ver' so we parse those ints out
      let [hScale, vScale] = this.attrs.scale.split(":").map(asciiNum => parseInt(asciiNum))
      // shift hscale to left 4 bits of byte, and OR with vscale to get scale byte
      this.scaleByte = ((hScale - 1) << 4) | (vScale - 1)

      // ensure that scale byte is in range
      if (this.scaleByte > 0x77) {
        throw new Error("Invalid scale modification, both values must be between 1-8")
      }

      // mod byte to keep track of other mods (given by ESC ! cmd)
      this.modByte = 0
      Object.keys(this.attrs).forEach(attr => { this.modByte |= modBits[attr] })

      // keep track of modifications that need to be made to child text components
      this.mods = {
        altFont: this.modByte & 1,
        widthScale: hScale || undefined,
        noWordWrap: this.attrs.multiLine !== undefined ? false : undefined
      }
    }
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {

    // get children
    let retVal = super.renderPrinterBytes(data)
    console.log(retVal)

    // apply scale mod if it exists
    if (this.scaleByte !== undefined) {
      retVal.unshift(BaseNode.bytes.GS, "!", this.scaleByte)
      retVal.push(BaseNode.bytes.GS, "!", 0)
    }
    
    // apply other mods if they exist
    if (this.modByte > 0) {
      retVal.unshift(BaseNode.bytes.ESC, "!", this.modByte)
      retVal.push(BaseNode.bytes.ESC, "!", 0)
    }

    return retVal
  }
}

module.exports = TextModsNode