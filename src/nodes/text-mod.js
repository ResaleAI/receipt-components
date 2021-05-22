import findNextRenderedNode from '../util/find-next-node.js';
import BaseNode from './base.js';

// mapping of the attr
// name to the bits they activate
const modBits = {
  bold: 0b1000,
  wide: 32,
  long: 16,
  underline: 0b10000000,
};

class TextModsNode extends BaseNode {
  constructor(mods, attrs) {
    super(mods, attrs);

    let hScale;
    let vScale;

    if (this.attrs.scale) {
      // the scale attr should be in the form 'hor:ver' so we parse those ints out
      [hScale, vScale] = this.attrs.scale
        .split(':')
        .map(asciiNum => parseInt(asciiNum));
      // shift hscale to left 4 bits of byte, and OR with vscale to get scale byte
      this.scaleByte = (hScale << 4) | vScale;

      // ensure that scale byte is in range
      if (this.scaleByte > 0x77) {
        throw new Error(
          'Invalid scale modification, both values must be between 1-8'
        );
      }
    }

    // mod byte to keep track of other mods (given by ESC ! cmd)
    this.modByte = 0;
    Object.keys(this.attrs).forEach(attr => {
      this.modByte |= modBits[attr];
    });
    const { font } = this.attrs;
    this.font = parseInt(font ?? '1') - 1; // add font if needed
    this.modByte |= this.font;
    this.modByte |= mods.textModsByte; // combine?
    if (font !== undefined && this.font === 0) this.modByte &= ~1;

    this.multiLine = this.attrs.multiLine !== undefined;

    // after everything else, update mods
    this.mods.textModsByte = this.modByte;
    this.mods.textScaleByte = this.scaleByte ?? this.mods.textScaleByte;
    this.mods.multiLine = this.multiLine;
  }

  renderHTML(data) {}

  renderPrinterBytes(data) {
    // get children
    const prevNode = this.prevSibling ?? this.parent;
    const nextNode = findNextRenderedNode(this);
    const prefix = [];
    const suffix = [];

    // determine how to change scale

    // first check if current node is updating scale
    if (this.scaleByte !== undefined) {
      // opening
      if (prevNode === null || prevNode.mods.textScaleByte !== this.scaleByte) {
        prefix.push(BaseNode.bytes.GS, '!', this.scaleByte ?? 0);
      }

      if (nextNode === null || nextNode.mods.textScaleByte !== this.scaleByte) {
        suffix.push(BaseNode.bytes.GS, '!', nextNode?.mods.textScaleByte ?? 0);
      }
    }

    //

    // apply other mods if they exist
    if (this.modByte > 0 || this.attrs.font !== undefined) {
      if (prevNode === null || this.modByte !== prevNode.mods.textModsByte) {
        prefix.push(BaseNode.bytes.ESC, '!', this.modByte);
      }

      if (nextNode === null || nextNode.mods.textModsByte !== this.modByte) {
        suffix.push(BaseNode.bytes.ESC, '!', nextNode?.mods.textModsByte ?? 0);
      }
    }
    const retVal = super.renderPrinterBytes(data);

    return [...prefix, ...retVal, ...suffix];
  }
}

export default TextModsNode;
