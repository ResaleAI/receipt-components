import { ScaleNodeProps } from '@resaleai/receipt-ast';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import {
  bytes,
  charToByte,
  duplicateContext,
  renderChildBytes,
  renderChildBytesArr,
} from './util';
import LinkedList from './util/linked-list';

async function renderScale(
  { width, height }: ScaleNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
): Promise<EscPos> {
  if (!parentCtx) {
    throw new Error('No context found');
  }

  if (width > 5) width = 5;
  else if (width < 1) width = 1;
  if (height > 5) height = 5;
  else if (height < 1) height = 1;

  const context = duplicateContext(parentCtx);
  context.scaleBits = 0;
  context.scaleBits |= height - 1;
  context.scaleBits |= (width - 1) << 4;
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

export async function renderScaleArr(
  { width, height }: ScaleNodeProps,
  children?: ChildBuilder<number[]>[],
  parentCtx?: ReceiptNodeContext
): Promise<number[]> {
  if (!parentCtx) {
    throw new Error('No context found');
  }

  if (width > 5) width = 5;
  else if (width < 1) width = 1;
  if (height > 5) height = 5;
  else if (height < 1) height = 1;

  const context = duplicateContext(parentCtx);
  context.scaleBits = 0;
  context.scaleBits |= height - 1;
  context.scaleBits |= (width - 1) << 4;
  const childBytes = await renderChildBytesArr(children, context);
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
}

export default renderScale;
