// import { parseMarkup } from "./parser.js"
import { parseMarkup } from './parser.js';

const defaultMods = {
  textScaleByte: 0,
  textModsByte: 0,
  alignByte: 0,
  smoothingByte: 0,
  multiLine: true,
};

// The most basic component class
export class ReceiptComponent {
  // component build from template and other
  // components
  constructor({ template, components, data, mods = defaultMods }) {
    if (template === undefined)
      throw new Error('Non-functional components must have a template?');

    this.components = components ?? {};
    this.slots = {};
    this.template = template;
    this.mods = mods;
    this.nodeTree = null;
    this.data = data ?? {};

    // get promise and wait for it to resolve
    // parseMarkup(this).then(root => {
    //   this.nodeTree = root;
    // });
  }

  // returns a copy defined component instance
  // that can be mutated
  copy() {
    return Object.setPrototypeOf(
      Object.assign({}, this),
      ReceiptComponent.prototype
    );
  }

  // receipt component

  async parseTemplate() {
    // nodeTree must be an object with:
    //  - renderHTML(data): HTML string - for previewing
    //  - renderPrinterBytes(data): Array - to be converted into an ESC/POS byte array and sent to the printer
    this.nodeTree = await parseMarkup(this);
  }

  // shortcut for normal components that just hold
  // some children and dont need to create any content
  render(data, preview = false) {
    if (preview) {
      return this.renderHTML(data);
    }

    return this.renderPrinterBytes(data);
  }

  // manual call
  renderHTML(data) {
    return this.nodeTree.renderHTML(data);
  }

  renderPrinterBytes(data) {
    // render node tree and map chars to bytes
    const byteArr = this.nodeTree.renderPrinterBytes(data);
    const byteBuff = new Uint8Array(
      byteArr.map(el => (typeof el === 'string' ? el.charCodeAt(0) : el))
    );

    return byteBuff;
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
