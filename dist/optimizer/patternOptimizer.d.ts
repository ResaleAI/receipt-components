import { EscPos } from '../types';
import { OptimizationResult } from './optimizer';
declare type PatternChar = number | '*';
declare type Pattern = PatternChar[];
declare type PatternTree = {
    [key in PatternChar]?: PatternTree;
};
export default function patternOptimizer(escpos: EscPos): OptimizationResult[];
export declare function registerPattern(pattern: Pattern): void;
export declare function buildPatternTree(): PatternTree;
declare type PatternMatchResult = {
    success: boolean;
    startIdx: number;
    length: number;
    newIdx: number;
    patternStr: string;
};
export declare function matchPattern(tree: PatternTree, escpos: EscPos, startIdx: number): PatternMatchResult;
export declare function printPatternTree(tree: PatternTree, depth?: number): void;
export {};
