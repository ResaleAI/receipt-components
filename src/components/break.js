import BaseNode from './base.js';

class BreakNode extends BaseNode {
  constructor(mods, attrs) {
    super(mods, attrs);

    this.lines = parseInt(this.attrs.lines ?? '1');
  }

  renderHTML(_) {
    return '<br />';
  }

  renderPrinterBytes(_) {
    // use ESC d N cmd if more than one line,
    // use LF otherwise
    if (this.lines > 1) {
      return [BaseNode.bytes.ESC, 'd', this.lines];
    }

    return [BaseNode.bytes.LF];
  }
}

export default BreakNode;
