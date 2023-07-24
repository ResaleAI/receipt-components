import { ReceiptASTNodeRegistry } from '../types';
import AlignNodeBuilder from './align';
import BuildBarcode from './barcode';
import BreakNodeBuilder from './break';
import ColNodeBuilder from './col';
import ImageNodeBuilder from './image';
import RootNodeBuilder from './root';
import RowNodeBuilder from './row';
import ScaleNodeBuilder from './scale';
import SmoothNodeBuilder from './smooth';
import TextNodeBuilder from './text';
import TextLiteralNodeBuilder from './text-literal';

const nodeBuilders = {
  align: AlignNodeBuilder,
  barcode: BuildBarcode,
  break: BreakNodeBuilder,
  br: BreakNodeBuilder,
  col: ColNodeBuilder,
  image: ImageNodeBuilder,
  img: ImageNodeBuilder,
  receipt: RootNodeBuilder,
  root: RootNodeBuilder,
  row: RowNodeBuilder,
  scale: ScaleNodeBuilder,
  smooth: SmoothNodeBuilder,
  template: RootNodeBuilder,
  text: TextNodeBuilder,
  textLiteral: TextLiteralNodeBuilder,
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
