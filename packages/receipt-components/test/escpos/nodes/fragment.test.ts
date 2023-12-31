import LinkedList from '@ep/linked-list';
import renderFragment from '@ep/nodes/fragment';
import { describe, expect, assert, it } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';

describe('escpos', () => {

  describe('fragment', () => {
    describe('renderFragment', () => {
      it('should return EscPos', async () => {
        const result = await renderFragment(null);
        expect(result).toBeInstanceOf(LinkedList);
      });
  
      it('should return EscPos with correct bytes', async () => {
        const result = await renderFragment(null, []);
        expect([...result.toUint8Array()]).toEqual([]);
      });
  
      it('should render children', async () => {
        const childBytes = (await dummyChildBuilder()).toUint8Array();
        const result = await renderFragment(
          null,
          [dummyChildBuilder],
          {} as RC.ReceiptNodeContext
        );
  
        expect(result.toUint8Array()).toEqual(childBytes);
      });
    });
  });
});
