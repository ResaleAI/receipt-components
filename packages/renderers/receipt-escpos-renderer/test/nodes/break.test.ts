import { EscPos } from '@/../dist/main.mjs';
import LinkedList from '@/linked-list';
import renderBreak from '@/nodes/break';
import { describe, expect, assert, it } from 'vitest';

describe('break', () => {
  describe('renderBreak', () => {
    it('should return EscPos', async () => {
      const result = await renderBreak(
        { lines: 1 },
        [],
        {} as ReceiptNodeContext
      );
      expect(result).toBeInstanceOf(LinkedList);
    });

    it('should return EscPos with correct bytes with 1 line', async () => {
      const result = await renderBreak(
        { lines: 1 },
        [],
        {} as ReceiptNodeContext
      );
      expect([...result.toUint8Array()]).toEqual([10]);
    });

    it('should return EscPos with correct bytes with more than 1 line', async () => {
      const result = await renderBreak(
        { lines: 2 },
        [],
        {} as ReceiptNodeContext
      );
      expect([...result.toUint8Array()]).toEqual([27, 100, 2]);
    });

    it('should reset parent context offset to 0', async () => {
      const parentCtx = {
        currentOffset: 100,
      } as ReceiptNodeContext;
      await renderBreak({ lines: 1 }, [], parentCtx);
      expect(parentCtx.currentOffset).toBe(0);
    });
  });
});
