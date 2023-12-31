import {
  ChildrenNotAllowedError,
  MissingContextError,
  MissingContextPropertiesError,
} from '@ep/errors';
import LinkedList from '@ep/linked-list';
import { defaultContext } from '@ep/nodes/renderer';
import renderTextLiteral, { getLineLength } from '@ep/nodes/textLiteral';
import { describe, it, expect } from 'vitest';
import dummyChildBuilder from '../helpers/dummyChildBuilder';

describe('escpos', () => {
  describe('textLiteral', () => {
    describe('renderTextLiteral', () => {
      it('should return EscPos', async () => {
        const result = await renderTextLiteral(
          { text: 'hello' },
          [],
          defaultContext
        );
        expect(result).toBeInstanceOf(LinkedList);
      });
  
      it('should throw error if missing context', async () => {
        await expect(renderTextLiteral({ text: 'hello' }, [])).rejects.toThrow(
          MissingContextError
        );
      });
  
      it('should throw error if missing currentOffset in context', async () => {
        const context = { ...defaultContext, currentOffset: undefined };
  
        await expect(
          //@ts-expect-error
          renderTextLiteral({ text: 'hello' }, [], context as RC.ReceiptNodeContext)
        ).rejects.toThrowError(MissingContextPropertiesError);
      });
  
      it('should throw error if missing textJustify in context', async () => {
        const context = { ...defaultContext, textJustify: undefined };
  
        await expect(
          //@ts-expect-error
          renderTextLiteral({ text: 'hello' }, [], context as RC.ReceiptNodeContext)
        ).rejects.toThrowError(MissingContextPropertiesError);
      });
  
      it('should throw error if missing scaleBits in context', async () => {
        const context = { ...defaultContext, scaleBits: undefined };
  
        await expect(
          //@ts-expect-error
          renderTextLiteral({ text: 'hello' }, [], context as RC.ReceiptNodeContext)
        ).rejects.toThrowError(MissingContextPropertiesError);
      });
  
      it('should throw error if missing altFontLineLength in context', async () => {
        const context = { ...defaultContext, altFontLineLength: undefined };
  
        await expect(
          //@ts-expect-error
          renderTextLiteral({ text: 'hello' }, [], context as RC.ReceiptNodeContext)
        ).rejects.toThrowError(MissingContextPropertiesError);
      });
  
      it('should throw error if missing defaultLineLength in context', async () => {
        const context = { ...defaultContext, defaultLineLength: undefined };
  
        await expect(
          //@ts-expect-error
          renderTextLiteral({ text: 'hello' }, [], context as RC.ReceiptNodeContext)
        ).rejects.toThrowError(MissingContextPropertiesError);
      });
  
      it('should throw error if missing textMode in context', async () => {
        const context = { ...defaultContext, textMode: undefined };
  
        await expect(
          //@ts-expect-error
          renderTextLiteral({ text: 'hello' }, [], context as RC.ReceiptNodeContext)
        ).rejects.toThrowError(MissingContextPropertiesError);
      });
  
      it('should throw error if children are passed', async () => {
        await expect(
          renderTextLiteral(
            { text: 'hello' },
            [dummyChildBuilder],
            defaultContext
          )
        ).rejects.toThrowError(ChildrenNotAllowedError);
      });
  
      it('should return text bytes', async () => {
        const result = await renderTextLiteral(
          { text: 'hello' },
          [],
          defaultContext
        );
  
        // maybe not the fastest, but definitely easy B)
        let resStr = Buffer.from(result.toUint8Array().buffer).toString();
        resStr = resStr.replace('\n', '').trimEnd();
  
        expect(resStr).toBe('hello');
      });
    });
  
    describe('getLineLength', () => {
      it('uses defaultLineLength if textMode is 0 (font is default)', () => {
        const result = getLineLength({
          scaleBits: 0,
          defaultLineLength: 100,
          altFontLineLength: 200,
          textMode: 0,
        });
        expect(result).toBe(100);
      });
  
      it('uses altFontLineLength if textMode is 1 (font is alt)', () => {
        const result = getLineLength({
          scaleBits: 0,
          defaultLineLength: 100,
          altFontLineLength: 200,
          textMode: 1,
        });
        expect(result).toBe(200);
      });
  
      it('correctly accounts for scaled text', () => {
        const result = getLineLength({
          scaleBits: (2 - 1) << 4, // 2x scale, put in correct place
          defaultLineLength: 100,
          altFontLineLength: 200,
          textMode: 0,
        });
        expect(result).toBe(50);
      });
    });
  });
});
