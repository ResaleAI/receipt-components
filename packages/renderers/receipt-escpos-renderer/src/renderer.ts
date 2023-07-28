import {
  ChildBuilder,
  EscPos,
  EscPosRenderer,
  EscPosRendererArr,
  ReceiptNodeContext,
} from './types';
import renderAlign, { renderAlignArray } from './align';
import renderText, { renderTextArr } from './text';
import renderTextLiteral, { renderTextLiteralArr } from './textLiteral';
import renderRoot, { renderRootArr } from './root';
import renderBreak, { renderBreakArr } from './break';
import renderScale, { renderScaleArr } from './scale';
import renderBarcode, { renderBarcodeArr } from './barcode';
import renderSmooth, { renderSmoothArr } from './smooth';
import { ReceiptAST } from '@resaleai/receipt-ast';
import { buildReceiptRenderer } from '@resaleai/receipt-renderer';
import renderRow, { renderRowArr } from './row';
import renderCol, { renderColArr } from './col';
import renderFragment, { renderFragmentArr } from './fragment';
import renderInverse, { renderInverseArr } from './inverse';

export const [escPosRenderers, registerEscPosRenderer] = buildReceiptRenderer<
  EscPos,
  EscPosRenderer<any>
>({
  align: renderAlign,
  barcode: renderBarcode,
  break: renderBreak,
  col: renderCol,
  fragment: renderFragment,
  inverse: renderInverse,
  root: renderRoot,
  row: renderRow,
  scale: renderScale,
  smooth: renderSmooth,
  text: renderText,
  textLiteral: renderTextLiteral,
});

export const [escPosRenderersArr, registerEscPosRendererArr] =
  buildReceiptRenderer<number[], EscPosRendererArr<any>>({
    align: renderAlignArray,
    barcode: renderBarcodeArr,
    break: renderBreakArr,
    col: renderColArr,
    fragment: renderFragmentArr,
    inverse: renderInverseArr,
    root: renderRootArr,
    row: renderRowArr,
    scale: renderScaleArr,
    smooth: renderSmoothArr,
    text: renderTextArr,
    textLiteral: renderTextLiteralArr,
  });

const defaultContext: ReceiptNodeContext = {
  textMode: 0,
  scaleBits: 0,
  currentAlign: 0,
  multiLine: true,
  defaultLineLength: 42,
  altFontLineLength: 56,
  currentOffset: 0,
  numColsInLine: 0,
};

async function renderEscPos(tree: ReceiptAST): Promise<Uint8Array> {
  const escPosLL = await _renderEscPos(tree, defaultContext);
  return escPosLL.toUint8Array();
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

export function renderEscPosArr(tree: ReceiptAST): Promise<number[]> {
  return _renderEscPosArr(tree, defaultContext);
}

async function _renderEscPosArr(
  tree: ReceiptAST,
  context?: ReceiptNodeContext
): Promise<number[]> {
  const { name, props, children } = tree;
  const renderer = escPosRenderersArr[name];
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
