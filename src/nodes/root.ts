import { ReceiptNode } from '@/types';
import { bytes, charToByte, flattenEscPos, renderChildBytes } from '@/util';

const RootNode: ReceiptNode<null> = {
  buildHtml(_props, children) {
    return `<div style="width: 440px; border: 1px solid black; padding: 5px;">${
      children?.join('') ?? ''
    }</div>`;
  },

  async buildEscPos(_props, children) {
    const ret = [
      bytes.ESC,
      charToByte('@'),
      ...(await renderChildBytes(children)),
      bytes.LF,
      bytes.GS,
      charToByte('V'),
      charToByte('A'),
      3,
    ];

    return ret;
  },
};

export default RootNode;
