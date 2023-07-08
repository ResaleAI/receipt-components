import { describe, it, assert } from 'vitest';
import {
  charToByte,
  isNumber2dArray,
  isUint8Array,
  parseBraces,
  populateChildren,
  flattenEscPos,
} from '@/util';

describe('util', () => {
  describe('isNumber2dArray', () => {
    it('should return true for a 2d array of numbers', () => {
      assert(
        isNumber2dArray([
          [1, 2],
          [3, 4],
        ])
      );
    });

    it('should return false for a 2d array of other types', () => {
      assert(
        !isNumber2dArray([
          ['1', 2],
          ['3', { test: 4 }],
        ])
      );
    });

    it('should return false for a 1d array', () => {
      assert(!isNumber2dArray([1, 2, 3]));
    });
  });

  describe('isUint8Array', () => {
    it('should return true for a 2d array of Uint8Arrays', () => {
      assert(isUint8Array([new Uint8Array([1, 2]), new Uint8Array([3, 4])]));
    });

    it('should return false for a 2d array of other types', () => {
      assert(
        !isUint8Array([
          ['1', 2],
          ['3', { test: 4 }],
        ])
      );
    });

    it('should return false for a 1d uint8array', () => {
      assert(!isUint8Array(new Uint8Array([1, 2, 3])));
    });
  });

  describe('renderChildrenBytes', () => {
    it('should return an empty array if no children are passed', () => {
      assert(flattenEscPos().length === 0);
    });

    it('should return a flattened array of numbers if children are 2d array of numbers', () => {
      const result = flattenEscPos([
        [1, 2],
        [3, 4],
      ]);

      assert(result instanceof Array);
      assert(result.length === 4);
      assert(result[0] === 1);
      assert(result[1] === 2);
      assert(result[2] === 3);
      assert(result[3] === 4);
    });

    it('should return a flattened array of numbers if children are array of Uint8Arrays', () => {
      const result = flattenEscPos([
        new Uint8Array([1, 2]),
        new Uint8Array([3, 4]),
      ]);

      assert(result instanceof Array);
      assert(result.length === 4);
      assert(result[0] === 1);
      assert(result[1] === 2);
      assert(result[2] === 3);
      assert(result[3] === 4);
    });
  });

  describe('charToByte', () => {
    it('should return the byte value of a single character', () => {
      const result = charToByte('a');
      assert(result === 97);
    });

    it('should throw an error if the string is not a single character', () => {
      try {
        charToByte('ab');
        assert(false);
      } catch (e) {
        assert(e instanceof Error);
      }
    });
  });

  describe('parseBraces', () => {
    it('should return a string with the braces replaced with the data', () => {
      const result = parseBraces('Hello {name}', { name: 'World' });
      assert(result === 'Hello World');
    });

    it('should not replace braces that are not in the data', () => {
      const result = parseBraces('Hello {name}', { other: 'World' });
      assert(result === 'Hello { name }');
    });
  });

  describe('populateChildren', () => {
    it('should return a string with the children array joined', () => {
      const result = populateChildren('Hello { children }', ['World', '!!']);
      assert(result === 'Hello World!!');
    });
  });
});
