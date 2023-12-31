import { ReceiptAST, ReceiptASTNode, ReceiptASTNodeRegistry } from '@ast/types';
import buildAlignNode, { AlignNodeProps } from './align';
import buildBarcodeNode, { BarcodeNodeProps } from './barcode';
import buildBreakNode, { BreakNodeProps } from './break';
import buildFragmentNode from './fragment';
import buildInverseNode from './inverse';
import buildRootNode from './root';
import buildScaleNode, { ScaleNodeProps } from './scale';
import buildSmoothNode from './smooth';
import buildTextNode, { TextNodeProps } from './text';
import buildTextLiteralNode, { TextLiteralNodeProps } from './text-literal';

declare global {
  namespace RC {
    interface NodeMap {
      align: {
        props: AlignNodeProps;
        builder: typeof buildAlignNode;
      };
      barcode: {
        props: BarcodeNodeProps;
        builder: typeof buildBarcodeNode;
      };
      break: {
        props: BreakNodeProps
        builder: typeof buildBreakNode;
      };
      fragment: {
        props: null;
        builder: typeof buildFragmentNode;
      };
      inverse: {
        props: null;
        builder: typeof buildInverseNode;
      };
      receipt: {
        props: null,
        builder: typeof buildRootNode;
      },
      scale: {
        props: ScaleNodeProps
        builder: typeof buildScaleNode;
      };
      smooth: {
        props: null;
        builder: typeof buildSmoothNode;
      };
      textLiteral: {
        props: TextLiteralNodeProps;
        builder: typeof buildTextLiteralNode;
      };
      text: {
        props: TextNodeProps
        builder: typeof buildTextNode;
      };
    }
  }
}

const nodeBuilders = {
  align: buildAlignNode,
  barcode: buildBarcodeNode,
  break: buildBreakNode,
  br: buildBreakNode,
  fragment: buildFragmentNode,
  inverse: buildInverseNode,
  receipt: buildRootNode,
  root: buildRootNode,
  scale: buildScaleNode,
  smooth: buildSmoothNode,
  template: buildFragmentNode,
  text: buildTextNode,
  textLiteral: buildTextLiteralNode,
};

export const nodeRegistry: ReceiptASTNodeRegistry = nodeBuilders;

export function registerNodeBuilder<TProps>(
  name: keyof RC.NodeMap,
  builder: (props: TProps, children?: ReceiptAST[]) => ReceiptASTNode<TProps>
) {
  nodeRegistry[name] = builder;
}

export type RegisterNodeBuilderFunc = typeof registerNodeBuilder;