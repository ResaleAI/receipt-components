import { ReceiptNode } from '@/types';
import processImage from '@/util/processImage';

interface ImageNodeProps {
  src: string;
  mode: number;
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const ImageNode: ReceiptNode<ImageNodeProps> = {
  buildHtml({ src }, _children) {
    return `<img src="${src}" />`;
  },
  async buildEscPos({ src, mode }, _children) {
    const image = await loadImg(src);
    return processImage(image, mode);
  },
};

export default ImageNode;
