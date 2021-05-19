
// base node class which has useful helpers
// and extends the component class
class BaseNode {
  constructor(children, attrs = null) {
    this.attrs = attrs
    this.children = children
  }
  
  // static helper to get common hex vals
  static bytes = {
    ESC: 0x1b,
    LF: 0x0a,
    NUL: 0,
    GS: 0x1d,
  }

  appendChild(child) {
    this.children.push(child)
  }

  requireAttributes(...attrKeys) {
    attrKeys.forEach((key, i) => {
      if (key in this.attrs) {
        return
      }
      throw new Error(`Missing required attribute: ${key}`)
    })
  }

  render(data, preview = false) {
    if (preview) {
      return this.renderHTML(data)
    }
    return this.renderPrinterBytes(data)
  }

  renderHTML(data) {
    if (this.children.length > 0) {
      let childHTML = ""
      this.children.forEach((child) => {
        childHTML += child.renderHTML(data)
      })
      return childHTML
    }
    return []
  }

  renderPrinterBytes(data) {
    if (this.children.length > 0) {
      let childBytes = []
      this.children.forEach((child) => {
        childBytes.push(...child.renderPrinterBytes(data))
      })
      return childBytes
    }
    return []
  }

  
}

module.exports = BaseNode;

