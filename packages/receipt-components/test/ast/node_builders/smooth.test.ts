import buildSmoothNode from '@ast/node-builders/smooth';
import { describe, expect, it } from 'vitest';

describe('smooth', () => {
  it('should build smooth node', () => {
    const smoothNode = buildSmoothNode(null);

    expect(smoothNode).toEqual({
      name: 'smooth',
      props: null,
      children: undefined,
    });
  });

  it('should build smooth node with children', () => {
    const smoothNode = buildSmoothNode(null, [
      { name: 'text', props: { text: 'test' } },
    ]);

    expect(smoothNode).toEqual({
      name: 'smooth',
      props: null,
      children: [{ name: 'text', props: { text: 'test' } }],
    });
  });
});
