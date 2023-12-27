import {
  ChildBuilder,
  EscPos,
} from '@resaleai/receipt-escpos-renderer';
import {
  charToByte,
  duplicateObject,
  renderChildBytes,
} from '@resaleai/receipt-escpos-renderer/util';
import LinkedList from '@resaleai/receipt-escpos-renderer/linked-list';
import { bytes } from '@resaleai/receipt-escpos-renderer';
import { ColNodeProps } from './types';

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
    // there may be overflow issues with page mode. check this
    childBytes.prepend(bytes.LF);
    parentCtx.numColsInLine = 0;
  }
  const offset = calculateHorizontalPosition(context.horizontalUnits, parentCtx.numColsInLine);
  parentCtx.numColsInLine += cols;


  /* Set start position */
  const prependBytes = new LinkedList([
    bytes.GS,
    charToByte('$'),
    0x00,
    0x00,
    bytes.ESC,
    charToByte('$'),
    offset % 256,
    Math.floor(offset / 256),
  ]);

  childBytes.prependList(prependBytes);

  return childBytes;

  // const offset = context.currentOffset;

  // fill spaces to the end of the line
  // const numSpaces = context.defaultLineLength - offset;
  // const spaces = new LinkedList(Array(numSpaces).fill(charToByte(' ')));
  // if (justify === 'center') {
  //   const leftSpaces = Math.floor(numSpaces / 2);
  //   const rightSpaces = numSpaces - leftSpaces;
  //   childBytes.prependList(
  //     new LinkedList(Array(leftSpaces).fill(charToByte(' ')))
  //   );
  //   childBytes.appendList(
  //     new LinkedList(Array(rightSpaces).fill(charToByte(' ')))
  //   );
  // } else if (justify === 'right') childBytes.prependList(spaces);
  // else childBytes.appendList(spaces);

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

function calculateHorizontalPosition(
  horizontalUnits: number,
  cols: number
) {
  const singleColWidth = Math.floor(
    (horizontalUnits * 3.15) / lineCols
  );
  const colWidth = singleColWidth * cols;

  return colWidth;
}

export default renderCol;
