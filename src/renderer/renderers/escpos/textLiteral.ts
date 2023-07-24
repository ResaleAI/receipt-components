import { TextLiteralNodeProps } from '@/core/node-builders/text-literal';
import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import { splitLines } from './util';
import LinkedList from './util/linked-list';

async function renderTextLiteral(
  { text }: TextLiteralNodeProps,
  children: ChildBuilder<EscPos>[],
  parentCtx: ReceiptNodeContext
): Promise<EscPos> {
  if (!parentCtx) {
    throw new Error('Context is required for text node');
  }

  if (children && children.length > 0) {
    throw new Error('Text literal node cannot have children');
  }

  // if context.multiLine is true, add newline char every `lineLength` chars
  const lineLength = getLineLength(parentCtx);
  // offset could be wonky... test with scaling and alt font
  const splitText = splitLines(text, lineLength, parentCtx.currentOffset, 1);
  let counter = parentCtx.currentOffset;
  for (let i = splitText.length - 1; i >= 0; i--) {
    if (splitText[i] === '\n') {
      counter -= parentCtx.currentOffset;
      break;
    }
    counter++;
  }
  const scaleWidth = (parentCtx.scaleBits >>> 4) + 1;
  parentCtx.currentOffset = counter >= lineLength ? 0 : counter;

  return LinkedList.fromString(splitText);
}

function getLineLength({
  scaleBits,
  textMode,
  defaultLineLength,
  altFontLineLength,
}: ReceiptNodeContext) {
  const font = textMode & 0b1;
  const noScaleLength = font ? altFontLineLength : defaultLineLength;
  const widthScale = (scaleBits >>> 4) + 1;

  return noScaleLength / widthScale;
}

export default renderTextLiteral;
