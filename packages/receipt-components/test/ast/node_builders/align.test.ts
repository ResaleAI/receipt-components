import buildAlignNode from '@ast/node-builders/align';
import { describe, it, expect, assert } from 'vitest';

describe('align', () => {
  describe('buildAlignNode', () => {
    it('should build align node', () => {
      const alignNode = buildAlignNode({ mode: 'left' });
      expect(alignNode).toEqual({
        name: 'align',
        props: { mode: 'left' },
        children: undefined,
      });
    });

    it('should build align node with children', () => {
      const alignNode = buildAlignNode({ mode: 'left' }, [
        { name: 'text', props: { text: 'test' } },
      ]);
      expect(alignNode).toEqual({
        name: 'align',
        props: { mode: 'left' },
        children: [{ name: 'text', props: { text: 'test' } }],
      });
    });

    it('should default mode to left', () => {
      const alignNode = buildAlignNode({});
      expect(alignNode).toEqual({
        name: 'align',
        props: { mode: 'left' },
        children: undefined,
      });
    });
  });
});
