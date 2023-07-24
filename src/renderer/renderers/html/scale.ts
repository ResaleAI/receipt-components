import { ScaleNodeProps } from '@/core/node-builders/scale';

async function renderScale(
  { width, height }: ScaleNodeProps,
  children?: string[]
) {
  width = Number(width || 1);
  height = Number(height || 1);
  if (width > 5) width = 5;
  else if (width < 1) width = 1;
  if (height > 5) height = 5;
  else if (height < 1) height = 1;

  return `<p style="transform: scale(${width}, ${height}); margin: 0; margin-top: ${
    (height - 1) * 10
  }px;">${children?.join('')}</p>`;
}

export default renderScale;
