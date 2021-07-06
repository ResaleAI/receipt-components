import '@babel/polyfill';
import BaseNode from './base.js';
import processImage from '../util/process-image';
// import fsDither from "../dither/fs-dither.js"

class ImageNode extends BaseNode {
  constructor(mods, attrs) {
    super(mods, attrs);

    this.requireAttributes('src');

    const { src, mode = 33 } = this.attrs;

    // process image
    this.src = src;
    this.mode = mode;
  }

  loadImg() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = this.src;
    });
  }

  async prepareImage() {
    this.image = await this.loadImg();

    this.imageBits = processImage(this.image, this.mode);
  }

  renderHTML(data) {}

  renderPrinterBytes(data) {
    return this.imageBits;
  }
}

export default ImageNode;
