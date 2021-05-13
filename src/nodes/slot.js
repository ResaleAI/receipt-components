import BaseNode from "./base.js"

const SlotNode = function (component) {
  component.slotNode = this
}

SlotNode.prototype.insert = function(rootNode) {
  console.log(rootNode)
  this.root = rootNode
}

SlotNode.prototype.renderHTML = function (data) {

  let slotData = data[this.attrs.name]

  if (slotData === undefined) {
    throw new Error(this.attrs.name + " not in the data")
  }

  return slotData + "\n"
}

SlotNode.prototype.renderPrinterBytes = function (data) {
  if (typeof this.root === "string") 
    return this.root
  return this.root.renderPrinterBytes(data)
}

export default SlotNode