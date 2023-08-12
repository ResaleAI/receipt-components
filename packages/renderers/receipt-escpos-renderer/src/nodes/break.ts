import { BreakNodeProps } from '@resaleai/receipt-ast';
import { charToByte } from '@/util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from '@/types';
import LinkedList from '@/linked-list';
import { bytes } from '@/constants';

async function renderBreak(
  { lines }: Required<BreakNodeProps>,
  _children: ChildBuilder<EscPos>[],
  parentCtx: ReceiptNodeContext
) {
  // reset offset
  parentCtx.currentOffset = 0;

  if (lines === 1) {
    return new LinkedList([bytes.LF]);
  }

  return new LinkedList([bytes.ESC, charToByte('d'), lines]);
}

export default renderBreak;
