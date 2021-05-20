const BaseNode = require("./base")

// simple component node so that there can
// be multiple instances, maybe remove
class ComponentNode extends BaseNode {
  constructor(component, baseMods, attrs) {
    super(attrs)

    // set to be copy of component instance
    this.component = Object.assign({}, component)
    this.component.defMods = baseMods
    this.component.renderHTML = component.renderHTML
    this.component.renderPrinterBytes = component.renderPrinterBytes

    // set slot of copy to be the nodes children
    this.component.slots["default"] = this.firstChild
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    return this.component.renderPrinterBytes(data)
  }
}

module.exports = ComponentNode