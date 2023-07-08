import { EscPos } from '../types';
export declare type OptimizationResult = {
    startIdx: number;
    length: number;
};
export declare type OptimizeFunc = (escpos: EscPos) => OptimizationResult[];
export declare function registerOptimization(func: OptimizeFunc): void;
export declare function optimizeEscPos(escpos: EscPos): EscPos;
