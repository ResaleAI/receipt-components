import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import {
  bytes,
  charToByte,
  renderChildBytes,
  renderChildBytesArr,
} from './util';
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

export async function renderRootArr(
  _props: null,
  children?: ChildBuilder<number[]>[],
  context?: ReceiptNodeContext
) {
  const childBytes = await renderChildBytesArr(children, context);

  return [
    bytes.ESC,
    charToByte('@'),
    ...childBytes,
    bytes.LF,
    bytes.GS,
    charToByte('V'),
    charToByte('A'),
    3,
  ];
}

export default renderRoot;
