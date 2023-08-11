import { TextLiteralNodeProps } from '@resaleai/receipt-ast';
import { ChildBuilder, EscPos, ReceiptNodeContext } from '@/types';
import { disallowChildren, requireContextKeys, splitLines } from '@/util';
import LinkedList from '@/linked-list';

async function renderTextLiteral(
  { text }: TextLiteralNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
): Promise<EscPos> {
  requireContextKeys(parentCtx, [
    'currentOffset',
    'textJustify',
    'scaleBits',
    'altFontLineLength',
    'defaultLineLength',
    'textMode',
  ]);
  disallowChildren(children);

  // if context.multiLine is true, add newline char every `lineLength` chars
  const lineLength = getLineLength(parentCtx);
  // offset could be wonky... test with scaling and alt font
  const splitText = splitLines(
    text,
    lineLength,
    parentCtx.currentOffset,
    parentCtx.textJustify
  ).join('\n');

  // i forget what this does...
  let counter = parentCtx.currentOffset;
  for (let i = splitText.length - 1; i >= 0; i--) {
    if (splitText[i] === '\n') {
      counter -= parentCtx.currentOffset;
      break;
    }
    counter++;
  }
  parentCtx.currentOffset = counter >= lineLength ? 0 : counter;

  return LinkedList.fromString(splitText);
}

export function getLineLength({
  scaleBits,
  textMode,
  defaultLineLength,
  altFontLineLength,
}: Pick<
  ReceiptNodeContext,
  'scaleBits' | 'textMode' | 'defaultLineLength' | 'altFontLineLength'
>) {
  const font = textMode & 0b1;
  const noScaleLength = font ? altFontLineLength : defaultLineLength;
  const widthScale = (scaleBits >>> 4) + 1;

  return noScaleLength / widthScale;
}

export default renderTextLiteral;
