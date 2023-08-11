import { MissingContextError, MissingContextPropertiesError } from '@/errors';
import LinkedList from '@/linked-list';
import renderText, { computeModeBits } from '@/nodes/text';
import { ReceiptNodeContext } from '@/types';
import { describe, it, expect } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';

describe('text', () => {
  describe('renderText', () => {
    it('should return EscPos', async () => {
      const result = await renderText({}, [], {
        textMode: 0,
      } as ReceiptNodeContext);
      expect(result).toBeInstanceOf(LinkedList);
    });

    it('should throw error if missing context', async () => {
      await expect(renderText({}, [])).rejects.toThrowError(
        MissingContextError
      );
    });

    it('should throw error if context missing textMode', async () => {
      await expect(
        renderText({}, [], {} as ReceiptNodeContext)
      ).rejects.toThrowError(MissingContextPropertiesError);
    });

    it('should return child bytes if textMode is same as parent', async () => {
      const childBytes = (await dummyChildBuilder()).toUint8Array();
      const result = await renderText({ font: 1 }, [dummyChildBuilder], {
        textMode: 0,
      } as ReceiptNodeContext);
      expect(result.toUint8Array()).toEqual(childBytes);
    });

    it('should return child bytes wrapped in text bytes if textMode is different from parent', async () => {
      const childBytes = (await dummyChildBuilder()).toUint8Array();
      const result = await renderText({ font: 1 }, [dummyChildBuilder], {
        textMode: 0b1,
      } as ReceiptNodeContext);
      expect([...result.toUint8Array()]).toEqual([
        27,
        33,
        0,
        ...childBytes,
        27,
        33,
        0b1,
      ]);
    });
  });
  describe('computeModeBits', () => {
    it('should return 0 if reset is true', () => {
      expect(computeModeBits({ reset: true }, 1)).toBe(0);
    });
    it('should return 0 if reset is true and there are other props', () => {
      expect(
        computeModeBits({ reset: true, bold: true, underline: true }, 1)
      ).toBe(0);
    });

    it('should not override initialMode when everything is false', () => {
      expect(computeModeBits({}, 137)).toBe(137);
    });

    it('should set bold bit if bold is true', () => {
      expect(computeModeBits({ bold: true }, 0)).toBe(8);
    });

    it('should set underline bit if underline is true', () => {
      expect(computeModeBits({ underline: true }, 0)).toBe(128);
    });
    it('should set font1 bit if font is 1', () => {
      expect(computeModeBits({ font: 1 }, 1)).toBe(0);
    });
    it('should set font2 bit if font is 2', () => {
      expect(computeModeBits({ font: 2 }, 0)).toBe(1);
    });
  });
});
