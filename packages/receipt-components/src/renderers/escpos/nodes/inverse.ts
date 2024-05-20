import { charToByte, renderChildBytes } from '@ep/util';
import { ChildBuilder, EscPos } from '@ep/types';
import LinkedList from '@ep/linked-list';
import { bytes } from '@ep/constants';

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
