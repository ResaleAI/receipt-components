import { ReceiptNode } from '@/types';
import { bytes, charToByte, flattenEscPos, renderChildBytes } from '@/util';

const RootNode: ReceiptNode<null> = {
  buildHtml(_props, children) {
    return `<div>${children?.join('')}</div>`;
  },

  async buildEscPos(_props, children) {
    const ret = [
      bytes.ESC,
      charToByte('@'),
      ...(await renderChildBytes(children)),
      bytes.LF,
      bytes.GS,
      charToByte('V'),
      1,
      3,
    ];

    return ret;
  },
};

export default RootNode;
