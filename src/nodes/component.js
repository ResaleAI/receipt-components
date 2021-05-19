const BaseNode = require("./base")

// simple component node so that there can
// be multiple instances
class ComponentNode extends BaseNode {
  constructor(component, attrs, children) {
    super(children, attrs)

    // set to be copy of component instance
    this.component = Object.assign({}, component)
    // set funcs too
    this.component.renderHTML = component.renderHTML
    this.component.renderPrinterBytes = component.renderPrinterBytes

    this.component.slots["default"] = children
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    return this.component.renderPrinterBytes(data)
  }
}

module.exports = ComponentNode