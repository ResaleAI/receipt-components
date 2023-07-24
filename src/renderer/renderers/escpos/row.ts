import { RowNodeProps } from '@/core/node-builders/row';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import { duplicateContext, renderChildBytes } from './util';

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

export default renderRow;
