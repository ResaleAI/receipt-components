const BaseNode = require("./base.js")

const SlotNode = function (component) {
  component.slotNode = this
}

SlotNode.prototype = Object.create(BaseNode.prototype)
SlotNode.prototype.constructor = SlotNode

SlotNode.prototype.renderHTML = function (data) {

  let slotData = data[this.attrs.name]

  if (slotData === undefined) {
    throw new Error(this.attrs.name + " not in the data")
  }

  return slotData + "\n"
}

SlotNode.prototype.renderPrinterBytes = function (data) {
  // return children
  return BaseNode.prototype.renderPrinterBytes.call(this, data)
}

module.exports = SlotNode