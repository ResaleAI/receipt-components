export type ReceiptASTNode<TProps> = {
  readonly name: string;
  readonly props: TProps;
  readonly children?: ReceiptASTNode<any>[];
};

export type ReceiptASTNodeBuilder<TProps> = (
  props: TProps,
  children?: ReceiptAST[]
) => ReceiptASTNode<TProps>;

export type ReceiptAST = ReceiptASTNode<any>;

export type ReceiptASTNodeRegistry = {
  [key: string]: ReceiptASTNodeBuilder<any>;
};

export type {
  CoreNodeName,
  CoreNodeProps,
  RegisterNodeBuilderFunc,
} from './node-builders';
export * from './node-builders/types';

import { AlignNodeProps, BarcodeNodeProps, BreakNodeProps, ScaleNodeProps, TextNodeProps } from './node-builders/types';

declare global {
  namespace RC {
    interface NodeMap {
      align: {
        props: AlignNodeProps;
        builder: typeof import('./node-builders/align').default;
      };
      barcode: {
        props: BarcodeNodeProps;
        builder: typeof import('./node-builders/barcode').default;
      };
      break: {
        props: BreakNodeProps
        builder: typeof import('./node-builders/break').default;
      };
      fragment: {
        props: null;
        builder: typeof import('./node-builders/fragment').default;
      };
      inverse: {
        props: null;
        builder: typeof import('./node-builders/inverse').default;
      };
      scale: {
        props: ScaleNodeProps
        builder: typeof import('./node-builders/scale').default;
      };
      smooth: {
        props: null;
        builder: typeof import('./node-builders/smooth').default;
      };
      textLiteral: {
        props: null;
        builder: typeof import('./node-builders/text-literal').default;
      };
      text: {
        props: TextNodeProps
        builder: typeof import('./node-builders/text').default;
      };
    }
  }
}