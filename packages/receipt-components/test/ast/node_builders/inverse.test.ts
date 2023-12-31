import buildInverseNode from '@ast/node-builders/inverse';
import { describe, expect, it } from 'vitest';

describe('inverse', () => {
  it('should build inverse node', () => {
    const inverseNode = buildInverseNode(null);

    expect(inverseNode).toEqual({
      name: 'inverse',
      props: null,
      children: undefined,
    });
  });

  it('should build inverse node with children', () => {
    const inverseNode = buildInverseNode(null, [
      { name: 'text', props: null, children: undefined },
    ]);

    expect(inverseNode).toEqual({
      name: 'inverse',
      props: null,
      children: [{ name: 'text', props: null, children: undefined }],
    });
  });
});
