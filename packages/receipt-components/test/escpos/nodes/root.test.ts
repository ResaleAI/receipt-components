import { bytes } from '@ep/constants';
import LinkedList from '@ep/linked-list';
import renderRoot from '@ep/nodes/root';
import { describe, it, expect } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';

describe('escpos', () => {

  describe('root', () => {
    describe('renderRoot', () => {
      it('should return EscPos', async () => {
        const result = await renderRoot(null);
        expect(result).toBeInstanceOf(LinkedList);
      });
  
      it('should return EscPos with correct bytes', async () => {
        const result = await renderRoot(null, []);
        expect([...result.toUint8Array()]).toEqual([
          bytes.ESC,
          0x40,
          bytes.LF,
          bytes.GS,
          0x56,
          0x41,
          3,
        ]);
      });
  
      it('should wrap children with root bytes', async () => {
        const childBytes = (await dummyChildBuilder()).toUint8Array();
        const result = await renderRoot(
          null,
          [dummyChildBuilder],
          {} as RC.ReceiptNodeContext
        );
        expect([...result.toUint8Array()]).toEqual([
          bytes.ESC,
          0x40,
          ...childBytes,
          bytes.LF,
          bytes.GS,
          0x56,
          0x41,
          3,
        ]);
      });
    });
  });
});
