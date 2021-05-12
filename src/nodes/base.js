// abstract base node class
const BaseNode = function (content, children, attrs = null) {
  this.content = content
  this.attrs = attrs
  this.children = children
}

BaseNode.prototype.appendChild = function (child) {
  this.children.push(child)
}

// byte helper
BaseNode.prototype.getBytesFor = (cmdName) => {
  switch (cmdName.toUpperCase()) {
    case "NUL":
      return 0
    case "LF":
      return 0x0a
    case "ESC":
      return 0x1b
    case "GS":
      return 0x1d
  }
}

// super gets run only by nodes with children
BaseNode.prototype.buildHTMLPreview = function (data) {
  if (this.children.length > 0) {
    let childHTML = ""
    this.children.forEach((child) => {
      childHTML += child.buildHTMLPreview(data)
    })
    return childHTML
  }
}

BaseNode.prototype.buildPrinterBytes = function (data) {
  let childBytes = []
  this.children.forEach((child) => {
    childBytes.push(...child.buildPrinterBytes(data))
  })
  return childBytes
}

export default BaseNode;

