import { ImageNodeProps } from '@/core/node-builders/image';
import { loadImage } from 'canvas';
import processImage from './process-image';
import { bytes, charToByte } from '../util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from '../types';
import LinkedList from '../util/linked-list';

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
  const image = await loadImage(src);
  return new LinkedList([
    bytes.ESC,
    charToByte('a'),
    alignMap[align],
    ...processImage(image, mode, maxWidth),
    bytes.ESC,
    charToByte('a'),
    context?.currentAlign ?? 0,
  ]);
}

export default renderImage;
