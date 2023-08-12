import type { ImageNodeProps } from './types';
import { loadImage } from 'canvas';
import { imageToEscPos } from './process-image';
import { charToByte } from '@resaleai/receipt-escpos-renderer/util';
import LinkedList from '@resaleai/receipt-escpos-renderer/linked-list';
import {
  ChildBuilder,
  EscPos,
  ReceiptNodeContext,
  bytes,
} from '@resaleai/receipt-escpos-renderer';

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
