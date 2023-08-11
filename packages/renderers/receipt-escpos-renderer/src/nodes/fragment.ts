import { ChildBuilder, EscPos, ReceiptNodeContext } from '@/types';
import { renderChildBytes } from '@/util';

async function renderFragment(
  _props: null,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  return await renderChildBytes(children, context);
}

export default renderFragment;
