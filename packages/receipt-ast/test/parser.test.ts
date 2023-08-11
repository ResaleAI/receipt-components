import { EmptyRootError, MultipleRootError, ParseError } from '@/errors';
import { nodeRegistry } from '@/node-builders';
import { buildAstFromXml, isNumeric, parseTemplateForAst } from '@/parser';
import { ReceiptAST } from '@/types';
import { parseDocument } from 'htmlparser2';
import { describe, expect, it } from 'vitest';

describe('parser', () => {
  describe('parseTemplateForAst', () => {
    it('should throw an error if the root is empty', () => {
      expect(() => parseTemplateForAst('', {})).toThrow(EmptyRootError);
    });

    it('should throw an error if the root has multiple children', () => {
      expect(() => parseTemplateForAst('<div></div><div></div>', {})).toThrow(
        MultipleRootError
      );
    });

    it('should build an ast from a template', () => {
      const ast = parseTemplateForAst('<root></root>', nodeRegistry);
      expect(ast).toEqual({ name: 'root', props: null, children: [] });
    });
  });
  describe('buildAstFromXml', () => {
    it('should build an ast from a domhandler node', () => {
      const dom = parseDocument('<root></root>', { xmlMode: true });
      const ast = buildAstFromXml(dom.children[0]!, nodeRegistry, false);
      expect(ast).toEqual([{ name: 'root', props: null, children: [] }]);
    });

    it('should build an ast from a domhandler node with props', () => {
      const dom = parseDocument('<root prop="val"></root>', { xmlMode: true });
      const ast = buildAstFromXml(dom.children[0]!, nodeRegistry, false);
      expect(ast).toEqual([
        { name: 'root', props: { prop: 'val' }, children: [] },
      ]);
    });

    it('should build an ast from a domhandler node with children', () => {
      const dom = parseDocument('<root><text></text><text></text></root>', {
        xmlMode: true,
      });
      const ast = buildAstFromXml(dom.children[0]!, nodeRegistry, false);
      expect(ast).toEqual([
        {
          name: 'root',
          props: null,
          children: [
            { name: 'text', props: null, children: [] },
            { name: 'text', props: null, children: [] },
          ],
        },
      ]);
    });

    it('should create a node if it is not in the registry and strict mode is disabled', () => {
      const dom = parseDocument('<root></root>', { xmlMode: true });
      const ast = buildAstFromXml(dom.children[0]!, {}, false);
      expect(ast).toEqual([{ name: 'root', props: null, children: [] }]);
    });

    it('should throw an error if the node is not in the registry and strict mode is enabled', () => {
      const dom = parseDocument('<root></root>', { xmlMode: true });
      expect(() => buildAstFromXml(dom.children[0]!, {}, true)).toThrow(
        ParseError
      );
    });

    // remove/change when i figure out what the trim end call does
    // it('should trim end of text nodes', () => {
    //   const dom = parseDocument('<root>text </root>', { xmlMode: true });
    //   const ast = buildAstFromXml(dom.children[0]!, nodeRegistry, false);
    //   expect(ast).toEqual([
    //     {
    //       name: 'root',
    //       props: null,
    //       children: [{ name: 'textLiteral', props: { text: 'text' } }],
    //     },
    //   ]);
    // });

    it('should build text literal node out of text', () => {
      const dom = parseDocument('text', { xmlMode: true });
      const ast = buildAstFromXml(dom.children[0]!, nodeRegistry, false);
      expect(ast).toEqual([{ name: 'textLiteral', props: { text: 'text' } }]);
    });

    it('should render children in place of { children }', () => {
      const dom = parseDocument('<root>{ children }</root>', {
        xmlMode: true,
      });
      const children: ReceiptAST[] = [
        {
          name: 'textLiteral',
          props: { text: 'text' },
        },
      ];
      const ast = buildAstFromXml(
        dom.children[0]!,
        nodeRegistry,
        false,
        children
      );
      expect(ast).toEqual([
        {
          name: 'root',
          props: null,
          children,
        },
      ]);
    });

    it('should convert boolean attributes to boolean', () => {
      const dom = parseDocument('<root bool></root>', { xmlMode: true });
      const ast = buildAstFromXml(dom.children[0]!, nodeRegistry, false);
      expect(ast).toEqual([
        {
          name: 'root',
          props: { bool: true },
          children: [],
        },
      ]);
    });

    it('should convert number attributes to number', () => {
      const dom = parseDocument('<root num="1"></root>', { xmlMode: true });
      const ast = buildAstFromXml(dom.children[0]!, nodeRegistry, false);
      expect(ast).toEqual([
        {
          name: 'root',
          props: { num: 1 },
          children: [],
        },
      ]);
    });
  });

  describe('isNumeric', () => {
    it('should return true for numbers', () => {
      expect(isNumeric('1')).toBe(true);
      expect(isNumeric('1.1')).toBe(true);
      expect(isNumeric('1.1e1')).toBe(true);
      expect(isNumeric('1.1e-1')).toBe(true);
      expect(isNumeric('1.1e+1')).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(isNumeric('a')).toBe(false);
      expect(isNumeric('1a')).toBe(false);
      expect(isNumeric('1.1a')).toBe(false);
      expect(isNumeric('1.1e1a')).toBe(false);
      expect(isNumeric('1.1e-1a')).toBe(false);
      expect(isNumeric('1.1e+1a')).toBe(false);
    });

    it('should return false for non-strings', () => {
      // @ts-ignore
      expect(isNumeric(1)).toBe(false);
      // @ts-ignore
      expect(isNumeric(1.1)).toBe(false);
      // @ts-ignore
      expect(isNumeric(true)).toBe(false);
      // @ts-ignore
      expect(isNumeric(false)).toBe(false);
      // @ts-ignore
      expect(isNumeric(null)).toBe(false);
      // @ts-ignore
      expect(isNumeric(undefined)).toBe(false);
      // @ts-ignore
      expect(isNumeric({})).toBe(false);
      // @ts-ignore
      expect(isNumeric([])).toBe(false);
    });
  });
});
