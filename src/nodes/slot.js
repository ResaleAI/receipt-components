const BaseNode = require("./base.js")

// extend base node so that when children are set,
// the super func can be run
class SlotNode extends BaseNode {
  constructor(children, attrs = {}) {
    super(children, attrs)
    
    let slotName = attrs?.name ?? "default"
    this.name = slotName
  }

  overrideSlotContent(newChildren) {
    this.children = newChildren
  }
}

module.exports = SlotNode