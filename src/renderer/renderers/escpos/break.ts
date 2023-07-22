import { BreakNodeProps } from '@/core/node-builders/break';
import { bytes, charToByte } from './util';

const defaultBreakNodeProps: BreakNodeProps = {
  lines: 1,
};

async function renderBreak({ lines }: BreakNodeProps = defaultBreakNodeProps) {
  if (!lines) {
    return [bytes.LF];
  }
  return [
    bytes.ESC,
    charToByte('d'),
    Number(lines ?? defaultBreakNodeProps.lines),
  ];
}

export default renderBreak;
