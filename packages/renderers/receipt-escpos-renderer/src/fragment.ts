import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import { renderChildBytes, renderChildBytesArr } from './util';

async function renderFragment(
  _props: null,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  return await renderChildBytes(children, context);
}

export async function renderFragmentArr(
  _props: null,
  children?: ChildBuilder<number[]>[],
  context?: ReceiptNodeContext
) {
  return await renderChildBytesArr(children, context);
}

export default renderFragment;
