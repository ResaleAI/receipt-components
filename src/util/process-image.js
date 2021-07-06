import BaseNode from '../components/base';

// returns the appropriate params to the ESC * cmd
// need optimizing
export default function (img, density) {
  const MAX_WIDTH = density > 31 ? 2047 : 1023;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;

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
    const [r, g, b] = dataBuff.slice(i, i + 3);

    const avgVal = (r + g + b) / 3;

    // const avgWithAlpha = avgVal * (a / 255);

    grayscaleBuff.push(avgVal);
  }

  // get high and low byte for width
  const widthHigh = (canvas.width & 0xff00) >> 8;
  const widthLow = canvas.width & 0xff;

  let offset = 0;
  let heightDens = density > 31 ? 3 : 1;
  let finalImgBuff = [
    BaseNode.bytes.ESC,
    '3',
    8 * heightDens,
    BaseNode.bytes.ESC,
    'U',
    1,
  ]; // start it with uni mode

  // return finalImgBuff;
  // loop and create the command for each line
  while (offset < canvas.height) {
    // add esc pos cmds and info
    finalImgBuff.push(BaseNode.bytes.ESC, '*', density, widthLow, widthHigh);

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
    finalImgBuff.push(BaseNode.bytes.LF);
  }

  // reset line height
  finalImgBuff.push(BaseNode.bytes.ESC, '2', BaseNode.bytes.ESC, 'U', 0);

  // return array of the m nL nH d1...dK params
  return finalImgBuff;
}
