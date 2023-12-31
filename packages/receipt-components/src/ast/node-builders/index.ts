import { ReceiptAST, ReceiptASTNode, ReceiptASTNodeRegistry } from '@ast/types';
import buildAlignNode from './align';
import buildBarcodeNode from './barcode';
import buildBreakNode from './break';
import buildFragmentNode from './fragment';
import buildInverseNode from './inverse';
import buildRootNode from './root';
import buildScaleNode from './scale';
import buildSmoothNode from './smooth';
import buildTextNode from './text';
import buildTextLiteralNode from './text-literal';

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

export { default as buildAlignNode } from './align';
export { default as buildBarcodeNode } from './barcode';
export { default as buildBreakNode } from './break';
export { default as buildFragmentNode } from './fragment';
export { default as buildInverseNode } from './inverse';
export { default as buildRootNode } from './root';
export { default as buildScaleNode } from './scale';
export { default as buildSmoothNode } from './smooth';
export { default as buildTextNode } from './text';
export { default as buildTextLiteralNode } from './text-literal';