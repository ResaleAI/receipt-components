const BaseNode = require("./base.js")

const modeMap = {
  left: 0,
  center: 1,
  right: 2,
}

class AlignNode extends BaseNode {
  constructor(baseMods, attrs) {
    super(baseMods, attrs)

    this.requireAttributes("mode")

    this.mode = modeMap[this.attrs.mode]
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    let childBuff = super.renderPrinterBytes(data)
    let retVal = [BaseNode.bytes.ESC, 'a', this.mode, ...childBuff]
    if (this.mode !== 0) {
      retVal.push(BaseNode.bytes.ESC, 'a', 0)
    }

    return retVal
  }
}

module.exports = AlignNode;