// import { parseMarkup } from "./parser.js"
const { parseMarkup } = require("./parser.js")


class EPComponent {

  // component build from template and other
  // components
  constructor({ template, components } = {}) {

    // only need the component stuff when template exists
    if (template !== undefined) {
      this.components = components ?? {}
      this.slots = {}
      this.template = template
  
      this.nodeTree = parseMarkup(this)
    }
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    // render node tree and map chars to bytes
    let byteArr = this.nodeTree.renderPrinterBytes(data).map((el) => typeof el === "string" ? (el.charCodeAt(0)) : el)
    let byteBuff = new Uint8Array(byteArr)

    return byteBuff
  }
}

// ensure propdefs are in the data, throw err if not
// EPComponent.prototype.checkData = function(data) {
//   for (let propDef in this.propDefs) {
//     if (data[propDef] === undefined) {
//       throw new Error(`Missing property '${ propDef }' in passed data`)
//     }
//   }
// }

exports.EPComponent = EPComponent