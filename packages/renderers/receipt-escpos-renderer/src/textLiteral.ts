import { TextLiteralNodeProps } from '@resaleai/receipt-ast';
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
  const splitText = splitLines(
    text,
    lineLength,
    parentCtx.currentOffset,
    parentCtx.textJustify
  );
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

export async function renderTextLiteralArr(
  { text }: TextLiteralNodeProps,
  children: ChildBuilder<number[]>[],
  parentCtx: ReceiptNodeContext
): Promise<number[]> {
  if (!parentCtx) {
    throw new Error('Context is required for text node');
  }

  if (children && children.length > 0) {
    throw new Error('Text literal node cannot have children');
  }

  // if context.multiLine is true, add newline char every `lineLength` chars
  const lineLength = getLineLength(parentCtx);
  // offset could be wonky... test with scaling and alt font
  console.log(parentCtx.textJustify);
  const splitText = splitLines(
    text,
    lineLength,
    parentCtx.currentOffset,
    parentCtx.textJustify
  );
  let counter = parentCtx.currentOffset;
  for (let i = splitText.length - 1; i >= 0; i--) {
    if (splitText[i] === '\n') {
      counter -= parentCtx.currentOffset;
      break;
    }
    counter++;
  }
  parentCtx.currentOffset = counter >= lineLength ? 0 : counter;

  return [...Buffer.from(splitText)];
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
