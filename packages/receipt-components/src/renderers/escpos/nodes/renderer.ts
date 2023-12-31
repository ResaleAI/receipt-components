import {
  ChildBuilder,
  EscPos,
  EscPosRenderer,
} from '@ep/types';
import renderAlign from './align';
import renderText from './text';
import renderTextLiteral from './textLiteral';
import renderRoot from './root';
import renderBreak from './break';
import renderScale from './scale';
import renderBarcode from './barcode';
import renderSmooth from './smooth';
import { ReceiptAST } from '@/ast';
import { buildReceiptRenderer } from '@/renderer';
import renderFragment from './fragment';
import renderInverse from './inverse';
import { InvalidNodeError } from '@ep/errors';

export const [escPosRenderers, registerEscPosRenderer] = buildReceiptRenderer<
  EscPos,
  EscPosRenderer<any>
>({
  align: renderAlign,
  barcode: renderBarcode,
  break: renderBreak,
  fragment: renderFragment,
  inverse: renderInverse,
  receipt: renderRoot,
  scale: renderScale,
  smooth: renderSmooth,
  text: renderText,
  textLiteral: renderTextLiteral,
});

export const defaultContext: RC.ReceiptNodeContext = {
  textMode: 0,
  scaleBits: 0,
  currentAlign: 0,
  multiLine: true,
  defaultLineLength: 42,
  altFontLineLength: 56,
  currentOffset: 0,
  numColsInLine: 0,
  textJustify: 'left',
};

async function renderEscPos(tree: ReceiptAST): Promise<Uint8Array> {
  const escPosLL = await _renderEscPos(tree, defaultContext);
  return escPosLL.toUint8Array();
}

export async function _renderEscPos(
  tree: ReceiptAST,
  context?: RC.ReceiptNodeContext
): Promise<EscPos> {
  const { name, props, children } = tree;
  const renderer = escPosRenderers[name];
  if (!renderer) {
    throw new InvalidNodeError(`Renderer for ${name} not found`);
  }

  const nodeChildren: ChildBuilder<EscPos>[] =
    children?.map((child) => (childCtx?: RC.ReceiptNodeContext) => {
      return _renderEscPos(child, childCtx);
    }) ?? [];

  return await renderer(props, nodeChildren, context);
}

export default renderEscPos;
