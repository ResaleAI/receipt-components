import stringToBuffer from '../util/string-to-buffer.js';
import BaseNode from './base.js';
/**
 * Class for a node representing a single barcode
 */
class BarcodeNode extends BaseNode {
  /**
   * 
   * @param {Object} mods 
   * @param {Object} attrs  
   */
  constructor(mods, attrs) {
    // no children for barcode node
    super(mods, attrs);

    this.requireAttributes('data');

    // TODO: change to use a map for human barcode standards
    const {width = 100, height = 80, standard = 4} = this.attrs;

    this.width = width;
    this.height = height;
    this.standard = barcodeStandard;
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    const dataBuff = stringToBuffer(this.attrs.data);

    // define height and width every time for ez parse?
    return [BaseNode.bytes.GS, 'h', this.height, BaseNode.bytes.GS, 'w', this.width, BaseNode.bytes.GS, 'k', this.standard, ...dataBuff, BaseNode.bytes.NUL];
  }
}

export default BarcodeNode;
