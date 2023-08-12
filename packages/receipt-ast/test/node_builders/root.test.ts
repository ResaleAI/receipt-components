import buildRootNode from '@/node-builders/root';
import { describe, expect, it } from 'vitest';

describe('root', () => {
  it('should build root node', () => {
    const rootNode = buildRootNode(null);

    expect(rootNode).toEqual({
      name: 'root',
      props: null,
      children: undefined,
    });
  });

  it('should build root node with children', () => {
    const rootNode = buildRootNode(null, [
      { name: 'text', props: null, children: undefined },
    ]);

    expect(rootNode).toEqual({
      name: 'root',
      props: null,
      children: [{ name: 'text', props: null, children: undefined }],
    });
  });
});
