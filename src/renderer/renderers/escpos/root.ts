import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import { bytes, charToByte, renderChildBytes } from './util';

async function renderRoot(
  _props: null,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  const ret = [
    bytes.ESC,
    charToByte('@'),
    ...(await renderChildBytes(children, context)),
    bytes.LF,
    bytes.GS,
    charToByte('V'),
    charToByte('A'),
    3,
  ];

  return ret;
}

export default renderRoot;
