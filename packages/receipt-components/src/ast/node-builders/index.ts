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

// todo: we need a way to define aliases at this level so that
// user created nodes and core nodes can be aliased using the
// same mechanism.
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

export type CoreNodeName = {
  [Property in keyof typeof nodeBuilders]: ReturnType<
    (typeof nodeBuilders)[Property]
  >['name'];
}[keyof typeof nodeBuilders];

export type CoreNodeProps = {
  [Property in CoreNodeName]: ReturnType<
    (typeof nodeBuilders)[Property]
  >['props'];
};

// TODO: fixtypes
export function registerNodeBuilder<TProps>(
  name: string,
  builder: (props: TProps, children?: ReceiptAST[]) => ReceiptASTNode<TProps>
) {
  nodeRegistry[name] = builder;
}

export type RegisterNodeBuilderFunc = typeof registerNodeBuilder;
