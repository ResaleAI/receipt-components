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
    else if (width < 1) width = 1;
    if (height > 5) height = 5;
    else if (height < 1) height = 1;

    const context = duplicateContext(parentCtx);
    context.scaleBits &= 0b11110000;
    context.scaleBits |= height - 1;
    context.scaleBits &= 0b00001111;
    context.scaleBits |= (width - 1) << 4;
    const childBytes = await renderChildBytes(children, context);
    parentCtx.currentOffset = context.currentOffset;

    if (context.scaleBits === parentCtx.scaleBits) {
      return childBytes;
    }

    return [
      bytes.GS,
      charToByte('!'),
      context.scaleBits,
      ...childBytes,
      bytes.GS,
      charToByte('!'),
      parentCtx.scaleBits,
    ];
  },
};

export default ScaleNode;
