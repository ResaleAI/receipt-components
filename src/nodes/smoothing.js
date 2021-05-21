import BaseNode from './base.js';
import findNextRenderedNode from '../util/find-next-node';
class SmoothingNode extends BaseNode {
  constructor(mods) {
    super(mods);

    this.mods.smoothingByte = 1;
  }

  renderHTML(data) {
    return super.renderHTML(data);
  }

  // this is a hot mess
  renderPrinterBytes(data) {
    // check either prev sibling or parent to see what needs to be done for open
    const prevNode = this.prevSibling ?? this.parent;
    const nextNode = findNextRenderedNode(this);
    const retVal = super.renderPrinterBytes(data);


    // ensure smooth mode wasnt already on
    if (prevNode === null || !prevNode.mods.smoothingByte) {
      retVal.unshift(BaseNode.bytes.GS, 'b', 1);
    }

    // check if smoothing should stay on
    if (nextNode === null || !nextNode.mods.smoothingByte) {
      retVal.push(BaseNode.bytes.GS, 'b', 0);
    }
    return retVal;
  }
}


export default SmoothingNode;
