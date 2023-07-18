import { ReceiptNode } from '@/types';
import { bytes, charToByte } from '@/util';
import processImage from '@/util/processImage';
import { loadImage } from 'canvas';

interface ImageNodeProps {
  src: string;
  mode?: 0 | 1 | 32 | 33;
  align?: 'left' | 'center' | 'right';
}

const alignMap = {
  left: 0,
  center: 1,
  right: 2,
};

// function loadImg(src: string) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = src;
//   });
// }

const ImageNode: ReceiptNode<ImageNodeProps> = {
  buildHtml({ src }, _children) {
    return `<img src="${src}" />`;
  },
  async buildEscPos({ src, mode, align }, _children, context) {
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
  },
};

export default ImageNode;
