import { RowNodeProps } from '@resaleai/receipt-ast';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import {
  duplicateContext,
  renderChildBytes,
  renderChildBytesArr,
} from './util';

async function renderRow(
  { justify }: RowNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
): Promise<EscPos> {
  if (!parentCtx) {
    throw new Error('Context is required for row node');
  }

  const context = duplicateContext(parentCtx);
  const childBytes = await renderChildBytes(children, context);
  parentCtx.currentOffset = context.currentOffset;
  return childBytes;
}

export async function renderRowArr(
  { justify }: RowNodeProps,
  children?: ChildBuilder<number[]>[],
  parentCtx?: ReceiptNodeContext
): Promise<number[]> {
  if (!parentCtx) {
    throw new Error('Context is required for row node');
  }

  const context = duplicateContext(parentCtx);
  const childBytes = await renderChildBytesArr(children, context);
  parentCtx.currentOffset = context.currentOffset;
  return childBytes;
}

export default renderRow;
