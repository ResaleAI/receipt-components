import { ScaleNodeProps } from '@resaleai/receipt-components';

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

  const bothScale = width === height;
  let scaleStyle;

  if (bothScale) {
    scaleStyle = `font-size: ${width}em;`;
  } else {
    scaleStyle = `transform: scale(${width}, ${height});`;
    if (width !== 1) {
      const maxWidth = 100 / width;
      const marginLeft = (.5 * (width - 1)) * maxWidth;
      scaleStyle += `max-width: ${maxWidth}%; margin-left: ${marginLeft}%;`;
    }
  }

  return `<div style="margin: 0; ${scaleStyle} margin-top: ${
    (height - 1) * 10
  }px;">
  ${children?.join('')}
  </div>`;
}

export default renderScale;
