import { ReceiptASTNodeRegistry, RegisterASTBuilderFunc } from '../types';
import buildAlignNode from './align';
import BuildBarcode from './barcode';
import buildBreakNode from './break';
import buildColNode from './col';
import buildFragmentNode from './fragment';
import buildInverseNode from './inverse';
import buildRootNode from './root';
import buildRowNode from './row';
import buildScaleNode from './scale';
import buildSmoothNode from './smooth';
import buildTextNode from './text';
import buildTextLiteralNode from './text-literal';

const nodeBuilders = {
  align: buildAlignNode,
  barcode: BuildBarcode,
  break: buildBreakNode,
  br: buildBreakNode,
  col: buildColNode,
  fragment: buildFragmentNode,
  // image: buildImageNode,
  // img: buildImageNode,
  inverse: buildInverseNode,
  receipt: buildRootNode,
  root: buildRootNode,
  row: buildRowNode,
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

export const registerASTPlugin: RegisterASTBuilderFunc<unknown> = (
  name: string,
  builder
) => {
  nodeRegistry[name] = builder;
};
