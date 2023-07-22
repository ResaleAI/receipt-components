import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import { bytes, charToByte, duplicateContext, renderChildBytes } from './util';
import { TextNodeProps } from '@/core/node-builders/text';

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
  const bold = props.bold !== undefined ? modes.bold : 0;
  const font = props.font === '2' ? modes.font2 : modes.font1;
  const underline = props.underline !== undefined ? modes.underline : 0;

  if (!parentCtx) {
    throw new Error('Context is required for text node');
  }

  const context = duplicateContext(parentCtx);

  let mode = context.textMode;
  mode |= bold | underline;

  // there is likely a better way to do this
  if (mode & modes.font2) {
    mode &= font;
  } else {
    mode |= font;
  }

  if (props.reset !== undefined) {
    mode = 0;
  }

  context.textMode = mode;
  // if context.multiLine is true, add newline char every `lineLength` chars
  let childBytes = [...(await renderChildBytes(children, context))];
  parentCtx.currentOffset = context.currentOffset;
  if (parentCtx.textMode === context.textMode) {
    return childBytes;
  }

  return [
    bytes.ESC,
    charToByte('!'),
    mode,
    ...childBytes,
    bytes.ESC,
    charToByte('!'),
    parentCtx.textMode,
  ];
}

export default renderText;
