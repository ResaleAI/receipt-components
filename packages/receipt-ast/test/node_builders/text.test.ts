import buildTextNode from '@/node-builders/text';
import { describe, expect, it } from 'vitest';

describe('text', () => {
  it('should build text node', () => {
    const textNode = buildTextNode({
      font: '1',
      bold: true,
      underline: true,
      reset: false,
    });

    expect(textNode).toEqual({
      name: 'text',
      props: {
        font: '1',
        bold: true,
        underline: true,
        reset: false,
      },
      children: undefined,
    });
  });

  it('should build text node with children', () => {
    const textNode = buildTextNode(
      {
        font: '1',
        bold: true,
        underline: true,
        reset: false,
      },
      [{ name: 'text', props: { text: 'test' } }]
    );

    expect(textNode).toEqual({
      name: 'text',
      props: {
        font: '1',
        bold: true,
        underline: true,
        reset: false,
      },
      children: [{ name: 'text', props: { text: 'test' } }],
    });
  });

  // this makes me think that maybe the context should be at the ast level.
  // i can see it being needed across renderers.
  it('should accept no props without setting defaults', () => {
    const textNode = buildTextNode({});

    expect(textNode).toEqual({
      name: 'text',
      props: {},
      children: undefined,
    });
  });
});
