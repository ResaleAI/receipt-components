import {
  ChildrenNotAllowedError,
  MissingContextError,
  MissingContextPropertiesError,
} from '@/errors';
import {
  disallowChildren,
  renderChildBytes,
  renderChildBytesList,
  requireContext,
  requireContextKeys,
} from '@/util';
import { describe, it, expect } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';
import LinkedList from '@/linked-list';

describe('util/escpos', () => {
  describe('requireContextKeys', () => {
    it('should throw an error if context is missing', () => {
      expect(() => {
        requireContextKeys();
      }).toThrow(MissingContextError);
    });

    it('should throw an error if context is missing required keys', () => {
      expect(() => {
        requireContextKeys({} as ReceiptNodeContext, ['currentAlign']);
      }).toThrow(MissingContextPropertiesError);
    });

    it('should allow passing undefined keys', () => {
      expect(() => {
        requireContextKeys({} as ReceiptNodeContext, undefined);
      }).not.toThrow();
    });

    it('should allow passing an empty array of keys', () => {
      expect(() => {
        requireContextKeys({} as ReceiptNodeContext, []);
      }).not.toThrow();
    });
  });

  describe('requireContext', () => {
    it('should throw an error if context is missing', () => {
      expect(() => {
        requireContext(undefined);
      }).toThrow(MissingContextError);
    });
  });

  describe('disallowChildren', () => {
    it('should throw an error if children are present', () => {
      expect(() => {
        disallowChildren([dummyChildBuilder]);
      }).toThrow(ChildrenNotAllowedError);
    });

    it('should allow an empty array', () => {
      expect(() => {
        disallowChildren([]);
      }).not.toThrow();
    });

    it('should allow undefined', () => {
      expect(() => {
        disallowChildren(undefined);
      }).not.toThrow();
    });
  });

  describe('renderChildBytes', () => {
    it('should render children and return a single EscPos instance', async () => {
      const children = [dummyChildBuilder];
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytes(children, context);

      expect(result).toBeInstanceOf(LinkedList);
      expect([...result.toUint8Array()]).toEqual([1, 2, 3]);
    });

    it('should return empty EscPos when children undefined', async () => {
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytes(undefined, context);

      expect(result).toBeInstanceOf(LinkedList);
      expect([...result.toUint8Array()]).toEqual([]);
    });

    it('should return empty EscPos when children empty', async () => {
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytes([], context);

      expect(result).toBeInstanceOf(LinkedList);
      expect([...result.toUint8Array()]).toEqual([]);
    });

    it('should work with multiple children', async () => {
      const children = [dummyChildBuilder, dummyChildBuilder];
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytes(children, context);

      expect(result).toBeInstanceOf(LinkedList);
      expect([...result.toUint8Array()]).toEqual([1, 2, 3, 1, 2, 3]);
    });
  });

  describe('renderChildBytesList', () => {
    it('should render children and return a list of EscPos instances', async () => {
      const children = [dummyChildBuilder];
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytes(children, context);

      expect(result).toBeInstanceOf(LinkedList);
      expect([...result.toUint8Array()]).toEqual([1, 2, 3]);
    });

    it('should return empty list when children undefined', async () => {
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytesList(undefined, context);

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should return empty list when children empty', async () => {
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytesList([], context);

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should work with multiple children', async () => {
      const children = [dummyChildBuilder, dummyChildBuilder];
      // @ts-expect-error
      const context = { currentAlign: 'left' } as ReceiptNodeContext;

      const result = await renderChildBytesList(children, context);

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect([...result[0].toUint8Array()]).toEqual([1, 2, 3]);
      expect([...result[1].toUint8Array()]).toEqual([1, 2, 3]);
    });
  });
});
