import { ReceiptAST } from '@/core/types';
import { buildReceiptRenderer } from '../../';
import { HtmlRenderer } from './types';
import renderAlign from './align';
import renderBarcode from './barcode';
import renderBreak from './break';
import renderCol from './col';
import renderFragment from './fragment';
import renderInverse from './inverse';
import renderRoot from './root';
import renderRow from './row';
import renderScale from './scale';
import renderSmooth from './smooth';
import renderText from './text';
import renderTextLiteral from './text-literal';
import renderImage from './image';

export const [htmlRenderers, registerHtmlRenderer] = buildReceiptRenderer<
  string,
  HtmlRenderer<any>
>({
  align: renderAlign,
  barcode: renderBarcode,
  break: renderBreak,
  col: renderCol,
  fragment: renderFragment,
  image: renderImage,
  inverse: renderInverse,
  root: renderRoot,
  row: renderRow,
  scale: renderScale,
  smooth: renderSmooth,
  text: renderText,
  textLiteral: renderTextLiteral,
});

async function renderHtml(tree: ReceiptAST): Promise<string> {
  // todo: add styles here
  let res = `<style>
    body {
      font-family: monospace
    }
    .receipt {
      border: 1px solid black;
      width: 328px;
      padding: 40px 20px;
    }
    .row {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      flex: 1 1 auto;
    }
  </style>`;

  res += await _renderHtml(tree);

  return res;
}

async function _renderHtml(tree: ReceiptAST): Promise<string> {
  const { name, props, children } = tree;
  const renderer = htmlRenderers[name];
  if (!renderer) {
    throw new Error(`Renderer for ${name} not found`);
  }
  let nodeChildren: string[];
  if (!children) {
    nodeChildren = [];
  } else {
    nodeChildren = await Promise.all(
      children?.map(async (child) => await _renderHtml(child))
    );
  }

  return await renderer(props, nodeChildren);
}

export default renderHtml;
