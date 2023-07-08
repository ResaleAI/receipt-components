import { EscPos } from '@/types';
import { bytes, charToByte } from '@/util';
import { OptimizationResult } from './optimizer';

type PatternChar = number | '*';

type Pattern = PatternChar[];

type PatternTree = {
  [key in PatternChar]?: PatternTree;
};

const patterns: Pattern[] = [
  [bytes.ESC, charToByte('!'), '*'],
  [bytes.ESC, charToByte('a'), '*'],
  [bytes.GS, charToByte('V'), charToByte('A'), '*'],
];

export default function patternOptimizer(escpos: EscPos): OptimizationResult[] {
  const stack: PatternMatchResult[] = [];
  const tree = buildPatternTree();
  let prevMatch: PatternMatchResult | undefined = undefined;
  let i = 0;

  // create a queue of matches to be removed at the end
  while (i < escpos.length) {
    const match = matchPattern(tree, escpos, i);
    if (match.success) {
      if (prevMatch) {
        if (prevMatch.patternStr === match.patternStr) {
          stack.push(prevMatch);
        }
      }
      i = match.newIdx;
    } else {
      i++;
    }
    prevMatch = match;
  }

  const res = [];

  // remove matches from the queue
  while (stack.length > 0) {
    const match = stack.pop()!;
    res.push({ startIdx: match.startIdx, length: match.length });
  }

  return res;
}

export function registerPattern(pattern: Pattern) {
  patterns.push(pattern);
}

export function buildPatternTree(): PatternTree {
  const tree: PatternTree = {};

  for (const pattern of patterns) {
    let node = tree;
    for (const char of pattern) {
      if (node[char] === undefined) {
        node[char] = {};
      }
      node = node[char]!;
    }
  }

  return tree;
}

type PatternMatchResult = {
  success: boolean;
  startIdx: number;
  length: number;
  newIdx: number;
  patternStr: string;
};

export function matchPattern(
  tree: PatternTree,
  escpos: EscPos,
  startIdx: number
): PatternMatchResult {
  let node = tree;
  let i = startIdx;
  let length = -1;
  let newIdx = -1;
  let patternStr = '';
  let success = false;
  for (; i < escpos.length; i++) {
    const byte = escpos[i];
    if (node[byte] === undefined && node['*'] === undefined) {
      newIdx = startIdx + 1;
      startIdx = -1;
      patternStr = '';
      break;
    }
    patternStr += node[byte] ? `${byte}` : '*';
    node = node[byte] ?? node['*']!;
    if (isEmpty(node)) {
      newIdx = i + 1;
      length = i - startIdx + 1;
      success = true;
      break;
    }
  }

  return { success, startIdx, length, newIdx, patternStr };
}

export function printPatternTree(tree: PatternTree, depth = 0) {
  if (isEmpty(tree)) {
    return;
  }

  for (const key in tree) {
    console.log(`${' '.repeat(depth)}${key}`);
    printPatternTree(tree[key]!, depth + 1);
  }
}

function isEmpty(obj: Record<string, any>) {
  for (let i in obj) return false;
  return true;
}
