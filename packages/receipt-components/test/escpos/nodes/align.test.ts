import { bytes } from '@ep/constants';
import LinkedList from '@ep/linked-list';
import renderAlign from '@ep/nodes/align';
import { describe, it, expect, assert, afterEach, vi } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';
import { MissingContextError, MissingContextPropertiesError } from '@ep/errors';

describe('escpos', () => {

  describe('align', () => {
    describe('renderAlign', () => {
      afterEach(() => {
        vi.restoreAllMocks();
      });
      it('should return EscPos', async () => {
        const result = await renderAlign({ mode: 'left' }, [], {
          currentAlign: 0,
        } as RC.ReceiptNodeContext);
        expect(result).toBeInstanceOf(LinkedList);
      });
  
      it('should throw an error if no context is provided', async () => {
        await expect(() => renderAlign({ mode: 'left' })).rejects.toThrow(
          MissingContextError
        );
      });
  
      it('should throw an error if no currentAlign context is provided', async () => {
        await expect(() =>
          renderAlign({ mode: 'left' }, [], {} as RC.ReceiptNodeContext)
        ).rejects.toThrow(MissingContextPropertiesError);
      });
  
      it('should return EscPos with correct bytes', async () => {
        const result = await renderAlign({ mode: 'left' }, [], {
          currentAlign: 0x01,
          currentOffset: 0,
        } as RC.ReceiptNodeContext);
        expect([...result.toUint8Array()]).toEqual([
          bytes.LF,
          bytes.ESC,
          0x61,
          0x00,
          bytes.LF,
          bytes.ESC,
          0x61,
          0x01,
        ]);
      });
  
      it('should render children wrapped with align bytes', async () => {
        const childBytes = (await dummyChildBuilder()).toUint8Array();
        const result = await renderAlign(
          { mode: 'center' },
          [dummyChildBuilder],
          { currentAlign: 0 } as RC.ReceiptNodeContext
        );
  
        expect([...result.toUint8Array()]).toEqual([
          bytes.LF,
          bytes.ESC,
          0x61,
          0x01,
          ...childBytes,
          bytes.LF,
          bytes.ESC,
          0x61,
          0x00,
        ]);
      });
  
      it('should reset parent context offset to 0', async () => {
        const parentCtx = {
          currentAlign: 0x01,
          currentOffset: 100,
        } as RC.ReceiptNodeContext;
        await renderAlign({ mode: 'left' }, [], parentCtx);
        expect(parentCtx.currentOffset).toBe(0);
      });
    });
  });
});
