import { EscPos, ReceiptNode } from '@/types';
import { bytes, charToByte, duplicateContext, renderChildBytes } from '@/util';

interface ScaleNodeProps {
  width: number;
  height: number;
}

const ScaleNode: ReceiptNode<ScaleNodeProps> = {
  buildHtml({ width, height }, children) {
    return `<div style="width: ${width}px; height: ${height}px;">${children?.join(
      ''
    )}</div>`;
  },

  async buildEscPos({ width, height }, children, parentCtx): Promise<EscPos> {
    if (!parentCtx) {
      throw new Error('No context found');
    }

    if (width > 5) width = 5;
    else if (width < 0) width = 0;
    if (height > 5) height = 5;
    else if (height < 0) height = 0;

    const context = duplicateContext(parentCtx);
    context.scaleBits &= 0b11110000;
    context.scaleBits |= height - 1;
    context.scaleBits &= 0b00001111;
    context.scaleBits |= (width - 1) << 4;

    if (context.scaleBits === parentCtx.scaleBits) {
      return renderChildBytes(children);
    }

    return [
      bytes.GS,
      charToByte('!'),
      context.scaleBits,
      ...(await renderChildBytes(children, context)),
      bytes.GS,
      charToByte('!'),
      parentCtx.scaleBits,
    ];
  },
};

export default ScaleNode;
