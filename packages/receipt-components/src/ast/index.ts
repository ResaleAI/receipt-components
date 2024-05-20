import { AlignNodeProps, BarcodeNodeProps, BreakNodeProps, ScaleNodeProps, TextLiteralNodeProps, TextNodeProps } from './types';

export { nodeRegistry, registerNodeBuilder } from './node-builders';
export { parseTemplateForAst } from './parser';
export * from './types';

declare global {
  interface NodeMap {
    align: {
      props: AlignNodeProps,
      builder: typeof import('./node-builders/align').default,
    },
    barcode: {
      props: BarcodeNodeProps,
      builder: typeof import('./node-builders/barcode').default,
    },
    break: {
      props: BreakNodeProps,
      builder: typeof import('./node-builders/break').default,
    },
    fragment: {
      props: null,
      builder: typeof import('./node-builders/fragment').default,
    },
    inverse: {
      props: null,
      builder: typeof import('./node-builders/inverse').default,
    },
    receipt: {
      props: null,
      builder: typeof import('./node-builders/root').default,
    },
    scale: {
      props: ScaleNodeProps,
      builder: typeof import('./node-builders/scale').default,
    },
    smooth: {
      props: null,
      builder: typeof import('./node-builders/smooth').default,
    },
    textLiteral: {
      props: TextLiteralNodeProps,
      builder: typeof import('./node-builders/text-literal').default,
    },
    text: {
      props: TextNodeProps,
      builder: typeof import('./node-builders/text').default,
    },
  }
}