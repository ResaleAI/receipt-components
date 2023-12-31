import { EscPos } from '@ep/index';
import LinkedList from '@ep/linked-list';
import renderBreak from '@ep/nodes/break';
import { describe, expect, assert, it } from 'vitest';

describe('escpos', () => {
  describe('break', () => {
    describe('renderBreak', () => {
      it('should return EscPos', async () => {
        const result = await renderBreak(
          { lines: 1 },
          [],
          {} as RC.ReceiptNodeContext
        );
        expect(result).toBeInstanceOf(LinkedList);
      });

      it('should return EscPos with correct bytes with 1 line', async () => {
        const result = await renderBreak(
          { lines: 1 },
          [],
          {} as RC.ReceiptNodeContext
        );
        expect([...result.toUint8Array()]).toEqual([10]);
      });

      it('should return EscPos with correct bytes with more than 1 line', async () => {
        const result = await renderBreak(
          { lines: 2 },
          [],
          {} as RC.ReceiptNodeContext
        );
        expect([...result.toUint8Array()]).toEqual([27, 100, 2]);
      });

      it('should reset parent context offset to 0', async () => {
        const parentCtx = {
          currentOffset: 100,
        } as RC.ReceiptNodeContext;
        await renderBreak({ lines: 1 }, [], parentCtx);
        expect(parentCtx.currentOffset).toBe(0);
      });
    });
  });
});