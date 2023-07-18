import { EscPos, OptimizationResult, Pattern, PatternTree } from '@/types';
import { bytes, charToByte } from '@/util';

const patterns: Pattern[] = [
  [bytes.ESC, charToByte('!'), '*'],
  [bytes.ESC, charToByte('a'), '*'],
  [bytes.GS, charToByte('V'), charToByte('A'), '*'],
];

export default function patternOptimizer(escpos: EscPos): OptimizationResult[] {
  const removeStack: PatternMatchResult[] = [];
  const tree = buildPatternTree();
  let prevMatch: PatternMatchResult | undefined = undefined;
  const state: Record<string, number[]> = {};
  let i = 0;

  // TODO: new method will let us find useless statements that arent next to each other
  // while (i < escpos.length) {
  //   const match = matchPattern(tree, escpos, i);
  //   if (match.success) {
  //     if (arraysEqual(match.vars, state[match.patternStr])) {
  //       removeStack.push(match);
  //     }
  //     // state[match.patternStr] = match.vars;
  //   } else {
  //     i++;
  //   }
  //   prevMatch = match;
  // }

  // create a queue of matches to be removed at the end
  while (i < escpos.length) {
    const match = matchPattern(tree, escpos, i);
    if (match.success) {
      if (prevMatch) {
        if (prevMatch.patternStr === match.patternStr) {
          removeStack.push(prevMatch);
        }
      }
      i = match.newIdx;
    } else {
      i++;
    }
    prevMatch = match;
  }

  const res = [];

  // reverse the list
  while (removeStack.length > 0) {
    const match = removeStack.pop()!;
    res.push({ startIdx: match.startIdx, length: match.length });
  }

  return res;
}

function arraysEqual(vars1: number[], vars2: number[]) {
  if (vars1 === vars2) return true;
  if (vars1.length !== vars2.length) return false;

  for (let i = 0; i < vars1.length; i++) {
    if (vars1[i] !== vars2[i]) return false;
  }
  return true;
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
  vars: number[];
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
  let vars: number[] = [];
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
    if (node['*'] !== undefined) {
      // currently in a var
      vars.push(byte);
    }
    if (isEmpty(node)) {
      newIdx = i + 1;
      length = i - startIdx + 1;
      success = true;
      break;
    }
  }

  return { success, startIdx, length, newIdx, patternStr, vars };
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
