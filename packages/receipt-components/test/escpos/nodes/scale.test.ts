import { MissingContextError, MissingContextPropertiesError } from '@ep/errors';
import LinkedList from '@ep/linked-list';
import renderScale, { computeScaleBits } from '@ep/nodes/scale';
import { describe, assert, it, expect } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';
import { bytes } from '@ep/constants';

describe('escpos', () => {
  describe('scale', () => {
    describe('renderScale', () => {
      it('should return EscPos', async () => {
        const result = await renderScale({ width: 1, height: 1 }, [], {
          scaleBits: 0,
        } as RC.ReceiptNodeContext);
  
        expect(result).toBeInstanceOf(LinkedList);
      });
  
      it('should throw error if missing context', async () => {
        await expect(
          renderScale({ width: 1, height: 1 }, [])
        ).rejects.toThrowError(MissingContextError);
      });
  
      it('should throw error if context missing scaleBits', async () => {
        await expect(
          renderScale({ width: 1, height: 1 }, [], {} as RC.ReceiptNodeContext)
        ).rejects.toThrowError(MissingContextPropertiesError);
      });
  
      it('should only render children if no change in scaleBits', async () => {
        const childBytes = (await dummyChildBuilder()).toUint8Array();
        const result = await renderScale(
          { width: 1, height: 1 },
          [dummyChildBuilder],
          {
            scaleBits: 0,
          } as RC.ReceiptNodeContext
        );
  
        expect(result.toUint8Array()).toEqual(childBytes);
      });
  
      it('should render children wrapped with scale bytes', async () => {
        const childBytes = (await dummyChildBuilder()).toUint8Array();
        const result = await renderScale({ height: 2 }, [dummyChildBuilder], {
          scaleBits: 0,
        } as RC.ReceiptNodeContext);
  
        expect([...result.toUint8Array()]).toEqual([
          bytes.GS,
          0x21,
          0x01,
          ...childBytes,
          bytes.GS,
          0x21,
          0x00,
        ]);
      });
  
      // TODO: test for updating parent context with offset
    });
    describe('scaleBitsFromWidthAndHeight', () => {
      it('should clamp width to 1-5', () => {
        const minResult = computeScaleBits(0, 0, 0);
        const maxResult = computeScaleBits(0, 6, 0);
  
        expect(minResult & 0b11110000).toEqual(0);
        expect(maxResult & 0b11110000).toEqual(0x40);
      });
      it('should clamp height to 1-5', () => {
        const minResult = computeScaleBits(0, 0, 0);
        const maxResult = computeScaleBits(0, 0, 6);
  
        expect(minResult & 0b1111).toEqual(0);
        expect(maxResult & 0b1111).toEqual(0x04);
      });
      it('should leave width unchanged if not provided', () => {
        const result = computeScaleBits(0x40, undefined, 0);
  
        expect(result & 0b11110000).toEqual(0x40);
      });
      it('should leave height unchanged if not provided', () => {
        const result = computeScaleBits(0x04, 0, undefined);
  
        expect(result & 0b1111).toEqual(0x04);
      });
    });
  });
})
