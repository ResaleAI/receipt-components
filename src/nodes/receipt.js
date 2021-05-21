import BaseNode from './base.js';

// The root node for receipts, attrs will apply
// to the whole receipt.

class ReceiptNode extends BaseNode {
  constructor(mods, attrs) {
    super(mods, attrs);
  }

  renderHTML(data) {
    return '<div class=\'print-preview\'>\n' + super.renderHTML(data) + '\n</div>';
  }

  renderPrinterBytes(data) {
    // ESC @ .... initializes. it would make sense to have it also cut at the end,
    // but given there is a separate cut node, that may be confusing
    return [BaseNode.bytes.ESC, '@', ...super.renderPrinterBytes(data)];
  }
}

export default ReceiptNode;
