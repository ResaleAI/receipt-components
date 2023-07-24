import { BreakNodeProps } from '@/core/node-builders/break';
import { bytes, charToByte } from './util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import LinkedList from './util/linked-list';

const defaultBreakNodeProps: BreakNodeProps = {
  lines: 1,
};

async function renderBreak(
  { lines }: BreakNodeProps = defaultBreakNodeProps,
  _children: ChildBuilder<EscPos>[],
  parentCtx: ReceiptNodeContext
) {
  // reset offset
  parentCtx.currentOffset = 0;

  if (!lines) {
    return new LinkedList([bytes.LF]);
  }

  return new LinkedList([
    bytes.ESC,
    charToByte('d'),
    Number(lines ?? defaultBreakNodeProps.lines),
  ]);
}

export default renderBreak;
