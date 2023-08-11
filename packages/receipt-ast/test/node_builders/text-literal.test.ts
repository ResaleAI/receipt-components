import buildTextLiteralNode, {
  TextLiteralNodeProps,
} from '@/node-builders/text-literal';
import { describe, expect, it } from 'vitest';

describe('text-literal', () => {
  it('should build text-literal node', () => {
    const textLiteralNode = buildTextLiteralNode({ text: 'test' });

    expect(textLiteralNode).toEqual({
      name: 'textLiteral',
      props: { text: 'test' },
      children: undefined,
    });
  });

  it('should throw error if text is not provided', () => {
    expect(() => buildTextLiteralNode({} as TextLiteralNodeProps)).toThrow(
      'Text literal must have text'
    );
  });
});
