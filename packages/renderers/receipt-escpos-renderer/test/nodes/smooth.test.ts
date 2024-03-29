import { bytes } from '@/constants';
import LinkedList from '@/linked-list';
import renderSmooth from '@/nodes/smooth';
import { describe, it, expect } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';

describe('smooth', () => {
  describe('renderSmooth', () => {
    it('should return EscPos', async () => {
      const result = await renderSmooth(null, [], {
        scaleBits: 0,
      } as ReceiptNodeContext);

      expect(result).toBeInstanceOf(LinkedList);
    });

    it('should return EscPos with correct bytes', async () => {
      const result = await renderSmooth(null);
      expect([...result.toUint8Array()]).toEqual([
        bytes.GS,
        98,
        1,
        bytes.GS,
        98,
        0,
      ]);
    });

    it('should render children wrapped in smooth bytes', async () => {
      const childBytes = (await dummyChildBuilder()).toUint8Array();
      const result = await renderSmooth(null, [dummyChildBuilder]);

      expect([...result.toUint8Array()]).toEqual([
        bytes.GS,
        98,
        1,
        ...childBytes,
        bytes.GS,
        98,
        0,
      ]);
    });
  });
});
