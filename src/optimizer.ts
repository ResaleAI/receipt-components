import { EscPos } from './types';

type PatternChar = number | '*';

export function optimizeEscPos(escpos: EscPos) {
  const ep = [...escpos];
  let escIdx = -1;
  let startOfTextIdx = -1;
  let endOfTextIdx = -1;
  let nextIsVal = false;
  for (let i = 0; i < ep.length; i++) {
    const byte = ep[i];
    if (byte === 27) {
      escIdx = i;
    } else if (i > 0 && ep[i - 1] === 27) {
      startOfTextIdx = escIdx;
      nextIsVal = true;
      if (startOfTextIdx === i - 1 && endOfTextIdx === i - 2) {
        // remove current, prev, and prev prev bytes
        ep.splice(i - 2, 3);
      }
    } else if (nextIsVal) {
      endOfTextIdx = i;
      nextIsVal = false;
    }
  }

  return ep;
}

function isText(escpos: number[]) {}
