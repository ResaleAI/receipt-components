import { bytes, charToByte, renderChildBytes } from './util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';

async function renderSmooth(
  _props: null,
  children: ChildBuilder<EscPos>[],
  context: ReceiptNodeContext
) {
  return [
    bytes.GS,
    charToByte('b'),
    1,
    ...(await renderChildBytes(children, context)),
    bytes.GS,
    charToByte('b'),
    0,
  ];
}

export default renderSmooth;
