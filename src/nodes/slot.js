import BaseNode from "./base.js"

const SlotNode = function (attrs) {
  if (attrs.name === undefined) {
    throw new Error("slot must have name")
  }

  BaseNode.apply(this, ["slot", [], attrs])
}

SlotNode.prototype = Object.create(BaseNode.prototype)
SlotNode.prototype.constructor = SlotNode

SlotNode.prototype.buildHTMLPreview = function (data) {

  let slotData = data[this.attrs.name]

  if (slotData === undefined) {
    throw new Error(this.attrs.name + " not in the data")
  }

  return slotData + "\n"
}

SlotNode.prototype.buildPrinterBytes = function (data) {
  let slotData = data[this.attrs.name]

  if (slotData === undefined) {
    throw new Error(this.attrs.name + " not in the data")
  }

  // return array of string characters
  return slotData.split("")
}

export default SlotNode