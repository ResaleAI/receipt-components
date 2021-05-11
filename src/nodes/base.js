// abstract base node class
const BaseNode = function (content, children, attrs = null) {
  this.content = content
  this.attrs = attrs
  this.children = children
}

BaseNode.prototype.appendChild = function (child) {
  this.children.push(child)
}

// base method run after node processing, goes thru children,
// running method for nodes and returning a string if its text
BaseNode.prototype.buildHTMLPreview = function (data) {
  // is there a better way to do this? maybe set it somewhere else and use here and in constructor - sst
  if (["align", "barcode", "bold", "break", "cut", "document", "double-strike", "font", "image", "mode", "slot", "small", ""].includes(this.content)) {
    let childHTML = ""
    this.children.forEach((child) => {
      childHTML += child.buildHTMLPreview(data)
    })
    return childHTML
  }

  return this.content
}

BaseNode.prototype.buildPrinterBytes = function (data) {
  throw new Error("Cannot call abstract BaseNode buildPrinterBytes")
}

export default BaseNode;

