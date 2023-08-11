import { nodeRegistry, registerNodeBuilder } from '@/node-builders';
import { ReceiptAST } from '@/types';
import { describe, expect, it } from 'vitest';

describe('node-builders', () => {
  describe('registerNodeBuilder', () => {
    it('should register a node builder', () => {
      const simpleNodeBuilder = (props: null, children?: ReceiptAST[]) => ({
        name: 'simple',
        props,
        children,
      });

      registerNodeBuilder('simple', simpleNodeBuilder);

      expect(nodeRegistry.simple).toBe(simpleNodeBuilder);
    });

    it('should allow node builders to be overridden', () => {
      const simpleNodeBuilder = (props: null, children?: ReceiptAST[]) => ({
        name: 'simple',
        props,
        children,
      });

      const simpleNodeBuilder2 = (props: null, children?: ReceiptAST[]) => ({
        name: 'simple',
        props,
        children,
      });

      registerNodeBuilder('simple', simpleNodeBuilder);
      expect(nodeRegistry.simple).toBe(simpleNodeBuilder);

      registerNodeBuilder('simple', simpleNodeBuilder2);
      expect(nodeRegistry.simple).toBe(simpleNodeBuilder2);
    });
  });
});
