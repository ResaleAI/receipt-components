import { ImageNodeProps } from '@resaleai/receipt-ast';

async function renderImage(
  { src, maxWidth, align }: ImageNodeProps,
  children?: string[]
) {
  maxWidth = Number(maxWidth ?? 1);
  return `
  <div style="text-align: ${align ?? 'left'}">
    <img src="${src}" style="display: inline-block; width: ${
    maxWidth * 100
  }%" />
  </div>`;
}

export default renderImage;
