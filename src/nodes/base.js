// abstract base node class
const BaseNode = function (content, children, attrs = null) {
  this.content = content
  this.attrs = attrs
  this.children = children
}

BaseNode.prototype.appendChild = function (child) {
  this.children.push(child)
}

BaseNode.bytes = {
  ESC: 0x1b,
  LF: 0x0a,
  NUL: 0,
  GS: 0x1d,
}

BaseNode.prototype.requireAttributes = function(attrKeys) {
  attrKeys.forEach((key, i) => {
    if (key in this.attrs) {
      return
    }
    throw new Error(`Missing required attribute: ${key}`)
  })
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
// should be implemented by all nodes
BaseNode.prototype.renderHTML = function (data) {
  if (this.children.length > 0) {
    let childHTML = ""
    this.children.forEach((child) => {
      childHTML += child.renderHTML(data)
    })
    return childHTML
  }
}

BaseNode.prototype.renderPrinterBytes = function (data) {
  // if (this.children.length === 1 && typeof this.children[0] === "string") {
  //   return this.children[0].split("")
  // }
  let childBytes = []
  this.children.forEach((child) => {
    childBytes.push(...child.renderPrinterBytes(data))
  })
  return childBytes
}

export default BaseNode;

