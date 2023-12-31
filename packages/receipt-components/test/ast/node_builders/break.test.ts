import buildBreakNode from '@ast/node-builders/break';
import { describe, expect, it } from 'vitest';

describe('break', () => {
  it('should build break node', () => {
    const breakNode = buildBreakNode({ lines: 2 });

    expect(breakNode).toEqual({
      name: 'break',
      props: { lines: 2 },
      children: undefined,
    });
  });

  it('should default lines to 1', () => {
    const breakNode = buildBreakNode({});

    expect(breakNode).toEqual({
      name: 'break',
      props: { lines: 1 },
      children: undefined,
    });
  });
});
