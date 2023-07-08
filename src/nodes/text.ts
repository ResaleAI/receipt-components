import {
  bytes,
  charToByte,
  duplicateContext,
  flattenEscPos,
  renderChildBytes,
} from '@/util';
import { ReceiptNode } from '../types';

const modes = {
  font1: 0b0,
  font2: 0b1,
  bold: 0b1000,
  long: 0b10000,
  wide: 0b100000,
  underline: 0b10000000,
} as const;

interface TextNodeProps {
  font?: '1' | '2';
  bold?: boolean;
  long?: boolean;
  wide?: boolean;
  underline?: boolean;
  reset?: boolean;
}

const TextNode: ReceiptNode<TextNodeProps> = {
  buildHtml(props, children) {
    return `<span>${children}</span>`;
  },
  async buildEscPos(props, children, parentCtx) {
    const bold = props.bold !== undefined ? modes.bold : 0;
    const font = props.font === '2' ? modes.font2 : modes.font1;

    if (!parentCtx) {
      throw new Error('Context is required for text node');
    }

    const context = duplicateContext(parentCtx);

    console.log('context: ', context.textMode);

    let mode = context.textMode;
    mode |= bold;

    // there is likely a better way to do this
    if (mode & modes.font2) {
      mode &= font;
    } else {
      mode |= font;
    }

    if (props.reset) {
      mode = 0;
    }

    if (mode === context.textMode) {
      return renderChildBytes(children, context);
    }

    context.textMode = mode;

    return [
      bytes.ESC,
      charToByte('!'),
      mode,
      ...(await renderChildBytes(children, context)),
      bytes.ESC,
      charToByte('!'),
      parentCtx.textMode,
    ];
  },
};

export default TextNode;
