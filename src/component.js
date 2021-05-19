// import { parseMarkup } from "./parser.js"
const { parseMarkup } = require("./parser.js")

// The most basic component class
class ReceiptComponent {

  // component build from template and other
  // components
  constructor({ template, components } = {}) {
    // only need the component stuff when template exists
    if (template !== undefined) {
      this.components = components ?? {}
      this.slots = {}
      this.template = template
  
      // nodeTree must be an object with:
      //  - renderHTML(data): HTML string - for previewing
      //  - renderPrinterBytes(data): Array - to be converted into an ESC/POS byte array and sent to the printer
      this.nodeTree = parseMarkup(this)
    }
  }

  

  // shortcut for normal components that just hold
  // some children and dont need to create any content
  render(data, preview = false) {
    if (preview) {
      return this.renderHTML(data)
    }

    return this.renderPrinterBytes(data)
  }


  // manual call
  renderHTML(data) {
    return this.nodeTree?.renderHTML(data)
  }

  renderPrinterBytes(data) {
    // render node tree and map chars to bytes
    let byteArr = this.nodeTree?.renderPrinterBytes(data)
    let byteBuff = new Uint8Array(byteArr.map(el => typeof el === "string" ? el.charCodeAt(0) : el))

    return byteBuff
  }
}

// FIXME
// ensure propdefs are in the data, throw err if not
// EPComponent.prototype.checkData = function(data) {
//   for (let propDef in this.propDefs) {
//     if (data[propDef] === undefined) {
//       throw new Error(`Missing property '${ propDef }' in passed data`)
//     }
//   }
// }

exports.ReceiptComponent = ReceiptComponent