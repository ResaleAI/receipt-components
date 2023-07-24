import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import { bytes, charToByte, renderChildBytes } from './util';
import LinkedList from './util/linked-list';

async function renderRoot(
  _props: null,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  const prependBytes = new LinkedList([bytes.ESC, charToByte('@')]);
  const appendBytes = new LinkedList([
    bytes.LF,
    bytes.GS,
    charToByte('V'),
    charToByte('A'),
    3,
  ]);
  const childBytes = await renderChildBytes(children, context);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export default renderRoot;
