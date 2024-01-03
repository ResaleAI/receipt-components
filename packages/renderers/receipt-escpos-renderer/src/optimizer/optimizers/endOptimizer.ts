import { bytes } from '@/constants';
import { EscPos } from '../../types';
import { charToByte } from '../../util';
import { OptimizationResult } from '../types';

// Remove scale, align, and text reset before end of escpos
export default function endOptimizer(escpos: number[]): OptimizationResult[] {
  const endBytes = 5;
  const startIdx = escpos.length - endBytes - 3;
  if (
    escpos[startIdx] === bytes.ESC &&
    escpos[startIdx + 1] === charToByte('!')
  ) {
    return [{ startIdx, length: 3 }];
  }
  if (
    escpos[startIdx] === bytes.GS &&
    escpos[startIdx + 1] === charToByte('!')
  ) {
    return [{ startIdx, length: 3 }];
  }
  if (
    escpos[startIdx] === bytes.ESC &&
    escpos[startIdx + 1] === charToByte('a')
  ) {
    return [{ startIdx, length: 3 }];
  }

  return [{ startIdx: -1, length: -1 }];
}
