import { EscPos } from '@/types';

export type OptimizationResult = { startIdx: number; length: number };
export type OptimizeFunc = (escpos: EscPos) => OptimizationResult[];

const optimizations: OptimizeFunc[] = [];

export function registerOptimization(func: OptimizeFunc) {
  optimizations.push(func);
}

export function optimizeEscPos(escpos: EscPos): EscPos {
  const optimizedEscPos = [...escpos];
  // run other optimizations
  for (const optimization of optimizations) {
    const res = optimization(optimizedEscPos);
    for (const r of res) {
      if (r.startIdx !== -1) optimizedEscPos.splice(r.startIdx, r.length);
    }
  }

  return optimizedEscPos;
}
