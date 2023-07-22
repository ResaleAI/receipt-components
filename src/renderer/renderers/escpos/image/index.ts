import { ImageNodeProps } from '@/core/node-builders/image';
import { loadImage } from 'canvas';
import processImage from './process-image';
import { bytes, charToByte } from '../util';
import { ChildBuilder, EscPos, ReceiptNodeContext } from '../types';

const alignMap = {
  left: 0,
  center: 1,
  right: 2,
};

async function renderImage(
  { src, mode, align }: ImageNodeProps,
  _children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) {
  if (!align) {
    align = 'center';
  }
  if (!mode) {
    mode = 33;
  }
  const image = await loadImage(src);
  return [
    bytes.ESC,
    charToByte('a'),
    alignMap[align],
    ...processImage(image, mode),
    bytes.ESC,
    charToByte('a'),
    context?.currentAlign ?? 0,
  ];
}

export default renderImage;
