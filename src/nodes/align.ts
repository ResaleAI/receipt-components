import { ReceiptNode } from '@/types';
import {
  bytes,
  charToByte,
  duplicateContext,
  flattenEscPos,
  renderChildBytes,
} from '@/util';

interface AlignNodeProps {
  mode: 'left' | 'center' | 'right';
}

const modeMap: Record<AlignNodeProps['mode'], number> = {
  left: 0x00,
  center: 0x01,
  right: 0x02,
};

const AlignNode: ReceiptNode<AlignNodeProps> = {
  buildHtml({ mode }, children) {
    return `<div style="text-align: ${mode}; width: 100%;">${
      children?.join('') ?? ''
    }</div>`;
  },
  async buildEscPos({ mode }, children, parentCtx) {
    const modeByte = modeMap[mode];

    if (!parentCtx) {
      throw new Error('No context found');
    }

    const context = duplicateContext(parentCtx);

    // if (context.currentAlign === modeByte) {
    //   return renderChildBytes(children, parentCtx);
    // }

    context.currentAlign = modeByte;

    const retVal = [
      bytes.ESC,
      charToByte('a'),
      modeByte,
      ...(await renderChildBytes(children, context)),
      bytes.ESC,
      charToByte('a'),
      parentCtx.currentAlign,
    ];

    return retVal;
  },
};

export default AlignNode;
