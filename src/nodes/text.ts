import {
  bytes,
  charToByte,
  duplicateContext,
  flattenEscPos,
  renderChildBytes,
} from '@/util';
import { EscPos, ReceiptNode, ReceiptNodeContext } from '../types';

const modes = {
  font1: 0b0,
  font2: 0b1,
  bold: 0b1000,
  underline: 0b10000000,
} as const;

const defaultLineLength = 42;
const altFontLineLength = 56;

interface TextNodeProps {
  font?: '1' | '2';
  bold?: boolean;
  underline?: boolean;
  reset?: boolean;
}

const TextNode: ReceiptNode<TextNodeProps> = {
  buildHtml(props, children) {
    const bold = props.bold !== undefined;
    return `<p style="margin: none; font-family: monospace; ${
      bold ? 'font-weight: bold;' : ''
    }">${children}</p>`;
  },
  async buildEscPos(props, children, parentCtx) {
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

    // if context.multiLine is true, add newline char every `lineLength` chars
    let childBytes = [...(await renderChildBytes(children, context))];
    if (mode === context.textMode) {
      return childBytes;
    }

    context.textMode = mode;

    return [
      bytes.ESC,
      charToByte('!'),
      mode,
      ...childBytes,
      bytes.ESC,
      charToByte('!'),
      parentCtx.textMode,
    ];
  },
};

export default TextNode;
