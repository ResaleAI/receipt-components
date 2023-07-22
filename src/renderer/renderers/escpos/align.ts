import { AlignNodeProps } from '@/core/node-builders/align';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import { bytes, charToByte, duplicateContext, renderChildBytes } from './util';

const modeMap: Record<AlignNodeProps['mode'], number> = {
  left: 0x00,
  center: 0x01,
  right: 0x02,
};

async function renderAlign(
  { mode }: AlignNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
) {
  const modeByte = modeMap[mode];

  if (!parentCtx) {
    throw new Error('No context found');
  }

  const context = duplicateContext(parentCtx);

  // if (context.currentAlign === modeByte) {
  //   return renderChildBytes(children, parentCtx);
  // }

  context.currentAlign = modeByte;

  const retVal = [
    bytes.ESC,
    charToByte('a'),
    modeByte,
    ...(await renderChildBytes(children, context)),
    bytes.ESC,
    charToByte('a'),
    parentCtx.currentAlign,
  ];

  return retVal;
}

export default renderAlign;
