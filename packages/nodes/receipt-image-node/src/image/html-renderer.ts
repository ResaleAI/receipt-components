import { imageToHtml } from './process-image';
import { ImageNodeProps } from './types';

async function renderImage(
  { src, mode, maxWidth, align }: ImageNodeProps,
  children?: string[]
) {
  maxWidth = Number(maxWidth ?? 1);
  if (!mode) {
    mode = 33;
  } else {
    mode = Number(mode) as typeof mode;
  }

  return `
  <div style="text-align: ${align ?? 'left'}">
    <img src="${await imageToHtml(
      src,
      mode,
      maxWidth
    )}" style="display: inline-block; width: ${maxWidth * 100}%" />
  </div>`;
}

export default renderImage;
