import BaseNode from './base.js';

const modeMap = {
  left: 0,
  center: 1,
  right: 2,
};

class AlignNode extends BaseNode {
  constructor(mods, attrs) {
    super(mods, attrs);

    this.requireAttributes('mode'); // require the 'mode' in attrs

    this.mode = modeMap[this.attrs.mode]; // convert ppl friendly to esc pos friendly

    this.mods.alignByte = this.mode; // update mods
  }

  renderHTML(data) {

  }

  renderPrinterBytes(data) {
    const childBuff = super.renderPrinterBytes(data);
    const retVal = [BaseNode.bytes.ESC, 'a', this.mode, ...childBuff];
    if (this.mode !== 0) {
      retVal.push(BaseNode.bytes.ESC, 'a', 0);
    }

    return retVal;
  }
}

export default AlignNode;
