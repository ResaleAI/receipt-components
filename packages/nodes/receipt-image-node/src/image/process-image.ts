// returns the appropriate params to the ESC * cmd

import { bytes, charToByte } from '@resaleai/receipt-escpos-renderer/util';
import { createCanvas } from 'canvas';

// need optimizing
function processImage(img: any, density: number, maxWidthPct?: number) {
  const MAX_WIDTH = (density > 31 ? 511 : 255) * (maxWidthPct ?? 1);
  // const canvas = document.createElement('canvas');
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // properly scale
  if (canvas.width > MAX_WIDTH) {
    canvas.height *= MAX_WIDTH / canvas.width;
    canvas.width = MAX_WIDTH;
  }

  // draw image and get its data
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const dataBuff = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const grayscaleBuff = []; // should have length equal to w * h

  // grayscale and flatten the image
  for (let i = 0; i < dataBuff.length; i += 4) {
    const [r, g, b, a] = dataBuff.slice(i, i + 4);

    const avgVal = (r + g + b) / 3;

    const alpha = a / 255;

    grayscaleBuff.push(alpha > 0 ? avgVal : 255);
  }

  // get high and low byte for width
  const widthHigh = (canvas.width & 0xff00) >> 8;
  const widthLow = canvas.width & 0xff;

  let offset = 0;
  let heightDens = density > 31 ? 3 : 1;
  let finalImgBuff = [
    bytes.ESC,
    charToByte('3'),
    8 * heightDens,
    bytes.ESC,
    charToByte('U'),
    1,
  ]; // start it with uni mode

  // return finalImgBuff;
  // loop and create the command for each line
  while (offset < canvas.height) {
    // add esc pos cmds and info
    finalImgBuff.push(bytes.ESC, charToByte('*'), density, widthLow, widthHigh);

    for (let x = 0; x < canvas.width; x++) {
      // 3 columns per image w mode > 31
      for (let k = 0; k < heightDens; k++) {
        let colSlice = 0;
        // loop for 8 pixels in a col
        for (let b = 0; b < 8; b++) {
          var currY = (offset / 8 + k) * 8 + b;

          var pixelIdx = currY * canvas.width + x;

          // get the data and convert dark spots to draw spots
          let bmpVal = grayscaleBuff[pixelIdx] < 127 || false;

          colSlice |= (bmpVal ? 1 : 0) << (7 - b);
        }
        // add the data to buffer after processing
        finalImgBuff.push(colSlice);
      }
    }

    offset += 8 * heightDens;
    // lf?
    finalImgBuff.push(bytes.LF);
  }

  // reset line height
  finalImgBuff.push(bytes.ESC, charToByte('2'), bytes.ESC, charToByte('U'), 0);

  // return array of the m nL nH d1...dK params
  return finalImgBuff;
}

export default processImage;
