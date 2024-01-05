import { ChildBuilder, EscPos } from '@ep/types';
import {
  charToByte,
  duplicateObject,
  renderChildBytes,
  requireContextKeys,
} from '@ep/util';
import { TextNodeProps } from '@resaleai/receipt-ast';
import LinkedList from '@ep/linked-list';
import { bytes } from '@ep/constants';

const modes = {
  font1: 0b0,
  font2: 0b1,
  bold: 0b1000,
  underline: 0b10000000,
} as const;

async function renderText(
  props: TextNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
): Promise<EscPos> {
  requireContextKeys(parentCtx, ['textMode']);

  const context = duplicateObject(parentCtx);

  context.textMode = computeModeBits(props, context.textMode);

  let childBytes = await renderChildBytes(children, context);
  parentCtx.currentOffset = context.currentOffset;

  if (parentCtx.textMode === context.textMode) {
    return childBytes;
  }

  const prependBytes = new LinkedList([
    bytes.ESC,
    charToByte('!'),
    context.textMode,
  ]);
  const appendBytes = new LinkedList([
    bytes.ESC,
    charToByte('!'),
    parentCtx.textMode,
  ]);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export function computeModeBits(
  { bold, underline, font, reset }: TextNodeProps,
  initialMode: number
): number {
  if (reset) {
    return 0;
  }
  const boldBits = bold ? modes.bold : 0;
  const fontBits = font === 2 ? modes.font2 : font === 1 ? modes.font1 : null;
  const underlineBits = underline ? modes.underline : 0;

  let mode = initialMode;

  mode |= boldBits | underlineBits;

  // there is likely a better way to do this
  if (fontBits !== null) {
    if (mode & modes.font2) {
      mode &= fontBits;
    } else {
      mode |= fontBits;
    }
  }

  return mode;
}

export default renderText;
