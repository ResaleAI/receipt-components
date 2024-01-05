import { ChildBuilder, EscPos } from '@ep/types';
import { renderChildBytes } from '@ep/util';

async function renderFragment(
  _props: null,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  return await renderChildBytes(children, context);
}

export default renderFragment;
