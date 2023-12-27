import {
  ChildBuilder,
  EscPos,
  LinkedListNode,
} from '@resaleai/receipt-escpos-renderer';
import {
  charToByte,
  duplicateObject,
  renderChildBytes,
  renderChildBytesList,
} from '@resaleai/receipt-escpos-renderer/util';
import LinkedList from '@resaleai/receipt-escpos-renderer/linked-list';
import { bytes } from '@resaleai/receipt-escpos-renderer';
import { RowNodeProps } from './types';

async function renderRow(
  props: RowNodeProps,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
): Promise<EscPos> {
  if (!parentCtx) {
    throw new Error('Context is required for row node');
  }

  // const context = duplicateObject(parentCtx);
  // const childBytesList = await renderChildBytesList(children, context);
  // const subLists = buildChildSubLists(childBytesList);
  // const subListLength = subLists[0].length;
  // const childBytes: EscPos = new LinkedList();

  // for (let i = 0; i < subListLength; i++) {
  //   for (let j = 0; j < childBytesList.length; j++) {
  //     childBytes.appendList(subLists[j][i]);
  //   }
  //   childBytes.append(charToByte('\n'));
  // }

  // parentCtx.currentOffset = context.currentOffset;
  // return childBytes;

  const context = duplicateObject(parentCtx);
  const childBytes = await renderChildBytes(children, context);
  /* Enter page mode */
  const prependBytes = new LinkedList([
    /* Reset printer */
    bytes.ESC,
    charToByte('@'),
    /* ------------- */

    /* Enter page mode */
    bytes.ESC,
    charToByte('L'),
    /* --------------- */
  ])

  const appendBytes = new LinkedList([
    /* Print and exit page mode */
    bytes.ESC,
    bytes.FF,
    /* ------------------------ */
  ])

  childBytes.prependList(prependBytes);
  childBytes.appendList(appendBytes);

  return childBytes;
}

// build an array of sublists for each child
export function buildChildSubLists(children: EscPos[]): EscPos[][] {
  const childSubLists: EscPos[][] = new Array(children.length)
    .fill(null)
    .map(() => []);
  let done = new Array(children.length).fill(false);
  const lineLengths = children.map(computeLineLengthOfChild);
  const startNodes = children.map((c) => c.head);

  while (done.some((d) => !d)) {
    for (let i = 0; i < children.length; i++) {
      if (done[i]) {
        // push spaces if done with child
        childSubLists[i].push(
          new LinkedList(new Array(lineLengths[i]).fill(charToByte(' ')))
        );
      } else {
        // loop thru child and push sublist until line break
        const list = children[i];
        let node = startNodes[i];
        while (node) {
          node = node.next;
          if (node && node.data === bytes.LF) {
            const sl = list.subList(startNodes[i]!, node);
            childSubLists[i].push(sl);
            if (node === list.tail) {
              done[i] = true;
            } else {
              startNodes[i] = node.next;
            }
            break;
          } else if (node && node === list.tail) {
            const subList = list.subList(startNodes[i]!, node);
            subList.append(node.data);
            childSubLists[i].push(subList);
            done[i] = true;
            break;
          }
        }

        if (!node) done[i] = true;
      }
    }
  }

  return childSubLists;
}

function computeLineLengthOfChild(child: EscPos) {
  let counter = 0;
  let node: LinkedListNode<number> | null = child.head;
  while (node) {
    counter++;
    node = node.next;
    if (node && node.data === bytes.LF) {
      break;
    }
  }
  return counter;
}

export default renderRow;
