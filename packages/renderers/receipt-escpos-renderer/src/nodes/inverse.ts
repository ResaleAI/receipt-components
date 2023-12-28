import { charToByte, renderChildBytes } from '@/util';
import { ChildBuilder, EscPos } from '@/types';
import LinkedList from '@/linked-list';
import { bytes } from '@/constants';

async function renderInverse(
  _props: null,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  const prependBytes = new LinkedList([bytes.GS, charToByte('B'), 1]);
  const appendBytes = new LinkedList([bytes.GS, charToByte('B'), 0]);
  const childBytes = await renderChildBytes(children, context);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export default renderInverse;
