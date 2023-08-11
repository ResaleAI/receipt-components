import { charToByte, renderChildBytes } from '@/util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from '@/types';
import LinkedList from '@/linked-list';
import { bytes } from '@/constants';

async function renderSmooth(
  _props: null,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  const prependBytes = new LinkedList([bytes.GS, charToByte('b'), 1]);
  const appendBytes = new LinkedList([bytes.GS, charToByte('b'), 0]);
  const childBytes = await renderChildBytes(children, context);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export default renderSmooth;
