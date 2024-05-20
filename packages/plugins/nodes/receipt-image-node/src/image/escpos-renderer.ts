import type { ImageNodeProps } from './types';
import { loadImage } from 'canvas';
import { imageToEscPos } from './process-image';
import {
  charToByte,
  LinkedList,
  ChildBuilder,
  EscPos,
  bytes,
} from '@resaleai/receipt-components';

const alignMap = {
  left: 0,
  center: 1,
  right: 2,
};

async function renderImage(
  { src, mode, align, maxWidth }: ImageNodeProps,
  _children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  maxWidth = Number(maxWidth);
  if (!align) {
    align = 'center';
  }
  if (!mode) {
    mode = 33;
  }
  return new LinkedList([
    bytes.ESC,
    charToByte('a'),
    alignMap[align],
    ...(await imageToEscPos(src, mode, maxWidth)),
    bytes.ESC,
    charToByte('a'),
    context?.currentAlign ?? 0,
  ]);
}

export default renderImage;
