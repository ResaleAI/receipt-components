import { describe, it, assert, expect } from 'vitest';
import { charToByte, duplicateObject, splitLines } from '@ep/util';

describe('escpos', () => {

  describe('util', () => {
    describe('charToByte', () => {
      it('should return the correct byte', () => {
        const byte = charToByte('A');
        assert(byte === 65);
      });
  
      it('should throw an error if the string is not a single character', () => {
        expect(() => charToByte('AA')).toThrow('single character');
      });
  
      it('should throw an error if the character is not ASCII', () => {
        expect(() => charToByte('€')).toThrow('ASCII');
      });
    });
    describe('duplicateObject', () => {
      it('should return a copy of the object', () => {
        const obj = { foo: 'bar' };
        const copy = duplicateObject(obj);
        assert(obj !== copy);
        assert(obj.foo === copy.foo);
      });
  
      it('should throw error if object is null', () => {
        const obj = null;
        expect(() => duplicateObject(obj)).toThrow();
      });
  
      it('should throw error if object is undefined', () => {
        const obj = undefined;
        expect(() => duplicateObject(obj)).toThrow();
      });
    });
    describe('splitLines', () => {
      it('should split the text into lines', () => {
        const text = 'Hello World';
        const lines = splitLines(text, 5, 0);
  
        expect(lines.length).toBe(2);
        assert(lines[0] === 'Hello');
        assert(lines[1] === 'World');
      });
  
      it('should split the text into lines with offset', () => {
        const text = 'Hello World';
        const lines = splitLines(text, 15, 5);
  
        expect(lines.length).toBe(2);
        expect(lines[0]?.trim()).toBe('Hello');
        expect(lines[1]?.trim()).toBe('World');
      });
  
      it('should split text when word lengths equal line length', () => {
        const text = 'Hello World';
        const lines = splitLines(text, 10, 0);
  
        expect(lines.length).toBe(2);
        expect(lines[0]?.trim()).toBe('Hello');
        expect(lines[1]?.trim()).toBe('World');
      });
  
      it('should not split text when text length is equal to line length', () => {
        const text = 'Hello World';
        const lines = splitLines(text, 11, 0);
  
        expect(lines.length).toBe(1);
        expect(lines[0]?.trim()).toBe('Hello World');
      });
    });
  });
});
