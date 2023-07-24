import { AlignNodeProps } from '@/core/node-builders/align';
import { ChildBuilder, EscPos, EscPosByte, ReceiptNodeContext } from './types';
import { bytes, charToByte, duplicateContext, renderChildBytes } from './util';
import LinkedList from './util/linked-list';

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
  context.currentOffset = 0;

  const prependBytes = new LinkedList<EscPosByte>([
    bytes.LF,
    bytes.ESC,
    charToByte('a'),
    modeByte,
  ]);
  const appendBytes = new LinkedList<EscPosByte>([
    bytes.ESC,
    charToByte('a'),
    parentCtx.currentAlign,
  ]);

  const childBytes = await renderChildBytes(children, context);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export default renderAlign;
