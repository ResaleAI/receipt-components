import { ReceiptAST } from '@resaleai/receipt-components';
import { buildReceiptRenderer } from '@resaleai/receipt-components';
import { HtmlRenderer } from './types';
import renderAlign from './nodes/align';
import renderBarcode from './nodes/barcode';
import renderBreak from './nodes/break';
import renderFragment from './nodes/fragment';
import renderInverse from './nodes/inverse';
import renderRoot from './nodes/root';
import renderScale from './nodes/scale';
import renderSmooth from './nodes/smooth';
import renderText from './nodes/text';
import renderTextLiteral from './nodes/text-literal';

export const [htmlRenderers, registerHtmlRenderer] = buildReceiptRenderer<
  string,
  HtmlRenderer<any>
>({
  align: renderAlign,
  barcode: renderBarcode,
  break: renderBreak,
  fragment: renderFragment,
  inverse: renderInverse,
  root: renderRoot,
  scale: renderScale,
  smooth: renderSmooth,
  text: renderText,
  textLiteral: renderTextLiteral,
});

async function renderHtml(tree: ReceiptAST): Promise<string> {
  // todo: add styles here
  let res = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: monospace
    }
    .receipt {
      border: 1px solid black;
      width: 328px;
      padding: 40px 20px;
      font-size: 13px;
    }
    .row {
      display: inline-flex;
      width: 100%;
      flex-wrap: wrap;
      flex: 1 1 auto;
    }
    .barcode-39 {
      font-family: 'Libre Barcode 39', cursive;
    }
    .fragment {
      width: 100%;
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
