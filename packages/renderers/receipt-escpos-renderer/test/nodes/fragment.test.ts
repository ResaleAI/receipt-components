import LinkedList from '@/linked-list';
import renderFragment from '@/nodes/fragment';
import { describe, expect, assert, it } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';

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
        {} as ReceiptNodeContext
      );

      expect(result.toUint8Array()).toEqual(childBytes);
    });
  });
});
