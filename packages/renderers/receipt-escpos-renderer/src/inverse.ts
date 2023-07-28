import {
  bytes,
  charToByte,
  renderChildBytes,
  renderChildBytesArr,
} from './util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import LinkedList from './util/linked-list';

async function renderInverse(
  _props: null,
  children: ChildBuilder<EscPos>[],
  context: ReceiptNodeContext
) {
  const prependBytes = new LinkedList([bytes.GS, charToByte('B'), 1]);
  const appendBytes = new LinkedList([bytes.GS, charToByte('B'), 0]);
  const childBytes = await renderChildBytes(children, context);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export async function renderInverseArr(
  _props: null,
  children: ChildBuilder<number[]>[],
  context: ReceiptNodeContext
) {
  const childBytes = await renderChildBytesArr(children, context);

  return [
    bytes.GS,
    charToByte('B'),
    1,
    ...childBytes,
    bytes.GS,
    charToByte('B'),
    0,
  ];
}

export default renderInverse;
