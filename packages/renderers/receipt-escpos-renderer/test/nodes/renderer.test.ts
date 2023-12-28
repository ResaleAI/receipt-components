import { bytes } from '@/constants';
import { InvalidNodeError } from '@/errors';
import LinkedList from '@/linked-list';
import renderEscPos, { _renderEscPos, defaultContext } from '@/nodes/renderer';
import { charToByte } from '@/util';
import { describe, expect, it } from 'vitest';

describe('renderer', () => {
  describe('renderEscPos', () => {
    it('should return Uint8Array', async () => {
      const result = await renderEscPos({
        name: 'root',
        props: null,
        children: [],
      });
      expect(result).toBeInstanceOf(Uint8Array);
    });
  });

  describe('_renderEscPos', () => {
    it('should return EscPos', async () => {
      const result = await _renderEscPos({
        name: 'root',
        props: null,
        children: [],
      });
      expect(result).toBeInstanceOf(LinkedList);
    });

    it('should throw error if renderer for node not found', async () => {
      await expect(
        _renderEscPos({
          name: 'invalid',
          props: null,
          children: [],
        })
      ).rejects.toThrowError(InvalidNodeError);
    });

    it('should render children wrapped by parent', async () => {
      const result = await _renderEscPos(
        {
          name: 'root',
          props: null,
          children: [
            {
              name: 'textLiteral',
              props: {
                text: 'hello',
              },
              children: [],
            },
          ],
        },
        { ...defaultContext, defaultLineLength: 5 }
      );

      // TODO: this test could probably be better if i define the expected bytes
      expect([...result.toUint8Array()]).toEqual([
        bytes.ESC,
        0x40,
        104,
        101,
        108,
        108,
        111,
        bytes.LF,
        bytes.GS,
        0x56,
        0x41,
        3,
      ]);
    });
  });
});
