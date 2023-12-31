import buildBarcodeNode, {
  BarcodeNodeProps,
  Standards,
} from '@ast/node-builders/barcode';
import { describe, assert, it, expect } from 'vitest';

describe('barcode', () => {
  describe('buildBarcodeNode', () => {
    it('should build barcode node', () => {
      const barcodeNode = buildBarcodeNode({ data: 'test' });
      expect(barcodeNode).toEqual({
        name: 'barcode',
        props: {
          data: 'test',
          standard: Standards.CODE39,
          height: 80,
          width: 100,
          align: 'center',
        },
        children: undefined,
      });
    });

    it('should provide defaults for non-required props', () => {
      const barcodeNode = buildBarcodeNode({ data: 'test' });
      expect(barcodeNode).toEqual({
        name: 'barcode',
        props: {
          data: 'test',
          standard: Standards.CODE39,
          height: 80,
          width: 100,
          align: 'center',
        },
        children: undefined,
      });
    });

    it('should throw if data is not provided', () => {
      assert.throws(() => buildBarcodeNode({} as BarcodeNodeProps));
    });
  });
});
