import type { ImageNodeProps } from './types';
import { imageToEscPos } from './process-image';
import { charToByte } from '@resaleai/receipt-escpos-renderer/util';
import { bytes } from '@resaleai/receipt-escpos-renderer';

import {
  ChildBuilder,
  EscPos,
  ReceiptNodeContext,
} from '@resaleai/receipt-escpos-renderer';
import LinkedList from '@resaleai/receipt-escpos-renderer/linked-list';

const alignMap = {
  left: 0,
  center: 1,
  right: 2,
};

// function loadImage(src: string): Promise<HTMLImageElement> {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = src;
//   });
// }

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
