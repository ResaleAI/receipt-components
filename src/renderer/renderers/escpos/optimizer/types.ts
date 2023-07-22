import { EscPos } from '../types';

export type OptimizationResult = { startIdx: number; length: number };
export type OptimizeFunc = (escpos: EscPos) => OptimizationResult[];

/* Pattern optimizer */
export type PatternChar = number | '*';

export type Pattern = PatternChar[];

export type PatternTree = {
  [key in PatternChar]?: PatternTree;
};
