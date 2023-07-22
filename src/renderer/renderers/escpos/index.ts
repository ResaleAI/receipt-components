import { ChildBuilder, EscPos, ReceiptNodeContext } from './types';
import renderAlign from './align';
import renderText from './text';
import renderTextLiteral from './textLiteral';
import renderRoot from './root';
import renderBreak from './break';
import renderScale from './scale';
import renderBarcode from './barcode';
import renderImage from './image';
import renderSmooth from './smooth';
import { ReceiptAST } from '@/core/types';
import { buildReceiptRenderer } from '@/renderer';

type EscPosRenderer<TProps> = (
  props: TProps,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) => Promise<EscPos>;

export const [escPosRenderers, registerEscPosRenderer] = buildReceiptRenderer<
  EscPos,
  EscPosRenderer<any>
>({
  align: renderAlign,
  barcode: renderBarcode,
  break: renderBreak,
  image: renderImage,
  root: renderRoot,
  scale: renderScale,
  smooth: renderSmooth,
  text: renderText,
  textLiteral: renderTextLiteral,
});

const defaultContext: ReceiptNodeContext = {
  textMode: 0,
  scaleBits: 0,
  currentAlign: 0,
  multiLine: true,
  defaultLineLength: 42,
  altFontLineLength: 56,
  currentOffset: 0,
};

async function renderEscPos(tree: ReceiptAST): Promise<EscPos> {
  return await _renderEscPos(tree, defaultContext);
}

async function _renderEscPos(
  tree: ReceiptAST,
  context?: ReceiptNodeContext
): Promise<EscPos> {
  const { name, props, children } = tree;
  const renderer = escPosRenderers[name];
  if (!renderer) {
    throw new Error(`Renderer for ${name} not found`);
  }

  const nodeChildren: ChildBuilder<EscPos>[] =
    children?.map((child) => (childCtx?: ReceiptNodeContext) => {
      return _renderEscPos(child, childCtx);
    }) ?? [];

  return await renderer(props, nodeChildren, context);
}

export default renderEscPos;
