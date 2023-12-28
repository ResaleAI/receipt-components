import LinkedList from '@/linked-list';
import renderBarcode from '@/nodes/barcode';
import { describe, expect, it, assert } from 'vitest';

describe('barcode', () => {
  describe('renderBarcode', () => {
    it('should return EscPos', async () => {
      const result = await renderBarcode({
        height: 100,
        width: 100,
        data: '1234567890',
        standard: 1,
        align: 'center',
      });
      expect(result).toBeInstanceOf(LinkedList);
    });

    // TODO: break out in to test for size, data, standard, etc.
    it('should return EscPos with correct bytes', async () => {
      const result = await renderBarcode({
        height: 100,
        width: 100,
        data: '1234567890',
        standard: 1,
        align: 'center',
      });
      const expected = new LinkedList([
        29, 104, 100, 29, 119, 100, 29, 107, 1, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 48, 0,
      ]);
      expect(result).toEqual(expected);
    });
  });
});
