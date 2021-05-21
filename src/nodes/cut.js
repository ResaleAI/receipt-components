import BaseNode from './base.js';

class CutNode extends BaseNode {
  constructor(mods, attrs) {
    super(mods, attrs);
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    return [BaseNode.bytes.LF, BaseNode.bytes.GS, 'V', this.attrs.partial === undefined ? 65 : 66, 3];
  }
}

export default CutNode;
