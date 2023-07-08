import { ReceiptNode } from '@/types';
import { bytes, charToByte, flattenEscPos, renderChildBytes } from '@/util';

const SmoothNode: ReceiptNode<null> = {
  buildHtml(_props, children) {
    return children?.join('') ?? '';
  },

  async buildEscPos(_props, children, context) {
    return [
      bytes.GS,
      charToByte('b'),
      1,
      ...(await renderChildBytes(children, context)),
      bytes.GS,
      charToByte('b'),
      0,
    ];
  },
};

export default SmoothNode;
