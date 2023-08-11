import { ColNodeProps } from '@resaleai/receipt-ast';
import { ChildBuilder, EscPos, EscPosByte, ReceiptNodeContext } from '@/types';
import { charToByte, duplicateObject, renderChildBytes } from '@/util';
import LinkedList from '@/linked-list';
import { bytes } from '@/constants';

const lineCols = 10;

// TODO: add ability to customize num cols in row
//       add multiline support

async function renderCol(
  { cols: colString, justify }: ColNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
): Promise<EscPos> {
  if (!parentCtx) {
    throw new Error('Context is required for row node');
  }

  const context = duplicateObject(parentCtx);
  const cols = Number(colString);
  const [newDefaultLineLength, newAltFontLineLength] = calculateLineLength(
    parentCtx,
    cols
  );
  context.defaultLineLength = newDefaultLineLength;
  context.altFontLineLength = newAltFontLineLength;

  const childBytes = await renderChildBytes(children, context);
  if (parentCtx.numColsInLine + cols > lineCols) {
    childBytes.prepend(bytes.LF);
    parentCtx.numColsInLine = 0;
  }
  parentCtx.numColsInLine += cols;

  const offset = context.currentOffset;

  // fill spaces to the end of the line
  const numSpaces = context.defaultLineLength - offset;
  const spaces = new LinkedList(Array(numSpaces).fill(charToByte(' ')));
  if (justify === 'center') {
    const leftSpaces = Math.floor(numSpaces / 2);
    const rightSpaces = numSpaces - leftSpaces;
    childBytes.prependList(
      new LinkedList(Array(leftSpaces).fill(charToByte(' ')))
    );
    childBytes.appendList(
      new LinkedList(Array(rightSpaces).fill(charToByte(' ')))
    );
  } else if (justify === 'right') childBytes.prependList(spaces);
  else childBytes.appendList(spaces);

  return childBytes;
}

function calculateLineLength(
  lineLengths: { defaultLineLength: number; altFontLineLength: number },
  cols: number
) {
  const singleDefaultColWidth = Math.floor(
    lineLengths.defaultLineLength / lineCols
  );
  const singleAltFontColWidth = Math.floor(
    lineLengths.altFontLineLength / lineCols
  );
  const colDefaultLength = singleDefaultColWidth * cols;
  const colAltFontLength = singleAltFontColWidth * cols;

  return [colDefaultLength, colAltFontLength];
}

export default renderCol;
