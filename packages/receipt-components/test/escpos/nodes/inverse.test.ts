import { bytes } from '@ep/constants';
import LinkedList from '@ep/linked-list';
import renderInverse from '@ep/nodes/inverse';
import { describe, expect, assert, it } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';

describe('escpos', () => {
  describe('inverse', () => {
    describe('renderInverse', () => {
      it('should return EscPos', async () => {
        const result = await renderInverse(null);
        expect(result).toBeInstanceOf(LinkedList);
      });
  
      it('should return EscPos with correct bytes', async () => {
        const result = await renderInverse(null);
        expect([...result.toUint8Array()]).toEqual([
          bytes.GS,
          66,
          1,
          bytes.GS,
          66,
          0,
        ]);
      });
  
      it('should render children wrapped in inverse bytes', async () => {
        const childBytes = (await dummyChildBuilder()).toUint8Array();
        const result = await renderInverse(null, [dummyChildBuilder]);
  
        expect([...result.toUint8Array()]).toEqual([
          bytes.GS,
          66,
          1,
          ...childBytes,
          bytes.GS,
          66,
          0,
        ]);
      });
    });
  });
});
