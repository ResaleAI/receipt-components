import { BreakNodeProps } from '@/ast/index';
import { charToByte } from '@ep/util';
import { ChildBuilder, EscPos } from '@ep/types';
import LinkedList from '@ep/linked-list';
import { bytes } from '@ep/constants';

async function renderBreak(
  { lines }: Required<BreakNodeProps>,
  _children: ChildBuilder<EscPos>[],
  parentCtx: RC.ReceiptNodeContext
) {
  // reset offset
  parentCtx.currentOffset = 0;

  if (lines === 1) {
    return new LinkedList([bytes.LF]);
  }

  return new LinkedList([bytes.ESC, charToByte('d'), lines]);
}

export default renderBreak;
