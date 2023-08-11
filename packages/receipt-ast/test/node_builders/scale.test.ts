import buildScaleNode from '@/node-builders/scale';
import { describe, expect, it } from 'vitest';

describe('scale', () => {
  it('should build scale node', () => {
    const scaleNode = buildScaleNode({ width: 2, height: 2 });

    expect(scaleNode).toEqual({
      name: 'scale',
      props: { width: 2, height: 2 },
      children: undefined,
    });
  });

  it('should build scale node with children', () => {
    const scaleNode = buildScaleNode({ width: 2, height: 2 }, [
      { name: 'text', props: { text: 'test' } },
    ]);

    expect(scaleNode).toEqual({
      name: 'scale',
      props: { width: 2, height: 2 },
      children: [{ name: 'text', props: { text: 'test' } }],
    });
  });

  it('should not set default props', () => {
    const scaleNode = buildScaleNode({});

    expect(scaleNode).toEqual({
      name: 'scale',
      props: {},
      children: undefined,
    });
  });
});
