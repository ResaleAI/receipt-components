import { ScaleNodeProps } from '@resaleai/receipt-ast';
import { ChildBuilder, EscPos } from '@/types';
import {
  charToByte,
  duplicateObject,
  renderChildBytes,
  requireContextKeys,
} from '@/util';
import LinkedList from '@/linked-list';
import { bytes } from '@/constants';

async function renderScale(
  { width, height }: ScaleNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
): Promise<EscPos> {
  requireContextKeys(parentCtx, ['scaleBits']);
  const context = duplicateObject(parentCtx);

  context.scaleBits = computeScaleBits(parentCtx.scaleBits, width, height);

  const childBytes = await renderChildBytes(children, context);
  parentCtx.currentOffset = context.currentOffset;

  if (context.scaleBits === parentCtx.scaleBits) {
    return childBytes;
  }

  const prependBytes = new LinkedList([
    bytes.GS,
    charToByte('!'),
    context.scaleBits,
  ]);
  const appendBytes = new LinkedList([
    bytes.GS,
    charToByte('!'),
    parentCtx.scaleBits,
  ]);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export function computeScaleBits(
  parentScaleBits: number,
  width?: number,
  height?: number
): number {
  let scaleBits = parentScaleBits;
  if (width !== undefined) {
    if (width > 5) width = 5;
    else if (width < 1) width = 1;

    scaleBits &= 0b1111; // clear width bits keeping height bits
    scaleBits |= (width - 1) << 4; // set width bits
  }

  if (height !== undefined) {
    if (height > 5) height = 5;
    else if (height < 1) height = 1;

    scaleBits &= 0b11110000; // clear height bits keeping width bits
    scaleBits |= height - 1; // set height bits
  }
  return scaleBits;
}

export default renderScale;
