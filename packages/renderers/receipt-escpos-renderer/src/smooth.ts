import {
  bytes,
  charToByte,
  renderChildBytes,
  renderChildBytesArr,
} from './util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import LinkedList from './util/linked-list';

async function renderSmooth(
  _props: null,
  children: ChildBuilder<EscPos>[],
  context: ReceiptNodeContext
) {
  const prependBytes = new LinkedList([bytes.GS, charToByte('b'), 1]);
  const appendBytes = new LinkedList([bytes.GS, charToByte('b'), 0]);
  const childBytes = await renderChildBytes(children, context);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export async function renderSmoothArr(
  _props: null,
  children: ChildBuilder<number[]>[],
  context: ReceiptNodeContext
) {
  const childBytes = await renderChildBytesArr(children, context);

  return [
    bytes.GS,
    charToByte('b'),
    1,
    ...childBytes,
    bytes.GS,
    charToByte('b'),
    0,
  ];
}

export default renderSmooth;
