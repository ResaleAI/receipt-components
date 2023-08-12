import buildFragmentNode from '@/node-builders/fragment';
import { describe, expect, it } from 'vitest';

describe('fragment', () => {
  it('should build fragment node', () => {
    const fragmentNode = buildFragmentNode(null);

    expect(fragmentNode).toEqual({
      name: 'fragment',
      props: null,
      children: undefined,
    });
  });

  it('should build fragment node with children', () => {
    const fragmentNode = buildFragmentNode(null, [
      { name: 'text', props: { text: 'test' } },
    ]);

    expect(fragmentNode).toEqual({
      name: 'fragment',
      props: null,
      children: [{ name: 'text', props: { text: 'test' } }],
    });
  });
});
