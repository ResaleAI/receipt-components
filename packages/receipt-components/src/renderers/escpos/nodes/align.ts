import { AlignNodeProps } from '@ast';
import { ChildBuilder, EscPos, EscPosByte } from '@ep/types';
import {
  charToByte,
  duplicateObject,
  renderChildBytes,
  requireContextKeys,
} from '@ep/util';
import LinkedList from '@ep/linked-list';
import { bytes } from '@ep/constants';

const modeMap: Record<Required<AlignNodeProps>['mode'], 0 | 1 | 2> = {
  left: 0x00,
  center: 0x01,
  right: 0x02,
} as const;

async function renderAlign(
  { mode }: Required<AlignNodeProps>,
  children?: ChildBuilder<EscPos>[],
  parentCtx?: ReceiptNodeContext
) {
  const modeByte = modeMap[mode];

  requireContextKeys(parentCtx, ['currentAlign']);

  parentCtx.currentOffset = 0;

  const context = duplicateObject(parentCtx);

  context.currentAlign = modeByte;

  const prependBytes = new LinkedList<EscPosByte>([
    bytes.LF,
    bytes.ESC,
    charToByte('a'),
    modeByte,
  ]);
  const appendBytes = new LinkedList<EscPosByte>([
    bytes.LF,
    bytes.ESC,
    charToByte('a'),
    parentCtx.currentAlign,
  ]);

  const childBytes = await renderChildBytes(children, context);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
}

export default renderAlign;
