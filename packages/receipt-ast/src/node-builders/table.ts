// import { EscPos, ReceiptNode } from '@/types';
// import { assertContext, charToByte, renderChildBytesAsList } from '@/util';

// interface TableNodeProps {
//   cols: number;
//   spaceWidth?: number;
// }

// const TableNode: ReceiptNode<TableNodeProps> = {
//   buildHtml({ cols, spaceWidth = 0 }, children) {
//     return `<table><tbody>${children?.join('') ?? ''}</tbody></table>`;
//   },

//   async buildEscPos({ cols, spaceWidth = 0 }, children, parentCtx) {
//     const context = assertContext(parentCtx);

//     cols = Number(cols);

//     context.defaultLineLength = calculateCellWidth(
//       context.defaultLineLength,
//       cols,
//       spaceWidth
//     );
//     context.altFontLineLength = calculateCellWidth(
//       context.altFontLineLength,
//       cols,
//       spaceWidth
//     );

//     const tableItems = await renderChildBytesAsList(children, context);
//     let output: EscPos = [];

//     for (let i = 0; i < tableItems.length; i += cols) {
//       const curr = tableItems.slice(i, i + cols);
//       const currentIdxs = new Array(cols).fill(0);
//       let finishCount = 0;

//       while (finishCount < cols) {
//         outer: for (let j = 0; j < cols; j++) {
//           const currItem = curr[i + j];
//           for (let k = currentIdxs[j]; k < tableItems[j].length; k++) {
//             if (currItem[k] === charToByte('\n')) {
//               //concat currentIdxs[j] up to k to output (add spaces)
//               const cellLine = currItem.slice(currentIdxs[j], k);
//               output = output.concat([...cellLine]);
//               currentIdxs[j] = k + 1;
//               continue outer;
//             }
//           }
//           // concat currentIdxs[j] up to tableItems[j].length to output
//           const cellLine = currItem.slice(currentIdxs[j]);
//           output = output.concat([...cellLine]);

//           // TODO: ADD SPACES FOR FINISHED COLUMNS
//           finishCount++;
//         }
//       }
//     }

//     return output;
//   },
// };

// function calculateCellWidth(
//   lineLength: number,
//   cols: number,
//   spaceWidth: number
// ) {
//   const widthModCol = lineLength % cols;
//   const numSpaces = cols - 1;
//   const spaceWidthTotal = spaceWidth * numSpaces;
//   return (
//     Math.floor(lineLength / cols) -
//     (widthModCol >= spaceWidthTotal ? 0 : spaceWidth)
//   );
// }

// export default TableNode;
